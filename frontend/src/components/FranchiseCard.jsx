import React from 'react';
import { Link } from 'react-router-dom';
import { ViabilityBadge } from './ViabilityBadge';
import { MapPin, CurrencyInr, Timer, Users, CaretRight } from '@phosphor-icons/react';

const CAT_COLORS = {
  'Tea & Coffee': { bg: '#FFF7ED', text: '#C2410C', border: '#FFEDD5' },
  'Shawarma/BBQ': { bg: '#FFF1F2', text: '#BE123C', border: '#FFE4E6' },
  'Biryani': { bg: '#ECFDF5', text: '#047857', border: '#D1FAE5' },
  'Pharmacy': { bg: '#EFF6FF', text: '#1D4ED8', border: '#DBEAFE' },
  'Salon': { bg: '#F5F3FF', text: '#6D28D9', border: '#EDE9FE' },
  'Car Care': { bg: '#F0FDF4', text: '#15803D', border: '#DCFCE7' },
};

function fmt(n) {
  if (!n) return '₹0';
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${(n / 1000).toFixed(0)}K`;
}

export default function FranchiseCard({
  franchise, matchScore, matchReason, onCompare, inCompare, showActions = true
}) {
  const {
    franchise_id, name, category, brand_type, short_description,
    investment_min, investment_max, viability_score, risk_level,
    breakeven_months_min, breakeven_months_max, best_chennai_zones = [],
    beginner_friendly, royalty_level
  } = franchise;

  const catStyle = CAT_COLORS[category] || { bg: '#F8FAFC', text: '#475569', border: '#E2E8F0' };

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }} data-testid={`franchise-card-${franchise_id}`}>
      {/* Match score bar if present */}
      {matchScore && (
        <div style={{ height: 6, background: '#E2E8F0' }}>
          <div style={{ height: '100%', width: `${matchScore}%`, background: 'var(--primary)', transition: 'width 0.8s cubic-bezier(0.65, 0, 0.35, 1)' }} />
        </div>
      )}

      <div style={{ padding: '24px 24px 0' }}>
        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <span style={{ 
              fontSize: 11, fontWeight: 800, padding: '4px 10px', 
              background: catStyle.bg, color: catStyle.text, 
              border: `1px solid ${catStyle.border}`, 
              borderRadius: '8px', 
              textTransform: 'uppercase', letterSpacing: '0.05em' 
            }}>
              {category}
            </span>
            {matchScore && (
              <span style={{ 
                marginLeft: 8, fontSize: 11, fontWeight: 800, padding: '4px 10px', 
                background: '#EFF6FF', color: 'var(--primary)', 
                border: '1px solid #DBEAFE', borderRadius: '8px' 
              }}>
                {matchScore}% Match
              </span>
            )}
          </div>
          <ViabilityBadge score={viability_score} risk={risk_level} />
        </div>

        <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', marginBottom: 4, lineHeight: 1.2 }}>{name}</h3>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>{brand_type}</div>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 20, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {matchReason || short_description}
        </p>
      </div>

      {/* Stats */}
      <div style={{ padding: '0 24px', borderTop: '1px solid var(--border)', paddingTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        <Stat icon={<CurrencyInr size={14} weight="bold" />} label="Investment" value={`${fmt(investment_min)}–${fmt(investment_max)}`} />
        <Stat icon={<Timer size={14} weight="bold" />} label="Break-even" value={`${breakeven_months_min}–${breakeven_months_max} mo`} />
        <Stat icon={<MapPin size={14} weight="bold" />} label="Best Zone" value={best_chennai_zones[0]?.replace('Chennai', 'Chn') || 'Chennai'} />
        <Stat icon={<Users size={14} weight="bold" />} label="Royalty" value={royalty_level === 'None' ? '0% ✓' : royalty_level} color={royalty_level === 'None' ? '#10B981' : undefined} />
      </div>

      {/* Badges */}
      <div style={{ padding: '0 24px 20px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {beginner_friendly && (
          <span style={{ fontSize: 11, padding: '4px 10px', background: '#F0FDF4', color: '#15803D', border: '1px solid #DCFCE7', borderRadius: '6px', fontWeight: 700 }}>Beginner Friendly</span>
        )}
        {royalty_level === 'None' && (
          <span style={{ fontSize: 11, padding: '4px 10px', background: '#F8FAFC', color: '#475569', border: '1px solid #E2E8F0', borderRadius: '6px', fontWeight: 700 }}>No Royalty Fee</span>
        )}
      </div>

      {/* Actions */}
      {showActions && (
        <div style={{ display: 'flex', borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
          <Link to={`/franchise/${franchise_id}`} style={{ flex: 1, textDecoration: 'none' }}>
            <button data-testid={`view-details-${franchise_id}`} style={{ 
              width: '100%', padding: '16px', background: '#F8FAFC', color: 'var(--primary)', 
              border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, 
              transition: 'background 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 
            }}
              onMouseOver={e => e.currentTarget.style.background = '#EFF6FF'}
              onMouseOut={e => e.currentTarget.style.background = '#F8FAFC'}>
              View Details <CaretRight size={16} weight="bold" />
            </button>
          </Link>
          {onCompare && (
            <button
              data-testid={`compare-btn-${franchise_id}`}
              onClick={() => onCompare(franchise)}
              style={{ 
                padding: '16px 20px', background: inCompare ? 'var(--primary)' : 'white', 
                border: 'none', borderLeft: '1px solid var(--border)', cursor: 'pointer', 
                color: inCompare ? 'white' : 'var(--text-muted)', fontSize: 13, fontWeight: 700, 
                transition: 'all 0.2s' 
              }}>
              {inCompare ? '✓ Compare' : '+ Compare'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Stat({ icon, label, value, color }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#94A3B8', marginBottom: 4 }}>
        {icon}
        <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, color: color || '#0F172A', fontFamily: 'var(--font-mono)' }}>{value}</div>
    </div>
  );
}

