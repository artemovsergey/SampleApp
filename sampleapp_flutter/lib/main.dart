import 'package:flutter/material.dart';
import 'package:sampleapp_flutter/models/User.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() {
  runApp(const MyApp());
}

class UserList extends StatefulWidget {
  const UserList({super.key});

  @override
  _UserListState createState() => _UserListState();
}

class _UserListState extends State<UserList> {
  List<User> _users = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchUsers();
  }

  Future<void> _fetchUsers() async {
    try {
      final response = await http.get(
        Uri.parse('https://jsonplaceholder.typicode.com/users'),
      );

      if (response.statusCode == 200) {
        List<dynamic> data = json.decode(response.body);
        setState(() {
          _users = data.map((json) => User.fromJson(json)).toList();
          _isLoading = false;
        });
      } else {
        throw Exception('Failed to load users');
      }
    } catch (e) {
      setState(() {
        _isLoading = false;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: ${e.toString()}')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('User Lis11111'),
      ),
      body: _isLoading
          ? Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: _users.length,
              itemBuilder: (context, index) {
                final user = _users[index];
                return ListTile(
                  title: Text(user.name),
                  subtitle: Text('ID: ${user.id}'),
                );
              },
            ),
    );
  }
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // Этот виджет является корнем вашего приложения.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // Это тема вашего приложения.
        //
        // ПОПРОБУЙТЕ ЭТО: Попробуйте запустить ваше приложение с помощью команды «flutter run». Вы увидите.
        // что у приложения появилась фиолетовая панель инструментов. Затем, не выходя из приложения,
        // попробуйте изменить seedColor в цветовой схеме ниже на Colors.green
        // и затем вызовите «горячую перезагрузку» (сохраните изменения или нажмите кнопку «горячая
        // перезагрузка» в IDE, поддерживающей Flutter, или нажмите „r“, если вы использовали
        // командную строку для запуска приложения).
        //
        // Заметьте, что счетчик не обнулился; состояние приложения
        // состояние не было потеряно во время перезагрузки. Чтобы сбросить состояние, используйте горячий
        // перезагрузку вместо этого.
        //
        // Это работает и для кода, а не только для значений: Большинство изменений кода можно
        // проверить с помощью горячей перезагрузки.
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.lightGreenAccent),
      ),
      home: UserList(),
    );
  }
}

