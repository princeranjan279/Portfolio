import React, { useState, useEffect, useCallback } from 'react';
import './LogicGame.css';

interface LogicProblem {
  id: number;
  expression: string;
  target: boolean;
  inputs: string[];
  validate: (vals: Record<string, boolean>) => boolean;
}

const PROBLEMS: LogicProblem[] = [
  {
    id: 1,
    expression: "A && B",
    target: true,
    inputs: ["A", "B"],
    validate: (v) => v.A && v.B
  },
  {
    id: 2,
    expression: "A || B",
    target: false,
    inputs: ["A", "B"],
    validate: (v) => v.A || v.B
  },
  {
    id: 3,
    expression: "!(A && B)",
    target: false,
    inputs: ["A", "B"],
    validate: (v) => !(v.A && v.B)
  },
  {
    id: 4,
    expression: "A && (B || C)",
    target: true,
    inputs: ["A", "B", "C"],
    validate: (v) => v.A && (v.B || v.C)
  },
  {
    id: 5,
    expression: "(A || B) && !C",
    target: true,
    inputs: ["A", "B", "C"],
    validate: (v) => (v.A || v.B) && !v.C
  },
  {
    id: 6,
    expression: "A ? B : C",
    target: true,
    inputs: ["A", "B", "C"],
    validate: (v) => v.A ? v.B : v.C
  }
];

const LogicGame: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [inputs, setInputs] = useState<Record<string, boolean>>({});
  const [isCorrect, setIsCorrect] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const problem = PROBLEMS[currentLevel];

  const initLevel = useCallback(() => {
    if (!problem) return;
    const initialInputs: Record<string, boolean> = {};
    problem.inputs.forEach(input => {
      initialInputs[input] = false;
    });
    setInputs(initialInputs);
    setIsCorrect(false);
    setShowSuccess(false);
  }, [problem]);

  useEffect(() => {
    initLevel();
  }, [initLevel]);

  const toggleInput = (key: string) => {
    const nextInputs = { ...inputs, [key]: !inputs[key] };
    setInputs(nextInputs);
    
    // Check if valid
    if (problem.validate(nextInputs) === problem.target) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const nextLevel = () => {
    if (currentLevel < PROBLEMS.length - 1) {
      setCurrentLevel(prev => prev + 1);
      setScore(prev => prev + 100);
    } else {
      setScore(prev => prev + 100);
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="lg-win">
        <div className="lg-win-emoji">💻</div>
        <h3 className="lg-win-title">Logic Master!</h3>
        <p className="lg-win-sub">You successfully debugged all logic gates.</p>
        <div className="lg-score-badge">Final Score: {score}</div>
        <button className="lg-reset-btn" onClick={() => { setCurrentLevel(0); setIsFinished(false); setScore(0); }}>Play Again</button>
      </div>
    );
  }

  return (
    <div className="lg-container">
      <div className="lg-header">
        <div className="lg-level">Level {currentLevel + 1} / {PROBLEMS.length}</div>
        <div className="lg-score">Score: {score}</div>
      </div>

      <div className="lg-terminal">
        <div className="lg-terminal-header">
          <div className="lg-dot red"></div>
          <div className="lg-dot yellow"></div>
          <div className="lg-dot green"></div>
          <span className="lg-terminal-title">debugger.js</span>
        </div>
        <div className="lg-terminal-body">
          <div className="lg-code-line">
            <span className="lg-keyword">const</span> <span className="lg-var">result</span> = <span className="lg-expression">{problem.expression}</span>;
          </div>
          <div className="lg-code-line">
            <span className="lg-keyword">expect</span>(<span className="lg-var">result</span>).<span className="lg-func">toBe</span>(<span className="lg-bool">{problem.target.toString()}</span>);
          </div>
        </div>
      </div>

      <div className="lg-controls">
        <p className="lg-hint">Toggle inputs to make the condition <strong>TRUE</strong></p>
        <div className="lg-inputs">
          {problem.inputs.map(input => (
            <button 
              key={input}
              className={`lg-input-btn ${inputs[input] ? 'active' : ''}`}
              onClick={() => toggleInput(input)}
            >
              <span className="lg-input-label">{input}</span>
              <span className="lg-input-value">{inputs[input] ? '1' : '0'}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="lg-footer">
        {isCorrect ? (
          <div className="lg-success-area">
            <div className="lg-success-msg">✓ Logic Validated!</div>
            <button className="lg-next-btn" onClick={nextLevel}>Next Challenge →</button>
          </div>
        ) : (
          <div className="lg-error-msg">Waiting for valid logic...</div>
        )}
      </div>
    </div>
  );
};

export default LogicGame;
