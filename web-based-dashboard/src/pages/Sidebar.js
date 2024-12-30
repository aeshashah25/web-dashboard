import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3 className="menu-title">DashBoard</h3>
      <ul>
        <li>
          <Link to="/add-organization" className="menu-item">
            <span className="icon">🏢</span> Add Organization
          </Link>
        </li>
        <li>
          <Link to="/add-team" className="menu-item">
            <span className="icon">👥</span> Add Team
          </Link>
        </li>
        <li>
          <Link to="/add-member" className="menu-item">
            <span className="icon">🙋</span> Add Member
          </Link>
        </li>
        <li>
          <Link to="/hierarchy" className="menu-item">
            <span className="icon">📊</span> View Hierarchy
          </Link>
        </li>
        <li>
          <Link to="/json-view" className="menu-item">
            <span className="icon">📄</span> View JSON Data
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
