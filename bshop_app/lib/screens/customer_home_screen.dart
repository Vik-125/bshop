import 'package:flutter/material.dart';

class CustomerHomeScreen extends StatelessWidget {
  const CustomerHomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('BShop', style: TextStyle(fontWeight: FontWeight.bold)),
        actions: [
          IconButton(
            onPressed: () {
              // add logout
            },
            icon: const Icon(Icons.logout),
            tooltip: 'Log out',
          ),
        ],
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Welcome back!',
            style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 28),
          const Text(
            'Find your next favorite barbershop.',
            style: TextStyle(fontSize: 16),
          ),
          const SizedBox(height: 28),
          SizedBox(
            width: double.infinity,
            height: 52,
            child: FilledButton.icon(
              onPressed: () {
                // connect shop browsing next.
              },
              icon: const Icon(Icons.search),
              label: const Text('Explore Barbershops'),
            ),
          ),
          const SizedBox(height: 28,),
          const Text(
            'Your BShop',
            style: TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.bold,
            )
          ),
          const SizedBox(height: 12,),
          const _CustomerFeatureTile(
            icon: Icons.calendar_month_outlined,
            title: 'My Bookings',
            subtitle: 'View and manage your appointments.'
          ),
          const _CustomerFeatureTile(
            icon: Icons.history,
            title: 'My History',
            subtitle: 'Revisit your completed appointment'
          )
        ],
      ),
    );
  }
}


class _CustomerFeatureTile extends StatelessWidget{
  final IconData icon;
  final String title;
  final String subtitle;

  const _CustomerFeatureTile({
    required this.icon,
    required this.title,
    required this.subtitle
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      contentPadding: EdgeInsets.zero,
      leading: Icon(icon, size:30),
      title: Text(
        title,
        style: TextStyle(fontWeight: FontWeight.w600),
        ),
        subtitle: Text(subtitle),
    );
  }
}