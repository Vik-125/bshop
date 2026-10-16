import 'package:flutter/material.dart';
import 'barber_Screen.dart';

class ShopOwnerHomeScreen extends StatelessWidget {
  const ShopOwnerHomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: SingleChildScrollView(
        padding: EdgeInsets.all(24),
        child: Scaffold(
          appBar: AppBar(
            title: const Text(
              'BShop Owner',
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            actions: [
              IconButton(
                onPressed: () {
                  // Add logout functionality later.
                },
                icon: const Icon(Icons.logout),
                tooltip: 'Log out',
              ),
            ],
          ),
          body: SafeArea(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Owner Dashboard',
                    style: TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                    ),
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
                      onPressed: () {
                        // Connect shop management later.
                      },
                      icon: const Icon(Icons.storefront),
                      label: const Text('Manage My Shops'),
                    ),
                  ),
        
                  const SizedBox(height: 28),
                  const Text(
                    'Business Management',
                    style: TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 12),
        
                  _OwnerFeatureTile(
                    icon: Icons.calendar_month_outlined,
                    title: 'Appointments',
                    subtitle: 'Review and manage bookings.',
                    onTap: () {
                      // connect the appointments screen next.
                    },
                  ),
        
                  _OwnerFeatureTile(
                    icon: Icons.content_cut,
                    title: 'Barbers',
                    subtitle: 'Manage barbers at your shops.',
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => const BarbersScreen(),
                        ),
                      );
                    },
                  ),
        
                  _OwnerFeatureTile(
                    icon: Icons.star_outline,
                    title: 'Customer Reviews',
                    subtitle: 'See feedback about your barbers.',
                    onTap: () {
                      // connect the reviews screen later.
                    },
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _OwnerFeatureTile extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;
  final VoidCallback onTap;

  const _OwnerFeatureTile({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      contentPadding: EdgeInsets.zero,
      leading: Icon(icon, size: 30),
      title: Text(
        title,
        style: const TextStyle(fontWeight: FontWeight.w600),
      ),
      subtitle: Text(subtitle),
      trailing: const Icon(Icons.chevron_right),
      onTap: onTap,
    );
  }
}
