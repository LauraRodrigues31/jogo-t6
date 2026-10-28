// Sons: efeitos (apito, gol, batidas) e trilha sonora gerada no navegador com a Web Audio API.

/* ---------- som ---------- */
let AC=null,muted=false;
function beep(f,d=.1,type='square',v=.06){if(muted)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();
  const o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.value=f;g.gain.value=v;o.connect(g);g.connect(AC.destination);
  const t=AC.currentTime;g.gain.exponentialRampToValueAtTime(.0001,t+d);o.start(t);o.stop(t+d)}catch(e){}}
function apito(){beep(2200,.12,'sine',.08);setTimeout(()=>beep(2200,.3,'sine',.08),160)}
function golSom(){[523,659,784,1046].forEach((f,i)=>setTimeout(()=>beep(f,.25,'triangle',.08),i*110))}
/* ---------- trilha sonora original (gerada no navegador) ---------- */
(()=>{let next=0,step=0,g=null,nb=null,wasBoss=null;
  const mf=m=>440*Math.pow(2,(m-69)/12);
  const NM=[72,0,76,0,79,0,76,0,77,76,74,0,72,0,0,0, 69,0,72,0,76,0,74,72,71,0,72,0,69,0,0,0, 65,0,69,0,72,0,77,0,76,0,74,0,72,0,69,0, 67,0,71,0,74,0,79,0,77,76,74,72,71,0,74,0];
  const BM=[69,0,72,0,76,0,72,0,69,0,72,0,77,0,76,0, 65,0,69,0,72,0,69,0,65,0,69,0,74,0,72,0, 67,0,71,0,74,0,71,0,67,0,71,0,76,0,74,0, 68,0,71,0,76,0,71,0,80,0,76,0,74,0,71,0];
  const NR=[48,45,41,43],BR=[45,41,43,40];
  function tone(f,t,d,type,v){const o=AC.createOscillator(),e=AC.createGain();o.type=type;o.frequency.value=f;e.gain.setValueAtTime(v,t);e.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(e);e.connect(g);o.start(t);o.stop(t+d+.02)}
  function noise(t,d,v){if(!nb){nb=AC.createBuffer(1,AC.sampleRate*.2,AC.sampleRate);const a=nb.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=Math.random()*2-1}
    const s=AC.createBufferSource(),f=AC.createBiquadFilter(),e=AC.createGain();s.buffer=nb;f.type='highpass';f.frequency.value=6000;e.gain.setValueAtTime(v,t);e.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(f);f.connect(e);e.connect(g);s.start(t);s.stop(t+d+.02)}
  function surdo(t,v){const o=AC.createOscillator(),e=AC.createGain();o.type='sine';o.frequency.setValueAtTime(110,t);o.frequency.exponentialRampToValueAtTime(48,t+.25);e.gain.setValueAtTime(v,t);e.gain.exponentialRampToValueAtTime(.0001,t+.35);o.connect(e);e.connect(g);o.start(t);o.stop(t+.4)}
  setInterval(()=>{try{if(!AC||muted||state!=='play'||!S){next=0;return}
    if(!g){g=AC.createGain();g.gain.value=.55;g.connect(AC.destination)}
    const boss=!!S.arena;if(boss!==wasBoss){wasBoss=boss;step=0;next=0}
    const sp=60/(boss?150:128)/4;if(next<AC.currentTime)next=AC.currentTime+.05;
    while(next<AC.currentTime+.15){const i=step%64,mel=(boss?BM:NM)[i],s16=i%16,root=(boss?BR:NR)[i>>4];
      if(mel)tone(mf(mel),next,sp*1.8,'square',.035);
      if(boss){if(s16%2===0)tone(mf(root+(s16%4?12:0)),next,sp*1.6,'triangle',.09)}
      else if([0,6,8,14].includes(s16))tone(mf(root),next,sp*2.5,'triangle',.1);else if(s16===10)tone(mf(root+12),next,sp*2,'triangle',.08);
      if(s16%8===4)surdo(next,.22);if(s16%8===0)surdo(next,.1);
      noise(next,.04,[0,3,6,10,12].includes(s16)?.05:.02);
      next+=sp;step++}}catch(e){}},25);
})();
$('mute').onclick=()=>{muted=!muted;$('mute').textContent=muted?'🔇':'🔊'};
