import 'package:flutter/material.dart';
import '../services/api_service.dart';
import '../services/token_storage.dart';

class MyShopsScreen extends StatefulWidget {
  const MyShopsScreen({super.key});

  @override
  State<MyShopsScreen> createState() => _MyShopsScreenState();
}

class _MyShopsScreenState extends State<MyShopsScreen> {
  List<dynamic> shops = [];
  bool isLoading = true;
  String? errorMessage;

  @override
  void initState() {
    super.initState();
    loadShops();
  }

  Future<void> loadShops() async {
    try {
      final token = await TokenStorage.getToken();

      if (token == null || token.isEmpty) {
        throw Exception('Please log in again.');
      }

      final result = await ApiService.getMyShops(token: token);

      if (!mounted) return;

      setState(() {
        shops = result;
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
        title: const Text(
          'My Shops',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
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
                        loadShops();
                      },
                      child: const Text('Try Again'),
                    ),
                  ],
                ),
              )
            : shops.isEmpty
            ? const Center(
                child: Text(
                  'You have not added any shops yet.',
                  textAlign: TextAlign.center,
                ),
              )
            : ListView.builder(
                itemCount: shops.length,
                itemBuilder: (context, index) {
                  final shop = shops[index] as Map<String, dynamic>;

                  return Card(
                    margin: const EdgeInsets.only(bottom: 12),
                    child: ListTile(
                      leading: const CircleAvatar(
                        child: Icon(Icons.storefront),
                      ),
                      title: Text(shop['name']?.toString() ?? 'Unnamed Shop'),
                      subtitle: Text(
                        shop['address']?.toString() ?? 'No address available',
                      ),
                      trailing: const Icon(Icons.chevron_right),
                      onTap: () {
                        // open this shop's barbers next.
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text('Selected ${shop['name'] ?? 'shop'}'),
                          ),
                        );
                      },
                    ),
                  );
                },
              ),
      ),
    );
  }
}
