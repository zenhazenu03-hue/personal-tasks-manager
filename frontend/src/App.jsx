import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import InboxPage from './pages/InboxPage';
import MyTasksPage from './pages/MyTasksPage';
import CalendarPage from './pages/CalendarPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import layoutStyles from './styles/layout.module.css';
import { tasksApi } from './utils/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [appView, setAppView] = useState('landing'); // 'landing', 'login', 'signup', 'dashboard'
  const [activeDashboardPage, setActiveDashboardPage] = useState('inbox');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check for existing token
    const token = localStorage.getItem('flowdesk_token');
    const storedUser = localStorage.getItem('flowdesk_user');
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
      setAppView('dashboard');
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated]);

  // Auto-logout when the API receives a 401 (expired/invalid token)
  useEffect(() => {
    const onUnauthorized = () => handleLogout();
    window.addEventListener('flowdesk:unauthorized', onUnauthorized);
    return () => window.removeEventListener('flowdesk:unauthorized', onUnauthorized);
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await tasksApi.getAll();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      if (error.message.includes('authorized')) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTask = async (taskData) => {
    try {
      // If taskData has a MongoDB _id, it's an update; otherwise create
      if (taskData._id) {
        const updated = await tasksApi.update(taskData._id, taskData);
        setTasks(prev => prev.map(t => (t._id === updated._id ? updated : t)));
      } else {
        const newTask = await tasksApi.create(taskData);
        setTasks(prev => [newTask, ...prev]);
      }
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await tasksApi.delete(id);
      setTasks(prev => prev.filter(t => t._id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleLogin = (userData, token) => {
    if (token) {
      localStorage.setItem('flowdesk_token', token);
      localStorage.setItem('flowdesk_user', JSON.stringify(userData));
    }
    setUser(userData);
    setIsAuthenticated(true);
    setAppView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('flowdesk_token');
    localStorage.removeItem('flowdesk_user');
    setUser(null);
    setIsAuthenticated(false);
    setAppView('landing');
  };

  if (!isAuthenticated) {
    if (appView === 'login') {
      return <LoginPage onLogin={handleLogin} setView={setAppView} />;
    }
    if (appView === 'signup') {
      return <SignupPage onSignup={handleLogin} setView={setAppView} />;
    }
    return <LandingPage setView={setAppView} />;
  }

  return (
    <div className={layoutStyles.appContainer}>
      <Sidebar 
        activePage={activeDashboardPage} 
        setActivePage={setActiveDashboardPage} 
        onLogout={handleLogout}
        user={user}
      />
      {activeDashboardPage === 'inbox' && (
        <InboxPage 
          tasks={tasks} 
          onSaveTask={handleSaveTask} 
          onDeleteTask={handleDeleteTask} 
          setActivePage={setActiveDashboardPage} 
          loading={loading} 
        />
      )}
      {activeDashboardPage === 'mytasks' && (
        <MyTasksPage 
          tasks={tasks} 
          onSaveTask={handleSaveTask} 
          onDeleteTask={handleDeleteTask} 
          setActivePage={setActiveDashboardPage} 
          loading={loading} 
        />
      )}
      {activeDashboardPage === 'calendar' && (
        <CalendarPage 
          tasks={tasks} 
          onSaveTask={handleSaveTask} 
          onDeleteTask={handleDeleteTask} 
          setActivePage={setActiveDashboardPage} 
          loading={loading} 
        />
      )}
      {activeDashboardPage === 'profile' && <ProfilePage user={user} setActivePage={setActiveDashboardPage} />}
      {activeDashboardPage === 'settings' && <SettingsPage user={user} setActivePage={setActiveDashboardPage} />}
    </div>
  );
}

export default App;
