// screen-syndicate.jsx — territory war + chat + roster (social obligation)
const { useState, useEffect } = React;

function SyndicateScreen({ state, dispatch, anno }) {
  const [tab, setTab] = useState('war');
  return (
    <div style={{ padding: '0 14px 100px' }}>
      {/* Syndicate banner */}
      <Panel anno="syndicate-banner" glow accent="#FF2E93" style={{ padding: 0, overflow: 'hidden', marginBottom: 12, marginTop: 6 }}>
        <div style={{ position: 'relative', height: 110, background: 'linear-gradient(135deg, #FF2E93 0%, #5B2BBF 60%, #22E5FF 100%)' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,.25), transparent 50%)' }}/>
          {/* heraldic */}
          <svg viewBox="0 0 100 100" style={{ position: 'absolute', left: 12, top: 12, width: 70, height: 70 }}>
            <polygon points="50,10 90,30 80,75 50,90 20,75 10,30" fill="#0A0612" opacity="0.5"/>
            <polygon points="50,18 82,33 75,72 50,82 25,72 18,33" fill="none" stroke="#FFE34A" strokeWidth="1.5"/>
            <text x="50" y="58" fontSize="24" fontWeight="900" textAnchor="middle" fill="#FFE34A">VC</text>
          </svg>
          <div style={{ position: 'absolute', left: 92, top: 16, right: 90, color: '#fff' }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, opacity: 0.85 }}>YOUR SYNDICATE</div>
            <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: -0.3, textShadow: '0 2px 8px rgba(0,0,0,.4)', whiteSpace: 'nowrap' }}>VEGAS CROWNS</div>
            <div style={{ fontSize: 10, fontWeight: 700, marginTop: 4, opacity: 0.9, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Icon.Crown s={10}/> Gold Tier · 18/20 members
            </div>
          </div>
          {/* tier ribbon */}
          <div style={{
            position: 'absolute', top: 10, right: 12,
            padding: '4px 10px', background: 'rgba(10,6,18,.6)', borderRadius: 6,
            border: '1px solid #FFC75A', fontSize: 10, fontWeight: 900, color: '#FFC75A', letterSpacing: 1,
          }}>RANK #14</div>
        </div>
        <div style={{ display: 'flex', padding: 8, gap: 6, borderTop: '1px solid rgba(255,255,255,.06)' }}>
          {[
            { id: 'war', label: 'Territory War', dot: true },
            { id: 'vault', label: 'Vault' },
            { id: 'chat', label: 'Chat', badge: 7 },
            { id: 'roster', label: 'Roster' },
          ].map(t => (
            <button key={t.id} onClick={()=>setTab(t.id)} style={{
              flex: 1, padding: '7px 4px', border: 'none', cursor: 'pointer',
              background: tab===t.id ? 'rgba(255,46,147,.15)' : 'transparent',
              color: tab===t.id ? '#FF2E93' : '#B7AFD6',
              borderRadius: 8, fontSize: 10, fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase',
              position: 'relative',
            }}>
              {t.label}
              {t.dot && <span style={{ display: 'inline-block', marginLeft: 4, width: 6, height: 6, borderRadius: 999, background: '#FF2E93', boxShadow: '0 0 6px #FF2E93' }}/>}
              {t.badge && <span style={{
                position: 'absolute', top: 2, right: 4, minWidth: 14, height: 14, borderRadius: 999,
                background: '#FF2E93', color: '#fff', fontSize: 8, fontWeight: 900, display: 'grid', placeItems: 'center', padding: '0 3px',
              }}>{t.badge}</span>}
            </button>
          ))}
        </div>
      </Panel>

      {tab === 'war' && <WarTab anno={anno}/>}
      {tab === 'vault' && <VaultTab anno={anno}/>}
      {tab === 'chat' && <ChatTab anno={anno}/>}
      {tab === 'roster' && <RosterTab anno={anno}/>}

      {anno && tab === 'war' && <>
        <AnnoPin kpi="D7 RETENTION" text="48h war + member contribution ranking = 'my team needs me' obligation." x={14} y={260}/>
        <AnnoPin kpi="SOCIAL PRESSURE" text="Visible contribution = shame mechanic for under-participation." x={14} y={550}/>
      </>}
      {anno && tab === 'vault' && (
        <AnnoPin kpi="COOPERATIVE GOAL" text="Shared progress bar — everyone benefits when filled; everyone loses when not." x={14} y={300}/>
      )}
    </div>
  );
}

