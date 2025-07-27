import React, { useEffect, useRef } from 'react';
import axios from 'axios';

const GameLogic = ({ score, setScore, playerName, refreshLeaderboard, onGameOver }) => {
  const canvasRef = useRef(null);
  const box = 20;
  const canvasWidth = 600;
  const canvasHeight = 600;

  const snake = useRef([{ x: 9 * box, y: 10 * box }]);
  const food = useRef({
    x: Math.floor(Math.random() * (canvasWidth / box)) * box,
    y: Math.floor(Math.random() * (canvasHeight / box)) * box,
  });
  const direction = useRef('RIGHT');

  const updateScore = async () => {
    try {
      await axios.put('http://localhost:5000/api/users/score', {
        name: playerName,
        score: score,
      });
      refreshLeaderboard();
    } catch (error) {
      console.error('Error updating Score:', error);
    }
  };

  const changeDirection = (e) => {
    if (e.key === 'ArrowUp' && direction.current !== 'DOWN') direction.current = 'UP';
    else if (e.key === 'ArrowDown' && direction.current !== 'UP') direction.current = 'DOWN';
    else if (e.key === 'ArrowLeft' && direction.current !== 'RIGHT') direction.current = 'LEFT';
    else if (e.key === 'ArrowRight' && direction.current !== 'LEFT') direction.current = 'RIGHT';
  };

  useEffect(() => {
    document.addEventListener('keydown', changeDirection);
    return () => {
      document.removeEventListener('keydown', changeDirection);
    };
  }, []);

  useEffect(() => {
    if (score > 0) {
      updateScore();
    }
  }, [score]);

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');

    const drawGame = () => {
      context.fillStyle = '#2d2d2d';
      context.fillRect(0, 0, canvasWidth, canvasHeight);

      for (let i = 0; i < snake.current.length; i++) {
        context.fillStyle = i === 0 ? '#00FF00' : '#66ff66';
        context.fillRect(snake.current[i].x, snake.current[i].y, box, box);
      }

      context.fillStyle = 'red';
      context.fillRect(food.current.x, food.current.y, box, box);

      let headX = snake.current[0].x;
      let headY = snake.current[0].y;

      if (direction.current === 'LEFT') headX -= box;
      if (direction.current === 'RIGHT') headX += box;
      if (direction.current === 'UP') headY -= box;
      if (direction.current === 'DOWN') headY += box;

      if (
        headX < 0 || headY < 0 ||
        headX >= canvasWidth || headY >= canvasHeight ||
        snake.current.some((segment) => segment.x === headX && segment.y === headY)
      ) {
        
        onGameOver();
        clearInterval(gameLoop);
        return;
      }

      if (headX === food.current.x && headY === food.current.y) {
        setScore((prev) => prev + 1);
        food.current = {
          x: Math.floor(Math.random() * (canvasWidth / box)) * box,
          y: Math.floor(Math.random() * (canvasHeight / box)) * box,
        };
      } else {
        snake.current.pop();
      }

      const newHead = { x: headX, y: headY };
      snake.current.unshift(newHead);
    };

    const gameLoop = setInterval(drawGame, 150);
    return () => clearInterval(gameLoop);
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
    <h2 style={{ color: 'white' }}>Score: {score}</h2>
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      style={{ border: '2px solid white', marginTop: '20px' }}
    />
    </div>
  );
};

export default GameLogic;
