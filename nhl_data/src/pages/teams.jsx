import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/teams')
      .then(res => setTeams(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Teams</h1>
      <ul className="space-y-2">
        {teams.map(team => (
          <li key={team.team_id} className="p-2 border rounded shadow">
            {team.name} - {team.division}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Teams;
