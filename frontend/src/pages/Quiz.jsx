import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, ArrowLeft, Brain } from '@phosphor-icons/react';

const STEPS = [
  {
    id: 'budget', question: 'What is your investment budget?',
    subtext: 'Include franchise fee and setup costs.',
    options: [
      { v: 'under_5L', l: 'Under ₹5 Lakhs', d: 'Entry-level kiosk & cloud kitchen models' },
      { v: '5L_15L', l: '₹5 – ₹15 Lakhs', d: 'QSR, salon, and mid-range food franchises' },
      { v: '15L_30L', l: '₹15 – ₹30 Lakhs', d: 'Established brands with proven systems' },
      { v: '30L_60L', l: '₹30 – ₹60 Lakhs', d: 'Premium retail, pharmacy & full salons' },
      { v: 'above_60L', l: 'Above ₹60 Lakhs', d: 'Premium chains and national brands' },
    ],
  },
  {
    id: 'zone', question: 'Which Chennai zone interests you?',
    subtext: 'We will show franchise demand vs saturation for this zone.',
    options: [
      { v: 'south_omr', l: 'South Chennai / OMR', d: 'IT Corridor — Velachery, Sholinganallur, Navalur' },
      { v: 'central', l: 'Central Chennai', d: 'Anna Nagar, T Nagar, Chetpet — high footfall' },
      { v: 'north', l: 'North Chennai', d: 'Padi, Ambattur — underserved, low rents' },
      { v: 'west', l: 'West Chennai', d: 'Porur, Vadapalani, Koyambedu — transit hub' },
      { v: 'outskirts', l: 'Outskirts (GST / ECR)', d: 'Pallavaram, Tambaram — emerging zones' },
      { v: 'any', l: 'Open to Any Zone', d: 'Show me the best fit regardless of zone' },
    ],
  },
  {
    id: 'experience', question: 'What is your business experience level?',
    subtext: 'This helps match you with franchises that suit your background.',
    options: [
      { v: 'none', l: 'Complete Beginner', d: 'No prior business or franchise experience' },
      { v: 'basic', l: 'Some Experience', d: 'Managed a team, ran a small shop, or had a job in business' },
      { v: 'experienced', l: 'Experienced Entrepreneur', d: 'Previously ran or invested in a business' },
    ],
  },
  {
    id: 'risk', question: 'What is your risk tolerance?',
    subtext: 'This shapes our AI viability score recommendations for you.',
    options: [
      { v: 'low', l: 'Low Risk', d: 'I want proven brands with fast break-even and no royalty' },
      { v: 'medium', l: 'Medium Risk', d: 'Balanced between growth potential and stability' },
      { v: 'high', l: 'High Risk / High Reward', d: 'I am comfortable with higher investment and longer payback' },
    ],
  },
  {
    id: 'categories', question: 'Which business categories interest you?',
    subtext: 'Select all that apply. Our AI will consider these first.',
    multi: true,
    options: [
      { v: 'Tea & Coffee', l: 'Tea & Coffee', d: 'Kiosks, cafés, chai shops', emoji: '☕' },
      { v: 'Shawarma/BBQ', l: 'Shawarma / BBQ', d: 'QSR, street food, grills', emoji: '🥙' },
      { v: 'Biryani', l: 'Biryani', d: 'Cloud kitchens, dine-in, takeaway', emoji: '🍚' },
      { v: 'Pharmacy', l: 'Pharmacy', d: 'Generic & branded retail', emoji: '💊' },
      { v: 'Salon', l: 'Salon', d: 'Unisex, ladies, premium studios', emoji: '✂️' },
      { v: 'Car Care', l: 'Car Care', d: 'Wash, detailing, mobile service', emoji: '🚗' },
    ],
  },
];

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ budget: '', zone: '', experience: '', risk: '', categories: [] });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const current = STEPS[step];
  const progress = ((step) / STEPS.length) * 100;

  const select = (val) => {
    if (current.multi) {
      setAnswers(a => {
        const cats = a.categories.includes(val)
          ? a.categories.filter(c => c !== val)
          : [...a.categories, val];
        return { ...a, categories: cats };
      });
    } else {
      setAnswers(a => ({ ...a, [current.id]: val }));
    }
  };

  const isSelected = (val) => current.multi
    ? answers.categories.includes(val)
    : answers[current.id] === val;

  const canNext = current.multi
    ? answers.categories.length > 0
    : !!answers[current.id];

  const next = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else submitQuiz();
  };

  const submitQuiz = async () => {
    if (!user) { navigate('/auth?mode=register'); return; }
    setLoading(true);
    const cats = answers.categories.length === 0 ? ['All'] : answers.categories;
    const payload = { ...answers, categories: cats };
    navigate('/recommendations', { state: { quizAnswers: payload } });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '20px 24px' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ padding: '8px', background: '#F1F5F9', borderRadius: '8px' }}>
              <Brain size={24} color="var(--primary)" weight="duotone" />
            </div>
            <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--text)' }}>Business Readiness Advisor</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600 }}>Question {step + 1} of {STEPS.length}</span>
          </div>
        </div>
        {/* Progress bar */}
        <div style={{ maxWidth: 1280, margin: '16px auto 0', padding: '0 24px' }}>
          <div style={{ height: 4, background: '#E2E8F0', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ 
              height: '100%', 
              background: 'var(--primary)', 
              width: `${progress + (100 / STEPS.length)}%`, 
              transition: 'width 0.6s cubic-bezier(0.65, 0, 0.35, 1)' 
            }} />
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '64px 24px' }}>
        <div style={{ width: '100%', maxWidth: 720 }} key={step} className="animate-fade-up">
          <div style={{ 
            fontSize: 12, fontWeight: 800, color: 'var(--primary)', 
            textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 16, 
            fontFamily: 'var(--font-mono)', background: '#EFF6FF', 
            padding: '4px 12px', borderRadius: '6px', width: 'fit-content'
          }}>
            Step {step + 1}
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#0F172A', letterSpacing: '-2px', marginBottom: 12, lineHeight: 1.1 }}>
            {current.question}
          </h1>
          <p style={{ fontSize: 17, color: 'var(--text-muted)', marginBottom: 48, fontWeight: 500 }}>{current.subtext}</p>

          <div style={{ display: 'grid', gridTemplateColumns: current.multi ? 'repeat(auto-fit, minmax(210px, 1fr))' : '1fr', gap: 16 }}>
            {current.options.map(opt => (
              <button
                key={opt.v}
                data-testid={`quiz-option-${opt.v}`}
                onClick={() => select(opt.v)}
                style={{
                  padding: '24px',
                  border: `2px solid ${isSelected(opt.v) ? 'var(--primary)' : 'var(--border)'}`,
                  background: isSelected(opt.v) ? '#F1F5F9' : 'white',
                  borderRadius: '16px',
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', 
                  display: 'flex',
                  flexDirection: current.multi ? 'column' : 'row',
                  alignItems: current.multi ? 'flex-start' : 'center',
                  gap: 16,
                  boxShadow: isSelected(opt.v) ? '0 8px 20px rgba(0, 71, 171, 0.08)' : 'var(--shadow)'
                }}
                onMouseOver={e => { if (!isSelected(opt.v)) { e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; } }}
                onMouseOut={e => { if (!isSelected(opt.v)) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; } }}
              >
                {current.multi && <span style={{ fontSize: 32, marginBottom: 8 }}>{opt.emoji}</span>}
                {!current.multi && (
                  <div style={{ 
                    width: 24, height: 24, border: `2px solid ${isSelected(opt.v) ? 'var(--primary)' : '#CBD5E1'}`, 
                    borderRadius: '50%', background: isSelected(opt.v) ? 'var(--primary)' : 'white', 
                    flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}>
                    {isSelected(opt.v) && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'white' }} />}
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 17, color: isSelected(opt.v) ? 'var(--primary)' : '#0F172A', marginBottom: 4 }}>{opt.l}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, fontWeight: 500 }}>{opt.d}</div>
                </div>
                {current.multi && (
                  <div style={{ 
                    marginTop: 12, width: 24, height: 24, 
                    border: `1.5px solid ${isSelected(opt.v) ? 'var(--primary)' : '#CBD5E1'}`,
                    background: isSelected(opt.v) ? 'var(--primary)' : 'white',
                    borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}>
                    {isSelected(opt.v) && <span style={{ color: 'white', fontSize: 14, fontWeight: 800 }}>✓</span>}
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 56 }}>
            <button
              data-testid="quiz-back"
              onClick={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0}
              className="btn-outline"
              style={{ opacity: step === 0 ? 0.3 : 1, padding: '14px 28px' }}>
              <ArrowLeft size={18} /> Previous
            </button>
            <button
              data-testid="quiz-next"
              onClick={next}
              disabled={!canNext || loading}
              className="btn-primary"
              style={{ padding: '14px 36px' }}>
              {loading ? <span className="spinner" style={{ width: 18, height: 18 }} /> :
                step === STEPS.length - 1 ? 'Analyze My Match' : 'Continue'}
              {!loading && <ArrowRight size={18} weight="bold" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
