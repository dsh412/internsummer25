import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function GameProfile() {
  const { id } = useParams();
  const [game, setGame] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/games/${id}`)
      .then(res => setGame(res.data))
      .catch(err => console.error(err));      
    }, [id]);
  
  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Image + Stats */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-1 bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-4">Player Info</h2>
          <div className="grid grid-cols-2 gap-y-2">
            <p><strong>Game ID:</strong> {game.id}</p>
            <p><strong>Eastern Start Time:</strong> {game.easternstarttime}</p>
            <p><strong>Game Date:</strong> {game.gamedate}</p>
            <p><strong>Game Number:</strong> {game.gamenumber}</p>
            <p><strong>Game Schedule State ID:</strong> {game.gameschedulestateid}</p>
            <p><strong>Game State ID:</strong> {game.gamestateid}</p>
            <p><strong>Game Type:</strong> {game.gametype}</p>
            <p><strong>Home Team ID:</strong> {game.hometeamid}</p>
            <p><strong>Visiting Team ID:</strong> {game.visitingteamid}</p>
            <p><strong>Score:</strong> {game.homescore} to {game.visitingscore}</p>
            <p><strong>Period:</strong> {game.period}</p>
            <p><strong>Season:</strong> {game.season}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameProfile;
