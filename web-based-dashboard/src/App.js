// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddOrganization from './pages/AddOrganization';
import AddTeam from './pages/AddTeam';
import AddMember from './pages/AddMember';
import Hierarchy from './pages/Hierarchy';
import Sidebar from './pages/Sidebar';
import JSONView from './pages/JSONView';  // Import JSONView component
import './App.css';

function App() {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    // Fetch organizations data from the backend when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/organizations');
        const data = await response.json();
        console.log('Fetched data:', data); // Log the fetched data to see if it's correct

        setOrganizations(data);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchData();
  }, []); // Run this only once when the component mounts

  const addOrganization = (name, email, location) => {
    const newOrg = { id: Date.now(), name, email, location, teams: [] };
    setOrganizations([...organizations, newOrg]);
    sendDataToBackend([...organizations, newOrg]); // Send data to backend
  };

  const addTeam = (orgId, teamName) => {
    const updatedOrganizations = organizations.map((org) => {
      if (org.id === orgId) {
        return {
          ...org,
          teams: [...org.teams, { id: Date.now(), name: teamName, members: [] }],
        };
      }
      return org;
    });
    setOrganizations(updatedOrganizations);
    sendDataToBackend(updatedOrganizations); // Send updated data to backend
  };

  const addMember = (orgId, teamId, memberName, memberId, image) => {
    const updatedOrganizations = organizations.map((org) => {
      if (org.id === orgId) {
        const updatedTeams = org.teams.map((team) => {
          if (team.id === teamId) {
            return {
              ...team,
              members: [
                ...team.members,
                { id: memberId, name: memberName, image: image || null },
              ],
            };
          }
          return team;
        });
        return { ...org, teams: updatedTeams };
      }
      return org;
    });
    setOrganizations(updatedOrganizations);
    sendDataToBackend(updatedOrganizations); // Send updated data to backend
  };

  const sendDataToBackend = async (organizations) => {
    try {
      const response = await fetch('http://localhost:5000/api/organizations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(organizations), // Send the organizations data as JSON
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message); // Log success message from backend
      } else {
        console.error('Failed to update data');
      }
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/add-organization" element={<AddOrganization addOrganization={addOrganization} />} />
            <Route path="/add-team" element={<AddTeam organizations={organizations} addTeam={addTeam} />} />
            <Route path="/add-member" element={<AddMember organizations={organizations} addMember={addMember} />} />
            <Route path="/hierarchy" element={<Hierarchy organizations={organizations} />} />
            <Route path="/json-view" element={<JSONView organizations={organizations} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
