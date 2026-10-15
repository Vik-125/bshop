import 'package:bshop_app/screens/home_screen.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const BShopApp());
}

class BShopApp extends StatelessWidget {
  const BShopApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'BShop',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF1F2937)),
        scaffoldBackgroundColor: const Color(0xFFF8F7F4),
      ),
      home: const HomeScreen(),
    );
  }
}