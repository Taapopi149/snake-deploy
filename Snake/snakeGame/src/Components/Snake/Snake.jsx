import React, { useState, useEffect } from 'react'
import './Snake.css'
import GameLogic from './GameLogic'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import GameOverPopup from './GameOverPopup'

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const Snake = () => {

  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [key, setKey] = useState(0) 
  const navigate = useNavigate() // You need navigate here

  const location = useLocation()
  const [players, setPlayers] = useState([])

  const playerName = location.state?.name || 'You'

  const handleRestart = () => {
    setScore(0)
    setGameOver(false)
    setKey((prev) => prev + 1)
  }


  const handleExit = () => {
    navigate('/home')
  }


  const fetchPlayers = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/users`)
      setPlayers(res.data)
    } catch (error) {
      console.error('Error loading Players', error)
    }
  }

  useEffect(() => {
    fetchPlayers()
  }, [])

return (
  <>
    <div className='GameContainer'>

      <div className="GameArea">
        <h2>Snake Game</h2>
        <GameLogic
          key={key} 
          score={score}
          setScore={setScore}
          playerName={playerName}
          refreshLeaderboard={fetchPlayers}
          onGameOver={() => setGameOver(true)}
        />
      </div>

      <div className='leaderboard'>
        <h2>Leaderboard</h2>
        <ul>
          {players.map((player, index) => (
            <li key={player._id}>
              {index + 1}. {player.name} : {player.score}
            </li>
          ))}
        </ul>
        <div className='Tracker'>
          {playerName && (
            <>
              <h1><strong>Player Name:</strong> {playerName}</h1>
              <p><strong>Current Score:</strong> {score}</p>
              <p>
                <strong>High Score:</strong>{' '}
                {players.length > 0
                  ? `${players[0].name} - ${players[0].score}`
                  : 'Loading...'}
                {players.length > 0 && players[0].name === playerName && ' 👑'}
              </p>
            </>
          )}
        </div>
      </div>

    </div>

    {gameOver && (
      <GameOverPopup
        playerName={playerName}
        score={score}
        onRestart={handleRestart}
        onExit={handleExit}
      />
    )}
  </>
)

  
}

export default Snake