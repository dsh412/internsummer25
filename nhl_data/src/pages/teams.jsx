import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../App.css";

function Teams() {
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState('');
  const [league, setLeague] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/teams')
      .then(res => setTeams(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredTeams = teams.filter(team => {
    const matchesSearch = Object.values(team)
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase());
    
    const matchesConference = league
        ? Number(team.leagueid) === parseInt(league)
        : true;
    
    return matchesSearch && matchesConference;
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
        <h1 className="directory-title">Team Directory</h1>

        {/* Filter controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search all fields..."
                className="flex-1 p-2 border rounded"
            />
            
            <select
                value={league}
                onChange={e => setLeague(e.target.value)}
                className="p-2 border rounded"
            >
                <option value="">All Leagues</option>
                <option value="133">NHL</option>
                <option value="1">Other</option>
            </select>
        </div>

        {/* Display Results */}
        <div className="grid gap-4">
            {filteredTeams.map((team) => (
                <div key={team.id} className="border rounded p-4 shadow hover:bg-gray-50">
                        <Link 
                            to={`/teams/${team.id}`} 
                            className="text-blue-600 font-semibold hover:underline"
                        >
                          {team.fullname}
                        </Link>
                </div>
            ))}

            {filteredTeams.length === 0 && (
                <div className="text-gray-500">No teams matched your criteria.</div>
            )}
        </div>
    </div>
  );
}

export default Teams;
