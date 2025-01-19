import 'dart:convert';
// ignore: depend_on_referenced_packages
import 'package:http/http.dart' as http;

class ApiService {
  final String baseUrl = "http://localhost:8000";

  Future<Map<String, dynamic>> getVote() async {
    final response = await http.get(Uri.parse("$baseUrl/get_vote/"));
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception("Failed to load vote");
    }
  }

  Future<void> submitVote(Map<String, dynamic> voteData) async {
    await http.post(
      Uri.parse("$baseUrl/submit_vote/"),
      headers: {"Content-Type": "application/json"},
      body: json.encode(voteData),
    );
  }

  Future<Map<String, dynamic>> getResults() async {
    final response = await http.get(Uri.parse("$baseUrl/get_results/"));
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception("Failed to load results");
    }
  }
}
