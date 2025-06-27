import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Players() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/players')
      .then(res => setPlayers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Players</h1>
      <ul className="space-y-2">
        {players.map(player => (
          <li key={player.player_id} className="p-2 border rounded shadow">
            {player.full_name} - {player.active}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Players;
