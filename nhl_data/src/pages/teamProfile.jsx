import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function TeamProfile() {
  const { id } = useParams();
  const [team, setTeam] = useState([]);

  useEffect(() => {
    if (!id) {
        setError("No team ID provided in route");
        return;
    }
    axios
      .get(`http://localhost:5000/api/teams/${id}`)
      .then(res => setTeam(res.data))
      .catch(err => console.error(err));
    }, [id]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Image + Stats */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* <img
          src={player.headshot}
          alt={player.playerSlug}
          className="w-56 h-56 object-cover rounded-lg border shadow flex-shrink-0"
        /> */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-4">Team Info</h2>
          <div className="grid grid-cols-2 gap-y-2">
            <p><strong>Team ID:</strong> {team.id} </p>
            <p><strong>Franchise ID:</strong> {team.franchiseid} </p>
            <p><strong>Full Name:</strong> {team.fullname} </p>
            <p><strong>League ID:</strong> {team.leagueid} </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamProfile;