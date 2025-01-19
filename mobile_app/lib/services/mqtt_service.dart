import 'package:mqtt_client/mqtt_client.dart';
import 'package:mqtt_client/mqtt_server_client.dart';

class MqttService {
  late MqttServerClient client;
  final String broker = "localhost";
  final int port = 1883;

  Future<void> connect() async {
    client = MqttServerClient(broker, '');
    client.port = port;
    client.logging(on: true);
    client.keepAlivePeriod = 20;

    try {
      await client.connect();
      print("Connected to MQTT broker");
    } catch (e) {
      print("Error connecting to MQTT broker: $e");
      client.disconnect();
    }
  }

  void subscribe(String topic, Function(String) onMessage) {
    client.subscribe(topic, MqttQos.atMostOnce);
    client.updates?.listen((List<MqttReceivedMessage<MqttMessage>> events) {
      final recMessage = events[0].payload as MqttPublishMessage;
      final message =
          MqttPublishPayload.bytesToStringAsString(recMessage.payload.message);
      onMessage(message);
    });
  }

  void publish(String topic, String message) {
    final builder = MqttClientPayloadBuilder();
    builder.addString(message);
    client.publishMessage(topic, MqttQos.atMostOnce, builder.payload!);
  }
}
