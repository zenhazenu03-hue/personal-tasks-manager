import React from 'react';
import Sidebar from './components/Sidebar';
import InboxPage from './pages/InboxPage';
import layoutStyles from './styles/layout.module.css';

function App() {
  return (
    <div className={layoutStyles.appContainer}>
      <Sidebar />
      <InboxPage />
    </div>
  );
}

export default App;
