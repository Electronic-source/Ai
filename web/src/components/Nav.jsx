import React, { useEffect, useMemo, useState } from 'react';
import { useApp } from '../lib/store.jsx';
import { COUNTRIES } from '../data/countries.js';
import { Ico, Avatar, useClickAway, openAuth, toast } from './ui.jsx';
import { coverage } from '../data/i18n.js';

const NAV = [
  { key: 'home', label: 'nav_home' },
  { key: 'library', label: 'nav_library' },
  { key: 'exams', label: 'nav_exams' },
  { key: 'groups', label: 'nav_groups' },
  { key: 'dashboard', label: 'nav_dashboard' },
];

export default function Nav() {
  const { t, lang, setLang, languages, country, setCountry, route, navigate, user, signOut } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(null); // 'lang' | 'country' | 'user' | null
  const [mobile, setMobile] = useState(false);
  const [q, setQ] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobile(false); setMenu(null); }, [route]);

  const close = () => setMenu(null);
  const awayRef = useClickAway(close);

  const currentLang = languages.find((l) => l.code === lang) || languages[0];
  const currentCountry = COUNTRIES.find((c) => c.code === country);
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return COUNTRIES;
    return COUNTRIES.filter((c) => `${c.name.en} ${c.name.fa} ${c.code} ${c.exams.map((e) => e.name.en).join(' ')}`.toLowerCase().includes(needle));
  }, [q]);

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="shell nav-inner">
          <button className="brand" onClick={() => navigate('home')} aria-label={t('brand')}>
            <span className="brand-mark"><span>✧</span></span>
            <span>
              {t('brand')}
              <small>{t('brandTag')}</small>
            </span>
          </button>

          <nav className="nav-links" aria-label="primary">
            {NAV.map((n) => (
              <button key={n.key} className={`nav-link ${route === n.key ? 'active' : ''}`} onClick={() => navigate(n.key)}>
                {t(n.label)}
              </button>
            ))}
          </nav>

          <div className="nav-right" ref={awayRef}>
            <div style={{ position: 'relative' }}>
              <button className="lang-btn" onClick={() => setMenu(menu === 'lang' ? null : 'lang')} aria-haspopup="listbox" aria-expanded={menu === 'lang'}>
                <Ico name="globe" size={15} />
                <span>{currentLang.label}</span>
                <Ico name="chevron" size={13} />
              </button>
              {menu === 'lang' && (
                <div className="menu-pop" role="listbox">
                  <div className="menu-label">{t('nav_language')}</div>
                  <div className="menu-grid">
                    {languages.map((l) => {
                      const cov = coverage(l.code);
                      return (
                        <button key={l.code} className={`menu-item ${l.code === lang ? 'on' : ''}`} onClick={() => { setLang(l.code); close(); if (cov < 60) toast(t('lang_partial_note')); }} role="option" aria-selected={l.code === lang}>
                          <span>{l.flag}</span>
                          <span className="grow">{l.label}</span>
                          <small style={{ fontSize: 9.5, letterSpacing: '0.08em', color: cov === 100 ? 'var(--mint)' : 'var(--muted-2)' }}>
                            {cov === 100 ? t('lang_full') : t('lang_core')}
                          </small>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div style={{ position: 'relative' }} className="hide-sm">
              <button className="lang-btn" onClick={() => setMenu(menu === 'country' ? null : 'country')} aria-haspopup="listbox" aria-expanded={menu === 'country'}>
                <span style={{ fontSize: '1rem', lineHeight: 1 }}>{currentCountry?.flag}</span>
                <span>{currentCountry ? (currentCountry.name[lang] || currentCountry.name.en) : ''}</span>
                <Ico name="chevron" size={13} />
              </button>
              {menu === 'country' && (
                <div className="menu-pop" role="listbox" style={{ minWidth: 290 }}>
                  <div className="menu-label">{t('nav_country')}</div>
                  <input className="input" style={{ margin: '0 4px 8px', width: 'calc(100% - 8px)', padding: '9px 12px' }} placeholder={t('common_search')} value={q} onChange={(e) => setQ(e.target.value)} />
                  {filtered.map((c) => (
                    <button key={c.code} className={`menu-item ${c.code === country ? 'on' : ''}`} onClick={() => { setCountry(c.code); close(); }} role="option" aria-selected={c.code === country}>
                      <span>{c.flag}</span>
                      <span className="grow">{c.name[lang] || c.name.en}</span>
                      <small style={{ opacity: 0.6, fontSize: 11 }}>{c.exams[0]?.name.en}</small>
                    </button>
                  ))}
                  {!filtered.length && <div className="menu-item" style={{ opacity: 0.6 }}>{t('library_empty')}</div>}
                </div>
              )}
            </div>

            {user ? (
              <div style={{ position: 'relative' }}>
                <button className="user-chip" onClick={() => setMenu(menu === 'user' ? null : 'user')} aria-expanded={menu === 'user'}>
                  <Avatar name={user.name} />
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, maxWidth: 110, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</span>
                </button>
                {menu === 'user' && (
                  <div className="menu-pop">
                    <div style={{ padding: '10px 12px 8px' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted-2)' }}>{user.email}</div>
                    </div>
                    <button className="menu-item" onClick={() => { navigate('dashboard'); close(); }}>
                      <Ico name="target" size={15} /> {t('nav_dashboard')}
                    </button>
                    <button className="menu-item" onClick={() => { navigate('groups'); close(); }}>
                      <Ico name="users" size={15} /> {t('nav_groups')}
                    </button>
                    <button className="menu-item" onClick={() => { signOut(); close(); navigate('home'); }}>
                      <Ico name="logout" size={15} /> {t('nav_signout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button className="btn btn-sm btn-ghost hide-sm" onClick={() => openAuth('signin')}>{t('nav_signin')}</button>
                <button className="btn btn-sm btn-primary" onClick={() => openAuth('signup')}>{t('nav_signup')}</button>
              </>
            )}

            <button className="btn btn-icon btn-ghost mobile-toggle" onClick={() => setMobile(true)} aria-label="menu">
              <Ico name="menu" size={18} />
            </button>
          </div>
        </div>
      </header>

      {mobile && (
        <div className="mobile-sheet">
          <div className="row-between mb-24">
            <span className="brand"><span className="brand-mark"><span>✧</span></span><span>{t('brand')}</span></span>
            <button className="btn btn-icon btn-ghost" onClick={() => setMobile(false)} aria-label="close"><Ico name="close" size={18} /></button>
          </div>
          {NAV.map((n) => (
            <button key={n.key} className={`nav-link ${route === n.key ? 'active' : ''}`} style={{ width: '100%', textAlign: 'start' }} onClick={() => navigate(n.key)}>
              {t(n.label)}
            </button>
          ))}
          <div className="mt-24">
            <div className="mini-label mb-8">{t('nav_language')}</div>
            <div className="chips">
              {languages.map((l) => (
                <button key={l.code} className={`chip ${l.code === lang ? 'on' : ''}`} onClick={() => setLang(l.code)}>{l.flag} {l.label}</button>
              ))}
            </div>
          </div>
          <div className="mt-24">
            <div className="mini-label mb-8">{t('nav_country')}</div>
            <div className="chips" style={{ maxHeight: 200, overflow: 'auto' }}>
              {COUNTRIES.map((c) => (
                <button key={c.code} className={`chip ${c.code === country ? 'on' : ''}`} onClick={() => setCountry(c.code)}>{c.flag} {c.name[lang] || c.name.en}</button>
              ))}
            </div>
          </div>
          {!user && (
            <div className="stack mt-24">
              <button className="btn btn-primary btn-block" onClick={() => { setMobile(false); openAuth('signup'); }}>{t('nav_signup')}</button>
              <button className="btn btn-ghost btn-block" onClick={() => { setMobile(false); openAuth('signin'); }}>{t('nav_signin')}</button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
