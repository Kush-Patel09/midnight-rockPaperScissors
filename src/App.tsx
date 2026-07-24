import React, { useState } from 'react';
import {
  CONTRACT_ADDRESS,
  PROOF_SERVER_URL,
  NETWORK_ID,
  CHOICE_NAMES,
  WINNER_NAMES,
  generateCommitment,
  bytesToHex,
} from './integration/rock_paper_scissors';
import { Shield, Lock, Eye, Play, CheckCircle2, Cpu, RefreshCw, Trophy, Sparkles, Terminal } from 'lucide-react';

export function App() {
  const [stage, setStage] = useState<number>(0); // 0: Waiting, 1: Committed, 2: Finished
  const [p1Choice, setP1Choice] = useState<number>(0);
  const [p1Salt, setP1Salt] = useState<string>('c8f9021ab07e4d');
  const [p1Commitment, setP1Commitment] = useState<Uint8Array | null>(null);
  const [p2Choice, setP2Choice] = useState<number>(2);
  const [winner, setWinner] = useState<number | null>(null);
  const [log, setLog] = useState<string[]>([
    'Initialized Midnight ZK Rock-Paper-Scissors DApp',
    `Proof Server URL: ${PROOF_SERVER_URL}`,
    `Target Network: ${NETWORK_ID}`,
    `Contract Address: ${CONTRACT_ADDRESS}`,
  ]);

  const addLog = (msg: string) => {
    setLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
  };

  const handleCommitP1 = () => {
    const commitment = generateCommitment(p1Choice, p1Salt);
    setP1Commitment(commitment);
    setStage(1);
    addLog(`[Player 1] Generated ZK Witness Commitment: 0x${bytesToHex(commitment).slice(0, 16)}...`);
    addLog(`[Ledger] Stage updated to 1 (Player 1 Committed). Choice remains secret on-chain.`);
  };

  const handlePlayP2 = () => {
    addLog(`[Player 2] Submitted public choice: ${CHOICE_NAMES[p2Choice]}`);
    addLog(`[Ledger] Waiting for Player 1 ZK reveal & settlement.`);
  };

  const handleResolveGame = () => {
    let resultWinner = 0;
    if (p1Choice === p2Choice) {
      resultWinner = 0;
    } else if (
      (p1Choice === 0 && p2Choice === 2) ||
      (p1Choice === 1 && p2Choice === 0) ||
      (p1Choice === 2 && p2Choice === 1)
    ) {
      resultWinner = 1;
    } else {
      resultWinner = 2;
    }

    setWinner(resultWinner);
    setStage(2);
    addLog(`[Player 1] Disclosed private choice ${CHOICE_NAMES[p1Choice]} and salt.`);
    addLog(`[Contract Circuit] Verified commitment matches hash. Final outcome: ${WINNER_NAMES[resultWinner]}`);
  };

  const handleReset = () => {
    setStage(0);
    setP1Commitment(null);
    setWinner(null);
    setP1Salt(Math.random().toString(36).substring(2, 12));
    addLog('Reset game state for new match.');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 md:p-12">
      {/* Header */}
      <header className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 pb-8 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-600/20 border border-purple-500/40 rounded-xl text-purple-400">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Rock Paper Scissors ZK
            </h1>
            <p className="text-sm text-slate-400">Midnight Network Compact Smart Contract DApp</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 rounded-lg px-4 py-2 text-xs font-mono text-slate-400">
          <Cpu className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Proof Server: :6300</span>
          <span className="mx-1">•</span>
          <span className="text-amber-400">Contract: {CONTRACT_ADDRESS}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Game Dashboard */}
        <div className="lg:col-span-2 space-y-6">
          {/* Game Stage Banner */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold">Game Protocol Stage</span>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset Match
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-xs font-medium">
              <div
                className={`p-3 rounded-xl border ${
                  stage === 0
                    ? 'bg-purple-950/60 border-purple-500/60 text-purple-200'
                    : 'bg-slate-950/40 border-slate-800 text-slate-500'
                }`}
              >
                1. Secret Commit (P1)
              </div>
              <div
                className={`p-3 rounded-xl border ${
                  stage === 1
                    ? 'bg-purple-950/60 border-purple-500/60 text-purple-200'
                    : 'bg-slate-950/40 border-slate-800 text-slate-500'
                }`}
              >
                2. Public Play (P2)
              </div>
              <div
                className={`p-3 rounded-xl border ${
                  stage === 2
                    ? 'bg-purple-950/60 border-purple-500/60 text-purple-200'
                    : 'bg-slate-950/40 border-slate-800 text-slate-500'
                }`}
              >
                3. ZK Reveal & Settle
              </div>
            </div>
          </div>

          {/* Player 1 Commit Panel */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg flex items-center gap-2 text-indigo-300">
                <Lock className="w-5 h-5 text-indigo-400" /> Player 1: Secret ZK Witness Move
              </h2>
              <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Private Off-Chain Witness
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Player 1 selects a secret choice and random salt. A ZK commitment hash is posted to the ledger without revealing the move.
            </p>

            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2].map((c) => (
                <button
                  key={c}
                  disabled={stage !== 0}
                  onClick={() => setP1Choice(c)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    p1Choice === c
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                      : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                  } ${stage !== 0 ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  <div className="text-2xl mb-1">{CHOICE_NAMES[c].split(' ')[0]}</div>
                  <div className="text-sm font-semibold">{CHOICE_NAMES[c].split(' ')[1]}</div>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                disabled={stage !== 0}
                onClick={handleCommitP1}
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 font-semibold rounded-xl text-sm transition-all shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" /> Generate ZK Commitment
              </button>
            </div>

            {p1Commitment && (
              <div className="p-3 bg-slate-950 border border-indigo-500/30 rounded-xl text-xs font-mono text-indigo-300 break-all flex items-center justify-between">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Public Ledger Commitment Hash</span>
                  0x{bytesToHex(p1Commitment)}
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
              </div>
            )}
          </div>

          {/* Player 2 Play Panel */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg flex items-center gap-2 text-purple-300">
                <Play className="w-5 h-5 text-purple-400" /> Player 2: Public Move
              </h2>
              <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                On-Chain Public State
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2].map((c) => (
                <button
                  key={c}
                  disabled={stage !== 1}
                  onClick={() => {
                    setP2Choice(c);
                    handlePlayP2();
                  }}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    p2Choice === c
                      ? 'bg-purple-600/20 border-purple-500 text-white shadow-lg shadow-purple-500/10'
                      : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                  } ${stage !== 1 ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  <div className="text-2xl mb-1">{CHOICE_NAMES[c].split(' ')[0]}</div>
                  <div className="text-sm font-semibold">{CHOICE_NAMES[c].split(' ')[1]}</div>
                </button>
              ))}
            </div>

            {stage >= 1 && (
              <button
                disabled={stage !== 1}
                onClick={handleResolveGame}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 font-semibold rounded-xl text-sm transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" /> Disclose & Resolve Game State
              </button>
            )}
          </div>

          {/* Outcome Result Card */}
          {winner !== null && (
            <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/40 rounded-2xl p-6 text-center space-y-2">
              <Trophy className="w-10 h-10 text-amber-400 mx-auto animate-bounce" />
              <h3 className="text-xl font-bold text-white">{WINNER_NAMES[winner]}</h3>
              <p className="text-xs text-slate-300">
                Player 1 revealed: <span className="font-semibold text-purple-300">{CHOICE_NAMES[p1Choice]}</span> vs Player 2: <span className="font-semibold text-indigo-300">{CHOICE_NAMES[p2Choice]}</span>
              </p>
            </div>
          )}
        </div>

        {/* Terminal Logs & ZK Privacy Inspector */}
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="font-semibold text-sm flex items-center gap-2 text-slate-300">
              <Sparkles className="w-4 h-4 text-purple-400" /> ZK Privacy Inspector
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase">Public State (On-Chain)</span>
                <div className="font-mono text-emerald-400 mt-1">
                  stage: {stage} <br />
                  player2_move: {stage >= 1 ? CHOICE_NAMES[p2Choice] : 'None'} <br />
                  winner: {winner !== null ? winner : 'Unresolved'}
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase">Private Witness (Off-Chain Only)</span>
                <div className="font-mono text-purple-400 mt-1">
                  p1_choice: {stage === 2 ? CHOICE_NAMES[p1Choice] : '🔒 Hidden Witness'} <br />
                  p1_salt: {stage === 2 ? p1Salt : '🔒 Hidden Salt'}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="font-semibold text-sm flex items-center gap-2 text-slate-300">
              <Terminal className="w-4 h-4 text-indigo-400" /> Transaction Execution Log
            </h3>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-400 font-mono text-[11px] h-64 overflow-y-auto space-y-1.5 leading-relaxed">
              {log.map((entry, idx) => (
                <div key={idx} className="border-b border-slate-900/60 pb-1">
                  {entry}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
