import React, { useState, useEffect } from 'react';

const JSONView = () => {
  const [organizations, setOrganizations] = useState([]); // State for storing data

  // Fetch organizations data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/organizations'); // Fetch data
        const data = await response.json(); // Parse JSON response
        console.log('Fetched data:', data); // Log fetched data
        setOrganizations(data); // Update state with data
      } catch (error) {
        console.error('Error fetching organizations:', error); // Log error
      }
    };

    fetchData(); // Fetch data when component mounts
  }, []); // Empty dependency array ensures it runs once

  // Display the data in JSON format
  const jsonData = JSON.stringify(organizations, null, 2);

  return (
    <div className="json-view">
      <h2>Organizations Data in JSON Format</h2>
      <pre>{jsonData}</pre> {/* Preformatted block for JSON display */}
    </div>
  );
};

export default JSONView;
