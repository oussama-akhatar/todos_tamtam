import classes from './Header.module.scss'

const Header = () => {
  return (
    <header className={classes.header}>
      <h1 className={classes.header_h1}>Todo<span>.tamtam</span></h1>
      <div className={classes.header_icon}><i className="bi bi-person-circle"></i></div>
    </header>
  )
}

export default Header