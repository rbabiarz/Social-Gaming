// app.jsx — root for Syndicate City
const { useState, useEffect, useReducer } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "annotations": false,
  "accent": "magenta",
  "showTwoPhones": false,
  "startTab": "home"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [tab, setTab] = useState(t.startTab || 'home');
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [splash, setSplash] = useState(null);

  // listen for chip splash
  useEffect(() => {
    if (state.splash) {
      setSplash(state.splash);
      const tm = setTimeout(() => { setSplash(null); dispatch({ type: 'clearSplash' }); }, 1200);
      return () => clearTimeout(tm);
    }
  }, [state.splash]);

  const accentMap = {
    magenta: { primary: '#FF2E93', secondary: '#22E5FF' },
    cyan:    { primary: '#22E5FF', secondary: '#FF2E93' },
    gold:    { primary: '#FFC75A', secondary: '#FF2E93' },
  };
  const accent = accentMap[t.accent] || accentMap.magenta;

  const Screen = ({ name }) => {
    const props = { state, dispatch, anno: t.annotations };
    return (
      <>
        {name === 'home' && <HomeScreen {...props}/>}
        {name === 'city' && <CityScreen {...props}/>}
        {name === 'crew' && <CrewScreen {...props}/>}
        {name === 'syndicate' && <SyndicateScreen {...props}/>}
        {name === 'pass' && <PassScreen {...props}/>}
      </>
    );
  };

  const renderPhone = (key, tabOverride) => (
    <IOSDevice dark width={402} height={874}>
      <div style={{ position: 'absolute', inset: 0, background:
        'radial-gradient(circle at 50% -10%, rgba(255,46,147,.18), transparent 50%),' +
        'radial-gradient(circle at 50% 100%, rgba(34,229,255,.12), transparent 50%),' +
        'linear-gradient(180deg, #0A0612, #15102A)',
      }}/>
      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', paddingTop: 56, boxSizing: 'border-box' }}>
        <TopBar state={state} accent={accent}/>
        <div data-screen-label={`Syndicate City – ${tabOverride||tab}`} style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          <Screen name={tabOverride||tab}/>
        </div>
        <TabBar tab={tabOverride||tab} setTab={setTab} accent={accent}/>
      </div>
      {/* Chip splash overlay */}
      {splash && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 100, pointerEvents: 'none',
          display: 'grid', placeItems: 'center',
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #FFE34A, #FF9A2E)', color: '#3a1e00',
            padding: '14px 24px', borderRadius: 16, fontWeight: 900, fontSize: 22,
            display: 'flex', alignItems: 'center', gap: 8,
            boxShadow: '0 0 80px #FFC75A, 0 16px 40px rgba(0,0,0,.5)',
            animation: 'scPop .5s cubic-bezier(.2,.8,.2,1)',
          }}><Icon.Chip s={28}/>+{fmt(splash)}</div>
        </div>
      )}
    </IOSDevice>
  );

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', gap: 30,
      alignItems: 'center', justifyContent: 'center',
      background: '#ffffff', padding: 24,
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      {t.showTwoPhones ? (
        <>
          {renderPhone('a', 'home')}
          {renderPhone('b', 'syndicate')}
        </>
      ) : renderPhone()}

      <TweaksPanel title="Syndicate City – Tweaks">
        <TweakSection label="View Mode">
          <TweakToggle label="KPI Annotations" value={t.annotations} onChange={v => setTweak('annotations', v)}/>
          <TweakToggle label="Side-by-side phones" value={t.showTwoPhones} onChange={v => setTweak('showTwoPhones', v)}/>
        </TweakSection>
        <TweakSection label="Theme accent">
          <TweakRadio label="Accent" value={t.accent} options={['magenta','cyan','gold']} onChange={v => setTweak('accent', v)}/>
        </TweakSection>
        <TweakSection label="Jump to Screen">
          <TweakSelect label="Tab" value={tab} options={['home','city','crew','syndicate','pass']} onChange={setTab}/>
        </TweakSection>
        <TweakSection label="Game Actions">
          <TweakButton label="+ 5,000 chips" onClick={() => dispatch({ type: 'addChips', amount: 5000 })}/>
          <TweakButton label="Reset state" onClick={() => dispatch({ type: 'reset' })} secondary/>
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

// ── Top bar ─────────────────────────────────────────────────
function TopBar({ state, accent }) {
  return (
    <div style={{
      padding: '4px 12px 8px', display: 'flex', alignItems: 'center', gap: 6,
      position: 'relative', zIndex: 5,
    }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginRight: 'auto' }}>
        <Wordmark/>
      </div>
      {/* Streak chip */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        padding: '5px 8px', borderRadius: 999, height: 28,
        background: 'linear-gradient(180deg, rgba(255,154,46,.2), rgba(255,46,147,.08))',
        border: '1px solid rgba(255,154,46,.4)',
      }}>
        <Icon.Fire s={14}/>
        <span style={{ fontSize: 12, fontWeight: 800, color: '#FFE34A' }}>{state.streak}</span>
      </div>
      <ChipPill value={state.chips} icon="chip" tone="gold" onPlus={()=>{}}/>
      <ChipPill value={state.gems} icon="gem" tone="cyan" onPlus={()=>{}}/>
    </div>
  );
}

function Wordmark() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      <svg width="22" height="22" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="wm-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FF2E93"/><stop offset=".5" stopColor="#FFC75A"/><stop offset="1" stopColor="#22E5FF"/>
          </linearGradient>
        </defs>
        <polygon points="12,2 22,7 22,17 12,22 2,17 2,7" fill="none" stroke="url(#wm-g)" strokeWidth="2"/>
        <text x="12" y="16" fontSize="11" fontWeight="900" textAnchor="middle" fill="#FFE34A" fontFamily="system-ui">SC</text>
      </svg>
      <div style={{ lineHeight: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 900, color: '#F5F0FF', letterSpacing: 1 }}>SYNDICATE</div>
        <div style={{ fontSize: 8, fontWeight: 700, color: '#FF2E93', letterSpacing: 3, marginTop: 1 }}>CITY</div>
      </div>
    </div>
  );
}

