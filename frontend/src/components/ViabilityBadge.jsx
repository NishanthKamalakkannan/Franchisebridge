import React from 'react';

const COLOR = { Safe: '#10B981', Moderate: '#F59E0B', Risk: '#EF4444' };
const BG = { Safe: '#ECFDF5', Moderate: '#FFFBEB', Risk: '#FEF2F2' };
const BORDER = { Safe: '#A7F3D0', Moderate: '#FCD34D', Risk: '#FECACA' };

export function ViabilityBadge({ score, risk, size = 'sm' }) {
  const c = COLOR[risk] || '#475569';
  const b = BG[risk] || '#F8F9FA';
  const br = BORDER[risk] || '#E2E8F0';
  const dot = size === 'lg' ? 10 : 8;
  const fontSize = size === 'lg' ? 13 : 11;

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: size === 'lg' ? '6px 14px' : '4px 10px',
      background: b, border: `1.5px solid ${br}`,
      borderRadius: '8px',
      fontSize, fontWeight: 700, color: c, fontFamily: 'var(--font-mono)',
      whiteSpace: 'nowrap',
      transition: 'all 0.2s'
    }}>
      <span style={{ width: dot, height: dot, borderRadius: '50%', background: c, flexShrink: 0 }} />
      {score}/100 · {risk}
    </span>
  );
}

export function ViabilityGauge({ score, risk }) {
  const c = COLOR[risk] || '#475569';
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{ position: 'relative', width: 140, height: 140 }}>
        <svg width="140" height="140" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="70" cy="70" r="54" fill="none" stroke="#F1F5F9" strokeWidth="12" />
          <circle cx="70" cy="70" r="54" fill="none" stroke={c} strokeWidth="12"
            strokeDasharray={circumference} strokeDashoffset={offset}
            strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.65, 0, 0.35, 1)' }} />
        </svg>
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center'
        }}>
          <span style={{ fontSize: 36, fontWeight: 800, color: '#0F172A', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>{score}</span>
          <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600 }}>/100</span>
        </div>
      </div>
      <div style={{
        padding: '8px 20px', background: BG[risk], border: `1.5px solid ${BORDER[risk]}`,
        borderRadius: '100px',
        color: c, fontWeight: 800, fontSize: 13, letterSpacing: '0.05em', textTransform: 'uppercase'
      }}>
        {risk} Status
      </div>
    </div>
  );
}

