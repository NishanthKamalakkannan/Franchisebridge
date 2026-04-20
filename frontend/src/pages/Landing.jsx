import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Storefront, Brain, ChartBar, MapPin, Star, Lightning, Users, ShieldCheck } from '@phosphor-icons/react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const HERO_IMAGE = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200";

const STEPS = [
  { n: '01', title: 'Readiness Quiz', desc: 'Define your budget, location, and business goals.', icon: <Users size={28} weight="duotone" color="var(--primary)" /> },
  { n: '02', title: 'AI Matching', desc: 'Our logic engine ranks franchises by fit for you.', icon: <Brain size={28} weight="duotone" color="var(--primary)" /> },
  { n: '03', title: 'Viability Index', desc: 'Score models from 0–100 with detailed risk levels.', icon: <ChartBar size={28} weight="duotone" color="var(--primary)" /> },
  { n: '04', title: 'AI Advisor', desc: 'Ask complex questions about any business model.', icon: <Lightning size={28} weight="duotone" color="var(--primary)" /> },
  { n: '05', title: 'Roadmap', desc: 'A step-by-step checklist from contract to launch.', icon: <Star size={28} weight="duotone" color="var(--primary)" /> },
];

const WHY = [
  { title: 'Intelligent Guidance', sub: 'Beyond a directory', desc: 'A sophisticated advisor that steers you through complex business decisions.', icon: <ShieldCheck size={32} weight="duotone" /> },
  { title: 'Data-Driven Risk', sub: '0–100 score', desc: 'Objective analysis based on CAPEX, ROI, and localized market saturation.', icon: <ChartBar size={32} weight="duotone" /> },
  { title: 'Precision Match', sub: 'AI Logic', desc: 'No more generic lists. We find the business that actually fits your life.', icon: <Lightning size={32} weight="duotone" /> },
  { title: 'Zone Intelligence', sub: 'Chennai-specific', desc: 'Live demand vs. saturation data for every major Chennai corridor.', icon: <MapPin size={32} weight="duotone" /> },
];

