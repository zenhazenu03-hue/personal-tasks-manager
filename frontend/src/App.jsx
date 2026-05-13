import React, { useState } from 'react';
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [appView, setAppView] = useState('landing'); // 'landing', 'login', 'signup', 'dashboard'
  const [activeDashboardPage, setActiveDashboardPage] = useState('inbox');
  const [tasks, setTasks] = useState([]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setAppView('dashboard');
  };

  const handleLogout = () => {
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
      />
      {activeDashboardPage === 'inbox' && <InboxPage tasks={tasks} setTasks={setTasks} setActivePage={setActiveDashboardPage} />}
      {activeDashboardPage === 'mytasks' && <MyTasksPage tasks={tasks} setTasks={setTasks} setActivePage={setActiveDashboardPage} />}
      {activeDashboardPage === 'calendar' && <CalendarPage tasks={tasks} setTasks={setTasks} setActivePage={setActiveDashboardPage} />}
      {activeDashboardPage === 'profile' && <ProfilePage setActivePage={setActiveDashboardPage} />}
      {activeDashboardPage === 'settings' && <SettingsPage setActivePage={setActiveDashboardPage} />}
    </div>
  );
}

export default App;
