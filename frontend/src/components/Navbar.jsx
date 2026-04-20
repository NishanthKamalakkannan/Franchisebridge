import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { List, X, Storefront, UserCircle, SignOut, ChartBar, PlusCircle } from '@phosphor-icons/react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setProfileOpen(false);
  };

  const navLinks = user?.role === 'owner'
    ? [
        { to: '/owner/dashboard', label: 'Dashboard' },
        { to: '/owner/add', label: 'List Franchise' },
        { to: '/browse', label: 'Browse' },
      ]
    : [
        { to: '/browse', label: 'Browse' },
        { to: '/quiz', label: 'Find Match' },
        { to: '/location', label: 'Zone Intel' },
      ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(226, 232, 240, 0.8)'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40, height: 40, background: 'var(--primary)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.2)'
          }}>
            <Storefront size={22} color="white" weight="fill" />
          </div>
          <span style={{ 
            fontFamily: 'var(--font-heading)', 
            fontWeight: 800, 
            fontSize: 20, 
            color: '#0F172A', 
            letterSpacing: '-0.8px',
            display: 'flex',
            alignItems: 'baseline'
          }}>
            Franchise<span style={{ color: 'var(--primary)' }}>bridge</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} style={{
              textDecoration: 'none', padding: '8px 20px',
              borderBottom: '2px solid transparent',
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14,
              color: isActive(l.to) ? 'var(--primary)' : '#64748B',
              backgroundColor: isActive(l.to) ? '#F1F5F9' : 'transparent',
              borderRadius: '8px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {user ? (
            <div style={{ position: 'relative' }}>
              <button
                data-testid="profile-btn"
                onClick={() => setProfileOpen(!profileOpen)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: 'white', border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '6px 12px', cursor: 'pointer',
                  fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14,
                  boxShadow: 'var(--shadow)',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: '8px', background: 'var(--primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: 13, fontWeight: 700
                }}>
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span style={{ color: '#0F172A' }}>{user.name?.split(' ')[0]}</span>
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                  background: 'white', border: '1px solid var(--border)',
                  borderRadius: '16px', padding: '8px',
                  minWidth: 220, boxShadow: 'var(--shadow-lg)',
                  display: 'flex', flexDirection: 'column', gap: 4, zIndex: 110
                }}>
                  <div style={{ padding: '12px', borderBottom: '1px solid var(--border)', marginBottom: 4 }}>
                    <div style={{ fontWeight: 700, color: '#0F172A', fontSize: 15, marginBottom: 2 }}>{user.name}</div>
                    <div style={{ fontSize: 13, color: '#64748B', marginBottom: 8, overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</div>
                    <div style={{ 
                      fontSize: 10, fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em',
                      background: '#F1F5F9', padding: '2px 8px', borderRadius: '4px', width: 'fit-content'
                    }}>{user.role}</div>
                  </div>
                  {user.role === 'owner' && (
                    <>
                      <button onClick={() => { navigate('/owner/dashboard'); setProfileOpen(false); }} className="nav-dropdown-item">
                        <ChartBar size={18} /> Dashboard
                      </button>
                      <button onClick={() => { navigate('/owner/add'); setProfileOpen(false); }} className="nav-dropdown-item">
                        <PlusCircle size={18} /> List Franchise
                      </button>
                    </>
                  )}
                  <button onClick={handleLogout} data-testid="logout-btn" className="nav-dropdown-item" style={{ color: '#EF4444' }}>
                    <SignOut size={18} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/auth" style={{ textDecoration: 'none' }}>
                <button style={{ 
                  background: 'transparent', border: '1.5px solid var(--text)', 
                  padding: '10px 24px', cursor: 'pointer', fontWeight: 600, fontSize: 14,
                  borderRadius: '10px', transition: 'all 0.2s'
                }}>Login</button>
              </Link>
              <Link to="/auth?mode=register" style={{ textDecoration: 'none' }}>
                <button className="btn-primary" data-testid="get-started-btn" style={{ padding: '10px 24px', fontSize: 14 }}>Get Started</button>
              </Link>
            </>
          )}
          <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none' }} className="mobile-menu-btn">
            {open ? <X size={28} /> : <List size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div style={{ background: 'white', borderTop: '1px solid #E2E8F0', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} style={{
              textDecoration: 'none', color: '#0F172A', fontWeight: 600, fontSize: 16,
              padding: '8px 0', borderBottom: '1px solid #F1F5F9'
            }}>{l.label}</Link>
          ))}
          {!user && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
              <button onClick={() => { navigate('/auth'); setOpen(false); }} style={{ padding: '12px', background: '#F1F5F9', border: 'none', borderRadius: '8px', fontWeight: 600 }}>Login</button>
              <button onClick={() => { navigate('/auth?mode=register'); setOpen(false); }} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Get Started</button>
            </div>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav, .desktop-only { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        .nav-dropdown-item {
          width: 100%; padding: 10px 12px; background: none; border: none; 
          text-align: left; cursor: pointer; fontSize: 14px; 
          display: flex; alignItems: center; gap: 10px; border-radius: 8px;
          font-weight: 500; transition: background 0.2s;
        }
        .nav-dropdown-item:hover { background: #F8FAFC; }
      `}</style>
    </nav>
  );
}
