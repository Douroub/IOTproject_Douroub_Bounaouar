import paho.mqtt.client as mqtt

class MQTTManager:
    def __init__(self, broker="localhost", port=1883):
        self.client = mqtt.Client()
        self.broker = broker
        self.port = port

    def connect(self):
        def on_connect(client, userdata, flags, rc):
            print("Connected to MQTT Broker!")
        
        self.client.on_connect = on_connect
        self.client.connect(self.broker, self.port, keepalive=60)

    def publish(self, topic, message):
        self.client.publish(topic, message)

    def subscribe(self, topic, on_message):
        def internal_callback(client, userdata, msg):
            on_message(msg.topic, msg.payload.decode())
        
        self.client.on_message = internal_callback
        self.client.subscribe(topic)

    def start(self):
        self.client.loop_start()

    def stop(self):
        self.client.loop_stop()

# Exemple d'utilisation :
# mqtt = MQTTManager()
# mqtt.connect()
# mqtt.publish("test/topic", "Hello MQTT!")
