'use client';

import { useState, type KeyboardEvent } from 'react';
import { ArrowRight, Volume2, Hand, CircleCheck, Glasses, ScanLine, Vibrate, Pause, Accessibility } from 'lucide-react';
import './ringsense-personas.css';

const personas = [
 {
  name:'Maya Thompson', short:'Maya', age:30, context:'At the gym', role:'Content creator & accessibility advocate', initials:'MT',
  headline:'Start a workout on her own terms.',
  description:'Maya is blind and uses a screen reader, voice commands, and a white cane. She enjoys working out, but flat treadmill controls make starting or adjusting a session dependent on someone else.',
  background:'She/her · New York City · B.A. Communications · Middle class. Blind due to retinitis pigmentosa.',
  goal:'Find the treadmill controls, start a workout, and adjust settings without repeatedly asking gym staff for help.',
  friction:'Flat touchscreens offer neither tactile boundaries nor audio confirmation. Asking for help works, but limits when and how she can exercise independently.',
  needs:['Simple, nonvisual setup and direct voice commands.','Distinct proximity and alignment vibrations.','Confirmation after a press and a reachable pause control.'],
  success:'Start a workout and adjust the intended settings independently.',
  constraint:'Requires a clear camera view. RingSense would not replace the treadmill’s emergency stop controls.',
  assumption:'Fictional profile informed by the team’s secondary research on inaccessible touchscreens.',
  ecological:[['Arrive','Maya reaches a treadmill. Its flat screen gives her no tactile landmarks.'],['Encounter a barrier','She cannot tell where Start is or whether a press registered.'],['Regain control','The proposed ring and camera provide guidance so she can operate the controls herself.']],
  interactive:[['Ask','“Find Start.” The app identifies the supported treadmill layout.'],['Align','Directional pulses guide her finger; two pulses signal alignment.'],['Act & verify','She presses once. The app checks the screen and confirms the detected change.']],
 },
 {
  name:'David Miller',short:'David',age:48,context:'In the classroom',role:'Part-time history teacher',initials:'DM',
  headline:'Know that one touch was enough.',
  description:'David can reach and deliberately touch the thermostat. Small labels, reduced fingertip sensation, and difficulty keeping track of menu steps make it harder to know whether a selection registered.',
  background:'He/him · M.A. Education · Middle class. Fictional profile with relapsing-remitting MS, heat sensitivity, and cataracts.',
  goal:'Set a comfortable classroom temperature and enable Hold without repeating a touch that reverses the setting.',
  friction:'A phone magnifier helps him read labels, but switching devices is cumbersome. Uncertainty can lead to a second tap that turns Hold back off.',
  needs:['Adjustable vibration intensity and one instruction at a time.','Separate cues for alignment and a registered action.','A clear checking state and an explicit uncertainty message.'],
  success:'Set the intended temperature and enable Hold without reversing it or asking a colleague to verify.',
  constraint:'Assumes David can distinguish vibrations at the ring despite reduced fingertip sensation. The concept cannot prevent a physical touch or treat symptoms.',
  assumption:'Biography and thermostat task are fictional assumptions. The supplied persona cites MS Society material as background context, not interview evidence.',
  ecological:[['Prepare','David adjusts the thermostat before afternoon lessons.'],['Encounter a barrier','Small labels and uncertain touch feedback prompt repeated checking.'],['Reduce the burden','A visible-state check would help him wait for confirmation before touching again.']],
  interactive:[['Ask','“Set the temperature to 72 degrees and hold it.”'],['Align & wait','Two pulses signal alignment. After the touch, the app says “Checking the result.”'],['Verify','Only after reading the display: “Hold is on. Set temperature: 72 degrees.”']],
 },
 {
  name:'Daniel',short:'Daniel',age:27,context:'At an airport kiosk',role:'Software QA engineer & digital nomad',initials:'D',
  headline:'Find a small target under pressure.',
  description:'Daniel is traveling in Tokyo with heavy luggage and limited Japanese. An awkward viewing distance, crowded labels, and a growing queue make an unfamiliar bag-drop screen hard to navigate.',
  background:'He/him · English speaker with limited Japanese · Middle class. No permanent visual or physical disability; this scenario explores situational constraints.',
  goal:'Confirm his baggage tag accurately without leaning in, putting down his luggage, or juggling a handheld translation app.',
  friction:'The bag restricts his posture. Tiny foreign labels are difficult to parse from arm’s length, and hurried guesses can send him into the wrong part of the flow.',
  needs:['Camera-based recognition of a supported kiosk and its labels.','Hands-free commands with clear target guidance.','Verification of the actual kiosk response before announcing completion.'],
  success:'Complete the intended step on the first attempt. The supplied under-20-second target is aspirational, not a measured result.',
  constraint:'Language interpretation and kiosk support are proposed extensions. The system cannot fix a server outage or operate when the camera cannot read the screen.',
  assumption:'Biography and airport task are fictional design assumptions, informed by the supplied context-induced impairment research reference.',
  ecological:[['Arrive','Daniel approaches a bag-drop kiosk while holding heavy luggage.'],['Encounter a barrier','Distance, unfamiliar labels, and queue pressure make small targets hard to locate.'],['Stay hands-free','The concept explores guidance through glasses and a ring while his phone remains put away.']],
  interactive:[['Ask','“Help me confirm my baggage tag.” The app would identify a supported layout and request.'],['Align','Pulses guide his finger toward the small confirmation control.'],['Verify','After the tap, the app checks the kiosk response before confirming the baggage-tag step.']],
 },
 {
  name:'Gary',short:'Gary',age:58,context:'In a shared laundry room',role:'Medical billing specialist',initials:'G',
  headline:'Choose his settings without relying on sound.',
  description:'Gary has limited vision and hearing, good tactile acuity, and experience using braille. In a noisy laundry room, neither the machine’s small labels nor its beeps give him useful confirmation.',
  background:'He/him · Associate degree in health information technology · Lower middle income · Rents an apartment. Fictional profile with Usher syndrome type 2.',
  goal:'Wash and dry clothes when he chooses, with the intended settings, without waiting for a neighbor or family member.',
  friction:'He schedules laundry around available help. Spoken descriptions are difficult to hear, and unclear feedback can leave him unaware that he selected hot water.',
  needs:['A proposed non-audio workflow with braille input and output.','Distinct tactile cues for movement, alignment, errors, and tracking loss.','Accessible setup and confirmation of the detected wash settings.'],
  success:'Choose a wash cycle and verify its settings independently through touch and braille.',
  constraint:'Braille-display integration is an additional proposed feature. Not all deafblind users read braille; low light and glare still affect camera recognition, and another device adds charging effort.',
  assumption:'Biography and laundry task are fictional. The scenario explores a tactile-and-braille extension rather than evidence of a working deafblind-accessible system.',
  ecological:[['Arrive','Gary needs to use the shared touchscreen washer in a noisy basement.'],['Encounter a barrier','He cannot rely on tiny labels, machine beeps, or spoken narration.'],['Choose another channel','The concept explores tactile guidance and a refreshable braille display instead of audio.']],
  interactive:[['Set the goal','Gary enters “Warm, Normal” through a proposed braille input connection.'],['Align','Directional pulses guide his finger; a tactile pause cue would signal tracking loss.'],['Read the result','After verification, the braille display would show the detected cycle, settings, and remaining time.']],
 },
] as const;

