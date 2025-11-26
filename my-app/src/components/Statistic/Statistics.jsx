import { useLocalStorage } from '../../hooks/useLocalStorage'
import styles from './Statistics.module.css'
import React from 'react'
const Statistics = ({ gameHistory }) => {
  const [stats, setStats] = useLocalStorage('gameStats', {
    totalGames: 0,
    wins: 0,
    losses: 0,
    bestScore: null
  })

  React.useEffect(() => {
    if (gameHistory.length > 0) {
      const latestGame = gameHistory[gameHistory.length - 1]
      const newStats = {
        totalGames: stats.totalGames + 1,
        wins: stats.wins + (latestGame.status === 'win' ? 1 : 0),
        losses: stats.losses + (latestGame.status === 'lose' ? 1 : 0),
        bestScore: latestGame.status === 'win' 
          ? (stats.bestScore === null ? latestGame.attempts : Math.min(stats.bestScore, latestGame.attempts))
          : stats.bestScore
      }
      setStats(newStats)
    }
  }, [gameHistory])

  const winRate = stats.totalGames > 0 ? ((stats.wins / stats.totalGames) * 100).toFixed(1) : 0

  return (
    <div className={styles.statistics}>
      <div className={styles.statsCard}>
        <h2>📊 Статистика</h2>
        
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{stats.totalGames}</span>
            <span className={styles.statLabel}>Всего игр</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{stats.wins}</span>
            <span className={styles.statLabel}>Побед</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{winRate}%</span>
            <span className={styles.statLabel}>Процент побед</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>
              {stats.bestScore ? stats.bestScore : '-'}
            </span>
            <span className={styles.statLabel}>Лучший счёт</span>
          </div>
        </div>

        <div className={styles.recentGames}>
          <h3>Последние игры:</h3>
          {gameHistory.slice(-5).reverse().map(game => (
            <div key={game.id} className={`${styles.gameResult} ${styles[game.status]}`}>
              <span>Число: {game.targetNumber}</span>
              <span>Попыток: {game.attempts}</span>
              <span>{game.status === 'win' ? ' Победа' : ' Поражение'}</span>
            </div>
          ))}
          {gameHistory.length === 0 && (
            <p className={styles.noGames}>Игр пока не было</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Statistics