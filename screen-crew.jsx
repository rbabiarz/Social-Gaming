// screen-crew.jsx — character collection (gacha psychology)
const { useState } = React;

function CrewScreen({ state, dispatch, anno }) {
  const [filter, setFilter] = useState('all');
  const chars = [
    { n: 'Madame Lux',   r: 'legend', c: '#FFC75A', tag: 'Diva',   tier: 7, sets: 'Bellagio', owned: true,  frags: 100 },
    { n: 'Don Marcello', r: 'legend', c: '#FF2E93', tag: 'Boss',   tier: 6, sets: 'The Strip', owned: true,  frags: 100 },
    { n: 'Agent 00X',    r: 'legend', c: '#22E5FF', tag: 'Spy',    tier: 0, sets: 'Cosmo', owned: false,  frags: 12 },
    { n: 'Iron Knuckle', r: 'rare',   c: '#FF5364', tag: 'Fighter',tier: 5, sets: 'UFC',       owned: true,  frags: 100 },
    { n: 'Vee Vega',     r: 'rare',   c: '#9B6EFF', tag: 'Dancer', tier: 4, sets: 'Aria',      owned: true,  frags: 100 },
    { n: 'Cash Cooper',  r: 'rare',   c: '#7CFF65', tag: 'Dealer', tier: 3, sets: 'MGM Grand', owned: true,  frags: 100 },
    { n: 'Pixel Punk',   r: 'rare',   c: '#22E5FF', tag: 'Hacker', tier: 0, sets: 'Downtown',  owned: false, frags: 64 },
    { n: 'Velvet Rose',  r: 'rare',   c: '#FF8E3C', tag: 'Singer', tier: 0, sets: 'Bellagio',  owned: false, frags: 28 },
    { n: 'Big Eddie',    r: 'common', c: '#B7AFD6', tag: 'Pit Boss', tier: 2, sets: 'MGM Grand', owned: true, frags: 100 },
    { n: 'Lucky Lou',    r: 'common', c: '#B7AFD6', tag: 'Player',  tier: 1, sets: 'Downtown',  owned: true, frags: 100 },
    { n: 'Coyote',       r: 'common', c: '#B7AFD6', tag: 'Bouncer', tier: 0, sets: 'Mandalay',  owned: false, frags: 0 },
    { n: '???',          r: 'common', c: '#7A6F9E', tag: 'Locked',  tier: 0, sets: '—',         owned: false, frags: 0, locked: true },
  ];

  const filtered = chars.filter(c => filter === 'all' ? true : filter === 'owned' ? c.owned : !c.owned);
  const rarityCount = { legend: chars.filter(c=>c.r==='legend'&&c.owned).length, rare: chars.filter(c=>c.r==='rare'&&c.owned).length, common: chars.filter(c=>c.r==='common'&&c.owned).length };

  return (
    <div style={{ padding: '0 14px 100px' }}>
      <div style={{ marginTop: 6, marginBottom: 12 }}>
        <div style={{ fontSize: 22, fontWeight: 900, color: '#F5F0FF', letterSpacing: -0.5 }}>Your Crew</div>
        <div style={{ fontSize: 11, color: '#B7AFD6', marginTop: 2 }}>{chars.filter(c=>c.owned).length} / 100+ recruited</div>
      </div>

      <Panel anno="crew-stats" style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
        <RarityStat label="Legendary" count={rarityCount.legend} max={10} c="#FFC75A"/>
        <RarityStat label="Rare" count={rarityCount.rare} max={30} c="#22E5FF"/>
        <RarityStat label="Common" count={rarityCount.common} max={60} c="#FF2E93"/>
      </Panel>

      {/* Synergy banner */}
      <Panel anno="synergy" glow accent="#FFC75A" style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 10, color: '#FFC75A', fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>Active Synergy</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', marginLeft: 0 }}>
            {['#FFC75A','#7CFF65','#B7AFD6'].map((c, i) => (
              <div key={i} style={{
                width: 28, height: 28, borderRadius: 999, marginLeft: i?-8:0,
                background: c, border: '2px solid #0A0612',
                display: 'grid', placeItems: 'center', fontSize: 10, fontWeight: 900, color: '#0A0612',
              }}>{['M','C','B'][i]}</div>
            ))}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#F5F0FF' }}>3× MGM Grand Crew</div>
            <div style={{ fontSize: 10, color: '#FFC75A' }}>+5% District upgrade speed (permanent)</div>
          </div>
          <GlowBtn tone="ghost" size="sm">View</GlowBtn>
        </div>
      </Panel>

      <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
        {[['all','All',chars.length],['owned','Recruited',chars.filter(c=>c.owned).length],['locked','To Recruit',chars.filter(c=>!c.owned).length]].map(([k, lbl, n]) => (
          <button key={k} onClick={()=>setFilter(k)} style={{
            padding: '6px 12px', borderRadius: 999, border: 'none', cursor: 'pointer',
            background: filter===k ? 'linear-gradient(180deg,#FF2E93,#B30A6E)' : 'rgba(255,255,255,.05)',
            color: filter===k ? '#fff' : '#B7AFD6',
            fontSize: 10, fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase',
          }}>{lbl} · {n}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {filtered.map((c, i) => <CrewCard key={i} c={c}/>)}
      </div>

      <Panel glow accent="#FF2E93" style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
        <Stripes w={56} h={56} color="#FF2E93" label="PACK" radius={10}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 900, color: '#F5F0FF' }}>Crew Crate · Free</div>
          <div style={{ fontSize: 10, color: '#B7AFD6' }}>Earn via missions · 1 free crate every 4h</div>
        </div>
        <Countdown seconds={3*3600 + 12*60}/>
      </Panel>

      {anno && <>
        <AnnoPin kpi="COLLECTION" text="3-rarity gacha psychology — 'gotta catch 'em all' powers retention without pay-to-win." x={150} y={130}/>
        <AnnoPin kpi="SET SYNERGY" text="3-of-a-set bonus locks players into completion goals across multiple districts." x={14} y={240}/>
      </>}
    </div>
  );
}

function RarityStat({ label, count, max, c }) {
  return (
    <div style={{ flex: 1, textAlign: 'center', padding: '6px 4px', borderRadius: 10, background: 'rgba(255,255,255,.03)', border: `1px solid ${c}33` }}>
      <div style={{ fontSize: 9, color: c, fontWeight: 800, letterSpacing: 0.8, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 900, color: '#F5F0FF', marginTop: 2 }}>
        {count}<span style={{ fontSize: 10, color: '#7A6F9E' }}>/{max}</span>
      </div>
    </div>
  );
}

function CrewCard({ c }) {
  const owned = c.owned;
  const rarBg = c.r === 'legend' ? 'linear-gradient(180deg, #FFC75A33, #FF9A2E11)' :
                c.r === 'rare'   ? 'linear-gradient(180deg, #22E5FF33, #0090FF11)' :
                                   'linear-gradient(180deg, #B7AFD622, #7A6F9E11)';
  const rarBr = c.r === 'legend' ? '#FFC75A' : c.r === 'rare' ? '#22E5FF' : '#7A6F9E';
  return (
    <div style={{
      borderRadius: 12, padding: 6, position: 'relative',
      background: owned ? rarBg : 'rgba(255,255,255,.03)',
      border: `1px solid ${owned ? rarBr+'66' : 'rgba(255,255,255,.06)'}`,
      boxShadow: owned && c.r==='legend' ? '0 0 14px -2px #FFC75A88' : 'none',
      opacity: c.locked ? 0.45 : 1,
    }}>
      {/* portrait */}
      <div style={{
        height: 76, borderRadius: 8, position: 'relative', overflow: 'hidden',
        background: c.locked ? 'repeating-linear-gradient(45deg, rgba(255,255,255,.04) 0 4px, transparent 4px 8px)' :
          `linear-gradient(135deg, ${c.c}, ${c.c}33)`,
        display: 'grid', placeItems: 'center',
      }}>
        {/* face placeholder */}
        {!c.locked && (
          <svg width="44" height="44" viewBox="0 0 44 44">
            <circle cx="22" cy="16" r="8" fill="#0A0612" opacity="0.5"/>
            <path d="M 6 40 C 6 28 16 24 22 24 C 28 24 38 28 38 40" fill="#0A0612" opacity="0.5"/>
            <circle cx="22" cy="16" r="8" fill="none" stroke={owned ? '#fff' : '#7A6F9E'} strokeOpacity="0.7"/>
          </svg>
        )}
        {c.locked && <Icon.Lock s={16} c="#7A6F9E"/>}
        {/* rarity badge */}
        {!c.locked && (
          <div style={{
            position: 'absolute', top: 4, left: 4,
            padding: '1px 4px', borderRadius: 3,
            background: c.r==='legend'?'#FFC75A':c.r==='rare'?'#22E5FF':'#7A6F9E',
            fontSize: 7, fontWeight: 900, color: '#0A0612', letterSpacing: 0.5, textTransform: 'uppercase',
          }}>{c.r}</div>
        )}
        {/* tier stars */}
        {owned && c.tier > 0 && (
          <div style={{ position: 'absolute', bottom: 2, left: 2, display: 'flex', gap: 1 }}>
            {Array.from({length: Math.min(7, c.tier)}).map((_, i) => (
              <div key={i} style={{ width: 5, height: 5, background: '#FFE34A', clipPath: 'polygon(50% 0, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}/>
            ))}
          </div>
        )}
      </div>
      <div style={{ marginTop: 5 }}>
        <div style={{ fontSize: 11, fontWeight: 900, color: '#F5F0FF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.n}</div>
        <div style={{ fontSize: 9, color: '#7A6F9E', fontWeight: 700 }}>{c.tag}</div>
        {!owned && !c.locked && (
          <div style={{ marginTop: 4 }}>
            <ProgressBar value={c.frags} max={100} color={rarBr} height={3} glow={false} nearMiss={c.frags>=70}/>
            <div style={{ fontSize: 8, color: rarBr, marginTop: 1, fontWeight: 700 }}>{c.frags}/100 FRAG</div>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { CrewScreen });
