import React from 'react';
import './Hierarchy.css';

const Hierarchy = ({ organizations }) => {
  return (
    <div className="hierarchy">
      <h2>Organization Hierarchy</h2>
      {organizations.length === 0 ? (
        <p>No organizations found.</p>
      ) : (
        organizations.map((org) => (
          <div key={org.id}>
            <h3>{org.name}</h3>
            <div className="teams">
              {org.teams.map((team) => (
                <div key={team.id} className="team">
                  <h4>{team.name}</h4>
                  <ul>
                    {team.members.map((member) => (
                      <li key={member.id} className="team-member">
                        {/* Status marker before the name */}
                        <div className="profile-info">
                          <span
                            className={`status ${member.image ? 'green' : 'red'}`}
                          ></span>
                          {member.name} (ID: {member.id})
                          {member.image && (
                            <img
                              src={member.image}
                              alt={`${member.name}'s profile`}
                              className="profile-image"
                            />
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Hierarchy;
