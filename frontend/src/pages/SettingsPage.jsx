import React, { useState } from 'react';
import { Settings, Bell, Globe, Lock, Shield, Palette, User, Volume2, Monitor } from 'lucide-react';
import Header from '../components/Header';
import styles from '../styles/settings.module.css';
import layoutStyles from '../styles/layout.module.css';

const SettingsPage = ({ setActivePage }) => {
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: false,
    darkMode: false,
    language: 'English',
    privacy: 'Private',
    sound: true,
    compactView: false,
    autoSave: true
  });

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const sidebarItems = [
    { id: 'general', label: 'General', icon: <Settings size={20} /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
    { id: 'privacy', label: 'Privacy & Security', icon: <Shield size={20} /> },
  ];

  return (
    <div className={layoutStyles.mainContent}>
      <Header 
        title="Settings" 
        onAddTask={() => {}} 
        onProfileClick={() => setActivePage('profile')} 
      />
      
      <div className={styles.settingsContainer}>
        <div className={styles.settingsHero}>
          <h1>Settings</h1>
          <p>Manage your account preferences and application settings.</p>
        </div>

        <div className={styles.settingsGrid}>
          <div className={styles.settingsSidebar}>
            {sidebarItems.map(item => (
              <div 
                key={item.id} 
                className={`${styles.sidebarItem} ${activeSection === item.id ? styles.sidebarItemActive : ''}`}
                onClick={() => setActiveSection(item.id)}
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className={styles.settingsContent}>
            {/* General Section */}
            {activeSection === 'general' && (
              <div className={styles.settingsSection}>
                <div className={styles.sectionHeader}>
                  <Globe size={22} color="var(--primary-color)" />
                  <span className={styles.sectionTitle}>General Settings</span>
                </div>
                <div className={styles.settingsList}>
                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <span className={styles.settingLabel}>Language</span>
                      <span className={styles.settingDesc}>Select your preferred interface language.</span>
                    </div>
                    <select className={styles.selectInput} value={settings.language} onChange={(e) => setSettings({...settings, language: e.target.value})}>
                      <option>English (US)</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <span className={styles.settingLabel}>Auto-save</span>
                      <span className={styles.settingDesc}>Automatically save changes as you type.</span>
                    </div>
                    <label className={styles.toggle}>
                      <input type="checkbox" checked={settings.autoSave} onChange={() => handleToggle('autoSave')} />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Section */}
            {activeSection === 'appearance' && (
              <div className={styles.settingsSection}>
                <div className={styles.sectionHeader}>
                  <Palette size={22} color="var(--primary-color)" />
                  <span className={styles.sectionTitle}>Appearance</span>
                </div>
                <div className={styles.settingsList}>
                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <span className={styles.settingLabel}>Dark Mode</span>
                      <span className={styles.settingDesc}>Switch between light and dark themes.</span>
                    </div>
                    <label className={styles.toggle}>
                      <input type="checkbox" checked={settings.darkMode} onChange={() => handleToggle('darkMode')} />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <span className={styles.settingLabel}>Compact View</span>
                      <span className={styles.settingDesc}>Show more content with less whitespace.</span>
                    </div>
                    <label className={styles.toggle}>
                      <input type="checkbox" checked={settings.compactView} onChange={() => handleToggle('compactView')} />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Section */}
            {activeSection === 'notifications' && (
              <div className={styles.settingsSection}>
                <div className={styles.sectionHeader}>
                  <Bell size={22} color="var(--primary-color)" />
                  <span className={styles.sectionTitle}>Notifications</span>
                </div>
                <div className={styles.settingsList}>
                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <span className={styles.settingLabel}>Desktop Notifications</span>
                      <span className={styles.settingDesc}>Get real-time alerts on your desktop.</span>
                    </div>
                    <label className={styles.toggle}>
                      <input type="checkbox" checked={settings.notifications} onChange={() => handleToggle('notifications')} />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <span className={styles.settingLabel}>Sound Effects</span>
                      <span className={styles.settingDesc}>Play sounds for reminders and completion.</span>
                    </div>
                    <label className={styles.toggle}>
                      <input type="checkbox" checked={settings.sound} onChange={() => handleToggle('sound')} />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Section */}
            {activeSection === 'privacy' && (
              <div className={styles.settingsSection}>
                <div className={styles.sectionHeader}>
                  <Shield size={22} color="var(--primary-color)" />
                  <span className={styles.sectionTitle}>Privacy & Security</span>
                </div>
                <div className={styles.settingsList}>
                  <div className={styles.settingItem}>
                    <div className={styles.settingInfo}>
                      <span className={styles.settingLabel}>Profile Visibility</span>
                      <span className={styles.settingDesc}>Choose who can see your profile and activity.</span>
                    </div>
                    <select className={styles.selectInput} value={settings.privacy} onChange={(e) => setSettings({...settings, privacy: e.target.value})}>
                      <option>Private</option>
                      <option>Team Only</option>
                      <option>Public</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
