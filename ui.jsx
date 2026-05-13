// ui.jsx — shared design tokens + primitives for Syndicate City

const SC_THEME = {
  bg0:    '#0A0612',
  bg1:    '#15102A',
  bg2:    '#1F1740',
  line:   'rgba(255,255,255,0.08)',
  ink:    '#F5F0FF',
  ink2:   '#B7AFD6',
  ink3:   '#7A6F9E',
  gold:   '#FFC75A',
  gold2:  '#FF9A2E',
  pink:   '#FF2E93',
  pink2:  '#B30A6E',
  cyan:   '#22E5FF',
  cyan2:  '#0090FF',
  lime:   '#7CFF65',
  red:    '#FF5364',
};

// ─── number formatting ───────────────────────────────────────
const fmt = (n) => {
  if (n >= 1e6) return (n/1e6).toFixed(1).replace(/\.0$/,'') + 'M';
  if (n >= 1e3) return (n/1e3).toFixed(1).replace(/\.0$/,'') + 'K';
  return n.toLocaleString();
};

// ─── icons (inline SVG, no deps) ──────────────────────────────
const Icon = {
  Chip: ({ s = 16 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24">
      <defs>
        <radialGradient id="cg" cx="0.35" cy="0.3">
          <stop offset="0" stopColor="#FFE08A"/>
          <stop offset="0.6" stopColor="#FFB02E"/>
          <stop offset="1" stopColor="#8A4A00"/>
        </radialGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill="url(#cg)"/>
      <circle cx="12" cy="12" r="6.5" fill="none" stroke="#fff8" strokeWidth="1.2" strokeDasharray="2 1.6"/>
      <text x="12" y="15.5" fontSize="8" fontWeight="900" textAnchor="middle" fill="#3a1e00">$</text>
    </svg>
  ),
  Gem: ({ s = 16 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24">
      <defs>
        <linearGradient id="gg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9BFBFF"/><stop offset="1" stopColor="#0090FF"/>
        </linearGradient>
      </defs>
      <path d="M12 3 L21 10 L12 21 L3 10 Z" fill="url(#gg)" stroke="#fff" strokeOpacity=".5"/>
      <path d="M3 10 L21 10 M12 3 L9 10 L12 21 M12 3 L15 10 L12 21" stroke="#fff" strokeOpacity=".55" fill="none"/>
    </svg>
  ),
  Fire: ({ s = 18 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24">
      <defs>
        <linearGradient id="fg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFE34A"/>
          <stop offset="0.5" stopColor="#FF7A2E"/>
          <stop offset="1" stopColor="#FF2E93"/>
        </linearGradient>
      </defs>
      <path d="M12 2 C 13 6 17 8 17 13 C 17 17.5 14.7 21 12 21 C 9.3 21 7 17.5 7 13 C 7 10 9 9 10 7 C 10.7 5.5 11.3 4 12 2 Z" fill="url(#fg)"/>
      <path d="M12 11 C 12.5 13 14 14 14 16 C 14 17.5 13 19 12 19 C 11 19 10 17.5 10 16 C 10 14.5 11.5 13.5 12 11 Z" fill="#FFE34A" opacity=".9"/>
    </svg>
  ),
  Bell: ({ s = 18, c = '#F5F0FF' }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"><path d="M6 16 L6 11 a6 6 0 0 1 12 0 L18 16 L20 18 L4 18 Z"/><path d="M10 21 a2 2 0 0 0 4 0"/></svg>
  ),
  Lock: ({ s = 14, c = '#7A6F9E' }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11 V8 a4 4 0 0 1 8 0 V11"/></svg>
  ),
  Check: ({ s = 14, c = '#7CFF65' }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 13 10 19 20 6"/></svg>
  ),
  Bolt: ({ s = 16, c = '#FFC75A' }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M13 2 L4 14 H11 L10 22 L20 9 H13 Z"/></svg>
  ),
  Crown: ({ s = 16, c = '#FFC75A' }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M3 8 L7 12 L12 5 L17 12 L21 8 L19 19 H5 Z"/></svg>
  ),
  Shield: ({ s = 16, c = '#22E5FF' }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M12 2 L21 6 V13 C 21 18 16 21 12 22 C 8 21 3 18 3 13 V6 Z"/></svg>
  ),
  Plus: ({ s = 14, c = '#fff' }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round"><path d="M12 5 V19 M5 12 H19"/></svg>
  ),
  Chevron: ({ s = 14, c = '#B7AFD6', dir='right' }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{transform: `rotate(${{right:0,left:180,up:-90,down:90}[dir]}deg)`}}><polyline points="9 6 15 12 9 18"/></svg>
  ),
  Users: ({ s = 18, c = '#F5F0FF' }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20 a6.5 6.5 0 0 1 13 0"/><path d="M16 4 a3.5 3.5 0 0 1 0 7"/><path d="M22 19 a5.5 5.5 0 0 0 -4.5 -5"/></svg>
  ),
  Trophy: ({ s = 16, c = '#FFC75A' }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M7 3 H17 V8 a5 5 0 0 1 -10 0 Z M4 4 H7 V7 a3 3 0 0 1 -3 -3 Z M20 4 H17 V7 a3 3 0 0 0 3 -3 Z M10 14 H14 L13 19 H11 Z M8 20 H16 V22 H8 Z"/></svg>
  ),
};

// ─── pill primitives ──────────────────────────────────────────
function ChipPill({ value, icon = 'chip', tone = 'gold', onPlus, dim }) {
  const tones = {
    gold: { bg: 'linear-gradient(180deg, rgba(255,199,90,0.18), rgba(255,154,46,0.08))', br: 'rgba(255,199,90,0.35)' },
    cyan: { bg: 'linear-gradient(180deg, rgba(34,229,255,0.18), rgba(0,144,255,0.08))', br: 'rgba(34,229,255,0.35)' },
    pink: { bg: 'linear-gradient(180deg, rgba(255,46,147,0.18), rgba(179,10,110,0.08))', br: 'rgba(255,46,147,0.35)' },
  };
  const t = tones[tone];
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '5px 4px 5px 8px', borderRadius: 999, height: 28,
      background: t.bg, border: `1px solid ${t.br}`,
      opacity: dim ? 0.6 : 1,
    }}>
      {icon === 'chip' ? <Icon.Chip s={16}/> : icon === 'gem' ? <Icon.Gem s={14}/> : null}
      <span style={{ fontWeight: 800, fontSize: 13, color: '#F5F0FF', letterSpacing: 0.2 }}>{fmt(value)}</span>
      {onPlus && (
        <button onClick={onPlus} style={{
          width: 20, height: 20, borderRadius: 999, border: 'none', cursor: 'pointer',
          background: tone==='gold'?'#FFC75A':tone==='cyan'?'#22E5FF':'#FF2E93',
          display: 'grid', placeItems: 'center', boxShadow: '0 0 8px rgba(255,255,255,.2)',
        }}>
          <Icon.Plus s={11} c="#0A0612"/>
        </button>
      )}
    </div>
  );
}

