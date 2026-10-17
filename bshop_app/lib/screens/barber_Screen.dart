import 'package:flutter/material.dart';
import '../services/api_service.dart';
import '../services/token_storage.dart';

class BarbersScreen extends StatefulWidget {
  final String shopId;

  const BarbersScreen({super.key, required this.shopId});

  @override
  State<BarbersScreen> createState() => _BarbersScreenState();
}

class _BarbersScreenState extends State<BarbersScreen> {
  List<dynamic> barbers = [];
  bool isLoading = true;
  String? errorMessage;

  @override
  void initState() {
    super.initState();
    loadBarbers();
  }

  Future<void> loadBarbers() async {
    try {
      final token = await TokenStorage.getToken();

      if (token == null || token.isEmpty) {
        throw Exception('Please log in again.');
      }

      final result = await ApiService.getBarbers(
        shopId: widget.shopId,
        token: token,
      );

      if (!mounted) return;

      setState(() {
        barbers = result;
        isLoading = false;
      });
    } catch (error) {
      if (!mounted) return;

      setState(() {
        errorMessage = error.toString();
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
        title: Text('My Barber', style: TextStyle(fontWeight: FontWeight.bold)),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: isLoading
            ? const Center(child: CircularProgressIndicator())
            : errorMessage != null
            ? Center(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(errorMessage!),
                    const SizedBox(height: 12),
                    FilledButton(
                      onPressed: () {
                        setState(() {
                          isLoading = true;
                          errorMessage = null;
                        });
                        loadBarbers();
                      },
                      child: const Text('Try Again'),
                    ),
                  ],
                ),
              )
            : barbers.isEmpty
            ? const Center(child: Text('No barbers found for this shop.'))
            : ListView.builder(
                itemCount: barbers.length,
                itemBuilder: (context, index) {
                  final barber = barbers[index] as Map<String, dynamic>;

                  return Card(
                    margin: const EdgeInsets.only(bottom: 12),
                    child: ListTile(
                      leading: const CircleAvatar(child: Icon(Icons.person)),
                      title: Text(
                        barber['name']?.toString() ?? 'Unknown Barber',
                      ),
                      subtitle: Text(
                        barber['specialization']?.toString() ??
                            'No speciality listed',
                      ),
                    ),
                  );
                },
              ),
      ),
    );
  }
}
