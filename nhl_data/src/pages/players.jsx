import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // ✅ added
import "../App.css";

function Players() {
    const [players, setPlayers] = useState([]);
    const [search, setSearch] = useState('');
    const [primary_position, setPosition] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/players')
            .then(res => setPlayers(res.data))
            .catch(err => console.error(err));
    }, []);

    const filteredPlayers = players.filter(player => {
        const matchesSearch = Object.values(player)
            .join(' ')
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesPosition = primary_position
            ? player.position?.toLowerCase() === primary_position.toLowerCase()
            : true;

        return matchesSearch && matchesPosition;
    });

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="directory-title">Player Directory</h1>

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
                    value={primary_position}
                    onChange={e => setPosition(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="">All Positions</option>
                    <option value="R">Right Wing</option>
                    <option value="L">Left Wing</option>
                    <option value="C">Center</option>
                    <option value="D">Defense</option>
                    <option value="G">Goalie</option>
                </select>
            </div>

            {/* Display results */}
            <div className="grid gap-4">
                {filteredPlayers.map((player) => (
                    <div key={player.id} className="border rounded p-4 shadow hover:bg-gray-50">
                        <Link 
                            to={`/player/${player.id}`} 
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            {player.full_name || player.playerid}
                        </Link>
                        <div className="text-gray-700">
                            {player.position} — {player.currentteamabbrev}
                        </div>
                    </div>
                ))}

                {filteredPlayers.length === 0 && (
                    <div className="text-gray-500">No players match your criteria.</div>
                )}
            </div>
        </div>
    );
}

export default Players;