export default function Landing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 130, categories: 6 });
  const [featuredFranchises, setFeaturedFranchises] = useState([]);

  useEffect(() => {
    axios.get(`${API}/franchises?limit=6`).then(r => {
      setFeaturedFranchises(r.data.franchises || []);
      setStats(s => ({ ...s, total: r.data.total || 130 }));
    }).catch(() => {});
  }, []);

  return (
    <div style={{ background: '#fff' }}>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section style={{ 
        position: 'relative', 
        minHeight: '85vh', 
        display: 'flex', 
        alignItems: 'center', 
        overflow: 'hidden',
        background: 'radial-gradient(circle at top right, #ECFDF5 0%, #FFFFFF 50%)'
      }}>
        {/* Decorative elements */}
        <div style={{ 
          position: 'absolute', top: '-10%', right: '-5%', width: '40vw', height: '40vw', 
          background: 'var(--primary)', opacity: 0.03, borderRadius: '50%', filter: 'blur(100px)' 
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 64, alignItems: 'center' }}>
            <div className="animate-fade-up">
              <div style={{ 
                display: 'inline-flex', alignItems: 'center', gap: 10, 
                background: '#F0FDF4', border: '1px solid #DCFCE7', 
                padding: '8px 16px', borderRadius: '100px', marginBottom: 32 
              }}>
                <Lightning size={16} color="var(--primary)" weight="fill" />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#15803D', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Chennai's Premier AI Advisor · {stats.total}+ Opportunities
                </span>
              </div>

              <h1 style={{ 
                fontSize: 'clamp(48px, 6vw, 84px)', 
                fontWeight: 800, 
                color: '#0F172A', 
                lineHeight: 1.1, 
                letterSpacing: '-3px', 
                marginBottom: 32, 
                fontFamily: 'var(--font-heading)' 
              }}>
                The Future of<br />
                <span style={{ color: 'var(--primary)' }}>Franchise Success</span><br />
                is Intelligent.
              </h1>

              <p style={{ fontSize: 20, color: '#475569', lineHeight: 1.6, maxWidth: 600, marginBottom: 48, fontWeight: 500 }}>
                Franchisebridge provides white-glove AI guidance from first discovery to grand opening. No generic lists—just the data-backed match you need.
              </p>

              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <button
                  data-testid="hero-find-match"
                  onClick={() => navigate(user ? '/quiz' : '/auth?mode=register')}
                  className="btn-primary"
                  style={{ fontSize: 17, padding: '18px 40px', borderRadius: '16px' }}>
                  Start Your Matchmaking <ArrowRight size={20} weight="bold" />
                </button>
                <button
                  data-testid="hero-browse"
                  onClick={() => navigate('/browse')}
                  className="btn-outline"
                  style={{ fontSize: 17, padding: '18px 36px', borderRadius: '16px' }}>
                  Browse Opportunities
                </button>
              </div>
            </div>

            <div className="animate-fade-in" style={{ position: 'relative' }}>
              <div style={{ 
                position: 'relative', borderRadius: '32px', overflow: 'hidden', 
                boxShadow: '0 25px 50px -12px rgba(5, 150, 105, 0.15)',
                border: '8px solid white'
              }}>
                <img src={HERO_IMAGE} alt="Professional Office" style={{ width: '100%', display: 'block' }} />
              </div>
              {/* Floating Badge */}
              <div style={{ 
                position: 'absolute', bottom: -20, left: -20, 
                background: 'white', padding: '24px', borderRadius: '24px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid #E2E8F0'
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>VIABILITY SCORE</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#0F172A' }}>94/100</div>
                <div style={{ fontSize: 13, color: '#10B981', fontWeight: 600 }}>Safe Investment</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────── */}
      <div style={{ borderBottom: '1px solid #F1F5F9', borderTop: '1px solid #F1F5F9', background: '#FFFFFF', padding: '24px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-around', gap: 32, flexWrap: 'wrap' }}>
          {[
            { v: `${stats.total}+`, l: 'Verified Listings' },
            { v: '6', l: 'Premium Categories' },
            { v: '5', l: 'Tier-1 Zones' },
            { v: 'Llama 3', l: 'AI Match Engine' },
          ].map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', letterSpacing: '-1px' }}>{s.v}</div>
              <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS (Bento) ─────────────────────────────────── */}
      <section className="section" style={{ background: '#F8FAFC' }}>
        <div className="container">
          <div style={{ marginBottom: 64, textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 16 }}>The Method</div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#0F172A', letterSpacing: '-2px' }}>Engineered for Certainty.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {STEPS.map((s, i) => (
              <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ 
                  width: 56, height: 56, background: '#ECFDF5', borderRadius: '16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {s.icon}
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.1em', marginBottom: 8 }}>STEP {s.n}</div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: '#0F172A' }}>{s.title}</h3>
                  <p style={{ fontSize: 15, color: '#64748B', lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY FRANCHISEBRIDGE ──────────────────────────────────── */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 16 }}>The Differentiation</div>
              <h2 style={{ fontSize: '48px', fontWeight: 800, color: '#0F172A', letterSpacing: '-2px', lineHeight: 1.1, marginBottom: 32 }}>
                Professional intelligence over raw data.
              </h2>
              <p style={{ fontSize: 18, color: '#64748B', marginBottom: 40, lineHeight: 1.6 }}>
                Most directories just give you names. Franchisebridge gives you a strategy. We analyze the unit economics and local Chennai demand for every brand we list.
              </p>
              <button onClick={() => navigate('/browse')} className="btn-outline">Explore Our Thesis →</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {WHY.map((w, i) => (
                <div key={i} className="card" style={{ padding: 32 }}>
                  <div style={{ marginBottom: 20, color: 'var(--primary)' }}>{w.icon}</div>
                  <h4 style={{ fontWeight: 800, fontSize: 17, color: '#0F172A', marginBottom: 8 }}>{w.title}</h4>
                  <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.5 }}>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section style={{ 
        background: 'var(--primary)',
        borderRadius: '40px',
        margin: '0 24px 64px',
        padding: '80px 48px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        color: 'white'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.1) 0%, transparent 40%)' }} />
        <h2 style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 800, color: 'white', letterSpacing: '-2px', marginBottom: 24, position: 'relative' }}>
          Ready to Forge Your Legacy?
        </h2>
        <p style={{ fontSize: 19, color: 'rgba(255,255,255,0.8)', marginBottom: 48, maxWidth: 600, margin: '0 auto 48px', position: 'relative', fontWeight: 500 }}>
          Join the next generation of Chennai owners who trust Franchisebridge for data-backed entry.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
          <button onClick={() => navigate(user ? '/quiz' : '/auth?mode=register')} style={{ background: 'white', color: 'var(--primary)', border: 'none', padding: '18px 48px', borderRadius: '16px', fontWeight: 700, fontSize: 17, cursor: 'pointer', transition: 'all 0.2s' }}>
            Start AI Matching
          </button>
          <button onClick={() => navigate('/auth?mode=register&role=owner')} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', padding: '18px 48px', borderRadius: '16px', fontWeight: 700, fontSize: 17, cursor: 'pointer' }}>
            List Your Brand
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '64px 0', background: '#0F172A' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 48 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <div style={{ width: 44, height: 44, background: 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Storefront size={24} color="white" weight="fill" />
                </div>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'white', fontSize: 24, letterSpacing: '-1px' }}>Franchisebridge</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 300, fontSize: 14 }}>
                The definitive AI-powered platform for franchise intelligence and discovery in Chennai.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 64 }}>
              <div>
                <div style={{ color: 'white', fontWeight: 700, marginBottom: 20, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Platform</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <Link to="/browse" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: 14 }}>Browse Brands</Link>
                  <Link to="/quiz" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: 14 }}>AI Matchmaking</Link>
                  <Link to="/location" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: 14 }}>Location Intel</Link>
                </div>
              </div>
              <div>
                <div style={{ color: 'white', fontWeight: 700, marginBottom: 20, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Company</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)', cursor: 'default', fontSize: 14 }}>About Us</span>
                  <span style={{ color: 'rgba(255,255,255,0.5)', cursor: 'default', fontSize: 14 }}>Privacy</span>
                  <span style={{ color: 'rgba(255,255,255,0.5)', cursor: 'default', fontSize: 14 }}>Terms</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 64, paddingTop: 32, fontSize: 13, color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>
            © 2024 Franchisebridge Intelligence Platform. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
