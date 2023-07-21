import { useEffect, useState } from 'react'
import classes from './Hero.module.scss'
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';

import Swal from 'sweetalert2'

const Hero = () => {

  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [isSubmited, setIsSubmited] = useState(false);

  const today = new Date(), day_now = today.toLocaleDateString(), time_now = today.toLocaleTimeString()

  useEffect(() => {
    axios.get('https://api-tamtam-todos.onrender.com/tasks?is_deleted=false')
      .then((res) => { setTasks(res.data) })
      .catch((err) => { console.error(err); })
  }, [isSubmited])

  const addTask = () => {
    axios.post('https://api-tamtam-todos.onrender.com/tasks', { title: taskTitle, is_done: false, created_at: day_now + " at " + time_now, is_deleted: false })
      .then((res) => {
        console.log(res + " Added Successfuly")
        setIsSubmited(!isSubmited);
        Swal.fire({
          title: 'Added!',
          text: 'Your task has been added.',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
        })
      })
      .catch((error) => { console.error(error) })
  }

  const deleteTask = (task) => {
    // axios.delete('http://localhost:9000/tasks/' + id)
    //   .then((res) => {
    //     setTasks(tasks.filter(task => task.id !== id));
    //   })
    //   .catch((err) => console.error(err))

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your task has been deleted.',
          icon: 'success',
          timer: 5000,
          timerProgressBar: true,
        })
        axios.patch('https://api-tamtam-todos.onrender.com/tasks/' + task.id, { is_deleted: true })
          .then((res) => { console.log(res); setIsSubmited(!isSubmited) })
          .catch((err) => console.error(err))
      }
    })
  }

  const cancel = () => {
    setTaskTitle('')
  }

  const handleCheckTask = (task) => {
    axios.patch('https://api-tamtam-todos.onrender.com/tasks/' + task.id, { is_done: !task.is_done })
      .then((res) => { console.log(res); setIsSubmited(!isSubmited) })
      .catch((err) => console.error(err))
  }

  const renderAll = () => {
    axios.get('https://api-tamtam-todos.onrender.com/tasks?is_deleted=false')
      .then((res) => { setTasks(res.data) })
      .catch((err) => { console.error(err); })
  }

  const renderAllTodo = () => {
    axios.get('https://api-tamtam-todos.onrender.com/tasks?is_done=false&is_deleted=false')
      .then((res) => {
        setTasks(res.data)
      })
      .catch((err) => { console.error(err); })
  }
  const renderAllDone = () => {
    axios.get('https://api-tamtam-todos.onrender.com/tasks?is_done=true&is_deleted=false')
      .then((res) => { setTasks(res.data) })
      .catch((err) => { console.error(err); })
  }


  return (
    <>
      <Sidebar renderAll={renderAll} renderAllDone={renderAllDone} renderAllTodo={renderAllTodo} />
      <section className={classes.hero}>
        <div className={classes.task_container}>
          {
            tasks.map((task) => (
              <div className={classes.task} key={task.id}>
                <div className={classes.task_infos}>
                  <input type="checkbox" className={classes.checkbox} defaultChecked={task.is_done} onChange={() => { handleCheckTask(task) }} />
                  <div className={classes.task_infos_all}>
                    <h3 className={classes.task_infos_all_title}>{task.title}</h3>
                    <p className={classes.task_infos_all_time}>{(task.created_at.split(" "))[0] === day_now ? 'Today at ' + (task.created_at.split(" "))[2] + " " + (task.created_at.split(" "))[3] : task.created_at}</p>
                  </div>
                </div>
                <div className={classes.task_delete_icon} onClick={() => { deleteTask(task) }}>
                  <i className='bi bi-trash3'></i>
                </div>
              </div>
            ))
          }
        </div>
        <div className={classes.add_task}>
          <input type="text" placeholder='Add Todo' className={classes.input_save} value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
          <div className={classes.add_task_container}>
            <button className={classes.btn_save} onClick={addTask}><i class="bi bi-plus-square"></i> <span>Save</span></button>
            <button className={classes.btn_cancel} onClick={cancel}><i class="bi bi-dash-square"></i> Cancel</button>
          </div>
        </div>
      </section>

    </>
  )
}

export default Hero