function PersonaPortrait({ person, name }: { person:number; name:string }) {
 return <span className="rp-portrait"><svg viewBox="0 0 112 112" role="img" aria-label={`Fictional illustrated portrait of ${name}`}>
  <rect width="112" height="112" rx="4" className="rp-portrait-backdrop"/>
  <path d="M13 112v-10c0-19 18-29 43-29s43 10 43 29v10" className="rp-portrait-shirt"/>
  <path d="M45 65v17l11 9 11-9V65" className="rp-portrait-skin"/>
  {person===0 && <path d="M29 54C21 25 36 12 57 13c24 0 34 18 28 44l6 31-18-4H34l-13 3Z" className="rp-portrait-hair"/>}
  <ellipse cx="56" cy="47" rx="23" ry="29" className="rp-portrait-skin"/>
  {person===0?<path d="M31 45c0-25 15-34 29-31 18 2 27 15 24 34-7-5-14-17-18-24-8 10-19 16-35 21Z" className="rp-portrait-hair"/>:person===1?<path d="M32 40c-1-18 10-26 25-26s24 12 24 27l-7-12-18 2-15-4Z" className="rp-portrait-hair"/>:person===2?<path d="M31 41c-4-17 3-27 20-27l5-5 4 5c18-2 24 13 23 29l-9-16-21 5-13-4Z" className="rp-portrait-hair"/>:<path d="M32 46c-8-21 8-33 24-32 20-1 30 15 23 34l-5-18-18-6-17 7Z" className="rp-portrait-gray"/>}
  <path d="M44 48h3m18 0h3M56 49l-2 9h4M49 65q7 5 14-1" className="rp-portrait-feature"/>
  {person===1&&<><path d="M36 43h16v13H36Zm24 0h16v13H60ZM52 47h8" className="rp-portrait-feature"/><path d="M39 62q3 17 17 17t18-17q-9 13-18 8-8 5-17-8Z" className="rp-portrait-hair"/></>}
  {person===3&&<path d="M32 46h18v13H33Zm30 0h18l-1 13H62ZM50 50h12" className="rp-portrait-feature"/>}
  <path d="m32 88 12 11m36-11-12 11" className="rp-portrait-seam"/>
 </svg><span className="rp-portrait-number">0{person+1}</span></span>;
}

