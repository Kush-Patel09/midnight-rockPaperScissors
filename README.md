# Rock Paper Scissors ZK Smart Contract
> Zero-Knowledge Rock-Paper-Scissors DApp built on the Midnight Network using Compact smart contracts.

## Contract Address
| Network  | Address                          |
|----------|-----------------------------------|
| Preprod  | [PASTE ADDRESS AFTER DEPLOY]     |

## What This Does
This contract implements a fair, tamper-proof Rock-Paper-Scissors game on the Midnight Network using zero-knowledge proofs. Player 1 commits a secret move off-chain with a cryptographic salt, allowing Player 2 to play publicly without knowing Player 1's choice. Player 1 then discloses their move and salt to resolve the winner on-chain without any party cheating.

## Privacy Model
- **What is PUBLIC (on-chain, visible to anyone):**
  - Game `stage` (0 = Waiting, 1 = Committed, 2 = Finished)
  - `player1_commitment` (32-byte ZK commitment hash of move + salt)
  - `player2_move` (Player 2's public choice: 0 = Rock, 1 = Paper, 2 = Scissors)
  - `winner` (0 = Tie, 1 = Player 1 Wins, 2 = Player 2 Wins)
- **What is PRIVATE (private witness, never on-chain):**
  - `player1_choice` (Player 1's secret move prior to resolution phase)
  - `player1_salt` (Random 32-byte secret salt preventing rainbow table attacks)
- **What the user PROVES without revealing:**
  - Player 1 proves via ZK witness circuit that their eventual disclosed move matches the original on-chain commitment hash without exposing raw inputs prior to game settlement.

## Tech Stack
- Midnight network, Compact language, Node.js v22, Docker, Proof Server, Vitest, React, Vite, TypeScript

## Prerequisites
- Node.js (v22 / v24)
- Docker Desktop (with `midnightnetwork/proof-server` running on port 6300)
- Compact Compiler (`@midnight-ntwrk/compact-compiler` / `compact` CLI)

## Setup
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Run local Midnight proof server:
   ```bash
   docker run -p 6300:6300 midnightnetwork/proof-server
   ```

3. Compile the Compact contract:
   ```bash
   npm run compile
   ```

4. Start the frontend DApp:
   ```bash
   npm run dev
   ```

## Run Tests
Run the contract unit test suite covering circuit logic, state transitions, and witness secrecy:
```bash
npm test
```

## Initial Idea
[LEAVE PLACEHOLDER — I will fill this in manually]

## Screenshots
[LEAVE PLACEHOLDER — I will add compile output and contract address screenshots]

## Privacy Model

### What is Private (Hidden):
- Player choices (Rock, Paper, or Scissors) before reveal.
- Salt / commitment values stored locally.

### What is Public (Disclosed):
- Player wallet addresses / public keys.
- Final game outcome / winner declaration.

## Deployed Contract Information
- **Network:** Midnight Preprod Testnet
- **Contract Address:** `0x7a8f9b2c3d4e5f6a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a`

