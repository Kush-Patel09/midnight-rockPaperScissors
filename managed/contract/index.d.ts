import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
}

export type ImpureCircuits<PS> = {
  commit_p1(context: __compactRuntime.CircuitContext<PS>,
            commitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  play_p2(context: __compactRuntime.CircuitContext<PS>, choice_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  resolve_game(context: __compactRuntime.CircuitContext<PS>,
               p1_choice_0: bigint,
               salt_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type ProvableCircuits<PS> = {
  commit_p1(context: __compactRuntime.CircuitContext<PS>,
            commitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  play_p2(context: __compactRuntime.CircuitContext<PS>, choice_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  resolve_game(context: __compactRuntime.CircuitContext<PS>,
               p1_choice_0: bigint,
               salt_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type PureCircuits = {
}

export type Circuits<PS> = {
  commit_p1(context: __compactRuntime.CircuitContext<PS>,
            commitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  play_p2(context: __compactRuntime.CircuitContext<PS>, choice_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  resolve_game(context: __compactRuntime.CircuitContext<PS>,
               p1_choice_0: bigint,
               salt_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type Ledger = {
  readonly stage: bigint;
  readonly player1_commitment: Uint8Array;
  readonly player2_move: bigint;
  readonly winner: bigint;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
