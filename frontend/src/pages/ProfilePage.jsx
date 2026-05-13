import React, { useState } from 'react';
import { Camera, Save, Mail, User as UserIcon, MapPin, Briefcase } from 'lucide-react';
import Header from '../components/Header';
import styles from '../styles/profile.module.css';
import layoutStyles from '../styles/layout.module.css';

const ProfilePage = ({ setActivePage }) => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Product Designer',
    location: 'San Francisco, CA',
    bio: 'Passionate about creating elegant solutions for complex problems. Currently focused on building productivity tools.'
  });

  const stats = [
    { label: 'Tasks Done', value: '128' },
    { label: 'Projects', value: '12' },
    { label: 'Streak', value: '15' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert('Profile updated successfully!');
  };

  return (
    <div className={layoutStyles.mainContent}>
      <Header 
        title="Profile" 
        onAddTask={() => {}} 
        onProfileClick={() => setActivePage('profile')} 
      />
      
      <div className={styles.profileContainer}>
        <div className={styles.profileHero}></div>
        
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatar}>
                {profile.name.charAt(0)}
              </div>
              <button className={styles.editAvatarBtn} title="Change Avatar">
                <Camera size={20} />
              </button>
            </div>
            <div className={styles.userBasicInfo}>
              <h2>{profile.name}</h2>
              <p>{profile.email}</p>
            </div>
          </div>

          <div className={styles.statsGrid}>
            {stats.map((stat, i) => (
              <div key={i} className={styles.statItem}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
          
          <div className={styles.profileForm}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  name="name"
                  className={styles.formInput} 
                  value={profile.name}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email Address</label>
              <input 
                type="email" 
                name="email"
                className={styles.formInput} 
                value={profile.email}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Role / Position</label>
              <input 
                type="text" 
                name="role"
                className={styles.formInput} 
                value={profile.role}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Location</label>
              <input 
                type="text" 
                name="location"
                className={styles.formInput} 
                value={profile.location}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </div>
            
            <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
              <label className={styles.formLabel}>Bio</label>
              <textarea 
                name="bio"
                className={styles.formInput} 
                style={{ minHeight: '100px', resize: 'vertical', width: '100%' }}
                value={profile.bio}
                onChange={handleChange}
              ></textarea>
            </div>
            
            <button className={styles.saveBtn} onClick={handleSave}>
              <Save size={20} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
