// screen-pass.jsx — seasonal battle pass (monetization driver)

function PassScreen({ state, anno }) {
  const seasonProgress = 23; // out of 50
  const tiers = Array.from({ length: 50 }, (_, i) => {
    const lvl = i + 1;
    const claimed = lvl <= seasonProgress;
    const current = lvl === seasonProgress + 1;
    return { lvl, claimed, current };
  });

  // freebie rewards
  const freeR = ['1k', 'Frag', '2k', 'Mat', '5k', 'Rare', 'Mat', '10k', 'Frag', 'Skin'];
  const premR = ['Skin', '5k', 'Frag', 'Mat', '10k', 'Legend', 'Frag', '25k', 'Skin', 'Outfit'];

  return (
    <div style={{ padding: '0 14px 100px' }}>
      {/* Season header */}
      <div style={{
        position: 'relative', margin: '6px -14px 14px', padding: '18px 16px',
        background: 'linear-gradient(135deg, #B30A2E 0%, #FF8E3C 50%, #FFC75A 100%)',
        overflow: 'hidden',
      }}>
        {/* speed lines */}
        <svg viewBox="0 0 400 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.25 }}>
          {Array.from({length: 14}).map((_, i) => (
            <line key={i} x1={Math.random()*400} y1={Math.random()*100} x2={Math.random()*400 + 100} y2={Math.random()*100} stroke="#fff" strokeWidth="1"/>
          ))}
        </svg>
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,.85)', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>Season 03 · Q2</div>
          <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', letterSpacing: -0.5, textShadow: '0 4px 12px rgba(0,0,0,.3)' }}>VEGAS GRAND PRIX</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,.85)', marginTop: 2, fontWeight: 600 }}>F1-themed syndicate races · 8 weeks · ends in <b>23d 14h</b></div>
        </div>
      </div>

      {/* Free vs Premium toggle */}
      <Panel anno="pass-buy" style={{ padding: 12, marginBottom: 14, background: 'linear-gradient(180deg, rgba(255,199,90,.18), rgba(255,255,255,.02))', border: '1px solid rgba(255,199,90,.4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 10,
            background: 'linear-gradient(135deg, #FFC75A, #FF2E93)',
            display: 'grid', placeItems: 'center',
            boxShadow: '0 0 20px rgba(255,199,90,.5)',
          }}><Icon.Crown s={28} c="#fff"/></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 900, color: '#F5F0FF' }}>Unlock Grand Prix Pass</div>
            <div style={{ fontSize: 10, color: '#B7AFD6', lineHeight: 1.35 }}>
              <s style={{ color: '#7A6F9E' }}>$14.99</s> <b style={{ color: '#7CFF65' }}>$9.99</b> · Legendary characters, 2× XP, exclusive skins
            </div>
          </div>
          <GlowBtn tone="gold" size="md">$9.99</GlowBtn>
        </div>
        <div style={{ marginTop: 10, padding: 8, background: 'rgba(10,6,18,.5)', borderRadius: 8, fontSize: 10, color: '#FFC75A', fontWeight: 700, textAlign: 'center', letterSpacing: 0.5 }}>
          🏁 4,217 players in your league own this pass
        </div>
      </Panel>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ fontSize: 11, color: '#F5F0FF', fontWeight: 900, letterSpacing: 1.2, textTransform: 'uppercase' }}>Tier {seasonProgress} / 50</div>
        <div style={{ fontSize: 10, color: '#B7AFD6' }}>Next: <b style={{color:'#FFC75A'}}>1,200 XP</b></div>
      </div>
      <div style={{ marginBottom: 12 }}>
        <ProgressBar value={3800} max={5000} color="#FFC75A" height={6}/>
      </div>

      {/* Pass track */}
      <div style={{
        overflowX: 'auto', overflowY: 'hidden', margin: '0 -14px 14px',
        padding: '6px 14px 10px',
        scrollbarWidth: 'none',
      }}>
        <div style={{ display: 'flex', gap: 6, position: 'relative' }}>
          {tiers.slice(0, 12).map((t, i) => (
            <PassTier key={t.lvl} t={t} free={freeR[i % freeR.length]} prem={premR[i % premR.length]} owned={false}/>
          ))}
        </div>
      </div>

      <SectionHeader title="Big Milestones" anno="milestones"/>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { tier: 25, label: 'Halfway: F1 Driver Crew', got: false, type: 'rare', emoji: '🏎️' },
          { tier: 40, label: 'Legendary: Vega Speedster', got: false, type: 'legend', emoji: '👑' },
          { tier: 50, label: 'Season Finale: Allegiant skin', got: false, type: 'legend', emoji: '🏁' },
        ].map((m, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: 10, borderRadius: 10,
            background: 'rgba(255,255,255,.04)', border: `1px solid ${m.type==='legend'?'#FFC75A33':'#22E5FF33'}`,
          }}>
            <div style={{
              width: 42, height: 42, borderRadius: 8,
              background: m.type==='legend' ? 'linear-gradient(135deg, #FFC75A, #FF9A2E)' : 'linear-gradient(135deg, #22E5FF, #0090FF)',
              display: 'grid', placeItems: 'center', fontSize: 22,
            }}>{m.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#F5F0FF' }}>Tier {m.tier} — {m.label}</div>
              <div style={{ fontSize: 9, color: m.type==='legend'?'#FFC75A':'#22E5FF', fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', marginTop: 2 }}>
                {m.type === 'legend' ? '◆ Premium only' : '◇ All players'}
              </div>
            </div>
            <Icon.Lock s={14} c="#7A6F9E"/>
          </div>
        ))}
      </div>

      {/* Community goal */}
      <SectionHeader title="Community Goal" right={<span style={{ fontSize: 10, color: '#22E5FF', fontWeight: 800 }}>ALL PLAYERS</span>} anno="community"/>
      <Panel glow accent="#22E5FF">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 900, color: '#F5F0FF' }}>Complete 1M total district upgrades</div>
            <div style={{ fontSize: 10, color: '#B7AFD6', marginTop: 2 }}>Unlocks a free $5 sports bet for everyone</div>
          </div>
          <Icon.Trophy s={22}/>
        </div>
        <ProgressBar value={742310} max={1000000} color="#22E5FF" height={8} nearMiss/>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#7A6F9E', marginTop: 4, fontWeight: 700 }}>
          <span>742,310 upgrades</span>
          <span>257,690 to go · 3d left</span>
        </div>
      </Panel>

      {anno && <>
        <AnnoPin kpi="MONETIZATION" text="Premium pass = recurring revenue; FOMO via locked tiers visible to free players." x={14} y={220}/>
        <AnnoPin kpi="LONG GOAL" text="8-week commitment beats 1-day. D30 retention emerges from this kind of arc." x={14} y={520}/>
        <AnnoPin kpi="GLOBAL EVENT" text="Synchronized objective creates Fortnite-style FOMO at scale + cross-vertical unlock." x={14} y={760}/>
      </>}
    </div>
  );
}

