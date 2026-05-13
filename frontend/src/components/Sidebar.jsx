import React from 'react';
import { LayoutDashboard, CheckSquare, Settings, Calendar, Plus } from 'lucide-react';
import styles from '../styles/sidebar.module.css';

const Sidebar = () => {
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
          <li className={`${styles.navItem} ${styles.navItemActive}`}>
            <LayoutDashboard className={styles.navIcon} />
            <span className={styles.navText}>Inbox</span>
          </li>
          <li className={styles.navItem}>
            <CheckSquare className={styles.navIcon} />
            <span className={styles.navText}>My Tasks</span>
          </li>
          <li className={styles.navItem}>
            <Calendar className={styles.navIcon} />
            <span className={styles.navText}>Calendar</span>
          </li>
          <li className={styles.navItem}>
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
    </aside>
  );
};

export default Sidebar;
