import 'package:flutter/material.dart';
import 'package:flutter_application_1/models/userModel.dart';
import 'package:flutter_application_1/services/user.dart';

class EditUserScreen extends StatefulWidget {
  final UserModel user;
  EditUserScreen({required this.user});

  @override
  _EditUserScreenState createState() => _EditUserScreenState();
}

class _EditUserScreenState extends State<EditUserScreen> {
  final _formKey = GlobalKey<FormState>();
  late TextEditingController _nameController;
  late TextEditingController _mailController;
  late TextEditingController _passwordController;
  late TextEditingController _commentController;

  @override
  void initState() {
    super.initState();
    _nameController = TextEditingController(text: widget.user.name);
    _mailController = TextEditingController(text: widget.user.mail);
    _passwordController = TextEditingController(text: widget.user.password);
    _commentController = TextEditingController(text: widget.user.comment);
  }

  Future<void> _submit() async {
    if (_formKey.currentState?.validate() ?? false) {
      final updatedUser = UserModel(
        name: _nameController.text,
        mail: _mailController.text,
        password: _passwordController.text,
        comment: _commentController.text,
      );

      final responseCode = await UserService().EditUser(updatedUser, widget.user.mail);
      if (responseCode == 201) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('User updated successfully!')));
      } else {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Failed to update user')));
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Edit User')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              TextFormField(
                controller: _nameController,
                decoration: InputDecoration(labelText: 'Name'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter a name';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _mailController,
                decoration: InputDecoration(labelText: 'Mail'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter a mail';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _passwordController,
                decoration: InputDecoration(labelText: 'Password'),
                obscureText: true,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter a password';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _commentController,
                decoration: InputDecoration(labelText: 'Comment'),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 16.0),
                child: ElevatedButton(
                  onPressed: _submit,
                  child: Text('Save Changes'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
