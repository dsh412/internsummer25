import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PlayerProfile() {
  const { playerid } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/player/${playerid}`)
      .then((res) => {
        setPlayer(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [playerid]);

  if (loading) {
    return <div className="p-6 text-center">Loading player data...</div>;
  }

  if (!player) {
    return <div className="p-6 text-center">Player not found.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Hero Section */}
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
          <h1 className="text-3xl font-bold">{player.playerslug}</h1>
          <p className="text-lg">{player.currentteamAbbrev}</p>
        </div>
      </div>

      {/* Main Info Section */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Player Image */}
        <div className="flex-shrink-0">
          <img
            src={player.headshot}
            alt={player.playerid}
            className="w-48 h-48 object-cover rounded-lg border shadow"
          />
        </div>

        {/* Player Details */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-4">Player Info</h2>
          <div className="grid grid-cols-2 gap-y-2">
            <p><strong>Position:</strong> {player.position}</p>
            <p><strong>Number:</strong> {player.sweaterNumber}</p>
            <p><strong>Height:</strong> {player.heightInInches} in / {player.heightInCentimeters} cm</p>
            <p><strong>Weight:</strong> {player.weightInPounds} lbs / {player.weightInKilograms} kg</p>
            <p><strong>Birth Date:</strong> {player.birthDate}</p>
            <p><strong>Birth Country:</strong> {player.birthcountry}</p>
            <p><strong>Shoots/Catches:</strong> {player.shootscatches}</p>
            <p><strong>Active:</strong> {player.isactive ? "Yes" : "No"}</p>
            <p><strong>Top 100 All Time:</strong> {player.intop100alltime ? "Yes" : "No"}</p>
            <p><strong>Hall of Fame:</strong> {player.inhhof ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>

      {/* Team Logo */}
      <div className="mt-6 flex justify-center">
        <img
          src={player.teamLogo}
          alt={`${player.currentteamAbbrev} Logo`}
          className="w-24 h-24 object-contain"
        />
      </div>
    </div>
  );
}

export default PlayerProfile;
