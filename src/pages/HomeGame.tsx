import React, { useState, useEffect, useCallback } from 'react';
import LogicGame from '../components/LogicGame';
import PathCoder from '../components/PathCoder';
import './HomeGame.css';

const CARDS = [
  { id: 1, label: 'React.js',   emoji: '⚛️' },
  { id: 2, label: 'WordPress',  emoji: '🌐' },
  { id: 3, label: 'Meta Ads',   emoji: '📣' },
  { id: 4, label: 'SEO',        emoji: '🔍' },
  { id: 5, label: 'Figma',      emoji: '🎨' },
  { id: 6, label: 'GitHub',     emoji: '🐙' },
  { id: 7, label: 'TypeScript', emoji: '📘' },
  { id: 8, label: 'AI Tools',   emoji: '🤖' },
];

interface Card { id: number; label: string; emoji: string; uid: number; }

function shuffle(arr: Card[]) {
  return [...arr].sort(() => Math.random() - 0.5);
}

const MEMORY_LEVELS = [
  { id: 1, pairs: 2, cols: 2 },
  { id: 2, pairs: 8, cols: 4 },
  { id: 3, pairs: 10, cols: 5 },
];

const MemoryMatch: React.FC<{ onWin: (moves: number) => void, bestScore: number | null }> = ({ onWin, bestScore }) => {
  const [levelIdx, setLevelIdx]   = useState(1); // Default to middle level
  const [cards, setCards]         = useState<Card[]>([]);
  const [flipped, setFlipped]     = useState<number[]>([]);
  const [matched, setMatched]     = useState<number[]>([]);
  const [moves, setMoves]         = useState(0);
  const [won, setWon]             = useState(false);
  const [locked, setLocked]       = useState(false);

  const level = MEMORY_LEVELS[levelIdx];

  const init = useCallback(() => {
    const selectedLevel = MEMORY_LEVELS[levelIdx];
    const subset = CARDS.slice(0, selectedLevel.pairs);
    const deck = shuffle([...subset, ...subset].map((c, i) => ({ ...c, uid: i })));
    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setWon(false);
    setLocked(false);
  }, [levelIdx]);

  useEffect(() => { init(); }, [init]);

  useEffect(() => {
    if (matched.length > 0 && matched.length === MEMORY_LEVELS[levelIdx].pairs * 2) {
      setWon(true);
      onWin(moves);
    }
  }, [matched, moves, onWin, levelIdx]);

  const flip = (uid: number) => {
    if (locked || flipped.includes(uid) || matched.includes(uid)) return;
    const next = [...flipped, uid];
    setFlipped(next);
    if (next.length === 2) {
      setLocked(true);
      setMoves(m => m + 1);
      const [a, b] = next.map(u => cards.find(c => c.uid === u)!);
      if (a.id === b.id) {
        setMatched(m => [...m, ...next]);
        setFlipped([]);
        setLocked(false);
      } else {
        setTimeout(() => { setFlipped([]); setLocked(false); }, 900);
      }
    }
  };

  if (won) {
    return (
      <div className="hg-win">
        <div className="hg-win-emoji">🎉</div>
        <h3 className="hg-win-title">Level {level.id} Clear!</h3>
        <p className="hg-win-sub">Completed in <strong>{moves}</strong> moves!</p>
        <div className="flex gap-12" style={{ marginTop: 16 }}>
          <button className="hg-reset-btn" onClick={init}>Retry</button>
          {levelIdx < MEMORY_LEVELS.length - 1 && (
            <button className="hg-reset-btn btn-primary" onClick={() => setLevelIdx(l => l + 1)}>Next Level →</button>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="hg-header">
        <div className="lg-level-info" style={{ marginRight: 'auto' }}>
          <div className="lg-level-num">Difficulty</div>
          <div className="lg-level-dots">
            {MEMORY_LEVELS.map((_, i) => (
              <div 
                key={i} 
                className={`lg-level-dot ${levelIdx === i ? 'active' : ''}`}
                onClick={() => setLevelIdx(i)}
              />
            ))}
          </div>
        </div>
        <div className="hg-stat"><span className="hg-stat-val">{moves}</span><span className="hg-stat-lbl">Moves</span></div>
        <div className="hg-stat"><span className="hg-stat-val">{matched.length / 2}/{level.pairs}</span><span className="hg-stat-lbl">Matched</span></div>
        <button className="hg-reset-btn" onClick={init}>↺ Reset</button>
      </div>
      <div className="hg-grid" style={{ gridTemplateColumns: `repeat(${level.cols}, 1fr)` }}>
        {cards.map(card => {
          const isFlipped  = flipped.includes(card.uid);
          const isMatched  = matched.includes(card.uid);
          return (
            <div
              key={card.uid}
              className={`hg-card ${isFlipped || isMatched ? 'hg-card-flipped' : ''} ${isMatched ? 'hg-card-matched' : ''}`}
              onClick={() => flip(card.uid)}
              role="button"
              aria-label={isFlipped || isMatched ? card.label : 'Hidden card'}
            >
              <div className="hg-card-inner">
                <div className="hg-card-back">?</div>
                <div className="hg-card-front">
                  <span className="hg-card-emoji">{card.emoji}</span>
                  <span className="hg-card-label">{card.label}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

const HomeGame: React.FC = () => {
  const [activeGame, setActiveGame] = useState<'memory' | 'logic' | 'path'>('memory');
  const [bestMemory, setBestMemory] = useState<number | null>(null);

  const handleMemoryWin = (moves: number) => {
    setBestMemory(prev => (prev === null || moves < prev) ? moves : prev);
  };

  return (
    <div className="hg-wrap">
      <div className="hg-game-selector">
        <button 
          className={`hg-selector-btn ${activeGame === 'memory' ? 'active' : ''}`}
          onClick={() => setActiveGame('memory')}
        >
          🧩 Match
        </button>
        <button 
          className={`hg-selector-btn ${activeGame === 'logic' ? 'active' : ''}`}
          onClick={() => setActiveGame('logic')}
        >
          💻 Logic
        </button>
        <button 
          className={`hg-selector-btn ${activeGame === 'path' ? 'active' : ''}`}
          onClick={() => setActiveGame('path')}
        >
          🚀 Path
        </button>
      </div>

      <div className="hg-game-intro">
        {activeGame === 'memory' && <p>Test your focus by matching pairs of technical skill icons in the fewest moves possible.</p>}
        {activeGame === 'logic' && <p>Solve complex boolean challenges by toggling inputs to make the system logic evaluate to the target state.</p>}
        {activeGame === 'path' && <p>Program a sequence of navigation commands to guide the rocket through deep space to the target station.</p>}
      </div>

      <div className="hg-game-content">
        {activeGame === 'memory' ? (
          <MemoryMatch onWin={handleMemoryWin} bestScore={bestMemory} />
        ) : activeGame === 'logic' ? (
          <LogicGame />
        ) : (
          <PathCoder />
        )}
      </div>
    </div>
  );
};

export default HomeGame;
