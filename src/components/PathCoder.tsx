import React, { useState, useEffect } from 'react';
import './PathCoder.css';

type Command = 'FORWARD' | 'LEFT' | 'RIGHT';

interface Level {
  grid: number[][]; // 0: empty, 1: wall, 2: start, 3: end
  start: { x: number, y: number, dir: number }; // dir: 0:N, 1:E, 2:S, 3:W
  maxCommands: number;
}

const LEVELS: Level[] = [
  {
    grid: [
      [2, 0, 0, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 1, 1, 3]
    ],
    start: { x: 0, y: 0, dir: 1 },
    maxCommands: 15
  },
  {
    grid: [
      [2, 1, 0, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 0, 0, 1, 0],
      [1, 1, 1, 1, 0],
      [3, 0, 0, 0, 0]
    ],
    start: { x: 0, y: 0, dir: 2 },
    maxCommands: 30
  },
  {
    grid: [
      [2, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 3]
    ],
    start: { x: 0, y: 0, dir: 1 },
    maxCommands: 40
  },
  {
    grid: [
      [2, 0, 1, 0, 0],
      [0, 0, 1, 0, 1],
      [1, 0, 0, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 1, 3, 0, 0]
    ],
    start: { x: 0, y: 0, dir: 2 },
    maxCommands: 25
  },
  {
    grid: [
      [2, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 0],
      [0, 1, 3, 0, 1, 0],
      [0, 1, 0, 1, 1, 0],
      [0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1]
    ],
    start: { x: 0, y: 0, dir: 2 },
    maxCommands: 45
  }
];

const PathCoder: React.FC = () => {
  const [levelIdx, setLevelIdx] = useState(0);
  const [commands, setCommands] = useState<Command[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [botPos, setBotPos] = useState({ x: 0, y: 0, dir: 0 });
  const [status, setStatus] = useState<'IDLE' | 'RUNNING' | 'SUCCESS' | 'FAIL'>('IDLE');
  const [message, setMessage] = useState('');

  const level = LEVELS[levelIdx];

  useEffect(() => {
    setBotPos(level.start);
    setCommands([]);
    setStatus('IDLE');
    setMessage('');
  }, [levelIdx, level.start]);

  const runCode = async () => {
    if (commands.length === 0) return;
    setIsRunning(true);
    setStatus('RUNNING');
    
    let current = { ...level.start };
    setBotPos(current);

    for (const cmd of commands) {
      await new Promise(r => setTimeout(r, 400));
      
      if (cmd === 'LEFT') {
        current.dir = (current.dir + 3) % 4;
      } else if (cmd === 'RIGHT') {
        current.dir = (current.dir + 1) % 4;
      } else if (cmd === 'FORWARD') {
        const dx = [0, 1, 0, -1][current.dir];
        const dy = [-1, 0, 1, 0][current.dir];
        const nextX = current.x + dx;
        const nextY = current.y + dy;

        if (nextX < 0 || nextX >= level.grid[0].length || nextY < 0 || nextY >= level.grid.length || level.grid[nextY][nextX] === 1) {
          setStatus('FAIL');
          setMessage('Collision detected! System halted.');
          setIsRunning(false);
          return;
        }
        current.x = nextX;
        current.y = nextY;
      }
      setBotPos({ ...current });
    }

    if (level.grid[current.y][current.x] === 3) {
      setStatus('SUCCESS');
      setMessage('Deployment Successful! Server reached.');
    } else {
      setStatus('FAIL');
      setMessage('Destination not reached. Review your logic.');
    }
    setIsRunning(false);
  };

  const addCmd = (cmd: Command) => {
    if (commands.length < level.maxCommands && !isRunning) {
      setCommands([...commands, cmd]);
    }
  };

  const removeCmd = (idx: number) => {
    if (!isRunning) {
      setCommands(commands.filter((_, i) => i !== idx));
    }
  };

  const reset = () => {
    setBotPos(level.start);
    setStatus('IDLE');
    setMessage('');
  };

  const nextLevel = () => {
    if (levelIdx < LEVELS.length - 1) {
      setLevelIdx(levelIdx + 1);
    }
  };

  return (
    <div className="pc-container">
      <div className="pc-meta">
        <div className="pc-level-info">Level {levelIdx + 1}: Path Planning</div>
        <div className="pc-level-select">
          {LEVELS.map((_, i) => (
            <button 
              key={i} 
              className={`pc-level-dot ${levelIdx === i ? 'active' : ''}`}
              onClick={() => !isRunning && setLevelIdx(i)}
              title={`Level ${i + 1}`}
            />
          ))}
        </div>
        <div className="pc-cmd-count">Commands: {commands.length}/{level.maxCommands}</div>
      </div>

      <div className="pc-layout">
        <div className="pc-grid-wrap">
          <div className="pc-grid" style={{ 
            gridTemplateColumns: `repeat(${level.grid[0].length}, 1fr)`,
            gridTemplateRows: `repeat(${level.grid.length}, 1fr)` 
          }}>
            {level.grid.map((row, y) => row.map((cell, x) => (
              <div key={`${x}-${y}`} className={`pc-cell pc-cell-${cell}`}>
                {botPos.x === x && botPos.y === y && (
                  <div className={`pc-bot pc-bot-dir-${botPos.dir}`}>🚀</div>
                )}
                {cell === 3 && <div className="pc-target">📡</div>}
              </div>
            )))}
          </div>
        </div>

        <div className="pc-sidebar">
          <div className="pc-program-panel">
            <div className="pc-panel-title">Program Stack</div>
            <div className="pc-stack">
              {commands.map((cmd, i) => (
                <div key={i} className="pc-stack-item" onClick={() => removeCmd(i)}>
                  <span className="pc-stack-num">{i + 1}</span>
                  <span className="pc-stack-cmd">{cmd}</span>
                  <span className="pc-stack-del">×</span>
                </div>
              ))}
              {commands.length === 0 && <div className="pc-empty">Add commands to start...</div>}
            </div>
          </div>

          <div className="pc-controls">
            <div className="pc-buttons">
              <button className="pc-btn" onClick={() => addCmd('FORWARD')}>Move Forward</button>
              <button className="pc-btn" onClick={() => addCmd('LEFT')}>Turn Left</button>
              <button className="pc-btn" onClick={() => addCmd('RIGHT')}>Turn Right</button>
            </div>
            <div className="pc-actions">
              <button className="pc-btn pc-btn-run" onClick={runCode} disabled={isRunning || commands.length === 0}>
                {isRunning ? 'Running...' : '▶ Run Code'}
              </button>
              <button className="pc-btn pc-btn-clear" onClick={() => setCommands([])} disabled={isRunning}>Clear</button>
            </div>
          </div>
        </div>
      </div>

      <div className="pc-status-bar">
        {status === 'SUCCESS' && (
          <div className="pc-msg pc-msg-success">
            <span>{message}</span>
            <button className="pc-next-btn" onClick={nextLevel}>Next Level →</button>
          </div>
        )}
        {status === 'FAIL' && (
          <div className="pc-msg pc-msg-fail">
            <span>{message}</span>
            <button className="pc-retry-btn" onClick={reset}>Retry</button>
          </div>
        )}
        {status === 'IDLE' && <div className="pc-msg">System Ready. Awaiting logic...</div>}
      </div>
    </div>
  );
};

export default PathCoder;
