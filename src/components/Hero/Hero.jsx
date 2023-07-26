import { useEffect, useState } from 'react'
import classes from './Hero.module.scss'
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import { ClipLoader } from "react-spinners"

import Swal from 'sweetalert2'
import Task from '../Task/Task';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Hero = () => {
  const api = 'http://localhost:9000';
  // const api = 'https://api-tamtam-todos.onrender.com';

  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [taskTitle, setTaskTitle] = useState('');
  const [spinner, setSpinner] = useState(true);
  const [spinnerCheck, setSpinnerCheck] = useState(false)

  const today = new Date(), day_now = today.toLocaleDateString(), time_now = today.toLocaleTimeString()

  useEffect(() => {
    if (activeFilter === 'done') {
      setSpinner(true)
      axios.get(api + '/tasks?is_deleted=false&is_done=true').then((res) => { setTasks(res.data); setSpinner(false) }).catch((err) => console.error(err))
      toast.success('All these tasks are done !', { position: "bottom-left", autoClose: 1500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" });
    } else if (activeFilter === 'todo') {
      setSpinner(true)
      axios.get(api + '/tasks?is_deleted=false&is_done=false').then((res) => { setTasks(res.data); setSpinner(false) }).catch((err) => console.error(err))
      toast.success('All these tasks are not done !', { position: "bottom-left", autoClose: 1500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light" });
    } else {
      setSpinner(true)
      axios.get(api + '/tasks?is_deleted=false').then((res) => { setTasks(res.data); setSpinner(false) }).catch((err) => console.error(err))
      toast.success('All tasks is listed !', { position: "bottom-left", autoClose: 1500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
    }
  }, [activeFilter])

  const addTask = () => {
    if (taskTitle != '') {
      if (activeFilter != 'done') {
        setSpinner(true)
      }
      axios.post(api + '/tasks', { title: taskTitle, is_done: false, created_at: day_now + " at " + time_now, is_deleted: false })
        .then((res) => {
          if (activeFilter != 'done') {
            setTasks([...tasks, res.data])
          }
          setSpinner(false)
          toast.success('Your task has been added. !', { position: "bottom-left", autoClose: 1500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
          setTaskTitle('')
        }).catch((error) => { console.error(error) })
    }
  }

  const deleteTask = (task) => {
    Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!' })
      .then((result) => {
        if (result.isConfirmed) {
          setSpinner(true);
          axios.patch(api + '/tasks/' + task.id, { is_deleted: true })
            .then((res) => {
              setTasks(tasks.filter(task_item => task_item.id !== task.id));
              setSpinner(false)
              toast.success('Your task has been deleted !', { position: "bottom-left", autoClose: 1500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
            })
            .catch((err) => console.error(err))
          } else {
          toast.error('Your task has not been deleted !', { position: "bottom-left", autoClose: 1500, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
        }
      })
  }

  const cancelTitleTask = () => {
    setTaskTitle('')
  }

  const handleCheckTask = (task) => {
    setTasks(tasks.map((task_item) =>
      task_item.id === task.id ? { ...task_item, isLoading: true } : task_item
    ));

    axios.patch(api + '/tasks/' + task.id, { is_done: !task.is_done })
      .then((res) => {
        setTasks(tasks.map((task_item) =>
          task_item.id === task.id ? { ...task_item, isLoading: false, is_done: !task.is_done } : task_item
        ));

        if (activeFilter === 'done' || activeFilter === 'todo') {
          setTasks(tasks.filter((task_item) => task_item.id !== task.id));
        }

        if (res.data.is_done) {
          toast.success('The task has been done !', {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.warn('The task hasn\'t been done !', {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }

      })
      .catch((err) => console.error(err));
  };


  return (
    <>
      <Sidebar setActiveTask={setActiveFilter} activeFilter={activeFilter} />
      <section className={classes.hero}>
        <div className={classes.task_container}>
          {
            tasks.length == 0 && !spinner
              ?
              (
                <div className={classes.messageEmptyContainer}>
                  <div className={classes.messageEmpty}>No task to display !</div>
                </div>
              )
              :
              (
                spinner ? <div className={classes.conatiner_spinner}><ClipLoader color="#7D40FF" /></div> :
                  (
                    tasks.map((task) => (
                      <Task key={task.id} task_id={task.id} task_title={task.title} task_is_done={task.is_done} task_created_at={task.created_at} task={task} deleteTask={() => deleteTask(task)} handleCheckTask={() => handleCheckTask(task)} spinnerCheck={spinnerCheck} setSpinnerCheck={setSpinnerCheck} />
                    ))
                  )
              )

          }

        </div>
        <div className={classes.add_task}>
          <input type="text" placeholder='Add Todo' className={classes.input_save} value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
          <div className={classes.add_task_container}>
            <button className={classes.btn_save} onClick={addTask} disabled={taskTitle == ''}> <span>Save</span></button>
            <button className={classes.btn_cancel} onClick={cancelTitleTask} disabled={taskTitle == ''}>Cancel</button>
            <ToastContainer />
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero