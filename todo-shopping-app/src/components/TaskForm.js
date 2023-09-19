import React, { useState } from 'react';
import { useToDoContext } from './TaskContext';
import './App.css';
function TaskForm() {
  const [task, setTask] = useState('');
  const { addTask } = useToDoContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() !== '') {
      addTask({ id: Date.now(), title: task });
      setTask('');
    }
  };

  return (
    <div className='task-form'>
    <form onSubmit={handleSubmit}>
      <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
      <button type="submit">Add Task</button>
    </form>
    </div>
  );
}

export default TaskForm;
