// /importing libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import './Tasks.css'; 

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/task');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (taskData, taskId) => {
    try {
      if (taskId) {
        await axios.put(`http://localhost:5000/task/${taskId}`, taskData);
        setEditingTask(null);
      } else {
        await axios.post('http://localhost:5000/task', taskData);
      }
      fetchTasks();
    } catch (error) {
      console.error('Error adding/updating task:', error);
    }
  };

  const editTask = (task) => {
    setEditingTask(task);
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/task/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleCardStatus = async (taskId) => {
    try {
      const updatedTasks = tasks.map((task) =>
        task._id === taskId ? { ...task, completed: !task.completed } : task
      );
      setTasks(updatedTasks);
      await axios.patch(`http://localhost:5000/task/${taskId}`, { completed: !tasks.find(task => task._id === taskId).completed });
    } catch (error) {
      console.error('Error toggling task status:', error);
    }
  };
  

  return (
    <div className="container">
      <h1>ADD TASK</h1>
      <TaskForm addTask={addTask} editingTask={editingTask} setEditingTask={setEditingTask} />
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className={`col ${task.completed ? 'completed-card' : ''}`}
          >
            <div className="card ">
              <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">{task.description}</p>
                <p className="card-text">Priority: {task.priority}</p>
                <div className="buttons">
                  <span className={`fa ${task.completed ? 'fa-check completed' : 'incompleted'}`} />
                  <span
                    className="edit-icon"
                    onClick={() => editTask(task)}
                    title="Edit Task"
                  >
                    ✎
                  </span>
                  <span
                    className="delete-icon"
                    onClick={() => deleteTask(task._id)}
                    title="Delete Task"
                  >
                    🗑
                  </span>
                  <button
                    className={`btn ${task.completed ? 'btn-success' : 'btn-info'} toggle-status-button`}
                    onClick={() => toggleCardStatus(task._id)}
                  >
                    {task.completed ? ' Incomplete' : 'Complete'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
