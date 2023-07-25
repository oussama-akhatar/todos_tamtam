import styles from './Task.module.scss'
import { trash } from '../../svgs/trash'
import { ClipLoader } from 'react-spinners'

const Task = ({ task_id, task_title, task_is_done, task_created_at, deleteTask, handleCheckTask, task }) => {

    const today = new Date(), day_now = today.toLocaleDateString(), time_now = today.toLocaleTimeString()

    const formatDate = (created_at) => {
        if (created_at.split(" ")[0] === day_now) {
            return 'Today at ' + (created_at.split(" "))[2] + " " + (created_at.split(" "))[3]
        } else {
            return created_at
        }
    }

    return (
        <div className={styles.task}>
            <div className={styles.task_infos}>
                {
                    task.isLoading 
                    ?( <div className={styles.conatiner_spinner}><ClipLoader color="#7D40FF" size={30} /></div> )
                    : (<input type="checkbox" className={styles.checkbox} defaultChecked={task_is_done} onChange={ () => handleCheckTask(task) } />
                )}
                
                <div className={styles.task_infos_all}>
                    <h3 className={styles.task_infos_all_title}>{task_title}</h3>
                    <p className={styles.task_infos_all_time}>{formatDate(task_created_at)}</p>
                </div>
            </div>
            <div className={styles.task_delete_icon} onClick={() => { deleteTask(task) }}>
                {trash}
            </div>
        </div>
    )
}

export default Task