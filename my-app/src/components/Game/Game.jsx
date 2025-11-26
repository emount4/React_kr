import { useState, useEffect } from 'react'
import styles from './Game.module.css'

const Game = ({ onGameEnd }) => {
  const [targetNumber, setTargetNumber] = useState(null)
  const [userGuess, setUserGuess] = useState('')
  const [message, setMessage] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [gameStatus, setGameStatus] = useState('idle') // idle, playing, won, lost

  useEffect(() => {
    startNewGame()
  }, [])

  const startNewGame = () => {
    const newNumber = Math.floor(Math.random() * 100) + 1
    setTargetNumber(newNumber)
    setUserGuess('')
    setMessage('Введите число от 1 до 100')
    setAttempts(0)
    setGameStatus('playing')
  }

  const handleGuess = (e) => {
    e.preventDefault()
    
    const guess = parseInt(userGuess)
    
    if (isNaN(guess) || guess < 1 || guess > 100) {
      setMessage('⚠️ Пожалуйста, введите число от 1 до 100')
      return
    }

    const newAttempts = attempts + 1
    setAttempts(newAttempts)

    if (guess === targetNumber) {
      setMessage(`🎉 Поздравляем! Вы угадали число ${targetNumber} за ${newAttempts} попыток!`)
      setGameStatus('won')
      onGameEnd({
        targetNumber,
        attempts: newAttempts,
        status: 'win'
      })
    } else if (newAttempts >= 10) {
      setMessage(`💥 Игра окончена! Загаданное число было ${targetNumber}`)
      setGameStatus('lost')
      onGameEnd({
        targetNumber,
        attempts: newAttempts,
        status: 'lose'
      })
    } else {
      const hint = guess < targetNumber ? '📈 Больше!' : '📉 Меньше!'
      setMessage(`${hint} Попытка ${newAttempts}/10`)
    }
    
    setUserGuess('')
  }

  const getHint = () => {
    if (!targetNumber) return ''
    
    if (targetNumber <= 25) return ' Подсказка: Число между 1 и 25'
    if (targetNumber <= 50) return ' Подсказка: Число между 26 и 50'
    if (targetNumber <= 75) return ' Подсказка: Число между 51 и 75'
    return '🔍 Подсказка: Число между 76 и 100'
  }

  return (
    <div className={styles.game}>
      <div className={styles.gameCard}>
        <h2>Игра</h2>
        
        <div className={styles.stats}>
          <span>Попытки: {attempts}/10</span>
          {gameStatus === 'playing' && (
            <button 
              className={styles.hintButton}
              onClick={() => setMessage(getHint())}
            >
              Получить подсказку
            </button>
          )}
        </div>

        <form onSubmit={handleGuess} className={styles.form}>
          <input
            type="number"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            placeholder="Введите число..."
            className={styles.input}
            min="1"
            max="100"
            disabled={gameStatus !== 'playing'}
          />
          <button 
            type="submit"
            className={styles.guessButton}
            disabled={gameStatus !== 'playing'}
          >
            Проверить
          </button>
        </form>

        <div className={`${styles.message} ${styles[gameStatus]}`}>
          {message}
        </div>

        {(gameStatus === 'won' || gameStatus === 'lost') && (
          <button 
            onClick={startNewGame}
            className={styles.restartButton}
          >
             Новая игра
          </button>
        )}
      </div>
    </div>
  )
}

export default Game