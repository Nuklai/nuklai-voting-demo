import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { getBalanceAndAddress } from '../services/nuklaiService';

function Card({ onButtonClick, result, loading }) {
  const [inputValue, setInputValue] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [selectedVote, setSelectedVote] = useState('');
  const [verifying, setVerifying] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleVoteChange = (option) => {
    setSelectedVote(option);
  };

  const handleVerify = async () => {
    if (inputValue.trim() === '') {
      toast.error('Please enter a valid private key from your Nuklai Wallet.');
      return;
    }

    setVerifying(true);
    try {
      const { nuklaiAddress, balance } = await getBalanceAndAddress(inputValue);
      const votingPower = Math.floor(balance / 0.2);
      setUserInfo({ address: nuklaiAddress, balance, votingPower });
      toast.success('Private key verified successfully!');
    } catch (error) {
      toast.error('Failed to verify private key');
    } finally {
      setVerifying(false);
    }
  };

  const handleSubmit = () => {
    if (!selectedVote) {
      toast.error('Please choose an option');
      return;
    }

    onButtonClick(inputValue, selectedVote);
  };

  const voteOptions = [
    { name: "Yes", color: "bg-green-400" },
    { name: "No", color: "bg-red-500" },
    { name: "Abstain", color: "bg-gray-700" },
  ];  

  return (
    <div className="bg-gray-800 rounded-md shadow-lg p-6 md:p-8 w-full max-w-md">
      {userInfo && (
        <div className="text-white">
          <h2 className="text-3xl font-bold mb-6">Cast Your Vote</h2>
          <p className="mb-2 break-all">Address: {userInfo.address}</p>
          <p className="mb-2">Balance: {userInfo.balance} NAI</p>
          <p className="mb-6">Voting Power: {userInfo.votingPower}</p>
          <div className="flex justify-between mb-8">
            {voteOptions.map((option) => (
              <button
                key={option.name}
                onClick={() => handleVoteChange(option.name.toLowerCase())}
                className={`py-3 px-6 rounded-full text-white font-semibold transition duration-300 ${
                  selectedVote === option.name.toLowerCase()
                    ? `${option.color} ring-2 ring-white`
                    : option.color
                }`}
              >
                {option.name}
              </button>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-lg text-white font-semibold transition duration-300"
            style={{
              backgroundColor: loading || !selectedVote ? "#132133" : "#132133",
              cursor: loading || !selectedVote ? "not-allowed" : "pointer",
            }}
            disabled={loading || !selectedVote}
          >
            {loading ? "Processing..." : "Cast Vote"}
          </button>
        </div>
      )}
      {!userInfo && (
        <div className="flex flex-col items-center">
          <input
            type="password"
            placeholder="Your Nuklai private key"
            value={inputValue}
            onChange={handleInputChange}
            className="w-full p-3 mb-6 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
          <button
            onClick={handleVerify}
            className="w-full py-3 rounded-lg text-white font-semibold transition duration-300"
            style={{
              backgroundColor: verifying ? "#132133" : "#132133",
              cursor: verifying ? "not-allowed" : "pointer",
            }}
            disabled={verifying}
          >
            {verifying ? "Verifying..." : "Verify Private Key"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Card;