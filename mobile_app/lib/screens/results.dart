import 'package:flutter/material.dart';
import 'package:mobile_app/services/api_service.dart';

class ResultsScreen extends StatefulWidget {
  const ResultsScreen({super.key});

  @override
  _ResultsScreenState createState() => _ResultsScreenState();
}

class _ResultsScreenState extends State<ResultsScreen> {
  final ApiService apiService = ApiService();
  Map<String, int> results = {};

  @override
  void initState() {
    super.initState();
    _fetchResults();
  }

  Future<void> _fetchResults() async {
    try {
      final resultData = await apiService.getResults();
      setState(() {
        results = Map<String, int>.from(resultData);
      });
    } catch (e) {
      print("Error fetching results: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Results')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            const Text('Vote Results', style: TextStyle(fontSize: 24)),
            ...results.entries.map((entry) => ListTile(
                  title: Text(entry.key),
                  trailing: Text(entry.value.toString()),
                )),
          ],
        ),
      ),
    );
  }
}
