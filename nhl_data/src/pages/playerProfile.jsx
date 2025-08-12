import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PlayerProfile() {
    const { id } = useParams();
    const [player, setPlayer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/player/${id}`)
            .then(res => {
                setPlayer(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="p-6">Loading...</div>;
    if (!player) return <div className="p-6">Player not found.</div>;

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{player.full_name || player.playerid}</h1>
            {player.headshot && (
                <img src={player.headshot} alt={player.full_name} className="mb-4 rounded shadow" />
            )}
            <p><strong>Position:</strong> {player.position}</p>
            <p><strong>Team:</strong> {player.currentteamabbrev}</p>
            <p><strong>Height:</strong> {player.heightininches} in / {player.heightincentimeters} cm</p>
            <p><strong>Weight:</strong> {player.weightinpounds} lbs / {player.weightinkilograms} kg</p>
            <p><strong>Birth Date:</strong> {player.birthdate}</p>
            <p><strong>Birth Country:</strong> {player.birthcountry}</p>
            <p><strong>Shoots/Catches:</strong> {player.shootscatches}</p>
        </div>
    );
}

export default PlayerProfile;
