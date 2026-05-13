import React from 'react';
import { Search, Bell, Plus } from 'lucide-react';
import styles from '../styles/header.module.css';

const Header = ({ onAddTask }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerTitle}>Inbox</div>
      
      <div className={styles.headerActions}>
        <div style={{ position: 'relative' }}>
          <Search style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={16} />
          <input type="text" placeholder="Search tasks..." className={styles.searchBar} style={{ paddingLeft: '32px' }} />
        </div>
        
        <button className={styles.addTaskBtn} onClick={onAddTask}>
          <Plus size={18} />
          New Task
        </button>
        
        <button style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
          <Bell size={20} />
        </button>
        
        <div className={styles.userProfile}>
          JD
        </div>
      </div>
    </header>
  );
};

export default Header;
