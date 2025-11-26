import { useState } from 'react'
import Header from './components/Header/Header'
import Game from './components/Game/Game'
import Statistics from './components/Statistic/Statistics'
import styles from './App.module.css'

function App() {
  const [gameHistory, setGameHistory] = useState([])

  const addGameResult = (result) => {
    setGameHistory(prev => [...prev, {
      id: Date.now(),
      ...result,
      date: new Date().toLocaleString()
    }])
  }

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Game onGameEnd={addGameResult} />
        <Statistics gameHistory={gameHistory} />
      </main>
    </div>
  )
}

export default App