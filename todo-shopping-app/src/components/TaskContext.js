import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import './App.css';
const TaskContext = createContext();

export const useToDoContext = () => useContext(TaskContext);

function TaskContextProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://api.example.com/tasks');
      setTasks(response.data.tasks);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching tasks:', error);
      setLoading(false); // Set loading to false even in case of an error
    }
  };

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const markTaskAsCompleted = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
  };

  const removeTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const totalTasks = tasks.length + completedTasks.length;

  return (
    <TaskContext.Provider
      value={{
        tasks,
        completedTasks,
        loading,
        addTask,
        markTaskAsCompleted,
        removeTask,
        totalTasks,
      }}
    >
      {loading ? <p>Loading...</p> : children}
    </TaskContext.Provider>
  );
}

export { TaskContextProvider, TaskContext };
