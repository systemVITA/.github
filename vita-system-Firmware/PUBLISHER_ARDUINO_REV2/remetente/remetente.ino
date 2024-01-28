#include <Wire.h>
#include <WiFiNINA.h>
#include <PubSubClient.h>
#include "secrets.h"
#include <ArduinoJson.h>

#define BAND 115200

WiFiClient wifiClient;
PubSubClient client(wifiClient);

const int windowSize = 6;
int sensorReadings[windowSize];
int currentReadings[windowSize];
int currentIndex = 0;

unsigned long printPeriod = 1000;
unsigned long previousMillis = 0;

StaticJsonDocument<200> jsonDoc;
StaticJsonDocument<200> giroscopio;

void connectToWiFi() {
  Serial.print("Conectando à rede WiFi");
  while (WiFi.begin(ssid, password) != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi conectado");
  Serial.println("Endereço IP: ");
  Serial.println(WiFi.localIP());
}

void connectToMQTT() {
  client.setServer(mqtt_server, mqtt_port);
  while (!client.connected()) {
    Serial.print("Conectando ao servidor MQTT...");
    if (client.connect("arduino-rev2-client", mqtt_user, mqtt_password)) {
      Serial.println("Conectado!");
      client.subscribe("button");
    } else {
      Serial.print("Falha, rc=");
      Serial.print(client.state());
      Serial.println(" Tentando novamente em 5 segundos");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(BAND);
  connectToWiFi();
  connectToMQTT();
}

void loop() {
  client.loop();
  jsonDoc["id"] = random(1, 100); 
  jsonDoc["Volume_corrente"] = random(50, 200); 
  jsonDoc["Razao_IE"] = random(1, 10);  
  jsonDoc["Frequencia"] = random(10, 30);  
  jsonDoc["Fluxo_medio"] = random(100, 500);  

  char jsonBuffer[200];
  serializeJson(jsonDoc, jsonBuffer);

  Serial.println("JSON enviado via MQTT:");
  Serial.println(jsonBuffer);

  client.publish("messages", jsonBuffer);

  delay(1000);
}