// ─── progress bar (with near-miss flash) ──────────────────────
function ProgressBar({ value, max, color = '#FF2E93', height = 8, label, glow = true, nearMiss = false }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ width: '100%' }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#B7AFD6', marginBottom: 4, fontWeight: 600 }}>
          <span>{label}</span><span>{value}/{max}</span>
        </div>
      )}
      <div style={{
        height, borderRadius: 999, background: 'rgba(255,255,255,0.06)',
        overflow: 'hidden', position: 'relative',
        border: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{
          width: `${pct}%`, height: '100%',
          background: `linear-gradient(90deg, ${color}, ${color}dd)`,
          boxShadow: glow ? `0 0 10px ${color}aa, inset 0 1px 0 rgba(255,255,255,.3)` : 'none',
          transition: 'width .6s cubic-bezier(.2,.8,.2,1)',
          position: 'relative',
        }}>
          {nearMiss && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.5), transparent)',
              animation: 'scNearMiss 1.8s ease-in-out infinite',
            }}/>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── card / panel ─────────────────────────────────────────────
function Panel({ children, style, glow, accent = '#FF2E93', anno }) {
  return (
    <div data-anno={anno} style={{
      background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 16, padding: 14, position: 'relative',
      boxShadow: glow ? `0 0 30px -10px ${accent}66, inset 0 1px 0 rgba(255,255,255,.06)` : 'inset 0 1px 0 rgba(255,255,255,.04)',
      ...style,
    }}>{children}</div>
  );
}

