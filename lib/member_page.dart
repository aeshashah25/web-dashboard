import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';
import 'package:hive/hive.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class MemberPage extends StatefulWidget {
  final int orgIndex;
  final int teamIndex;
  MemberPage({required this.orgIndex, required this.teamIndex});

  @override
  _MemberPageState createState() => _MemberPageState();
}

class _MemberPageState extends State<MemberPage> {
  final _memberController = TextEditingController();
  final _orgBox = Hive.box('orgBox');
  List members = [];
  bool _isImageRequired = false; // To track if the image should be uploaded

  @override
  void initState() {
    super.initState();
    final teams = List.from(_orgBox.getAt(widget.orgIndex)['teams']);
    members = List.from(teams[widget.teamIndex]['members']);
  }

  // Function to add a member with or without an image
  void _addMember() async {
    if (_memberController.text.trim().isEmpty) {
      // Show validation error if name is empty
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Please enter a member name')));
      return;
    }

    if (_isImageRequired) {
      // If image is required, show image picker
      final picker = ImagePicker();
      final XFile? image = await picker.pickImage(source: ImageSource.gallery);

      if (image != null) {
        // If image is selected, add member with image
        members.add({
          'name': _memberController.text.trim(),
          'imagePath': image.path, // Store image path
        });
      } else {
        // If no image is selected, add member with no image
        members.add({
          'name': _memberController.text.trim(),
          'imagePath': '', // Empty path indicates no image
        });
      }
    } else {
      // If no image is required, add member without image
      members.add({
        'name': _memberController.text.trim(),
        'imagePath': '', // Empty path indicates no image
      });
    }

    // Save updated member list back to Hive
    final org = _orgBox.getAt(widget.orgIndex);
    final teams = List.from(org['teams']);
    teams[widget.teamIndex]['members'] = members;
    _orgBox.putAt(widget.orgIndex, {'name': org['name'], 'teams': teams});

    // Clear input field and refresh UI
    _memberController.clear();
    setState(() {});
  }

  // Function to delete a member
  void _deleteMember(int index) {
    setState(() {
      members.removeAt(index);
    });

    // Update the data in Hive after deleting
    final org = _orgBox.getAt(widget.orgIndex);
    final teams = List.from(org['teams']);
    teams[widget.teamIndex]['members'] = members;
    _orgBox.putAt(widget.orgIndex, {'name': org['name'], 'teams': teams});
  }

  // Function to sync the member list with the server
  Future<void> _syncWithServer() async {
    final org = _orgBox.getAt(widget.orgIndex);
    final team = org['teams'][widget.teamIndex];
    final membersData = team['members'];

    // Make a POST request to the API endpoint to sync members
    final response = await http.post(
      Uri.parse('http://localhost:5000/api/teams/${team['id']}/members'), // Replace with your API endpoint
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode({'members': membersData}),
    );

    if (response.statusCode == 200) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Members synced successfully')));
    } else {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Failed to sync members')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Members')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              controller: _memberController,
              decoration: InputDecoration(
                labelText: 'Member Name',
                suffixIcon: IconButton(
                  icon: Icon(Icons.add),
                  onPressed: _addMember,
                ),
              ),
            ),
          ),
          // Add option to choose if an image is required
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                Text('Add Image: '),
                Switch(
                  value: _isImageRequired,
                  onChanged: (bool value) {
                    setState(() {
                      _isImageRequired = value;
                    });
                  },
                ),
              ],
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: members.length,
              itemBuilder: (context, index) {
                final member = members[index];
                bool isImageUploaded = member['imagePath'].isNotEmpty;

                return ListTile(
                  leading: isImageUploaded
                      ? Image.file(File(member['imagePath']), width: 50, height: 50, fit: BoxFit.cover)
                      : Icon(Icons.account_circle, size: 50), // Default icon if no image
                  title: Row(
                    children: [
                      Text(member['name']),
                      SizedBox(width: 10),
                      // Dynamic status marker
                      Container(
                        padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: isImageUploaded ? Colors.green : Colors.red, // Green if image exists, red if not
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Text(
                          isImageUploaded ? "Image Uploaded" : "Image Not Uploaded",
                          style: TextStyle(color: Colors.white, fontSize: 12),
                        ),
                      ),
                    ],
                  ),
                  trailing: IconButton(
                    icon: Icon(Icons.delete, color: Colors.red),
                    onPressed: () => _deleteMember(index),
                  ),
                );
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: ElevatedButton(
              onPressed: _syncWithServer, // Sync with the server
              child: Text('Sync with Server'),
            ),
          ),
        ],
      ),
    );
  }
}
