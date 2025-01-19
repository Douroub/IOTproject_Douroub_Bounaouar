import 'package:flutter/material.dart';
import 'package:mobile_app/services/api_service.dart';

class VoteScreen extends StatefulWidget {
  final String username;

  const VoteScreen({super.key, required this.username});

  @override
  _VoteScreenState createState() => _VoteScreenState();
}

class _VoteScreenState extends State<VoteScreen> {
  final ApiService apiService = ApiService();
  String question = "Loading question...";
  List<String> options = [];

  @override
  void initState() {
    super.initState();
    _fetchVote();
  }

  Future<void> _fetchVote() async {
    try {
      final voteData = await apiService.getVote();
      setState(() {
        question = voteData['question'];
        options = List<String>.from(voteData['options']);
      });
    } catch (e) {
      print("Error fetching vote: $e");
    }
  }

  void _submitVote(String option) {
    apiService.submitVote({
      "username": widget.username,
      "selected_option": option,
    });
    Navigator.pushNamed(context, '/results');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Vote')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(question, style: const TextStyle(fontSize: 24)),
            ...options.map((option) => ElevatedButton(
                  onPressed: () => _submitVote(option),
                  child: Text(option),
                )),
          ],
        ),
      ),
    );
  }
}
