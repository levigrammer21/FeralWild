// Original synthesized sound effects. No downloads, audio assets, or autoplay.
let context=null,master=null,volume=.35,enabled=false,voices=0;const last=new Map();
export function configureSound(settings){enabled=!!settings.sound;volume=Math.min(1,Math.max(0,settings.volume??.35));if(master&&context)master.gain.setTargetAtTime(enabled?volume:0,context.currentTime,.025);}
export function unlockSound(settings){configureSound(settings);if(!enabled)return;try{const Audio=globalThis.AudioContext||globalThis.webkitAudioContext;if(!Audio)return;if(!context){context=new Audio();master=context.createGain();master.gain.value=volume;master.connect(context.destination);}if(context.state==='suspended')context.resume().catch(()=>{});}catch{/* Audio support never gates gameplay. */}}
function tone(frequency,duration,type='sine',delay=0,end=frequency,gain=.12){if(!context||context.state!=='running'||voices>=14)return;voices++;const oscillator=context.createOscillator(),envelope=context.createGain(),time=context.currentTime+delay;oscillator.type=type;oscillator.frequency.setValueAtTime(frequency,time);oscillator.frequency.exponentialRampToValueAtTime(Math.max(30,end),time+duration);envelope.gain.setValueAtTime(.0001,time);envelope.gain.exponentialRampToValueAtTime(gain,time+.008);envelope.gain.exponentialRampToValueAtTime(.0001,time+duration);oscillator.connect(envelope);envelope.connect(master);oscillator.start(time);oscillator.stop(time+duration+.015);oscillator.onended=()=>{oscillator.disconnect();envelope.disconnect();voices--;};}
export function playSound(kind){if(!enabled||!context||globalThis.document?.hidden)return;const now=context.currentTime;if(now-(last.get(kind)??-100)<(kind==='hit'?.16:.08))return;last.set(kind,now);
 switch(kind){
 case 'click':tone(420,.045,'sine',0,340,.04);break;
 case 'hit':tone(140,.085,'triangle',0,48,.13);break;
 case 'crit':tone(230,.13,'triangle',0,55,.2);tone(800,.05,'sine',.025,330,.08);break;
 case 'magic':tone(420,.19,'sine',0,1050,.09);break;
 case 'heal':tone(523,.17,'sine');tone(784,.22,'sine',.08);break;
 case 'capture':[523,659,784,1047].forEach((f,i)=>tone(f,.27,'sine',i*.09));break;
 case 'escape':tone(310,.2,'triangle',0,140,.1);break;
 case 'craft':tone(880,.09,'triangle');tone(1175,.16,'sine',.07);break;
 case 'gather':tone(270,.055,'triangle',0,110,.07);break;
 case 'rare':[523,784,1047,1568].forEach((f,i)=>tone(f,.4,'sine',i*.14));break;
 case 'victory':[392,523,659,784].forEach((f,i)=>tone(f,.35,'triangle',i*.12,.98*f,.08));break;
 case 'down':tone(220,.3,'triangle',0,55,.12);break;
 }
}
export function combatSounds(events){const rank=['victory','down','crit','heal','ability','damage','dot'];const type=rank.find(k=>events.some(e=>e.kind===k));if(type)playSound(({ability:'magic',damage:'hit',dot:'hit'})[type]||type);}
