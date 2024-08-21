import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { database } from "../services/firebase";
import { ref, onValue } from 'firebase/database';

function Votes() {
  const [voteData, setVoteData] = useState({ yes: 0, no: 0, abstain: 0 });
  const [voterList, setVoterList] = useState({ yes: [], no: [], abstain: [] });
  const [totalVotes, setTotalVotes] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const outputsRef = ref(database, "outputs");
    const unsubscribe = onValue(outputsRef, (snapshot) => {
      const data = snapshot.val();
      const newVoteData = { yes: 0, no: 0, abstain: 0 };
      const newVoterList = { yes: [], no: [], abstain: [] };
      let newTotalVotes = 0;

      if (data) {
        Object.keys(data).forEach((nuklaiAddress) => {
          const userVotes = data[nuklaiAddress];
          if (userVotes) {
            Object.values(userVotes).forEach((vote) => {
              newVoteData[vote.vote] += vote.votes;
              newVoterList[vote.vote].push({
                address: nuklaiAddress,
                votes: vote.votes,
                timestamp: vote.timestamp,
              });
              newTotalVotes += vote.votes;
            });
          }
        });
      }

      setVoteData(newVoteData);
      setVoterList(newVoterList);
      setTotalVotes(newTotalVotes);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const chartData = Object.keys(voteData).map((key) => ({
    name: key,
    value: voteData[key],
  }));

  const COLORS = ["#10B981", "#EF4444", "#F59E0B"];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-white">
        <h1 className="text-4xl font-bold mb-8">Vote Results</h1>
        <div className="bg-gray-800 rounded-lg shadow-lg p-8">
          <p className="text-xl">Loading votes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">
        Vote Results
      </h1>
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-white">
        {totalVotes > 0 ? (
          <>
            <div className="mb-12 h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) =>
                      `${name} ${((value / totalVotes) * 100).toFixed(1)}%`
                    }
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => (
                      <span className="text-lg capitalize">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {Object.entries(voterList).map(([voteType, voters]) => (
                <div key={voteType} className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-xl font-bold mb-4 capitalize">
                    {voteType} Votes
                  </h3>
                  <ul className="space-y-2">
                    {voters.map((voter, index) => (
                      <li key={index} className="text-sm">
                        <span className="font-mono">
                          {voter.address.slice(0, 10)}...
                          {voter.address.slice(-10)}
                        </span>
                        <span className="ml-2 text-gray-400">
                          ({voter.votes} votes)
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="text-center text-xl font-bold">
              Total Votes: {totalVotes}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-2xl font-bold mb-4">
              No votes have been recorded yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Votes;