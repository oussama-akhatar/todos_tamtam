import Header from "./components/Header/Header"
import Hero from "./components/Hero/Hero"
import classes from './App.module.scss'
import { useEffect, useState } from "react"
import { BounceLoader } from "react-spinners"
function App() {
  const [spinnerApp, setSpinnerApp] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setSpinnerApp(false);
    }, 3000)
  }, [])

  return (
    <>
      {
        spinnerApp ? <div className={classes.conatiner_spinner}><BounceLoader color="#7D40FF" /></div> : (
          <>
            <Header />
            <div className={classes.maindiv}>
              <Hero />
            </div>
          </>
        )
      }
    </>
  )
}

export default App
