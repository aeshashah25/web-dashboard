import 'package:flutter/material.dart';
import 'package:hive/hive.dart';
import 'team_page.dart';

class OrganizationPage extends StatefulWidget {
  @override
  _OrganizationPageState createState() => _OrganizationPageState();
}

class _OrganizationPageState extends State<OrganizationPage> {
  final _orgController = TextEditingController();
  final _orgBox = Hive.box('orgBox');

  void _addOrganization() {
    final String orgName = _orgController.text.trim();
    if (orgName.isNotEmpty) {
      _orgBox.add({'name': orgName, 'teams': []});
      _orgController.clear();
      setState(() {});
    }
  }

  void _deleteOrganization(int index) {
    _orgBox.deleteAt(index);
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Organizations')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              controller: _orgController,
              decoration: InputDecoration(
                labelText: 'Organization Name',
                suffixIcon: IconButton(
                  icon: Icon(Icons.add),
                  onPressed: _addOrganization,
                ),
              ),
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: _orgBox.length,
              itemBuilder: (context, index) {
                final org = _orgBox.getAt(index);
                return ListTile(
                  title: Text(org['name']),
                  trailing: IconButton(
                    icon: Icon(Icons.delete),
                    onPressed: () => _deleteOrganization(index),
                  ),
                  onTap: () => Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => TeamPage(orgIndex: index),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
