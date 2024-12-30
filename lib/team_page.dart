import 'package:flutter/material.dart';
import 'member_page.dart';
import 'package:hive/hive.dart';

class TeamPage extends StatefulWidget {
  final int orgIndex;
  TeamPage({required this.orgIndex});

  @override
  _TeamPageState createState() => _TeamPageState();
}

class _TeamPageState extends State<TeamPage> {
  final _teamController = TextEditingController();
  final _orgBox = Hive.box('orgBox');
  List teams = [];

  @override
  void initState() {
    super.initState();
    teams = List.from(_orgBox.getAt(widget.orgIndex)['teams']);
  }

  void _addTeam() {
    final String teamName = _teamController.text.trim();
    if (teamName.isNotEmpty) {
      teams.add({'name': teamName, 'members': []});
      _orgBox.putAt(widget.orgIndex, {'name': _orgBox.getAt(widget.orgIndex)['name'], 'teams': teams});
      _teamController.clear();
      setState(() {});
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Teams')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              controller: _teamController,
              decoration: InputDecoration(
                labelText: 'Team Name',
                suffixIcon: IconButton(
                  icon: Icon(Icons.add),
                  onPressed: _addTeam,
                ),
              ),
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: teams.length,
              itemBuilder: (context, teamIndex) {
                final team = teams[teamIndex];
                return ListTile(
                  title: Text(team['name']),
                  onTap: () => Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => MemberPage(orgIndex: widget.orgIndex, teamIndex: teamIndex),
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