function PassTier({ t, free, prem }) {
  return (
    <div style={{ minWidth: 64, position: 'relative' }}>
      {/* level header */}
      <div style={{
        textAlign: 'center', fontSize: 10, fontWeight: 900,
        color: t.current ? '#FFC75A' : t.claimed ? '#7CFF65' : '#7A6F9E',
        marginBottom: 4,
      }}>
        {t.current && <div style={{ fontSize: 8, color: '#FFC75A', letterSpacing: 1 }}>NEXT ▼</div>}
        T{t.lvl}
      </div>
      {/* free row */}
      <div style={{
        height: 56, borderRadius: 8, marginBottom: 6,
        background: t.claimed ? 'linear-gradient(180deg, rgba(124,255,101,.15), rgba(124,255,101,.05))' : 'rgba(255,255,255,.04)',
        border: `1px solid ${t.current ? '#FFC75A' : t.claimed ? '#7CFF65' : 'rgba(255,255,255,.06)'}`,
        display: 'grid', placeItems: 'center', position: 'relative',
        boxShadow: t.current ? '0 0 12px #FFC75A66' : 'none',
      }}>
        <RewardIcon label={free} small/>
        {t.claimed && <div style={{ position: 'absolute', top: 2, right: 2 }}><Icon.Check s={10}/></div>}
      </div>
      {/* prem row */}
      <div style={{
        height: 56, borderRadius: 8,
        background: 'linear-gradient(180deg, rgba(255,199,90,.18), rgba(255,154,46,.05))',
        border: '1px solid #FFC75A66',
        display: 'grid', placeItems: 'center', position: 'relative',
      }}>
        <RewardIcon label={prem} small premium/>
        <div style={{ position: 'absolute', top: 2, right: 2 }}><Icon.Lock s={10} c="#FFC75A"/></div>
      </div>
    </div>
  );
}

function RewardIcon({ label, small, premium }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: small ? 16 : 22 }}>
        {label === 'Frag' ? '🧩' : label === 'Mat' ? '⚙️' : label === 'Skin' ? '🎨' :
         label === 'Rare' ? '💎' : label === 'Legend' ? '👑' : label === 'Outfit' ? '✨' : <Icon.Chip s={small?16:22}/>}
      </div>
      <div style={{ fontSize: 8, fontWeight: 800, color: premium ? '#FFC75A' : '#F5F0FF', marginTop: 1 }}>{label}</div>
    </div>
  );
}

Object.assign(window, { PassScreen });
