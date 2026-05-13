import React, { useState } from 'react';
import styles from '../styles/login.module.css';
import { Mail, Lock, Layout, Github, Chrome, Facebook, User, ArrowLeft, UserPlus } from 'lucide-react';
import { authApi } from '../utils/api';

const SignupPage = ({ onSignup, setView }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await authApi.register({ name, email, password });
      // After registration, log them in or redirect to login
      const loginData = await authApi.login({ email, password });
      onSignup(loginData.user, loginData.token);
    } catch (err) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      {/* Signup Navbar */}
      <nav className={styles.nav}>
        <div className={styles.logo} onClick={() => setView('landing')}>
          <Layout size={24} />
          <span>FlowDesk</span>
        </div>
        <div className={styles.navRight}>
          <div className={styles.userIconWrapper} onClick={() => setView('login')} title="Log in to your account">
            <User size={20} />
          </div>
        </div>
      </nav>

      <main className={styles.main}>
        {/* Left Side: Illustration & Promo */}
        <div className={styles.leftSide}>
          <div className={styles.illustrationWrapper}>
            <h2 className={styles.promoTitle}>Start your journey with FlowDesk today.</h2>
            <p className={styles.promoText}>
              Create your free account and discover why thousands of professionals 
              choose FlowDesk for their daily productivity.
            </p>
            <div style={{ 
              background: 'white', 
              padding: '2rem', 
              border: '1px solid #f1f5f9',
              borderRadius: '24px', 
              boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
            }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '40px', height: '40px', background: '#eff6ff', borderRadius: '50%' }}></div>
                <div style={{ height: '12px', width: '40%', background: '#f1f5f9', borderRadius: '6px' }}></div>
              </div>
              <div style={{ height: '12px', width: '80%', background: '#eef2ff', borderRadius: '6px' }}></div>
            </div>
          </div>
        </div>

        {/* Right Side: Signup Form */}
        <div className={styles.rightSide}>
          <div className={styles.formContainer}>
            <div className={styles.header}>
              <h1 className={styles.title}>Create account</h1>
              <p className={styles.subtitle}>Sign up for free and start organizing your tasks.</p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Full Name</label>
                <div className={styles.inputWrapper}>
                  <User size={18} className={styles.icon} />
                  <input 
                    type="text" 
                    className={styles.input} 
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

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
                    placeholder="Min. 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && <div style={{ color: '#ef4444', fontSize: '0.875rem', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

              <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create Free Account'}
              </button>
            </form>

            <div className={styles.divider}>Or sign up with</div>

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
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
               <button 
                onClick={() => setView('login')}
                style={{ color: '#64748b', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 auto' }}
              >
                 Already have an account? <span style={{ color: '#2563eb', fontWeight: '700' }}>Log in</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
