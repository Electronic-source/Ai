import React, { useEffect, useState } from 'react';
import { useApp } from './lib/store.jsx';
import Nav from './components/Nav.jsx';
import Landing from './components/Landing.jsx';
import Library from './components/Library.jsx';
import ExamStudio from './components/ExamStudio.jsx';
import Groups from './components/Groups.jsx';
import Dashboard from './components/Dashboard.jsx';
import AuthModal from './components/AuthModal.jsx';
import { Ico, Toasts, openAuth } from './components/ui.jsx';
import { COUNTRIES } from './data/countries.js';

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return (
    <div style={{ position: 'fixed', top: 0, insetInline: 0, height: 2, zIndex: 100, pointerEvents: 'none' }}>
      <div style={{ height: '100%', width: `${p}%`, background: 'var(--grad)', transition: 'width 0.15s linear', opacity: 0.85 }} />
    </div>
  );
}

function Footer() {
  const { t, lang, navigate, setLang, languages, setCountry } = useApp();
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-top">
          <div style={{ maxWidth: 300 }}>
            <span className="brand mb-16" style={{ display: 'inline-flex' }}>
              <span className="brand-mark"><span>✧</span></span>
              <span>{t('brand')}<small>{t('brandTag')}</small></span>
            </span>
            <p className="fs-82 muted mt-16">{t('footer_built')}</p>
            <p className="fs-76 mt-16" style={{ color: 'var(--muted-2)' }}>{t('footer_note')}</p>
          </div>

          <div className="footer-cols">
            <div className="footer-col">
              <h5>{t('brand')}</h5>
              <button onClick={() => navigate('library')}>{t('nav_library')}</button>
              <button onClick={() => navigate('exams')}>{t('nav_exams')}</button>
              <button onClick={() => navigate('groups')}>{t('nav_groups')}</button>
              <button onClick={() => navigate('dashboard')}>{t('nav_dashboard')}</button>
              <button onClick={() => openAuth('signup')}>{t('nav_signup')}</button>
            </div>
            <div className="footer-col">
              <h5>{t('nav_language')}</h5>
              {languages.slice(0, 7).map((l) => (
                <button key={l.code} onClick={() => setLang(l.code)}>{l.flag} {l.label}</button>
              ))}
            </div>
            <div className="footer-col">
              <h5>{t('nav_country')}</h5>
              {COUNTRIES.slice(0, 7).map((c) => (
                <button key={c.code} onClick={() => { setCountry(c.code); navigate('library'); }}>{c.flag} {c.name[lang] || c.name.en}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {t('brand')} · {t('brandTag')}</span>
          <span className="row" style={{ gap: 14 }}>
            <span><Ico name="globe" size={12} style={{ verticalAlign: '-1px', marginInlineEnd: 4 }} />{COUNTRIES.length} {t('common_countries')}</span>
            <span><Ico name="book" size={12} style={{ verticalAlign: '-1px', marginInlineEnd: 4 }} />{t('stat_lessons')}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const { route } = useApp();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, [route]);

  const view = (() => {
    switch (route) {
      case 'library': return <Library />;
      case 'exams': return <ExamStudio />;
      case 'groups': return <Groups />;
      case 'dashboard': return <Dashboard />;
      default: return <Landing />;
    }
  })();

  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>{view}</main>
      <Footer />
      <AuthModal />
      <Toasts />
    </>
  );
}
