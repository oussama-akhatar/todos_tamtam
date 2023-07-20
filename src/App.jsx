import Header from "./components/Header/Header"
import Hero from "./components/Hero/Hero"
import classes from './App.module.scss'
function App() {
  return (
    <>
      <Header />
      <div className={classes.maindiv}>
        <Hero />
      </div>
    </>
  )
}

export default App
