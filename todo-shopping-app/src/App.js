import './components/App.css';
import React, { useContext } from 'react';
import { TaskContext, TaskContextProvider } from './components/TaskContext';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function Home() {
  const { tasks, loading } = useContext(TaskContext);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='container'>
      <h1>Welcome to the To-Do List</h1>
      <h2>Total Tasks: {tasks.length}</h2>
      <TaskList />
      <TaskForm />
    </div>
  );
}

function About() {
  return (
    <div>
      <h1>About</h1>
      <p>Information about the company, team, or project.</p>
    </div>
  );
}

function Contact() {
  return (
    <div>
      <h1>Contact</h1>
      <p>Contact Krishna Khare :9836609626</p>
    </div>
  );
}

function App() {
  
  return (
    
    <Router>
        <div className="container">
        <nav className="navbar">
          
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <div className="page-content">
        <Routes>
          <Route path="/" element={<TaskContextProvider><Home /></TaskContextProvider>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      </div>
    </Router>
  );
}

export default App;
