import styles from './Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}> Угадай число</h1>
      <p className={styles.subtitle}>Попробуйте угадать число от 1 до 100!</p>
    </header>
  )
}

export default Header