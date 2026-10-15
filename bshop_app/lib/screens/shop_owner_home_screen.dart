import 'package:flutter/material.dart';

class ShopOwnerHomeScreen extends StatelessWidget {
  const ShopOwnerHomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'BShop Owner',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        actions: [
          IconButton(
            onPressed: () {
              // add logout functionality later.
            },
            icon: const Icon(Icons.logout),
            tooltip: 'Log out',
          ),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Owner Dashboard',
                style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 8),
              const Text(
                'Manage your shops and appointments.',
                style: TextStyle(fontSize: 16),
              ),
              const SizedBox(height: 28),
              SizedBox(
                width: double.infinity,
                height: 52,
                child: FilledButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.storefront),
                  label: const Text('Manage My Shops'),
                ),
              ),
              const SizedBox(height: 28,),
              const Text(
                'Buisness Management',
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.bold
                ),
              ),
              const SizedBox(height: 12),
              const _OwnerFeatureTile(
                icon: Icons.calendar_month_outlined,
                title: 'Appointments',
                subtitle: 'Review and manage bookings.',
              ),
              const _OwnerFeatureTile(
                icon: Icons.content_cut,
                title: 'Barber',
                subtitle: 'Manage barbers at your shops.'
              ),
              const _OwnerFeatureTile(
                icon : Icons.star_outline,
                title: 'Customer Reviews',
                subtitle: 'See feedback about your barbers.'
              )
            ],
          ),
        ),
      ),
    );
  }
}

class _OwnerFeatureTile extends StatelessWidget{
  final IconData icon;
  final String title;
  final String subtitle;

  const _OwnerFeatureTile({
    required this.icon,
    required this.title,
    required this.subtitle,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      contentPadding: EdgeInsets.zero,
      leading: Icon(icon, size: 30,),
      title: Text(title,
      style: const TextStyle(fontWeight: FontWeight.w600),
      ),
      subtitle: Text(subtitle),
    );
  }
}