// ─── glow button ──────────────────────────────────────────────
function GlowBtn({ children, onClick, tone = 'pink', size = 'md', icon, disabled, style }) {
  const tones = {
    pink:  { bg: 'linear-gradient(180deg, #FF2E93, #B30A6E)', shadow: '#FF2E93' },
    cyan:  { bg: 'linear-gradient(180deg, #22E5FF, #0090FF)', shadow: '#22E5FF' },
    gold:  { bg: 'linear-gradient(180deg, #FFC75A, #FF9A2E)', shadow: '#FFC75A' },
    ghost: { bg: 'rgba(255,255,255,0.06)', shadow: 'transparent' },
    dark:  { bg: 'rgba(10,6,18,0.6)', shadow: 'transparent' },
  };
  const t = tones[tone];
  const isDark = tone === 'gold';
  const sizes = { sm: { p: '7px 12px', f: 12, h: 30 }, md: { p: '10px 16px', f: 13, h: 40 }, lg: { p: '14px 20px', f: 15, h: 50 }};
  const s = sizes[size];
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: s.p, height: s.h, borderRadius: 12, border: 'none', cursor: disabled?'not-allowed':'pointer',
      background: t.bg, color: isDark ? '#0A0612' : '#fff',
      fontWeight: 800, fontSize: s.f, letterSpacing: 0.5, textTransform: 'uppercase',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      boxShadow: tone === 'ghost' ? 'inset 0 0 0 1px rgba(255,255,255,.12)' :
                 tone === 'dark' ? 'inset 0 0 0 1px rgba(255,255,255,.08)' :
                 `0 6px 18px -6px ${t.shadow}, 0 0 0 1px rgba(255,255,255,.12), inset 0 1px 0 rgba(255,255,255,.35)`,
      opacity: disabled ? 0.45 : 1,
      transition: 'transform .1s',
      ...style,
    }} onMouseDown={e=>e.currentTarget.style.transform='scale(.97)'} onMouseUp={e=>e.currentTarget.style.transform=''} onMouseLeave={e=>e.currentTarget.style.transform=''}>
      {icon}{children}
    </button>
  );
}

// ─── striped placeholder (for stock imagery / portraits) ──────
function Stripes({ w, h, color = '#FF2E93', label, radius = 12 }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: radius, overflow: 'hidden', position: 'relative',
      background: `repeating-linear-gradient(135deg, ${color}33 0 6px, ${color}11 6px 12px)`,
      border: `1px solid ${color}55`,
      display: 'grid', placeItems: 'center',
    }}>
      {label && <div style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 9, color: '#fff', opacity: 0.7, letterSpacing: 0.5, textAlign: 'center', padding: 4 }}>{label}</div>}
    </div>
  );
}

// ─── annotation pin (KPI callouts) ────────────────────────────
function AnnoPin({ kpi, text, x, y }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y, zIndex: 200, pointerEvents: 'none',
      animation: 'scAnnoIn .4s ease-out',
    }}>
      <div style={{
        background: 'linear-gradient(180deg, #FFE34A, #FFC75A)', color: '#0A0612',
        padding: '4px 8px', borderRadius: 6, fontSize: 9, fontWeight: 900,
        letterSpacing: 0.5, whiteSpace: 'nowrap',
        boxShadow: '0 4px 12px rgba(255,199,90,.45), 0 0 0 1px rgba(0,0,0,.2)',
      }}>{kpi}</div>
      <div style={{
        marginTop: 4, background: 'rgba(10,6,18,0.92)', color: '#FFE34A',
        padding: '6px 9px', borderRadius: 8, fontSize: 10, lineHeight: 1.35,
        maxWidth: 180, border: '1px solid rgba(255,199,90,.4)',
        boxShadow: '0 8px 24px rgba(0,0,0,.6)',
      }}>{text}</div>
    </div>
  );
}

Object.assign(window, { SC_THEME, fmt, Icon, ChipPill, ProgressBar, Panel, GlowBtn, Stripes, AnnoPin });
