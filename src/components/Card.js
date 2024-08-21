import React from 'react';

function Card({ inputValue, onInputChange, onButtonClick, result, loading, onVoteChange, selectedVote }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-md mx-auto">
      {result ? (
        <div className="text-white">
          <p className="mb-2">Address: {result.address}</p>
          <p className="mb-2">Balance: {result.balance}</p>
          <p className="mb-2">Votes: {result.votes}</p>
          <p>Your selection: {selectedVote}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Enter your private key"
            value={inputValue}
            onChange={onInputChange}
            className="w-full p-2 mb-4 rounded text-black"
          />
          <div className="flex justify-center space-x-4 mb-4">
            {["yes", "no", "abstain"].map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  value={option}
                  checked={selectedVote === option}
                  onChange={onVoteChange}
                  className="mr-2"
                />
                <span className="capitalize text-white">{option}</span>
              </label>
            ))}
          </div>
          <button
            onClick={onButtonClick}
            className={`px-4 py-2 rounded ${
              loading || !selectedVote
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-beige text-black hover:bg-beige-dark"
            }`}
            disabled={loading || !selectedVote}
          >
            {loading ? "Processing..." : "Sign and Vote"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Card;