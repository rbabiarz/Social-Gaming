// screen-city.jsx — isometric district map (build-a-Vegas-empire)
const { useState } = React;

function CityScreen({ state, dispatch, anno }) {
  const [selected, setSelected] = useState(state.districts[0].id);
  const district = state.districts.find(d => d.id === selected);

  return (
    <div style={{ position: 'relative', minHeight: '100%' }}>
      {/* Sky + city header */}
      <div style={{
        position: 'relative', height: 290, overflow: 'hidden',
        background: 'linear-gradient(180deg, #2A1454 0%, #631B79 35%, #B30A6E 75%, #FF2E93 100%)',
      }}>
        {/* stars */}
        {Array.from({length: 18}).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: `${Math.random()*40}%`, left: `${Math.random()*100}%`,
            width: 2, height: 2, borderRadius: 999, background: '#fff',
            opacity: 0.4 + Math.random()*0.5,
            boxShadow: '0 0 4px #fff',
          }}/>
        ))}
        {/* moon */}
        <div style={{ position: 'absolute', top: 16, right: 22, width: 28, height: 28, borderRadius: 999,
          background: 'radial-gradient(circle at 30% 30%, #FFE08A, #FF9A2E)',
          boxShadow: '0 0 40px rgba(255,224,138,.5)' }}/>
        <div style={{
          position: 'absolute', top: 8, left: 14, right: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 2,
        }}>
          <div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,.7)', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>City Level</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: '#FFE34A', letterSpacing: -1, textShadow: '0 4px 12px rgba(0,0,0,.4)' }}>
              {state.cityLevel}<span style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', fontWeight: 700 }}> / 100</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,.7)', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>Power</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Icon.Bolt s={18}/> {fmt(state.power)}
            </div>
          </div>
        </div>

        {/* Skyline silhouette */}
        <Skyline/>
      </div>

      {/* District grid */}
      <div style={{ padding: '14px 14px 100px', marginTop: -12, position: 'relative', zIndex: 3 }}>
        <Panel anno="city" style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 900, color: '#F5F0FF' }}>12 Districts</div>
              <div style={{ fontSize: 10, color: '#B7AFD6' }}>{state.districts.filter(d=>d.tier>0).length} unlocked · {state.districts.filter(d=>d.tier===10).length} maxed</div>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              <FilterPill active>All</FilterPill>
              <FilterPill>Hot</FilterPill>
              <FilterPill>Locked</FilterPill>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
            {state.districts.map(d => (
              <DistrictTile key={d.id} d={d} selected={selected===d.id} onClick={()=>setSelected(d.id)}/>
            ))}
          </div>
        </Panel>

        {/* Selected district detail */}
        {district && <DistrictDetail district={district} dispatch={dispatch}/>}
      </div>

      {anno && <>
        <AnnoPin kpi="NEAR-MISS" text="9/10 tier progress bar drives 'just one more' return sessions — no gambling loss." x={14} y={350}/>
        <AnnoPin kpi="DISCOVERY" text="Each tier unlocks a casino feature tutorial — F2P fuels real-money product discovery." x={14} y={620}/>
      </>}
    </div>
  );
}

function FilterPill({ children, active }) {
  return (
    <button style={{
      padding: '4px 10px', borderRadius: 999, border: 'none', cursor: 'pointer',
      background: active ? 'linear-gradient(180deg, #FF2E93, #B30A6E)' : 'rgba(255,255,255,.06)',
      color: active ? '#fff' : '#B7AFD6',
      fontSize: 10, fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase',
    }}>{children}</button>
  );
}

