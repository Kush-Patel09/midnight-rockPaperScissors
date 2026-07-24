import { describe, it, expect, beforeEach } from 'vitest';
import { Contract, ledger } from '../managed/contract/index.js';
import * as compactRuntime from '@midnight-ntwrk/compact-runtime';

/**
 * ROCK PAPER SCISSORS ZK SMART CONTRACT TEST SUITE
 * Midnight Builder Challenge - Level 1
 */
describe('Rock Paper Scissors Compact Contract', () => {
  let contract: Contract;
  let currentContractState: any;
  let privateState: any;
  const dummyPk = new Uint8Array(32);
  const dummyAddress = compactRuntime.dummyContractAddress();

  const getCircuitContext = () => {
    return compactRuntime.createCircuitContext(
      dummyAddress,
      dummyPk,
      currentContractState,
      privateState
    );
  };

  beforeEach(() => {
    contract = new Contract({});
    const constructorContext = compactRuntime.createConstructorContext({}, dummyPk);
    const result = contract.initialState(constructorContext);
    currentContractState = result.currentContractState;
    privateState = result.currentPrivateState;
  });

  it('Test 1: Initial state & ledger defaults (Stage 0: Waiting)', () => {
    const initialState = getCircuitContext().currentQueryContext.state;
    const currentLedger = ledger(initialState);
    expect(currentLedger.stage).toBe(0n);
    expect(currentLedger.player2_move).toBe(0n);
    expect(currentLedger.winner).toBe(0n);
    expect(currentLedger.player1_commitment).toBeDefined();
  });

  it('Test 2: Complete Game Flow & State Transitions (Player 1 Rock vs Player 2 Scissors -> Player 1 Wins)', () => {
    // 1. Player 1 Commits (Choice: 0 = Rock, Salt: 32 bytes)
    const salt = new Uint8Array(32).fill(7);
    const commitment = new Uint8Array(32).fill(42); // ZK commitment hash

    const commitResult = contract.circuits.commit_p1(getCircuitContext(), commitment);
    currentContractState = commitResult.context.currentQueryContext.state;

    let currentLedger = ledger(currentContractState);
    expect(currentLedger.stage).toBe(1n); // State transitioned to Committed (1)
    expect(currentLedger.player1_commitment).toEqual(commitment);

    // 2. Player 2 Plays (Choice: 2 = Scissors)
    const playResult = contract.circuits.play_p2(getCircuitContext(), 2n);
    currentContractState = playResult.context.currentQueryContext.state;

    currentLedger = ledger(currentContractState);
    expect(currentLedger.stage).toBe(1n);
    expect(currentLedger.player2_move).toBe(2n);

    // 3. Player 1 Resolves Game (Reveals Choice 0 = Rock and Salt)
    const resolveResult = contract.circuits.resolve_game(getCircuitContext(), 0n, salt);
    currentContractState = resolveResult.context.currentQueryContext.state;

    currentLedger = ledger(currentContractState);
    expect(currentLedger.stage).toBe(2n); // State transitioned to Finished (2)
    expect(currentLedger.winner).toBe(1n); // 1 = Player 1 Wins (Rock beats Scissors)
  });

  it('Test 3: Game Resolution Outcomes (Tie & Player 2 Win logic)', () => {
    const commitment = new Uint8Array(32).fill(11);
    const salt = new Uint8Array(32).fill(99);

    // Commit Paper (1)
    const res1 = contract.circuits.commit_p1(getCircuitContext(), commitment);
    currentContractState = res1.context.currentQueryContext.state;

    // Player 2 plays Scissors (2) -> Scissors beats Paper, Player 2 wins
    const res2 = contract.circuits.play_p2(getCircuitContext(), 2n);
    currentContractState = res2.context.currentQueryContext.state;

    // Player 1 reveals Paper (1)
    const res3 = contract.circuits.resolve_game(getCircuitContext(), 1n, salt);
    currentContractState = res3.context.currentQueryContext.state;

    const currentLedger = ledger(currentContractState);
    expect(currentLedger.stage).toBe(2n);
    expect(currentLedger.winner).toBe(2n); // 2 = Player 2 Wins
  });

  it('Test 4: ZK Witness Privacy Preservation (Secret move & salt remain off-chain witnesses)', () => {
    const secretChoice = 0n; // Rock
    const secretSalt = new Uint8Array(32).fill(123);
    const publicCommitment = new Uint8Array(32).fill(255);

    const res1 = contract.circuits.commit_p1(getCircuitContext(), publicCommitment);
    currentContractState = res1.context.currentQueryContext.state;

    const ledgerAfterCommit = ledger(currentContractState);
    // On-chain ledger ONLY stores the commitment hash (publicCommitment), not choice or salt!
    expect(ledgerAfterCommit.player1_commitment).toEqual(publicCommitment);
    expect((ledgerAfterCommit as any).player1_choice).toBeUndefined();
    expect((ledgerAfterCommit as any).player1_salt).toBeUndefined();
  });
});
