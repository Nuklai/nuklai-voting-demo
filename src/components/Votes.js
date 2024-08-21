import React, { useState, useEffect } from 'react';
import { database } from '../services/firebase';
import { ref, onValue } from 'firebase/database';
import VotersList from './VotersList';

function Votes() {
  const [outputs, setOutputs] = useState([]);

  useEffect(() => {
    const outputsRef = ref(database, 'outputs');
    onValue(outputsRef, (snapshot) => {
      const data = snapshot.val();
      const outputsArray = [];

      if (data) {
        Object.keys(data).forEach((nuklaiAddress) => {
          const userVotes = data[nuklaiAddress];
          if (userVotes) {
            Object.values(userVotes).forEach((vote) => {
              outputsArray.push({ ...vote, nuklaiAddress });
            });
          }
        });
      }

      setOutputs(outputsArray);
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">Voters List</h1>
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
        <VotersList outputs={outputs} />
      </div>
    </div>
  );
}

export default Votes;