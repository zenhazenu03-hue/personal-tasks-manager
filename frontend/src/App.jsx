import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import InboxPage from './pages/InboxPage';
import MyTasksPage from './pages/MyTasksPage';
import CalendarPage from './pages/CalendarPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import layoutStyles from './styles/layout.module.css';

function App() {
  const [activePage, setActivePage] = useState('inbox');
  const [tasks, setTasks] = useState([]);

  return (
    <div className={layoutStyles.appContainer}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      {activePage === 'inbox' && <InboxPage tasks={tasks} setTasks={setTasks} setActivePage={setActivePage} />}
      {activePage === 'mytasks' && <MyTasksPage tasks={tasks} setTasks={setTasks} setActivePage={setActivePage} />}
      {activePage === 'calendar' && <CalendarPage tasks={tasks} setTasks={setTasks} setActivePage={setActivePage} />}
      {activePage === 'profile' && <ProfilePage setActivePage={setActivePage} />}
      {activePage === 'settings' && <SettingsPage setActivePage={setActivePage} />}
    </div>
  );
}

export default App;