function Scene({ person, step, interactive }: { person:number; step:number; interactive:boolean }) {
 const label=person===0?'Treadmill':person===1?'Thermostat':person===2?'Airport kiosk':'Washer';
 return <svg viewBox="0 0 360 210" role="img" aria-label={`${label} scenario: ${interactive?'interaction':'environment'} step ${step+1}`} className="rp-scene">
  <path d="M20 185H340" className="rp-scene-faint"/>
  {person===1 && <path d="M196 18V185M222 24h108v142H222" className="rp-scene-faint"/>}
  <circle cx="92" cy="63" r="19" className="rp-scene-line"/>
  <path d="M67 163v-46q0-27 25-27t25 27v46M77 164l-7 21m37-21 7 21" className="rp-scene-line"/>
  <path d="M79 58h12m4 0h12m-16 0 4 0" className={step===2||interactive?'rp-scene-accent':'rp-scene-line'}/>
  {person===0 && <><path d="M189 183h130M211 177l-20-48m112 48 13-48M213 129h91" className="rp-scene-line"/><rect x="215" y="47" width="82" height="66" rx="5" className="rp-scene-device"/></>}
  {person===1 && <rect x="224" y="65" width="83" height="79" rx="6" className="rp-scene-device"/>}
  {person===2 && <><rect x="211" y="27" width="98" height="126" rx="5" className="rp-scene-device"/><path d="M239 154v30m44-30v30" className="rp-scene-line"/><rect x="25" y="129" width="34" height="47" rx="4" className="rp-scene-device"/><path d="M34 129v-15h15v15m-14 66v3m14-3v3" className="rp-scene-line"/></>}
  {person===3 && <><rect x="206" y="38" width="111" height="145" rx="5" className="rp-scene-device"/><circle cx="262" cy="135" r="33" className="rp-scene-line"/><rect x="219" y="48" width="83" height="38" rx="3" className="rp-scene-device"/></>}
  <rect x={person===1?235:person===3?230:228} y={person===1?79:person===3?56:60} width="52" height="7" rx="2" className="rp-scene-faint-fill"/>
  <rect x={person===1?247:person===3?256:255} y={person===1?112:person===3?70:88} width="22" height="12" rx="2" className={step===2?'rp-scene-accent-fill':'rp-scene-control'}/>
  {(interactive||step===2) && <><path d="M110 112l44 10 54-25" className="rp-scene-line"/><circle cx="159" cy="119" r="5" className="rp-scene-accent"/><path d="M164 109q9 4 8 12m-5-18q15 6 13 20" className="rp-scene-accent"/><path d="M112 57L242 82" className="rp-scene-camera"/></>}
  {!interactive&&step===1 && <><path d="M144 60h27m-14-12v25" className="rp-scene-faint"/><text x="154" y="100" className="rp-scene-question">?</text></>}
  {person===3&&(interactive||step===2)&&<><rect x="121" y="151" width="69" height="26" rx="3" className="rp-scene-device"/>{[130,141,152,163,174].map(x=><g key={x}><circle cx={x} cy="160" r="1.5" className="rp-scene-accent-fill"/><circle cx={x+3} cy="165" r="1.5" className="rp-scene-accent-fill"/></g>)}</>}
  {step===2&&<><circle cx="310" cy="26" r="13" className="rp-scene-accent-fill"/><path d="m304 26 4 4 8-9" className="rp-scene-check"/></>}
 </svg>;
}

