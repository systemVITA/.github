import paho.mqtt.client as mqtt
import requests
import json
import time

mqtt_broker = "mqtt5"  # Usando o nome do contêiner como host
mqtt_port = 1883
mqtt_topic = "messages"
mqtt_user = "user1"
mqtt_pw = "123"

api_url = "http://193.203.174.233:3033"
api_endpoint = "/set_log"
api_headers = {"Content-Type": "application/json"}

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Conectado ao broker MQTT")
        client.subscribe(mqtt_topic)
    else:
        print(f"Falha na conexão ao broker MQTT. Código de resultado: {rc}")

def on_message(client, userdata, msg):
    payload = msg.payload.decode("utf-8")
    print(f"Mensagem MQTT recebida: {payload}")
    enviar_para_api(payload)

def enviar_para_api(data):
    try:
        payload = {"client": 10, "dados": data}
        response = requests.post(api_url + api_endpoint, data=json.dumps(payload), headers=api_headers)

        if response.status_code == 200:
            print("Dados enviados com sucesso para a API REST.")
        else:
            print(f"Falha ao enviar dados para a API REST. Código de status: {response.status_code}")
    except Exception as e:
        print(f"Erro ao enviar dados para a API REST: {str(e)}")

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.username_pw_set(mqtt_user, mqtt_pw)

for _ in range(3):
    try:
        client.connect(mqtt_broker, mqtt_port, 60)
        break
    except Exception as e:
        print(f"Falha ao conectar-se ao broker MQTT: {str(e)}")
        print("Tentando novamente em 5 segundos...")
        time.sleep(5)
else:
    print("Não foi possível conectar-se ao broker MQTT após várias tentativas. Encerrando o programa.")
    exit()

client.loop_forever()
