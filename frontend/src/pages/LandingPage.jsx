import React from 'react';
import styles from '../styles/landing.module.css';
import loginImg from '../assets/login_page.jpg';
import { 
  CheckCircle2, Calendar, Layout, ArrowRight, Zap, 
  Shield, Users, Star, Github, Twitter, Linkedin, Mail 
} from 'lucide-react';

const LandingPage = ({ setView }) => {
  return (
    <div className={styles.landingContainer}>
      {/* Navbar */}
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Layout size={28} />
          <span>FlowDesk</span>
        </div>
        <div className={styles.navLinks}>
          <a href="#features" className={styles.navLink}>Features</a>
          <a href="#about" className={styles.navLink}>Why FlowDesk</a>
          <a href="#pricing" className={styles.navLink}>Pricing</a>
          <button className={styles.loginBtn} onClick={() => setView('login')}>Log in</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className={`${styles.section} ${styles.hero}`}>
        <div className={styles.badge}>
          <Zap size={14} />
          <span>Reimagining productivity for the modern era</span>
        </div>
        <h1 className={styles.title}>
          Master your work,<br />one task at a time.
        </h1>
        <p className={styles.subtitle}>
          The simple, beautiful, and powerful task manager for teams who 
          want to focus on what matters. Organize your life and skyrocket your productivity.
        </p>
        
        <div className={styles.ctaGroup}>
          <button className={styles.primaryBtn} onClick={() => setView('login')}>
            Get Started for Free
          </button>
          <button className={styles.secondaryBtn}>
            Explore Features
          </button>
        </div>
      </header>

      {/* How It Works Section */}
      <section className={styles.howItWorks}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Workflow</span>
          <h2 className={styles.sectionTitle}>Get started in 3 simple steps</h2>
        </div>
        <div className={styles.stepsGrid}>
          <div className={styles.stepItem}>
            <div className={styles.stepNumber}>1</div>
            <h3 className={styles.stepTitle}>Create an Account</h3>
            <p className={styles.stepDesc}>Sign up for free and set up your personal or team workspace in seconds.</p>
          </div>
          <div className={styles.stepItem}>
            <div className={styles.stepNumber}>2</div>
            <h3 className={styles.stepTitle}>Organize Tasks</h3>
            <p className={styles.stepDesc}>Add your tasks, set priorities, and organize them into beautiful boards.</p>
          </div>
          <div className={styles.stepItem}>
            <div className={styles.stepNumber}>3</div>
            <h3 className={styles.stepTitle}>Boost Productivity</h3>
            <p className={styles.stepDesc}>Track your progress and complete your goals with our intuitive interface.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`${styles.section} ${styles.featuresSection}`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Features</span>
          <h2 className={styles.sectionTitle}>Everything you need to stay on track</h2>
          <p className={styles.featureDesc}>Powerful tools designed to help you organize, prioritize, and execute your best work.</p>
        </div>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <CheckCircle2 size={32} />
            </div>
            <h3 className={styles.featureTitle}>Intelligent Tasks</h3>
            <p className={styles.featureDesc}>
              Smart task creation with natural language processing, priority levels, and custom tags.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <Calendar size={32} />
            </div>
            <h3 className={styles.featureTitle}>Dynamic Calendar</h3>
            <p className={styles.featureDesc}>
              Drag-and-drop scheduling that syncs across all your devices in real-time.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <Users size={32} />
            </div>
            <h3 className={styles.featureTitle}>Team Collaboration</h3>
            <p className={styles.featureDesc}>
              Share projects, assign tasks, and communicate with your team in one unified space.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <Shield size={32} />
            </div>
            <h3 className={styles.featureTitle}>Bank-Level Security</h3>
            <p className={styles.featureDesc}>
              Your data is encrypted with AES-256 and backed up hourly. Your privacy is our priority.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <Zap size={32} />
            </div>
            <h3 className={styles.featureTitle}>Blazing Fast</h3>
            <p className={styles.featureDesc}>
              Built for speed. No loading spinners. Just instant performance so you can keep moving.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <Star size={32} />
            </div>
            <h3 className={styles.featureTitle}>Custom Themes</h3>
            <p className={styles.featureDesc}>
              Personalize your workspace with beautiful light and dark modes tailored to your style.
            </p>
          </div>
        </div>
      </section>

      {/* Why FlowDesk (About) Section */}
      <section id="about" className={`${styles.section} ${styles.aboutSection}`}>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutText}>
            <span className={styles.sectionTag}>Why FlowDesk</span>
            <h2 className={styles.sectionTitle}>Designed for the way you work</h2>
            <p className={styles.subtitle} style={{ textAlign: 'left' }}>
              FlowDesk isn't just another task manager. It's a comprehensive workspace 
              designed to eliminate distractions and help you focus on your most important work.
            </p>
            <ul className={styles.planFeatures} style={{ marginBottom: '2.5rem' }}>
              <li className={styles.planFeature}><CheckCircle2 size={20} /> Instant sync across all devices</li>
              <li className={styles.planFeature}><CheckCircle2 size={20} /> Offline mode for work on the go</li>
              <li className={styles.planFeature}><CheckCircle2 size={20} /> Deep integrations with your favorite tools</li>
            </ul>
            <button className={styles.primaryBtn} onClick={() => setView('login')}>Learn More</button>
          </div>
          <div className={styles.aboutImageContainer}>
             <img 
              src={loginImg} 
              alt="FlowDesk Interface" 
              className={styles.aboutImage}
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className={`${styles.section} ${styles.pricingSection}`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Pricing</span>
          <h2 className={styles.sectionTitle}>Choose the plan that fits you</h2>
          <p className={styles.featureDesc}>Simple, transparent pricing for everyone.</p>
        </div>

        <div className={styles.pricingGrid}>
          {/* Free Plan */}
          <div className={styles.pricingCard}>
            <h3 className={styles.planName}>Personal</h3>
            <div className={styles.planPrice}>$0<span>/mo</span></div>
            <ul className={styles.planFeatures}>
              <li className={styles.planFeature}><CheckCircle2 size={18} /> Up to 5 projects</li>
              <li className={styles.planFeature}><CheckCircle2 size={18} /> Unlimited tasks</li>
              <li className={styles.planFeature}><CheckCircle2 size={18} /> Basic reminders</li>
            </ul>
            <button className={styles.planBtnSecondary} onClick={() => setView('signup')}>Get Started</button>
          </div>

          {/* Pro Plan */}
          <div className={`${styles.pricingCard} ${styles.pricingCardPopular}`}>
            <div className={styles.popularBadge}>Most Popular</div>
            <h3 className={styles.planName}>Professional</h3>
            <div className={styles.planPrice}>$12<span>/mo</span></div>
            <ul className={styles.planFeatures}>
              <li className={styles.planFeature}><CheckCircle2 size={18} /> Unlimited projects</li>
              <li className={styles.planFeature}><CheckCircle2 size={18} /> Advanced analytics</li>
              <li className={styles.planFeature}><CheckCircle2 size={18} /> Custom themes</li>
              <li className={styles.planFeature}><CheckCircle2 size={18} /> Priority support</li>
            </ul>
            <button className={styles.planBtnPrimary} onClick={() => setView('signup')}>Start Free Trial</button>
          </div>

          {/* Team Plan */}
          <div className={styles.pricingCard}>
            <h3 className={styles.planName}>Team</h3>
            <div className={styles.planPrice}>$49<span>/mo</span></div>
            <ul className={styles.planFeatures}>
              <li className={styles.planFeature}><CheckCircle2 size={18} /> Unlimited members</li>
              <li className={styles.planFeature}><CheckCircle2 size={18} /> Shared workspaces</li>
              <li className={styles.planFeature}><CheckCircle2 size={18} /> Team permissions</li>
              <li className={styles.planFeature}><CheckCircle2 size={18} /> 24/7 Support</li>
            </ul>
            <button className={styles.planBtnSecondary} onClick={() => setView('signup')}>Contact Sales</button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Ready to boost your productivity?</h2>
          <p className={styles.subtitle}>Join thousands of users who have transformed the way they work with FlowDesk.</p>
          <button className={styles.primaryBtn} onClick={() => setView('login')}>
            Start Your Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <div className={styles.logo}>
              <Layout size={24} />
              <span>FlowDesk</span>
            </div>
            <p className={styles.footerDesc}>
              The ultimate productivity companion for individuals and teams. Built with love by the FlowDesk team.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialIcon}><Twitter size={20} /></a>
              <a href="#" className={styles.socialIcon}><Github size={20} /></a>
              <a href="#" className={styles.socialIcon}><Linkedin size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className={styles.footerHeading}>Product</h4>
            <ul className={styles.footerLinks}>
              <li><a href="#features" className={styles.footerLink}>Features</a></li>
              <li><a href="#" className={styles.footerLink}>Pricing</a></li>
              <li><a href="#" className={styles.footerLink}>Mobile App</a></li>
              <li><a href="#" className={styles.footerLink}>Desktop App</a></li>
            </ul>
          </div>

          <div>
            <h4 className={styles.footerHeading}>Company</h4>
            <ul className={styles.footerLinks}>
              <li><a href="#" className={styles.footerLink}>About Us</a></li>
              <li><a href="#" className={styles.footerLink}>Careers</a></li>
              <li><a href="#" className={styles.footerLink}>Blog</a></li>
              <li><a href="#" className={styles.footerLink}>Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className={styles.footerHeading}>Stay Updated</h4>
            <p className={styles.footerDesc}>Subscribe to our newsletter for the latest updates and productivity tips.</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="email" 
                placeholder="Enter email" 
                style={{ 
                  padding: '0.6rem 1rem', 
                  borderRadius: '10px', 
                  border: '1px solid #e2e8f0',
                  flex: 1
                }} 
              />
              <button className={styles.primaryBtn} style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
                Join
              </button>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© 2026 FlowDesk Inc. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#" className={styles.footerLink}>Privacy Policy</a>
            <a href="#" className={styles.footerLink}>Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
