import 'package:flutter/material.dart';

class BarbersScreen extends StatelessWidget {
  const BarbersScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final List<Map<String, String>> barbers = [];

    return Scaffold(
      appBar: AppBar(
        title: Text('My Barber', style: TextStyle(fontWeight: FontWeight.bold)),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Manage your barbers',
                style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 8),
              const Text(
                'View and manage the barbers working at your shops.',
                style: TextStyle(fontSize: 16),
              ),
              const SizedBox(height: 24),

              SizedBox(
                width: double.infinity,
                height: 52,
                child: FilledButton.icon(
                  onPressed: () {
                    //implement Add barber
                  },
                  icon: const Icon(Icons.add),
                  label: const Text('Add Barber'),
                ),
              ),

              const SizedBox(height: 24),

              const Text(
                'Your Barbers',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),

              const SizedBox(height: 12),

              Expanded(
                child: barbers.isEmpty
                    ? const Center(
                        child: Text(
                          'No barber found. Add your first barber.',
                          textAlign: TextAlign.center,
                          style: TextStyle(fontSize: 16),
                        ),
                      )
                    : ListView.builder(
                        itemCount: barbers.length,
                        itemBuilder: (context, index) {
                          final barber = barbers[index];

                          return Card(
                            margin: const EdgeInsets.only(bottom: 12),
                            child: ListTile(
                              leading: const CircleAvatar(
                                child: Icon(Icons.person),
                              ),
                              title: Text(barber['name'] ?? 'unknown Barber'),
                              subtitle: Text(
                                barber['speciality'] ?? 'No speciality listed',
                              ),
                              trailing: const Icon(Icons.chevron_right),
                              onTap: () {
                                //Barber details
                              },
                            ),
                          );
                        },
                      ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
