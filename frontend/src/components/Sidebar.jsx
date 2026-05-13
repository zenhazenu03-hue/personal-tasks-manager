import React from 'react';
import { LayoutDashboard, CheckSquare, Settings, Calendar, Plus, User, LogOut } from 'lucide-react';
import styles from '../styles/sidebar.module.css';

const Sidebar = ({ activePage, setActivePage, onLogout }) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarLogoContainer}>
        <div className={styles.sidebarLogo}>
          <CheckSquare color="var(--primary-color)" className={styles.logoIcon} />
          <span className={styles.logoText}>Flow Desk</span>
        </div>
      </div>

      <nav className={styles.sidebarNav}>
        <ul>
          <li 
            className={`${styles.navItem} ${activePage === 'inbox' ? styles.navItemActive : ''}`}
            onClick={() => setActivePage('inbox')}
          >
            <LayoutDashboard className={styles.navIcon} />
            <span className={styles.navText}>Inbox</span>
          </li>
          <li 
            className={`${styles.navItem} ${activePage === 'mytasks' ? styles.navItemActive : ''}`}
            onClick={() => setActivePage('mytasks')}
          >
            <CheckSquare className={styles.navIcon} />
            <span className={styles.navText}>My Tasks</span>
          </li>
          <li 
            className={`${styles.navItem} ${activePage === 'calendar' ? styles.navItemActive : ''}`}
            onClick={() => setActivePage('calendar')}
          >
            <Calendar className={styles.navIcon} />
            <span className={styles.navText}>Calendar</span>
          </li>
          <li 
            className={`${styles.navItem} ${activePage === 'profile' ? styles.navItemActive : ''}`}
            onClick={() => setActivePage('profile')}
          >
            <User className={styles.navIcon} />
            <span className={styles.navText}>Profile</span>
          </li>
          <li 
            className={`${styles.navItem} ${activePage === 'settings' ? styles.navItemActive : ''}`}
            onClick={() => setActivePage('settings')}
          >
            <Settings className={styles.navIcon} />
            <span className={styles.navText}>Settings</span>
          </li>
        </ul>

        <div className={styles.projectsSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Projects</span>
          </div>
          <ul>
            <li className={styles.navItem}>
              <Plus className={styles.navIcon} />
              <span className={styles.navText}>Create Project</span>
            </li>
          </ul>
        </div>
      </nav>

      <div className={styles.sidebarFooter}>
        <div className={styles.navItem} onClick={onLogout}>
          <LogOut className={styles.navIcon} />
          <span className={styles.navText}>Log Out</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
