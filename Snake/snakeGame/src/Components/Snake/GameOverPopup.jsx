import React from 'react'
import './Snake.css'

const GameOverPopup = ({playerName, score, onRestart, onExit}) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>🎮 Game Over, {playerName}!</h2>
        <p>Your final score: <strong>{score}</strong></p>
        <div style={{ marginTop: '1rem' }}>
          <button onClick={onRestart}>🔁 Play Again</button>
          <button onClick={onExit} style={{ marginLeft: '10px', backgroundColor: '#f44336' }}>🏠 Exit</button>
        </div>
      </div>
    </div>
  )
}

export default GameOverPopup