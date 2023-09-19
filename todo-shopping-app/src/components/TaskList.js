import React, { useContext } from 'react';
import { TaskContext } from './TaskContext';
export const useToDoContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useToDoContext must be used within a TaskContextProvider');
  }
  return context;
};

function TaskList() {
  const { tasks, markTaskAsCompleted, removeTask } = useToDoContext();

  const handleRemoveTask = (taskId) => {
    removeTask(taskId);
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px',
          marginBottom: '10px',
          backgroundColor: task.completed ? 'green' : '#f2f2f2',
          borderRadius: '4px',
          textDecoration: task.completed ? 'line-through' : 'none',
        }}>{task.title}{!task.completed && (
            <button onClick={() => markTaskAsCompleted(task.id)}style={{
              padding: '5px 10px',
              backgroundColor: 'green',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}>Mark as Completed</button>
          )}
          <button onClick={() => handleRemoveTask(task.id)}style={{
              padding: '5px 10px',
              backgroundColor: 'red',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}>Remove Task</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
