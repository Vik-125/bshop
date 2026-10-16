import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService{
  static const String baseUrl = 'http://localhost:5000/api';

  static Future<Map<String, dynamic>> login({
    required String email,
    required String password,
  }) async{
    final response = await http.post(
      Uri.parse('$baseUrl/auth/login'),
      headers:{'Content-Type': 'application/json'},
      body: jsonEncode({
        'email': email,
        'password': password,
      }),
    );

    final data = jsonDecode(response.body) as Map<String, dynamic>;

    if(response.statusCode >= 200 && response.statusCode < 300){
      return data;
    }

    throw Exception(data['message'] ?? 'Login failed');
  }

  static Future<List<dynamic>> getBarbers({
    required String shopId,
    required String token,
  }) async{
    final response = await http.get(
      Uri.parse('$baseUrl/shops/$shopId/barbers'),
      headers:{
        'Authorization': 'Baerer $token',
        'Content-Type': 'application/json',
      }
    );

    final data = jsonDecode(response.body);
    
    if(response.statusCode >= 200 && response.statusCode < 300){
      if(data is List){
        return data;
      }

      throw Exception('Unexpected response format from the server.');
    }

    if(data is Map<String, dynamic>){
      throw Exception(data['message'] ?? 'Failed to fetch barber');
    }

    throw Exception('Failed to fetch barbers');
  }

  static Future<List<dynamic>> getMyShops({
    required String token,
  }) async{
    final response = await http.get( 
      Uri.parse('$baseUrl/shops/myshops'),
      headers: {
      'Authorization': 'Bearer $token',
      'Content-Type': 'application/json',
    }
    );
    final data = jsonDecode(response.body);

    if (response.statusCode >= 200 && response.statusCode < 300){
      if(data is Map<String, dynamic> && data['shops'] is List){
        return data['shops'] as List<dynamic>;
      }

      throw Exception('unexpected response fromat from the server.');
    }

    if(data is Map<String, dynamic>){
      throw Exception(data['message'] ?? 'Failed to fetch your shops');
    }

    throw Exception('Failed to fetch your shops');
  }
}