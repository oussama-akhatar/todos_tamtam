import classes from './Header.module.scss'
import { person } from '../svgs/person'

const Header = () => {
  return (
    <header className={classes.header}>
      <h1 className={classes.header_h1}>Todo<span>.tamtam</span></h1>
      <div className={classes.header_icon}>
        {person}
      </div>
    </header>
  )
}

export default Header