// screens.jsx — five screens for Syndicate City
// expects window globals: Icon, ChipPill, ProgressBar, Panel, GlowBtn, Stripes, AnnoPin, fmt, SC_THEME

const { useState, useEffect, useRef } = React;

// ═══════════════════════════════════════════════════════════════
// HOME SCREEN — daily streak, idle claim, missions, exit hooks
// ═══════════════════════════════════════════════════════════════
function HomeScreen({ state, dispatch, anno }) {
  const [idleAccum, setIdleAccum] = useState(state.idle);
  useEffect(() => {
    if (state.idleClaimed) return;
    const t = setInterval(() => setIdleAccum(v => Math.min(state.idleCap, v + 1)), 600);
    return () => clearInterval(t);
  }, [state.idleClaimed, state.idleCap]);

  const streakDays = state.streak;
  const streakRewards = [
    { d: 1, c: 500, t: 'common' }, { d: 2, c: 1200, t: 'common' },
    { d: 3, c: 2500, t: 'common' }, { d: 4, c: 5000, t: 'rare' },
    { d: 5, c: 8000, t: 'rare' },   { d: 6, c: 12000, t: 'rare' },
    { d: 7, c: 25000, t: 'legend' },
  ];

  return (
    <div style={{ padding: '0 14px 100px', position: 'relative' }}>
      {/* Welcome header */}
      <div style={{ marginTop: 4, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: '#7A6F9E', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Welcome back, Boss</div>
        <div style={{ fontSize: 22, color: '#F5F0FF', fontWeight: 900, letterSpacing: -0.5, marginTop: 2 }}>The city missed you.</div>
      </div>

      {/* Idle revenue claim */}
      <Panel anno="idle" glow accent="#FFC75A" style={{ marginBottom: 12, padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          <div style={{ flex: 1, padding: 14, position: 'relative' }}>
            <div style={{ fontSize: 10, color: '#FFC75A', fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase' }}>Idle Revenue</div>
            <div style={{ fontSize: 26, fontWeight: 900, color: '#F5F0FF', marginTop: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon.Chip s={22}/>{fmt(idleAccum)}
            </div>
            <div style={{ fontSize: 11, color: '#B7AFD6', marginTop: 2 }}>
              Earned while you were away · <span style={{ color: '#FF2E93' }}>+{fmt(Math.floor(idleAccum*0.5))}</span> with VIP 2x
            </div>
          </div>
          <button onClick={() => { dispatch({ type: 'claimIdle', amount: idleAccum }); setIdleAccum(0); }}
            style={{
              border: 'none', cursor: 'pointer',
              background: state.idleClaimed ? 'rgba(255,255,255,.05)' : 'linear-gradient(180deg, #FFC75A, #FF9A2E)',
              color: state.idleClaimed ? '#7A6F9E' : '#0A0612',
              fontWeight: 900, fontSize: 14, letterSpacing: 1, textTransform: 'uppercase',
              padding: '0 18px', minWidth: 96,
              boxShadow: state.idleClaimed ? 'none' : 'inset 0 1px 0 rgba(255,255,255,.4), 0 0 30px -8px #FFC75A',
            }}>
            {state.idleClaimed ? 'Empty' : 'Claim'}
          </button>
        </div>
      </Panel>

      {/* Streak */}
      <Panel anno="streak" style={{ marginBottom: 12, padding: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon.Fire s={22}/>
            <div>
              <div style={{ fontSize: 14, fontWeight: 900, color: '#F5F0FF' }}>Day {streakDays} Streak</div>
              <div style={{ fontSize: 10, color: '#FF7A2E', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Don't break the chain</div>
            </div>
          </div>
          <button style={{
            background: 'rgba(255,46,147,0.15)', border: '1px solid rgba(255,46,147,.4)',
            color: '#FF2E93', fontSize: 10, fontWeight: 800, padding: '5px 8px',
            borderRadius: 6, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 0.5,
          }}>
            <Icon.Shield s={10} c="#FF2E93"/> Protect $0.99
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
          {streakRewards.map(r => {
            const done = r.d <= streakDays;
            const today = r.d === streakDays;
            const color = r.t === 'legend' ? '#FFC75A' : r.t === 'rare' ? '#22E5FF' : '#FF2E93';
            return (
              <div key={r.d} style={{
                aspectRatio: '1',
                borderRadius: 10,
                background: today ? `linear-gradient(180deg, ${color}55, ${color}11)` : done ? 'rgba(124,255,101,.08)' : 'rgba(255,255,255,.03)',
                border: today ? `1.5px solid ${color}` : done ? '1px solid rgba(124,255,101,.3)' : '1px solid rgba(255,255,255,.06)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
                boxShadow: today ? `0 0 14px -2px ${color}` : 'none',
              }}>
                {done && !today && <div style={{ position: 'absolute', top: 2, right: 2 }}><Icon.Check s={10}/></div>}
                <div style={{ fontSize: 8, color: '#7A6F9E', fontWeight: 700, letterSpacing: 0.5 }}>D{r.d}</div>
                {r.t === 'legend' ? <Icon.Crown s={14} c={color}/> : <Icon.Chip s={14}/>}
                <div style={{ fontSize: 8, fontWeight: 800, color: today ? color : '#B7AFD6', marginTop: 1 }}>{fmt(r.c)}</div>
              </div>
            );
          })}
        </div>
      </Panel>

      {/* Daily missions */}
      <SectionHeader title="Daily Missions" right={<span style={{ fontSize: 10, color: '#FF2E93', fontWeight: 800 }}>RESETS IN 8h 14m</span>} anno="missions"/>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {state.missions.map((m, i) => (
          <Mission key={i} mission={m} onClaim={() => dispatch({ type: 'claimMission', idx: i })}/>
        ))}
      </div>

      {/* Cross-vertical sync hook */}
      <SectionHeader title="VIP Vault" right={<span style={{ fontSize: 10, color: '#22E5FF', fontWeight: 800 }}>CROSS-PRODUCT</span>} anno="crossvert"/>
      <Panel glow accent="#22E5FF" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Stripes w={56} h={56} color="#22E5FF" label="SLOTS" radius={10}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 900, color: '#F5F0FF' }}>Free Spin · Neon Grand Slots</div>
          <div style={{ fontSize: 10, color: '#B7AFD6', marginTop: 2, lineHeight: 1.3 }}>Complete <b style={{color:'#22E5FF'}}>3 daily missions</b> to unlock — no deposit needed</div>
          <div style={{ marginTop: 6 }}>
            <ProgressBar value={state.missions.filter(m=>m.done).length} max={3} color="#22E5FF" height={6} nearMiss={state.missions.filter(m=>m.done).length === 2}/>
          </div>
        </div>
      </Panel>

      {/* Exit hook */}
      <SectionHeader title="Live Now" anno="exit"/>
      <Panel style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 20%, rgba(255,46,147,.25), transparent 60%)' }}/>
        <div style={{ padding: 14, position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 6px', borderRadius: 4, background: '#FF2E93', fontSize: 9, fontWeight: 900, color: '#fff', letterSpacing: 1 }}>
                <div style={{ width: 5, height: 5, borderRadius: 999, background: '#fff', animation: 'scPulse 1s ease infinite' }}/>
                FLASH 1H
              </div>
              <div style={{ fontSize: 16, fontWeight: 900, color: '#F5F0FF', marginTop: 6 }}>Skyline Heist Tournament</div>
              <div style={{ fontSize: 11, color: '#B7AFD6', marginTop: 2 }}>Rank Top 100 to win a Legendary fragment</div>
            </div>
            <Countdown seconds={3420}/>
          </div>
          <div style={{ marginTop: 10, display: 'flex', gap: 6, alignItems: 'center' }}>
            <GlowBtn tone="pink" size="sm">Enter</GlowBtn>
            <div style={{ fontSize: 10, color: '#7A6F9E' }}>2,847 players competing</div>
          </div>
        </div>
      </Panel>

      {anno && <>
        <AnnoPin kpi="D1 RETENTION" text="Idle revenue creates a reason to open the app: 'free money waiting'." x={14} y={120}/>
        <AnnoPin kpi="STREAK FOMO" text="7-day escalating reward + paid Streak Protect = login habit + monetization." x={170} y={260}/>
        <AnnoPin kpi="QUICK WIN" text="2-min daily mission = instant dopamine. Every session starts with a win." x={170} y={500}/>
        <AnnoPin kpi="CROSS-VERTICAL" text="Promotional credit, not paid: compliant bridge from F2P to real-money slots." x={14} y={680}/>
        <AnnoPin kpi="EXIT HOOK" text="Countdown timer creates urgency to return within the hour." x={14} y={870}/>
      </>}
    </div>
  );
}

function SectionHeader({ title, right, anno }) {
  return (
    <div data-anno={anno} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '14px 2px 8px' }}>
      <div style={{ fontSize: 11, color: '#F5F0FF', fontWeight: 900, letterSpacing: 1.2, textTransform: 'uppercase' }}>{title}</div>
      {right}
    </div>
  );
}

function Mission({ mission, onClaim }) {
  const pct = (mission.value / mission.target) * 100;
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 10,
      border: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', alignItems: 'center', gap: 10,
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: 10,
        background: mission.done ? 'linear-gradient(180deg, #7CFF65, #2E9B1F)' : 'rgba(255,46,147,0.12)',
        border: `1px solid ${mission.done ? '#7CFF65' : 'rgba(255,46,147,.3)'}`,
        display: 'grid', placeItems: 'center', flexShrink: 0,
      }}>{mission.done ? <Icon.Check s={18} c="#0A0612"/> : <Icon.Bolt s={20} c="#FF2E93"/>}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#F5F0FF' }}>{mission.title}</div>
          <div style={{ fontSize: 10, color: '#7A6F9E', fontWeight: 600 }}>{mission.value}/{mission.target}</div>
        </div>
        <div style={{ marginTop: 4 }}>
          <ProgressBar value={mission.value} max={mission.target} color={mission.done ? '#7CFF65' : '#FF2E93'} height={5} nearMiss={!mission.done && pct >= 70}/>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, fontWeight: 800, color: '#FFC75A' }}>
          <Icon.Chip s={12}/>{fmt(mission.reward)}
        </div>
        {mission.done && !mission.claimed ?
          <button onClick={onClaim} style={{
            background: 'linear-gradient(180deg, #FFC75A, #FF9A2E)', color: '#0A0612',
            border: 'none', borderRadius: 6, fontSize: 10, fontWeight: 900, padding: '3px 8px',
            cursor: 'pointer', letterSpacing: 0.5, textTransform: 'uppercase',
          }}>Claim</button>
          : mission.claimed ?
          <div style={{ fontSize: 9, color: '#7CFF65', fontWeight: 800 }}>✓ CLAIMED</div>
          : null
        }
      </div>
    </div>
  );
}

function Countdown({ seconds: initial }) {
  const [s, setS] = useState(initial);
  useEffect(() => { const t = setInterval(() => setS(v => Math.max(0, v-1)), 1000); return () => clearInterval(t); }, []);
  const m = Math.floor(s/60), ss = s%60;
  return (
    <div style={{
      padding: '4px 8px', borderRadius: 6,
      background: 'rgba(10,6,18,.6)', border: '1px solid rgba(255,46,147,.3)',
      fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 13, fontWeight: 800, color: '#FF2E93',
    }}>{String(Math.floor(m/60)).padStart(2,'0')}:{String(m%60).padStart(2,'0')}:{String(ss).padStart(2,'0')}</div>
  );
}

Object.assign(window, { HomeScreen, SectionHeader });