function DistrictTile({ d, selected, onClick }) {
  const locked = d.tier === 0 && d.unlock > 0;
  const colors = {
    grand: ['#FFC75A', '#FF9A2E'], bellagio: ['#22E5FF', '#0090FF'],
    aria: ['#9B6EFF', '#5B2BBF'], luxor: ['#FFE34A', '#FF7A2E'],
    mandalay: ['#FF8E3C', '#B30A2E'], cosmo: ['#FF2E93', '#B30A6E'],
    strip: ['#7CFF65', '#2E9B1F'], down: ['#FF5364', '#931E2E'],
    fremont: ['#22E5FF', '#FF2E93'], knights: ['#FFC75A', '#22E5FF'],
    arena: ['#9B6EFF', '#FF2E93'], stadium: ['#7CFF65', '#22E5FF'],
  };
  const [c1, c2] = colors[d.id] || ['#FF2E93', '#B30A6E'];
  return (
    <button onClick={onClick} style={{
      background: locked ? 'rgba(255,255,255,.03)' : `linear-gradient(135deg, ${c1}22, ${c2}11)`,
      border: selected ? `1.5px solid ${c1}` : '1px solid rgba(255,255,255,.08)',
      borderRadius: 12, padding: 8, cursor: 'pointer', position: 'relative',
      boxShadow: selected ? `0 0 16px -2px ${c1}88` : 'none',
      textAlign: 'left',
    }}>
      <div style={{ height: 32, borderRadius: 6, background: locked ? 'rgba(255,255,255,.04)' :
        `linear-gradient(180deg, ${c1}66, ${c2}33)`,
        position: 'relative', overflow: 'hidden', marginBottom: 6,
        display: 'grid', placeItems: 'center',
      }}>
        {locked ? <Icon.Lock s={14}/> : <BuildingGlyph c1={c1} c2={c2} tier={d.tier}/>}
        {d.tier === 10 && <div style={{ position: 'absolute', top: 2, right: 2 }}><Icon.Crown s={10}/></div>}
      </div>
      <div style={{ fontSize: 10, fontWeight: 800, color: locked ? '#7A6F9E' : '#F5F0FF', letterSpacing: 0.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.name}</div>
      {!locked ? (
        <div style={{ marginTop: 4 }}>
          <ProgressBar value={d.tier} max={10} color={c1} height={3} glow={false} nearMiss={d.tier===9}/>
          <div style={{ fontSize: 8, color: '#7A6F9E', marginTop: 2, fontWeight: 700 }}>TIER {d.tier}/10</div>
        </div>
      ) : (
        <div style={{ fontSize: 9, color: '#FFC75A', marginTop: 4, fontWeight: 700 }}>Lv {d.unlock} unlocks</div>
      )}
    </button>
  );
}

function BuildingGlyph({ c1, c2, tier }) {
  return (
    <svg width="48" height="28" viewBox="0 0 48 28">
      <rect x="4" y="16" width="8" height="12" fill={c1} opacity="0.9"/>
      <rect x="14" y="10" width="10" height="18" fill={c2}/>
      <rect x="26" y="6" width="8" height="22" fill={c1}/>
      <rect x="36" y="14" width="8" height="14" fill={c2} opacity="0.9"/>
      {tier >= 5 && <rect x="29" y="2" width="2" height="4" fill="#FFE34A"/>}
      {Array.from({length: 6}).map((_, i) => (
        <rect key={i} x={16 + (i%3)*3} y={13 + Math.floor(i/3)*3} width="1.5" height="1.5" fill="#FFE34A" opacity={0.7+Math.random()*0.3}/>
      ))}
    </svg>
  );
}

function Skyline() {
  return (
    <svg viewBox="0 0 402 160" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 160 }} preserveAspectRatio="none">
      {/* Back layer */}
      <g opacity="0.55">
        {[20, 70, 130, 200, 260, 320, 370].map((x, i) => (
          <rect key={i} x={x} y={70 + Math.sin(i)*10} width="32" height="100" fill="#1F0838"/>
        ))}
      </g>
      {/* Mid */}
      <g>
        <rect x="0" y="90" width="50" height="80" fill="#3A0E5C"/>
        <rect x="48" y="60" width="40" height="110" fill="#4A1370"/>
        <rect x="86" y="75" width="28" height="95" fill="#3A0E5C"/>
        <polygon points="120,160 140,40 160,160" fill="#4A1370"/>
        <rect x="158" y="80" width="42" height="90" fill="#3A0E5C"/>
        <rect x="198" y="50" width="38" height="120" fill="#5A1880"/>
        <rect x="234" y="70" width="30" height="100" fill="#3A0E5C"/>
        <rect x="262" y="55" width="46" height="115" fill="#4A1370"/>
        <rect x="306" y="85" width="32" height="85" fill="#3A0E5C"/>
        <rect x="336" y="65" width="40" height="105" fill="#4A1370"/>
        <rect x="374" y="80" width="28" height="90" fill="#3A0E5C"/>
      </g>
      {/* Windows */}
      <g fill="#FFE34A" opacity="0.8">
        {Array.from({length: 80}).map((_, i) => (
          <rect key={i} x={Math.random()*400} y={70 + Math.random()*90} width="1.5" height="2.5" opacity={0.4+Math.random()*0.6}/>
        ))}
      </g>
      {/* Front silhouette */}
      <g fill="#0A0612">
        <rect x="0" y="130" width="402" height="30"/>
        <rect x="30" y="115" width="20" height="40"/>
        <rect x="80" y="120" width="14" height="35"/>
        <rect x="180" y="115" width="22" height="40"/>
        <rect x="260" y="118" width="18" height="40"/>
        <rect x="340" y="120" width="20" height="38"/>
      </g>
    </svg>
  );
}

function DistrictDetail({ district, dispatch }) {
  const nextCost = (district.tier + 1) * 2500;
  const canUpgrade = district.tier < 10;
  return (
    <Panel glow accent="#FF2E93" style={{ padding: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <Stripes w={64} h={64} color="#FF2E93" label={district.name.toUpperCase()} radius={10}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#F5F0FF' }}>{district.name}</div>
          <div style={{ fontSize: 10, color: '#FF2E93', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Tier {district.tier} · {district.bonus}</div>
          <div style={{ marginTop: 6 }}>
            <ProgressBar value={district.tier} max={10} color="#FF2E93" height={6} nearMiss={district.tier===9}/>
          </div>
        </div>
      </div>
      <div style={{
        background: 'rgba(255,46,147,0.08)', borderRadius: 10, padding: 10, marginBottom: 10,
        border: '1px solid rgba(255,46,147,.2)',
      }}>
        <div style={{ fontSize: 9, color: '#FF2E93', fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>Next Tier Unlocks</div>
        <div style={{ fontSize: 11, color: '#F5F0FF', lineHeight: 1.4 }}>
          • {district.next}<br/>
          • +1 Crew slot · +{(district.tier+1)*2}% chip earn rate
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <GlowBtn tone="pink" size="md" style={{ flex: 1 }}
          icon={<Icon.Chip s={14}/>}
          disabled={!canUpgrade}
          onClick={()=> dispatch({ type:'upgrade', id: district.id, cost: nextCost })}>
          {canUpgrade ? `Upgrade · ${fmt(nextCost)}` : 'Maxed'}
        </GlowBtn>
        <GlowBtn tone="cyan" size="md" icon={<Icon.Bolt s={14}/>}>2x VIP</GlowBtn>
      </div>
    </Panel>
  );
}

Object.assign(window, { CityScreen });
