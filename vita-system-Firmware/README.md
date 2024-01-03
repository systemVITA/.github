# Projeto Arduino Rev2 - Sensor Data Envio MQTT

Este é um projeto Arduino que envia dados de sensores via MQTT para um servidor. O código utiliza a biblioteca WiFiNINA para conectar-se à rede Wi-Fi e a biblioteca PubSubClient para comunicação MQTT. Além disso, é feito uso da biblioteca ArduinoJson para manipulação de objetos JSON.

## Requisitos

- Arduino Uno Rev2 ou dispositivo compatível
- Sensor de dados (simulado por valores aleatórios no exemplo)
- Acesso a um servidor MQTT

## Configuração

1. **Bibliotecas Necessárias:**
   Certifique-se de ter as bibliotecas necessárias instaladas. Elas podem ser instaladas através do Arduino IDE, utilizando o Gerenciador de Bibliotecas.
   - Wire.h
   - WiFiNINA.h
   - PubSubClient.h
   - ArduinoJson.h

2. **Conexão à Rede Wi-Fi e MQTT:**
   Edite o arquivo `secrets.h` com as credenciais da sua rede Wi-Fi e do servidor MQTT.

```cpp
// secrets.h
#define ssid "NomeDaRedeWiFi"
#define password "SenhaDaRedeWiFi"
#define mqtt_server "EnderecoDoServidorMQTT"
#define mqtt_port 1883
#define mqtt_user "UsuarioMQTT"
#define mqtt_password "SenhaMQTT"
```

## Funcionamento

O programa realiza as seguintes ações:

1. Conecta-se à rede Wi-Fi.
2. Estabelece conexão com o servidor MQTT.
3. No loop principal, gera dados simulados e os encapsula em um objeto JSON.
4. Publica o objeto JSON no tópico "messages" do servidor MQTT.

Os dados simulados incluem ID, Volume Corrente, Razão IE, Frequência e Fluxo Médio.
