# Nuklai Voting dApp

A decentralized voting dApp running on the Nuklai blockchain built with React + Firebase, thanks to @nuklai-js-sdk & @hyperchain-js-sdk.  

## Tech Stack

- ReactJS
- Tailwind
- Firebase Realtime Database
- Nuklai SDK
- HyperchainSDK

## Setup

1. Clone the repository
2. Install dependencies:

```bash
   npm install
```

3. Set up Firebase:

   - Create a Firebase project
   - Add your Firebase config to `src/services/firebase.js`
4. Set up Nuklai SDK:

   - Make sure you have the correct NuklaiVM credentials in `src/services/nuklaiService.js`

## Running the App

```bash
npm start
```

## Building for Production

```bash
npm run build
```

## Key Components

- `App.js`: Main component.
- `Card.js`: Voting interface.
- `Votes.js`: Displays voting results.
- `firebase.js`: Firebase config.
- `nuklaiService.js`: Initializing the Nuklai SDK and balance related logic.
- `utils.js`: Utility functions for vote processing via the NuklaiVM, Firebase storage logic.

## Key Functions

- `getBalanceAndAddress`: Retrieves the user's Nuklai address and balance from the NuklaiVM
- `signAndGetBalance`: Processes the vote and updates Firebase.

### Ext Libs

- `recharts`: For the pie-chart.
- `react-hot-toast`: For notifications.

## Notes

> This dApp is for demo purposes only. All votes are via the NuklaiVM Testnet.
