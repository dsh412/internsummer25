import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../App.css";

function Games() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState('');
  const [game_type, setGameType] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/games')
      .then(res => setGames(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredGames = games.filter(game => {
    const matchesSearch = Object.values(game)
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchesGameType = game_type
        ? game.game_type?.toLowerCase() === game_type.toLowerCase()
        : true;

    return matchesSearch && matchesGameType;
  })

  return (
    <div className="p-6 max-w-4xl mx-auto">
        <h1 className="directory-title">Game Directory</h1>
        
        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search all fields..."
                className="flex-1 p-2 border rounded"
            />

            <select
                value={game_type}
                onChange={e => setGameType(e.target.value)}
                className="p-2 border rounded"
            >
                <option value="">All Game Types</option>
                <option value="Regular">Regular Season</option>
                <option value="Playoffs">Playoffs</option>
            </select>
        </div>

        {/* Display Results */}
        <div className="grid gap-4">
            {filteredGames.map((game, idx) => (
                <div key={idx} className="border rounded p-4 shadow">
                    {Object.entries(game).map(([key, value]) => (
                        <div key={key}>
                            <strong>{key}:</strong> {value}
                        </div>
                    ))}
                </div>
            ))}

            {filteredGames.length === 0 && (
                <div className="text-gray-500">No games matched your criteria.</div>
            )}
        </div>
    </div>
  );
}

export default Games;
