import React, { useEffect, useState } from 'react';
import { useApp } from '../lib/store.jsx';
import { COUNTRIES } from '../data/countries.js';
import { LEVELS } from '../data/i18n.js';
import { Ico, Modal, toast } from './ui.jsx';

export default function AuthModal() {
  const app = useApp();
  const { t, lang, languages, country, setCountry, level, setLevel, signUp, signIn, verify, emailTaken } = app;
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('signup');
  const [form, setForm] = useState({ name: '', email: '', password: '', lang, country, level });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handler = (e) => {
      const m = e.detail?.mode || 'signup';
      setMode(m);
      setErrors({});
      setForm((f) => ({ ...f, lang, country, level, password: '' }));
      setOpen(true);
    };
    window.addEventListener('darsa:auth', handler);
    return () => window.removeEventListener('darsa:auth', handler);
  }, [lang, country, level]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (mode === 'signup' && form.name.trim().length < 2) errs.name = t('auth_err_name');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) errs.email = t('auth_err_email');
    if (form.password.length < 6) errs.password = t('auth_err_password');
    if (mode === 'signup' && !errs.email && emailTaken(form.email)) errs.email = t('auth_err_exists');
    setErrors(errs);
    if (Object.keys(errs).length) return;

    if (mode === 'signup') {
      signUp({ name: form.name.trim(), email: form.email.trim(), password: form.password, country: form.country, level: form.level, lang: form.lang });
      toast(t('dash_hello'));
      setOpen(false);
    } else {
      const user = verify(form.email, form.password);
      if (!user) {
        setErrors({ password: t('auth_err_wrong') });
        return;
      }
      signIn(user.id);
      setOpen(false);
      toast(t('dash_hello'));
    }
  };

  const switchMode = () => {
    setMode(mode === 'signup' ? 'signin' : 'signup');
    setErrors({});
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)} narrow labelledBy="auth-title">
      <div className="auth-modal">
        <div className="auth-head">
          <div className="row mb-16">
            <span className="brand-mark"><span>✧</span></span>
            <span className="pill pill-mint"><span className="badge-dot" /> {t('brand')}</span>
          </div>
          <h2 id="auth-title">{mode === 'signup' ? t('auth_welcome') : t('nav_signin')}</h2>
          <p>{mode === 'signup' ? t('auth_signup_sub') : t('auth_signin_sub')}</p>
        </div>

        <form className="auth-form" onSubmit={submit} noValidate>
          {mode === 'signup' && (
            <div className="field">
              <label htmlFor="a-name">{t('auth_name')}</label>
              <input id="a-name" className={`input ${errors.name ? 'err' : ''}`} value={form.name} onChange={set('name')} autoComplete="name" placeholder="Sara · سارا" />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>
          )}
          <div className="field">
            <label htmlFor="a-email">{t('auth_email')}</label>
            <input id="a-email" type="email" className={`input ${errors.email ? 'err' : ''}`} value={form.email} onChange={set('email')} autoComplete="email" placeholder="you@school.edu" />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>
          <div className="field">
            <label htmlFor="a-pass">{t('auth_password')}</label>
            <input id="a-pass" type="password" className={`input ${errors.password ? 'err' : ''}`} value={form.password} onChange={set('password')} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} placeholder="••••••••" />
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          {mode === 'signup' && (
            <>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="a-country">{t('auth_country')}</label>
                  <select id="a-country" className="select" value={form.country} onChange={(e) => { setForm((f) => ({ ...f, country: e.target.value })); setCountry(e.target.value); }}>
                    {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.name[lang] || c.name.en}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="a-level">{t('auth_level')}</label>
                  <select id="a-level" className="select" value={form.level} onChange={(e) => { setForm((f) => ({ ...f, level: e.target.value })); setLevel(e.target.value); }}>
                    {LEVELS.map((l) => <option key={l} value={l}>{t(`level_${l}`)}</option>)}
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="a-lang">{t('auth_lang')}</label>
                <select id="a-lang" className="select" value={form.lang} onChange={set('lang')}>
                  {languages.map((l) => <option key={l.code} value={l.code}>{l.flag} {l.label}</option>)}
                </select>
              </div>
            </>
          )}

          <button className="btn btn-primary btn-block mt-8" type="submit">
            {mode === 'signup' ? t('auth_signup') : t('auth_signin')}
            <Ico name="arrow" size={16} />
          </button>
        </form>

        <div className="auth-divider">{t('of')}</div>
        <button className="btn btn-ghost btn-block" onClick={() => setOpen(false)}>{t('auth_guest')}</button>

        <div className="auth-switch">
          {mode === 'signup' ? (
            <button onClick={switchMode}>{t('auth_to_signin')}</button>
          ) : (
            <button onClick={switchMode}>{t('auth_to_signup')}</button>
          )}
        </div>
        <p className="auth-note">{t('auth_demo')}</p>
      </div>
    </Modal>
  );
}