export function RingSensePersonas() {
 const [selected,setSelected]=useState(0);
 const [perspective,setPerspective]=useState<'ecological'|'interactive'>('ecological');
 const p=personas[selected];
 const frames=p[perspective];
 function tabKey(event:KeyboardEvent<HTMLButtonElement>,index:number) {
  let next=index;
  if(event.key==='ArrowRight')next=(index+1)%personas.length;
  else if(event.key==='ArrowLeft')next=(index+personas.length-1)%personas.length;
  else if(event.key==='Home')next=0;
  else if(event.key==='End')next=personas.length-1;
  else return;
  event.preventDefault();setSelected(next);
  (event.currentTarget.parentElement?.querySelectorAll('button')[next] as HTMLButtonElement|undefined)?.focus();
 }
 return <div className="rp-personas">
  <div role="tablist" aria-label="Fictional RingSense personas" className="rp-tabs">{personas.map((person,i)=><button key={person.short} type="button" role="tab" id={`rp-tab-${i}`} aria-selected={selected===i} aria-controls="rp-panel" tabIndex={selected===i?0:-1} onClick={()=>setSelected(i)} onKeyDown={e=>tabKey(e,i)}><span className="rp-tab-index">0{i+1}</span><span><strong>{person.short}</strong><small>{person.context}</small></span></button>)}</div>
  <div id="rp-panel" role="tabpanel" aria-labelledby={`rp-tab-${selected}`} className="rp-panel">
   <div className="rp-profile"><div className="rp-identity"><PersonaPortrait person={selected} name={p.name}/><div><span className="rp-kicker">FICTIONAL PERSONA / {p.age}</span><h3>{p.name}</h3><p>{p.role}</p><span className="rp-context">{p.context}</span></div></div><div className="rp-intro"><h4>{p.headline}</h4><p>{p.description}</p></div></div>
   <details className="rp-background"><summary>Personal background</summary><p>{p.background}</p></details>
   <div className="rp-goals"><section><span className="rp-kicker"><ArrowRight size={14}/> GOAL</span><p>{p.goal}</p></section><section><span className="rp-kicker"><Hand size={14}/> CURRENT FRICTION</span><p>{p.friction}</p></section></div>
   <div className="rp-story-heading"><div><span className="rp-kicker">SCENARIO STORYBOARD</span><h4>{perspective==='ecological'?'The person in their environment':'The proposed interaction'}</h4></div><div className="rp-perspectives" role="group" aria-label="Storyboard perspective"><button type="button" aria-pressed={perspective==='ecological'} onClick={()=>setPerspective('ecological')}>Ecological</button><button type="button" aria-pressed={perspective==='interactive'} onClick={()=>setPerspective('interactive')}>Interaction</button></div></div>
   <p className="rp-perspective-note">{perspective==='ecological'?'Context, barriers, and how the proposed system changes the situation.':'The user’s goal, guidance cues, and verification of the resulting screen state.'}</p>
   <ol className="rp-storyboard">{frames.map(([title,copy],i)=><li key={`${selected}-${perspective}-${i}`}><Scene person={selected} step={i} interactive={perspective==='interactive'}/><div><span className="rp-frame-index">0{i+1}</span><h5>{title}</h5><p>{copy}</p></div></li>)}</ol>
   <div className="rp-details"><section><span className="rp-kicker"><Accessibility size={14}/> DESIGN NEEDS</span><ul>{p.needs.map(need=><li key={need}>{need}</li>)}</ul></section><section><span className="rp-kicker"><CircleCheck size={14}/> SUCCESS TO EXPLORE</span><p>{p.success}</p><span className="rp-kicker rp-constraint"><Pause size={14}/> LIMITS &amp; ASSUMPTIONS</span><p>{p.constraint}</p></section></div>
   <div className="rp-channel"><span className="rp-kicker">PROPOSED CHANNELS</span><span><Glasses size={16}/> Camera</span><span><ScanLine size={16}/> App recognition</span><span><Vibrate size={16}/> Haptic guidance</span><span>{selected===3?<Accessibility size={16}/>:<Volume2 size={16}/>} {selected===3?'Braille extension':'Synthetic speech'}</span></div>
   {selected!==1 && <p className="rp-assumption">{p.assumption}</p>}
  </div>
 </div>;
}
