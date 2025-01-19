import mqtt from 'mqtt';

class MqttService {
  constructor() {
    this.client = null;
  }

  connect() {
    this.client = mqtt.connect('ws://localhost:9001');

    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
    });

    this.client.on('error', (err) => {
      console.error('MQTT Connection error:', err);
    });

    this.client.on('message', (topic, message) => {
      console.log(`Message received on ${topic}: ${message.toString()}`);
    });
  }

  subscribe(topic) {
    if (this.client) {
      this.client.subscribe(topic, (err) => {
        if (!err) {
          console.log(`Subscribed to topic: ${topic}`);
        } else {
          console.error('Subscription error:', err);
        }
      });
    }
  }

  publish(topic, message) {
    if (this.client) {
      this.client.publish(topic, message);
    }
  }
}

export default new MqttService();
