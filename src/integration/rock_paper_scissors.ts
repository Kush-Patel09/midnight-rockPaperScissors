/**
 * Midnight Network Integration Wiring for Rock-Paper-Scissors ZK Contract
 */

import { Contract, ledger, Ledger } from '../../managed/contract/index.js';

// MANDATORY PLACEHOLDER - TO BE BACKFILLED AFTER STEP 7 DEPLOYMENT
export const CONTRACT_ADDRESS = "TBD";

export const PROOF_SERVER_URL = "http://localhost:6300";
export const NETWORK_ID = "preprod";

export interface GameState {
  stage: number; // 0: Waiting, 1: Player1 Committed, 2: Finished
  player1Commitment: string;
  player2Move: number; // 0: Rock, 1: Paper, 2: Scissors
  winner: number; // 0: Tie, 1: Player 1, 2: Player 2
}

export const CHOICE_NAMES: Record<number, string> = {
  0: '🪨 Rock',
  1: '📄 Paper',
  2: '✂️ Scissors',
};

export const WINNER_NAMES: Record<number, string> = {
  0: '🤝 It\'s a Tie!',
  1: '🏆 Player 1 Wins (ZK Commit Master)!',
  2: '🎉 Player 2 Wins!',
};

/**
 * Creates secret ZK commitment hash for Player 1 move using choice + salt
 */
export function generateCommitment(choice: number, saltHex: string): Uint8Array {
  const encoder = new TextEncoder();
  const data = encoder.encode(`rps:${choice}:${saltHex}`);
  // Return 32 byte mock ZK commitment hash
  const hash = new Uint8Array(32);
  for (let i = 0; i < data.length; i++) {
    hash[i % 32] ^= data[i];
  }
  return hash;
}

/**
 * Converts 32-byte Uint8Array to Hex string for display
 */
export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Format ledger state for UI display
 */
export function parseLedgerState(ledgerData: Ledger): GameState {
  return {
    stage: Number(ledgerData.stage),
    player1Commitment: bytesToHex(ledgerData.player1_commitment),
    player2Move: Number(ledgerData.player2_move),
    winner: Number(ledgerData.winner),
  };
}
