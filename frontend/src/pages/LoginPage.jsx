import React, { useState } from 'react';
import styles from '../styles/login.module.css';
import loginImg from '../assets/login_page.jpg';
import { Mail, Lock, Layout, Github, Chrome, Facebook, User, ArrowLeft } from 'lucide-react';

const LoginPage = ({ onLogin, setView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className={styles.loginPage}>
      {/* Login Navbar */}
      <nav className={styles.nav}>
        <div className={styles.logo} onClick={() => setView('landing')}>
          <Layout size={24} />
          <span>FlowDesk</span>
        </div>
        <div className={styles.navRight}>
          <div className={styles.userIconWrapper} onClick={() => setView('signup')} title="Create an account">
            <User size={20} />
          </div>
        </div>
      </nav>

      <main className={styles.main}>
        {/* Left Side: Illustration & Promo */}
        <div className={styles.leftSide}>
          <div className={styles.illustrationWrapper}>
            <img 
              src={loginImg} 
              alt="Login Workspace" 
              style={{ 
                width: '100%', 
                borderRadius: '24px', 
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                marginBottom: '2.5rem'
              }} 
            />
            <h2 className={styles.promoTitle}>Simplify your workflow and boost your focus.</h2>
            <p className={styles.promoText}>
              Join over 10,000+ professionals who use FlowDesk to manage their tasks, 
              collaborate with teams, and achieve their goals faster.
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className={styles.rightSide}>
          <div className={styles.formContainer}>
            <div className={styles.header}>
              <h1 className={styles.title}>Welcome back</h1>
              <p className={styles.subtitle}>Enter your credentials to access your workspace.</p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Email Address</label>
                <div className={styles.inputWrapper}>
                  <Mail className={styles.icon} size={18} />
                  <input 
                    type="email" 
                    className={styles.input} 
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Password</label>
                <div className={styles.inputWrapper}>
                  <Lock className={styles.icon} size={18} />
                  <input 
                    type="password" 
                    className={styles.input} 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <a href="#" className={styles.forgotPassword}>Forgot password?</a>
              </div>

              <button type="submit" className={styles.submitBtn}>
                Sign in to Dashboard
              </button>
            </form>

            <div className={styles.divider}>Or continue with</div>

            <div className={styles.socialButtonGroup}>
              <button className={`${styles.socialBtn} ${styles.googleBtn}`}>
                <Chrome size={20} />
                <span>Google</span>
              </button>
              <button className={`${styles.socialBtn} ${styles.facebookBtn}`}>
                <Facebook size={20} />
                <span>Facebook</span>
              </button>
            </div>

            <div className={styles.footer}>
              <a href="#" className={styles.footerLink}>Privacy Policy</a>
              <a href="#" className={styles.footerLink}>Terms of Service</a>
              <a href="#" className={styles.footerLink}>Help Center</a>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
               <button 
                onClick={() => setView('landing')}
                style={{ color: '#64748b', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 auto' }}
              >
                <ArrowLeft size={16} /> Back to home
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