// ── Tab bar ─────────────────────────────────────────────────
function TabBar({ tab, setTab, accent }) {
  const tabs = [
    { id: 'home',      label: 'Home',   icon: <Icon.Bell s={18}/> },
    { id: 'city',      label: 'City',   icon: <Icon.Crown s={18} c="currentColor"/> },
    { id: 'crew',      label: 'Crew',   icon: <Icon.Users s={18} c="currentColor"/> },
    { id: 'syndicate', label: 'Syn',    icon: <Icon.Shield s={18} c="currentColor"/>, badge: true },
    { id: 'pass',      label: 'Pass',   icon: <Icon.Trophy s={18} c="currentColor"/> },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 30,
      padding: '8px 12px 52px',
      background: 'linear-gradient(180deg, transparent, rgba(10,6,18,.9) 30%)',
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
    }}>
      <div style={{
        display: 'flex', gap: 2, padding: 6, width: '100%',
        background: 'rgba(10,6,18,.85)', borderRadius: 24,
        border: '1px solid rgba(255,255,255,.08)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 10px 30px rgba(0,0,0,.5)',
      }}>
        {tabs.map(t => {
          const active = tab === t.id;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, border: 'none', cursor: 'pointer',
              padding: '8px 4px', borderRadius: 18,
              background: active ? 'linear-gradient(180deg, #FF2E93, #B30A6E)' : 'transparent',
              color: active ? '#fff' : '#7A6F9E',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              position: 'relative',
              boxShadow: active ? '0 4px 14px -4px #FF2E93' : 'none',
              transition: 'all .15s',
            }}>
              <div style={{ position: 'relative' }}>
                {t.icon}
                {t.badge && <div style={{ position: 'absolute', top: -2, right: -4, width: 8, height: 8, borderRadius: 999, background: '#FFE34A', boxShadow: '0 0 6px #FFE34A' }}/>}
              </div>
              <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase' }}>{t.label}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Game state ──────────────────────────────────────────────
const initialState = {
  chips: 42800,
  gems: 124,
  streak: 4,
  idle: 8240,
  idleCap: 25000,
  idleClaimed: false,
  cityLevel: 27,
  power: 18420,
  missions: [
    { title: 'Upgrade 1 District', value: 1, target: 1, reward: 1500, done: true, claimed: false },
    { title: 'Win 3 Slot mini-games', value: 2, target: 3, reward: 2400, done: false, claimed: false },
    { title: 'Contribute to Vault', value: 0, target: 1, reward: 1000, done: false, claimed: false },
    { title: 'Recruit a Crew member', value: 0, target: 1, reward: 3000, done: false, claimed: false },
  ],
  districts: [
    { id: 'grand',    name: 'MGM Grand',  tier: 6, bonus: '+12% chip earn', next: 'Unlock James Bond mission tier' },
    { id: 'bellagio', name: 'Bellagio',   tier: 5, bonus: '+10% poker chips', next: 'Unlock Velvet Rose recruit' },
    { id: 'aria',     name: 'Aria',       tier: 3, bonus: '+6% crew XP', next: 'Unlock new daily mission slot' },
    { id: 'luxor',    name: 'Luxor',      tier: 2, bonus: '+4% crew XP', next: 'Unlock Pyramid skin' },
    { id: 'mandalay', name: 'Mandalay',   tier: 1, bonus: '+2% chip earn', next: 'Unlock UFC syndicate buff' },
    { id: 'cosmo',    name: 'Cosmo',      tier: 4, bonus: '+8% gem find', next: 'Unlock Agent 00X' },
    { id: 'strip',    name: 'The Strip',  tier: 9, bonus: '+18% all earnings', next: 'TIER 10 — Legendary skin · GLOBAL BONUS' },
    { id: 'down',     name: 'Downtown',   tier: 2, bonus: '+3% reroll', next: 'Unlock Pixel Punk' },
    { id: 'fremont',  name: 'Fremont',    tier: 0, unlock: 30, bonus: '—', next: 'Reach City Level 30' },
    { id: 'knights',  name: 'Knights Arena', tier: 0, unlock: 35, bonus: '—', next: 'Reach City Level 35' },
    { id: 'arena',    name: 'T-Forum',    tier: 0, unlock: 40, bonus: '—', next: 'Reach City Level 40' },
    { id: 'stadium',  name: 'Allegiant',  tier: 0, unlock: 50, bonus: '—', next: 'Reach City Level 50' },
  ],
  splash: 0,
};

function gameReducer(s, a) {
  switch (a.type) {
    case 'claimIdle':
      return { ...s, idleClaimed: true, chips: s.chips + a.amount, splash: a.amount };
    case 'claimMission':
      return {
        ...s,
        chips: s.chips + s.missions[a.idx].reward,
        splash: s.missions[a.idx].reward,
        missions: s.missions.map((m, i) => i === a.idx ? { ...m, claimed: true } : m),
      };
    case 'upgrade': {
      if (s.chips < a.cost) return s;
      return {
        ...s, chips: s.chips - a.cost,
        districts: s.districts.map(d => d.id === a.id ? { ...d, tier: Math.min(10, d.tier+1) } : d),
        power: s.power + 250,
      };
    }
    case 'addChips':
      return { ...s, chips: s.chips + a.amount, splash: a.amount };
    case 'clearSplash':
      return { ...s, splash: 0 };
    case 'reset':
      return initialState;
    default: return s;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