// ── WAR TAB ─────────────────────────────────────────────────────
function WarTab({ anno }) {
  return (
    <>
      <Panel style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 10, color: '#FF2E93', fontWeight: 900, letterSpacing: 1.2, textTransform: 'uppercase' }}>LIVE: WAR FOR THE STRIP</div>
            <div style={{ fontSize: 16, fontWeight: 900, color: '#F5F0FF', marginTop: 2 }}>VS Diamond Kings</div>
          </div>
          <Countdown seconds={29 * 3600 + 14 * 60}/>
        </div>
        {/* tug of war bar */}
        <div style={{
          height: 28, borderRadius: 8, position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(90deg, #FF2E93 56%, #22E5FF 56%)',
          border: '1px solid rgba(255,255,255,.1)',
        }}>
          <div style={{ position: 'absolute', left: 8, top: 6, fontSize: 12, fontWeight: 900, color: '#fff' }}>56%</div>
          <div style={{ position: 'absolute', right: 8, top: 6, fontSize: 12, fontWeight: 900, color: '#fff' }}>44%</div>
          <div style={{
            position: 'absolute', top: -4, left: 'calc(56% - 12px)',
            width: 24, height: 36, background: '#FFE34A',
            clipPath: 'polygon(50% 0, 100% 30%, 100% 100%, 0 100%, 0 30%)',
            boxShadow: '0 0 12px #FFE34A',
          }}/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 10, color: '#B7AFD6', fontWeight: 700 }}>
          <span>Vegas Crowns · <span style={{color:'#FF2E93'}}>847,210 pts</span></span>
          <span>Diamond Kings · <span style={{color:'#22E5FF'}}>665,940 pts</span></span>
        </div>
      </Panel>

      <SectionHeader title="Top Contributors" right={<span style={{fontSize:10, color:'#7CFF65', fontWeight:800}}>YOU: #3</span>}/>
      <Panel style={{ padding: 8 }}>
        {[
          { rank: 1, name: 'NeonViper', pts: 142800, you: false, idle: false, avatar: '#FFC75A' },
          { rank: 2, name: 'HighRoller_Mae', pts: 118450, you: false, idle: false, avatar: '#22E5FF' },
          { rank: 3, name: 'YOU', pts: 96300, you: true, idle: false, avatar: '#FF2E93' },
          { rank: 4, name: 'AceofClubs', pts: 84150, you: false, idle: false, avatar: '#7CFF65' },
          { rank: 5, name: 'StripKing88', pts: 21000, you: false, idle: true, avatar: '#9B6EFF' },
        ].map(p => (
          <div key={p.rank} style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '6px 4px',
            background: p.you ? 'linear-gradient(90deg, rgba(255,46,147,.15), transparent)' : 'transparent',
            borderRadius: 6,
          }}>
            <div style={{ width: 18, fontSize: 11, color: '#7A6F9E', fontWeight: 800, textAlign: 'center' }}>{p.rank}</div>
            <Avatar c={p.avatar} initial={p.name[0]} size={28}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: p.you ? '#FF2E93' : '#F5F0FF', display: 'flex', alignItems: 'center', gap: 4 }}>
                {p.name}
                {p.idle && <span style={{
                  background: 'rgba(255,83,100,.2)', color: '#FF5364',
                  fontSize: 8, fontWeight: 900, padding: '1px 4px', borderRadius: 3, letterSpacing: 0.5,
                }}>@MENTION · INACTIVE</span>}
              </div>
              <div style={{ fontSize: 9, color: '#7A6F9E' }}>{fmt(p.pts)} pts</div>
            </div>
            {p.you && <Icon.Fire s={14}/>}
          </div>
        ))}
      </Panel>

      <SectionHeader title="War Missions"/>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { t: 'Capture Bellagio Tower', v: 3, m: 5, r: 2400, color: '#FF2E93' },
          { t: 'Raid enemy vault', v: 1, m: 2, r: 1800, color: '#FFC75A' },
          { t: 'Land 5 sports bets (links VIP)', v: 2, m: 5, r: 5000, color: '#22E5FF', vip: true },
        ].map((m, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.06)',
            borderRadius: 10, padding: 10,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#F5F0FF', display: 'flex', alignItems: 'center', gap: 4 }}>
                {m.t}
                {m.vip && <span style={{ background:'#22E5FF', color:'#0A0612', fontSize:8, fontWeight:900, padding:'1px 4px', borderRadius:3, letterSpacing:0.5 }}>VIP 2x</span>}
              </div>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#FFC75A', display: 'flex', alignItems: 'center', gap: 2 }}>
                <Icon.Chip s={11}/>{fmt(m.r)}
              </div>
            </div>
            <ProgressBar value={m.v} max={m.m} color={m.color} height={5}/>
          </div>
        ))}
      </div>
    </>
  );
}

