import { database } from '../services/firebase';
import { ref, push, get, child } from 'firebase/database';
import { getBalanceAndAddress } from '../services/nuklaiService';

export async function signAndGetBalance(privateKey, vote) {
  try {
    const { nuklaiAddress, balance } = await getBalanceAndAddress(privateKey);
    
    // Check if the user has already voted
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `outputs/${nuklaiAddress}`));

    if (snapshot.exists()) {
      throw new Error('You have already voted. Multiple votes are not allowed.');
    }

    // Calculate the number of votes
    const votes = Math.floor(balance / 0.2);

    if (votes < 1) {
      throw new Error('Votes are less than one. You need at least 0.2 amount to have 1 vote.');
    }

    const result = { address: nuklaiAddress, balance, votes, vote };

    // Store the output in Firebase Realtime Database
    const outputsRef = ref(database, `outputs/${nuklaiAddress}`);
    await push(outputsRef, {
      address: nuklaiAddress,
      balance: balance,
      votes: votes,
      vote: vote,
      timestamp: new Date().toISOString(),
    });

    return result;
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}