import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Card from './components/Card';
import OutputsPage from './components/Votes';
import { signAndGetBalance } from './utils/voteUtils';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedVote, setSelectedVote] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleVoteChange = (event) => {
    setSelectedVote(event.target.value);
  };

  const handleButtonClick = async () => {
    if (inputValue.trim() === '') {
      alert('Please enter a valid private key');
      return;
    }

    if (!selectedVote) {
      alert('Please select a voting option');
      return;
    }

    setLoading(true);

    try {
      const result = await signAndGetBalance(inputValue, selectedVote);
      setResult(result);
    } catch (error) {
      console.error('An error occurred:', error);
      alert(error.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 mt-20 pt-4">
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <h1 className="text-4xl font-bold mb-8 text-center text-white">Sign and Vote</h1>
                  <Card
                    inputValue={inputValue}
                    onInputChange={handleInputChange}
                    onButtonClick={handleButtonClick}
                    result={result}
                    loading={loading}
                    onVoteChange={handleVoteChange}
                    selectedVote={selectedVote}
                  />
                </>
              } 
            />
            <Route path="/outputs" element={<OutputsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;