function Avatar({ c, initial, size = 32 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 999, flexShrink: 0,
      background: `linear-gradient(135deg, ${c}, ${c}66)`,
      border: '1.5px solid rgba(255,255,255,.15)',
      display: 'grid', placeItems: 'center',
      fontSize: size * 0.42, fontWeight: 900, color: '#0A0612',
    }}>{initial}</div>
  );
}

// ── VAULT TAB ────────────────────────────────────────────────────
function VaultTab({ anno }) {
  return (
    <>
      <Panel glow accent="#FFC75A" style={{ textAlign: 'center', padding: 18, marginBottom: 12 }}>
        <div style={{ fontSize: 10, color: '#FFC75A', fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase' }}>Shared Vault</div>
        {/* Vault visual */}
        <div style={{ margin: '10px auto', width: 100, height: 100, borderRadius: 999, position: 'relative',
          background: 'radial-gradient(circle at 35% 30%, #FFE34A, #FF9A2E 60%, #8A4A00)',
          boxShadow: '0 0 50px rgba(255,199,90,.45), inset 0 4px 12px rgba(255,255,255,.4), inset 0 -8px 16px rgba(0,0,0,.4)',
          display: 'grid', placeItems: 'center',
        }}>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#3a1e00' }}>$</div>
          <div style={{ position: 'absolute', inset: 6, border: '2px dashed rgba(255,255,255,.5)', borderRadius: 999 }}/>
        </div>
        <div style={{ fontSize: 22, fontWeight: 900, color: '#F5F0FF', marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
          <Icon.Chip s={20}/> 7,820 <span style={{ color: '#7A6F9E', fontSize: 14, fontWeight: 700 }}>/ 10,000</span>
        </div>
        <div style={{ margin: '8px 0' }}>
          <ProgressBar value={7820} max={10000} color="#FFC75A" height={8} nearMiss/>
        </div>
        <div style={{ fontSize: 11, color: '#FFC75A', fontWeight: 700 }}>2,180 to unlock a Legendary fragment for ALL members</div>
        <GlowBtn tone="gold" size="md" style={{ marginTop: 12 }} icon={<Icon.Plus s={14} c="#0A0612"/>}>Contribute 500</GlowBtn>
      </Panel>

      <SectionHeader title="Recent Contributions"/>
      <Panel style={{ padding: 8 }}>
        {[
          { name: 'NeonViper', amt: 1200, time: '12m ago', c: '#FFC75A' },
          { name: 'HighRoller_Mae', amt: 800, time: '34m ago', c: '#22E5FF' },
          { name: 'AceofClubs', amt: 500, time: '1h ago', c: '#7CFF65' },
        ].map((p, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 4px' }}>
            <Avatar c={p.c} initial={p.name[0]} size={26}/>
            <div style={{ flex: 1, fontSize: 11, fontWeight: 700, color: '#F5F0FF' }}>{p.name}</div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#FFC75A', display: 'flex', alignItems: 'center', gap: 2 }}>
              <Icon.Chip s={10}/>+{fmt(p.amt)}
            </div>
            <div style={{ fontSize: 9, color: '#7A6F9E', width: 50, textAlign: 'right' }}>{p.time}</div>
          </div>
        ))}
      </Panel>
    </>
  );
}

// ── CHAT TAB ─────────────────────────────────────────────────────
function ChatTab() {
  const msgs = [
    { name: 'NeonViper', role: 'Leader', text: 'WAR ENDS IN 29h — push the line ‼️', c: '#FFC75A', t: '8:42' },
    { name: 'HighRoller_Mae', text: 'Took Bellagio Tower 🏰 free spin claimed', c: '#22E5FF', t: '8:45' },
    { name: 'StripKing88', text: '...', c: '#9B6EFF', t: '8:50', idle: true },
    { name: 'SYSTEM', text: '@StripKing88 hasn’t played in 18h — your syndicate needs you', system: true, t: '9:00' },
    { name: 'AceofClubs', text: 'I got 12K chips, dropping in vault now', c: '#7CFF65', t: '9:12' },
    { name: 'YOU', text: 'On it. Hitting daily missions next.', c: '#FF2E93', t: '9:14', you: true },
  ];
  return (
    <Panel style={{ padding: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {msgs.map((m, i) => (
          m.system ? (
            <div key={i} style={{
              alignSelf: 'center', padding: '5px 10px',
              background: 'rgba(255,83,100,.15)', border: '1px solid rgba(255,83,100,.4)',
              borderRadius: 999, fontSize: 10, color: '#FF5364', fontWeight: 700, textAlign: 'center',
            }}>{m.text}</div>
          ) : (
            <div key={i} style={{ display: 'flex', gap: 8, flexDirection: m.you ? 'row-reverse' : 'row' }}>
              <Avatar c={m.c} initial={m.name[0]} size={28}/>
              <div style={{ maxWidth: '70%' }}>
                <div style={{ display: 'flex', gap: 4, alignItems: 'baseline', justifyContent: m.you ? 'flex-end' : 'flex-start' }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: m.c }}>{m.name}</div>
                  {m.role && <div style={{ fontSize: 8, background: '#FFC75A22', color: '#FFC75A', padding: '1px 4px', borderRadius: 3, fontWeight: 800, letterSpacing: 0.3 }}>{m.role}</div>}
                  <div style={{ fontSize: 9, color: '#7A6F9E' }}>{m.t}</div>
                </div>
                <div style={{
                  marginTop: 2, padding: '7px 10px', borderRadius: 12,
                  background: m.you ? 'linear-gradient(180deg, #FF2E93, #B30A6E)' : 'rgba(255,255,255,.06)',
                  color: '#F5F0FF', fontSize: 12, lineHeight: 1.35,
                  opacity: m.idle ? 0.4 : 1,
                }}>{m.text}</div>
              </div>
            </div>
          )
        ))}
      </div>
      <div style={{
        marginTop: 12, display: 'flex', gap: 6, alignItems: 'center',
        padding: 6, background: 'rgba(255,255,255,.04)', borderRadius: 999,
        border: '1px solid rgba(255,255,255,.06)',
      }}>
        <div style={{ flex: 1, padding: '4px 10px', fontSize: 12, color: '#7A6F9E' }}>Message Vegas Crowns…</div>
        <button style={{ width: 30, height: 30, borderRadius: 999, border: 'none', background: 'linear-gradient(180deg, #FF2E93, #B30A6E)', cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
          <Icon.Chevron s={14} c="#fff"/>
        </button>
      </div>
    </Panel>
  );
}

// ── ROSTER TAB ───────────────────────────────────────────────────
function RosterTab() {
  const members = [
    ['NeonViper', 'Leader', '#FFC75A', 142800, 'active'],
    ['HighRoller_Mae', 'Officer', '#22E5FF', 118450, 'active'],
    ['YOU', 'Officer', '#FF2E93', 96300, 'active'],
    ['AceofClubs', 'Member', '#7CFF65', 84150, 'active'],
    ['VegasVee', 'Member', '#9B6EFF', 62100, 'active'],
    ['ChipDealer', 'Member', '#FF8E3C', 41800, 'active'],
    ['StripKing88', 'Member', '#9B6EFF', 21000, 'idle'],
    ['LuxorLuna', 'Member', '#FFC75A', 12400, 'idle'],
  ];
  return (
    <Panel style={{ padding: 8 }}>
      {members.map(([name, role, c, pts, status], i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '8px 4px',
          borderBottom: i < members.length-1 ? '1px solid rgba(255,255,255,.04)' : 'none',
        }}>
          <Avatar c={c} initial={name[0]} size={32}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: name==='YOU' ? '#FF2E93' : '#F5F0FF' }}>{name}</div>
            <div style={{ fontSize: 9, color: '#7A6F9E', fontWeight: 700 }}>
              {role === 'Leader' && <Icon.Crown s={10} c="#FFC75A"/>}
              {role === 'Officer' && <Icon.Shield s={9} c="#22E5FF"/>}
              {' '}{role}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#FFC75A' }}>{fmt(pts)}</div>
            <div style={{
              fontSize: 8, fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase',
              color: status === 'active' ? '#7CFF65' : '#FF5364',
            }}>● {status}</div>
          </div>
        </div>
      ))}
    </Panel>
  );
}

Object.assign(window, { SyndicateScreen });
