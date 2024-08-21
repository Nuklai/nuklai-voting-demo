import React from 'react';

function VotersList({ outputs }) {
  return (
    <ul className="space-y-4">
      {outputs.length > 0 ? (
        outputs.map((output, index) => (
          <li key={index} className="bg-gray-700 p-4 rounded">
            <strong className="block mb-1">Address:</strong>{" "}
            {output.nuklaiAddress}
            <strong className="block mb-1">Votes:</strong> {output.votes}
            <strong className="block mb-1">Vote:</strong> {output.vote}
            <strong className="block">Timestamp:</strong>{" "}
            {new Date(output.timestamp).toLocaleString()}
          </li>
        ))
      ) : (
        <li className="text-center">No outputs found.</li>
      )}
    </ul>
  );
}

export default VotersList;