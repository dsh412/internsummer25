import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Games() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/games')
      .then(res => setGames(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Games</h1>
      <ul className="space-y-2">
        {games.map(game => (
          <li key={game.game_id} className="p-2 border rounded shadow">
            {game.season} - {game.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Games;
