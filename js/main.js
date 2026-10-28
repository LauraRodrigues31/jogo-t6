// Ponto de partida: ajusta o canvas ao tamanho da tela e roda o loop do jogo.

/* ---------- tela ---------- */
function resize(){
  const r=$('wrap').getBoundingClientRect();const asp=r.width/Math.max(1,r.height);
  W=Math.round(Math.max(760,Math.min(1200,H*asp)));
  const dpr=Math.min(2,window.devicePixelRatio||1);SC=Math.min(2.5,r.height*dpr/H);
  cv.width=Math.round(W*SC);cv.height=Math.round(H*SC);
}
addEventListener('resize',resize);resize();

/* ---------- loop principal ---------- */
function loop(ts){const dt=Math.min(.033,(ts-last)/1000||0);last=ts;
  if(state==='play')update(dt);
  if(state==='reveal'){S.reveal+=dt;if(S.reveal>4.6&&!S.won){S.won=true;$('winTxt').textContent='A burca voou e '+(C.name===C.num?'a 3':C.name)+' apareceu com a camisa '+C.num+' do T6. '+C.line;show('ovWin')}}
  const playing=state==='play'&&S;$('shoot').style.display=playing&&(COARSE||S.hasBall)?'block':'none';$('shoot').classList.toggle('off',!(S&&S.hasBall));joy.style.display=playing&&COARSE?'block':'none';if(!playing&&joyId!==null)joyEnd();
  render();requestAnimationFrame(loop)}
reset();requestAnimationFrame(loop);
