import { useState } from 'react'
import classes from './Sidebar.module.scss'

const Sidebar = ({renderAll, renderAllDone, renderAllTodo}) => {

  return (
    <>
    <section className={classes.sidebar}>
        <div className={classes.list_buttons}>
          <button onClick={() => {renderAll()}}><i className='bi bi-calendar' ></i> All</button>
          <button onClick={() => {renderAllTodo()}}><i className='bi bi-calendar-plus'></i> Todo</button>
          <button onClick={() => {renderAllDone()}}><i className='bi bi-calendar-check'></i> Done</button>
        </div>
        <div className={classes.cp}>
          © Tamtam International - Stage 2023
        </div>
      </section>
    </>
  )
}

export default Sidebar