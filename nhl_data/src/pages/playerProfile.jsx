import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PlayerProfile() {
  const { playerId } = useParams();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/players/${playerId}`)
      .then(res => setPlayer(res.data))
      .catch(err => console.error(err));
  }, [playerId]);

  if (!player) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">{player.playerSlug}</h1>
      {player.headshot && (
        <img src={player.headshot} alt={player.playerSlug} className="w-32 h-32 rounded-full my-4" />
      )}
      <ul>
        <li>Position: {player.position}</li>
        <li>Team: {player.currentTeamAbbrev}</li>
        <li>Height: {player.heightInInches} in ({player.heightInCentimeters} cm)</li>
        <li>Weight: {player.weightInPounds} lbs ({player.weightInKilograms} kg)</li>
        <li>Birth Date: {player.birthDate}</li>
        <li>Birth Country: {player.birthCountry}</li>
        <li>Shoots/Catches: {player.shootsCatches}</li>
        <li>In HHOF: {player.inHHOF ? 'Yes' : 'No'}</li>
        <li>Top 100 All-Time: {player.inTop100AllTime ? 'Yes' : 'No'}</li>
      </ul>
    </div>
  );
}

export default PlayerProfile;
