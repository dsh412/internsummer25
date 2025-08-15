import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PlayerProfile() {
  const { playerid } = useParams();
  const [player, setPlayer] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/players/${playerid}`)
      .then(res => setPlayer(res.data))
      .catch(err => console.error(err));      
    }, [playerid]);
  
  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Hero Banner */}
      <div
        className="rounded-xl overflow-hidden shadow-lg mb-6"
        style={{
          backgroundImage: `url(${player.heroimage || player.teamlogo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "250px",
          position: "relative",
        }}
      >
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-4 py-2 rounded">
          <h1 className="text-3xl font-bold">{player.playerSlug}</h1>
          <p className="text-lg">{player.currentTeamAbbrev}</p>
        </div>
      </div>
      {/* Image + Stats */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <img
          src={player.headshot}
          alt={player.playerSlug}
          className="w-56 h-56 object-cover rounded-lg border shadow flex-shrink-0"
        />
        <div className="flex-1 bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-4">Player Info</h2>
          <div className="grid grid-cols-2 gap-y-2">
            <p><strong>Player ID:</strong> {player.playerid}</p>
            <p><strong>Active:</strong> {player.isactive ? "Yes" : "No"}</p>
            <p><strong>Team ID:</strong> {player.currentteamid}</p>
            <p><strong>Team Abbrev:</strong> {player.currentteamabbrev}</p>
            <p><strong>Sweater Number:</strong> {player.sweaternumber}</p>
            <p><strong>Position:</strong> {player.position}</p>
            <p><strong>Height:</strong> {player.heightininches} in / {player.heightincentimeters} cm</p>
            <p><strong>Weight:</strong> {player.weightinpounds} lbs / {player.weightinkilograms} kg</p>
            <p><strong>Birth Date:</strong> {player.birthdate}</p>
            <p><strong>Birth Country:</strong> {player.birthcountry}</p>
            <p><strong>Shoots/Catches:</strong> {player.shootscatches}</p>
            <p><strong>Top 100 All Time:</strong> {player.intop100alltime ? "Yes" : "No"}</p>
            <p><strong>Hall of Fame:</strong> {player.inhhof ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>
      {/* Team Logo */}
      <div className="mt-6 flex justify-center">
        <img
          src={player.teamlogo}
          alt={`${player.currentteamabbrev} Logo`}
          className="w-24 h-24 object-contain"
        />
      </div>
    </div>
  );
}

export default PlayerProfile;
