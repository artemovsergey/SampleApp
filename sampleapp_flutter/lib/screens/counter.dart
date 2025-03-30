import 'package:flutter/material.dart';

class Counter extends StatefulWidget {
  const Counter({super.key});

  @override
  State<Counter> createState() => CounterState();
}

class CounterState extends State<Counter> {

  String text = 'Нажать';

  @override
  Widget build(BuildContext context) {
    return  
    
    Scaffold(body: ElevatedButton(onPressed: onPressed, child: Text(text)));
   
  }

  void onPressed() {
    setState(() {
          text = "Нажато12313131";
    });
  }

}