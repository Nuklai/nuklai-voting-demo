import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Card from './components/Card';
import Votes from './components/Votes';
import Footer from './components/footerWarning';
import { signAndGetBalance } from './utils/utils';

function AppContent() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVote = async (privateKey, selectedVote) => {
    setLoading(true);

    try {
      const result = await signAndGetBalance(privateKey, selectedVote);
      setResult(result);
      navigate("/votes");
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1422] flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4">
        <Routes>
          <Route 
            path="/" 
            element={
              <div className="w-full max-w-md">
                <h2 className="text-2xl font-bold mb-8 text-center text-white">Verify Your Nuklai Private Key To Vote</h2>
                <Card
                  onButtonClick={handleVote}
                  result={result}
                  loading={loading}
                />
              </div>
            } 
          />
          <Route path="/Votes" element={<Votes />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
          success: {
            iconTheme: {
              primary: "#10B981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
          },
        }}
      />
    </Router>
  );
}

export default App;