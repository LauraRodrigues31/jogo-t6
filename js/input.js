// Controles: teclado (setas/WASD + espaço), joystick e botão de chutar no celular.

/* ---------- entrada ---------- */
addEventListener('keydown',e=>{keys[e.key.toLowerCase()]=true;if(e.key===' '&&state==='play'){e.preventDefault();shoot()}});
addEventListener('keyup',e=>keys[e.key.toLowerCase()]=false);
const COARSE=matchMedia('(pointer:coarse)').matches;
let jx=0,jy=0,joyId=null;const joy=$('joy'),knob=$('knob');
function joyMove(e){const r=joy.getBoundingClientRect(),R=r.width/2;let dx=e.clientX-(r.left+R),dy=e.clientY-(r.top+R);
  const d=Math.hypot(dx,dy),m=Math.min(d,R*.62);if(d>0){dx=dx/d*m;dy=dy/d*m}
  knob.style.transform='translate('+dx+'px,'+dy+'px)';jx=dx/(R*.62);jy=dy/(R*.62);if(Math.hypot(jx,jy)<.15){jx=0;jy=0}}
function joyEnd(){joyId=null;jx=0;jy=0;knob.style.transform=''}
joy.addEventListener('pointerdown',e=>{e.preventDefault();joyId=e.pointerId;try{joy.setPointerCapture(e.pointerId)}catch(_){}joyMove(e)});
joy.addEventListener('pointermove',e=>{if(e.pointerId===joyId)joyMove(e)});
joy.addEventListener('pointerup',joyEnd);joy.addEventListener('pointercancel',joyEnd);
cv.addEventListener('pointerdown',e=>{if(!COARSE&&state==='play'&&S.hasBall)shoot()});
$('shoot').addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();shoot()});
