import classes from './Sidebar.module.scss'
import { calendar } from '../svgs/calendar';
import { calendarPlus } from '../svgs/calendarPlus';
import { calendarCheck } from '../svgs/calendarCheck';

const Sidebar = ({ setActiveTask, activeFilter }) => {

  return (
    <>
      <section className={classes.sidebar}>
        <div className={classes.list_buttons}>
          <button onClick={() => { setActiveTask('all') }} className={activeFilter === 'all' ? classes.activeButton : null}>{calendar} All</button>
          <button onClick={() => { setActiveTask('todo') }} className={activeFilter === 'todo' ? classes.activeButton : null}>{calendarPlus} Todo</button>
          <button onClick={() => { setActiveTask('done') }} className={activeFilter === 'done' ? classes.activeButton : null}>{calendarCheck} Done</button>
        </div>
        <div className={classes.cp}>
          © Tamtam International - Stage 2023
        </div>
      </section>
    </>
  )
}

export default Sidebar