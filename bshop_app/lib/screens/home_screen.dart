import 'package:bshop_app/screens/login_screen.dart';
import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'BShop',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        actions: [
          TextButton(
            onPressed: () {
              //connect to the login screen
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const LoginScreen()),
              );
            },
            child: const Text('Log In'),
          ),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: EdgeInsets.all(10),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 24),
              const Text(
                'Your style, your barber, your time.',
                style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 12),
              const Text(
                'Discover barbershops, explore services, '
                'and book your next appointment.',
                style: TextStyle(fontSize: 16),
              ),
              const SizedBox(height: 28),
              SizedBox(
                width: double.infinity,
                height: 52,
                child: FilledButton.icon(
                  onPressed: () {
                    // Connect this to shop browsing.
                  },
                  icon: const Icon(Icons.search),
                  label: const Text('Explore Barbershops'),
                ),
              ),
              const SizedBox(height: 32),
              const Text(
                'Why BShop',
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 16),
              const _FeatureTile(
                icon: Icons.storefront_outlined,
                title: 'Discover local shops',
                subtitle: 'Explore barbershop and their services',
              ),
              const _FeatureTile(
                icon: Icons.calendar_month_outlined,
                title: 'Book with easy',
                subtitle: 'Choose a barber and a convient time.',
              ),
              const _FeatureTile(
                icon: Icons.star_outline,
                title: 'Read reviews',
                subtitle: 'See ratings from other customers',
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _FeatureTile extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;

  const _FeatureTile({
    required this.icon,
    required this.title,
    required this.subtitle,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      contentPadding: EdgeInsets.zero,
      leading: Icon(icon, size: 30),
      title: Text(title, style: const TextStyle(fontWeight: FontWeight.w600)),
      subtitle: Text(subtitle),
    );
  }
}
