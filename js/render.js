// Desenha cada quadro: campo, personagens, HUD (vidas, progresso, mensagens)
// e a animação final em que a burca voa e revela a jogadora.

/* ---------- render ---------- */
function render(){
  ctx.setTransform(SC,0,0,SC,0,0);
  const cam=S?S.cam:0;ctx.clearRect(0,0,W,H);drawField(cam);if(!S)return;
  ctx.save();ctx.translate(-cam,0);
  S.parts.forEach(q=>{ctx.globalAlpha=q.l*2.5;ctx.fillStyle='#ffe34d';ctx.beginPath();ctx.moveTo(q.x,q.y-6);ctx.lineTo(q.x-6,q.y+1);ctx.lineTo(q.x-1,q.y+1);ctx.lineTo(q.x-4,q.y+8);ctx.lineTo(q.x+4,q.y-1);ctx.lineTo(q.x-1,q.y-1);ctx.fill()});ctx.globalAlpha=1;
  const list=[];
  S.items.forEach(it=>!it.got&&list.push({y:it.y,f:()=>drawItem(it,S.t)}));
  S.mates.forEach(m=>!m.used&&list.push({y:m.y,f:()=>{ctx.fillStyle='rgba(124,200,255,.22)';ctx.beginPath();ctx.arc(m.x,m.y-6,32,0,7);ctx.fill();
    drawPerson(m.c,m.x,m.y,1,S.t*4,false);ctx.fillStyle='#7cc8ff';ctx.font='700 14px '+DISP;ctx.textAlign='center';ctx.fillText(m.c.name+': tabela!',m.x,m.y-50)}}));
  S.foes.forEach(f=>list.push({y:f.y,f:()=>{if(f.bea){drawPerson(f.bea,f.x,f.y,1,S.t*8,false);ctx.fillStyle='#e0608a';ctx.font='700 14px '+DISP;ctx.textAlign='center';ctx.fillText((f.bea.id==='isabella'?'Bella':f.bea.name)+' te marcando',f.x,f.y-58*(f.bea.h||1));return}if(f.down){if(f.down>1.2)return;ctx.save();ctx.globalAlpha=1-f.down/1.2;ctx.translate(f.x+f.down*60,f.y);ctx.rotate(f.down*6);drawSuit(0,0,0);ctx.restore()}else drawSuit(f.x,f.y,S.t*f.sp*4)}}));
  if(S.arena&&state!=='reveal')list.push({y:S.boss.y,f:()=>{drawSuit(S.boss.x,S.boss.y,S.t*3,1.15,true);
    ctx.fillStyle='rgba(6,22,49,.85)';ctx.fillRect(S.boss.x-92,S.boss.y-84,184,24);ctx.fillStyle='#f4f7fb';ctx.font='700 16px '+DISP;ctx.textAlign='center';ctx.fillText('SENADOR DO RETROCESSO',S.boss.x,S.boss.y-67)}});
  if(state!=='reveal')list.push({y:S.p.y,f:()=>{const p=S.p;if(p.inv>0&&Math.floor(S.t*14)%2&&!(C.id==='gi'&&p.boost>0))return;
    if(p.shield>0){ctx.fillStyle='rgba(124,200,255,.22)';ctx.beginPath();ctx.arc(p.x,p.y-8,34,0,7);ctx.fill()}
    if(C.id==='gi'&&p.boost>0){ctx.fillStyle='rgba(232,80,91,.28)';ctx.beginPath();ctx.arc(p.x,p.y-8,32+Math.sin(S.t*20)*3,0,7);ctx.fill()}
    drawPerson(C,p.x,p.y,1,p.moving?S.t*14:0,true);if(S.hasBall)drawBall(p.x+12,p.y+24);
    ctx.fillStyle='#f4f7fb';ctx.font='700 15px '+DISP;ctx.textAlign='center';ctx.fillText(C.name===C.num?C.name:C.name+' '+C.num,p.x,p.y-52*(C.h||1));
    if(S.talk.left>0&&S.talk.who===C.name)bubble(p.x,p.y-60*(C.h||1),S.talk.txt);
    if(S.bord>0)bubble(p.x,p.y-60,C.bordao,'#ffe34d')}});
  list.sort((a,b)=>a.y-b.y).forEach(o=>o.f());
  S.papers.forEach(o=>drawPaper(o.x,o.y,o.r,o.k));
  if(S.ball)drawBall(S.ball.x,S.ball.y,true);if(S.kick)drawBall(S.kick.x,S.kick.y);
  ctx.restore();
  // Tainá na lateral
  if(state!=='reveal'){const tl=COARSE?230:110,tx=S.arena?tl:Math.max(tl,Math.min(W*.5,S.p.x-cam-140));
    drawPerson(TAINA,tx,BOT+42,.72,S.t*2,false,{coach:true});
    ctx.fillStyle='#f4f7fb';ctx.font='700 12px '+DISP;ctx.textAlign='center';ctx.textAlign='left';ctx.fillText('técnica Tainá',tx+16,BOT+52);
    if(S.talk.left>0&&S.talk.who==='Tainá')bubble(tx,BOT+8,S.talk.txt)}
  const g=ctx.createRadialGradient(W/2,H/2,H*.35,W/2,H/2,H*1.05);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.5)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  if(state==='reveal')drawReveal();
  else{
    ctx.font='22px serif';ctx.textAlign='left';ctx.textBaseline='alphabetic';
    for(let i=0;i<S.max;i++){ctx.globalAlpha=i<S.lives?1:.22;ctx.fillText('⚽',16+i*27,66)}ctx.globalAlpha=1;
    const prog=Math.min(1,S.p.x/(ARENA+60));ctx.fillStyle='rgba(6,22,49,.75)';ctx.fillRect(W/2-150,48,300,10);ctx.fillStyle='#f4f7fb';ctx.fillRect(W/2-150,48,300*prog,10);
    if(S.arena)for(let i=0;i<S.boss.max;i++){ctx.fillStyle=i<S.boss.max-S.boss.hp?'#7cc8ff':'rgba(244,247,251,.25)';ctx.fillRect(W-70-S.boss.max*36+i*36,48,28,10)}
    if(C.id==='beatriz'||C.id==='ale'){const nm=C.id==='ale'?'drible':'desarme';ctx.fillStyle=S.p.cd>0?'rgba(244,247,251,.3)':'#e0608a';ctx.font='700 14px '+DISP;ctx.textAlign='left';ctx.fillText(S.p.cd>0?nm+' recarregando':nm+' pronto',16,86)}
    if(S.msgT>0){ctx.globalAlpha=Math.min(1,S.msgT*2);ctx.fillStyle='rgba(6,22,49,.88)';ctx.font='900 26px '+DISP;const w=ctx.measureText(S.msg).width+36;
      ctx.fillRect(W/2-w/2,96,w,42);ctx.fillStyle='#f4f7fb';ctx.textAlign='center';ctx.fillText(S.msg,W/2,126);ctx.globalAlpha=1}
    if(S.hasBall&&!matchMedia('(pointer:coarse)').matches){ctx.fillStyle='rgba(244,247,251,.8)';ctx.font='700 16px '+DISP;ctx.textAlign='center';ctx.fillText('espaço para chutar',W/2,H-14)}
  }
}
function drawReveal(){
  const t=S.reveal;ctx.fillStyle='rgba(6,22,49,'+Math.min(.84,t*.8)+')';ctx.fillRect(0,0,W,H);
  const cx=W/2,cy=H/2+80;
  const sg=ctx.createRadialGradient(cx,cy-60,10,cx,cy-60,260);sg.addColorStop(0,'rgba(244,247,251,.35)');sg.addColorStop(1,'rgba(244,247,251,0)');ctx.fillStyle=sg;ctx.fillRect(0,0,W,H);
  const sc=3.2/Math.max(1,(C.h||1));
  if(t<1)drawPerson(C,cx+Math.sin(t*60)*4*t,cy,sc,0,true);
  else{
    drawPerson(C,cx,cy,sc,(t-1)*6,false);
    const ft=t-1;if(ft<2.2){ctx.save();ctx.translate(cx+ft*170,cy-60-ft*320+ft*ft*40);ctx.rotate(ft*5);ctx.globalAlpha=Math.max(0,1-ft/2.2);
      ctx.fillStyle='#4a4f5c';ctx.beginPath();ctx.moveTo(0,-60);ctx.quadraticCurveTo(50,-20,40,60);ctx.lineTo(-40,60);ctx.quadraticCurveTo(-50,-20,0,-60);ctx.fill();ctx.restore()}
    if(!conf.length)for(let i=0;i<140;i++)conf.push({x:Math.random()*W,y:-Math.random()*H,v:80+Math.random()*160,r:Math.random()*6,c:['#f4f7fb','#173f78','#7cc8ff','#0d2a52'][i%4]});
    conf.forEach(c=>{c.y+=c.v/60;c.r+=.1;if(c.y>H)c.y=-10;ctx.save();ctx.translate(c.x,c.y);ctx.rotate(c.r);ctx.fillStyle=c.c;ctx.fillRect(-4,-2,8,4);ctx.restore()});
    ctx.globalAlpha=Math.min(1,(t-1.2)*2);ctx.fillStyle='#f4f7fb';ctx.textAlign='center';ctx.font='900 80px '+DISP;ctx.fillText('GOL DO T6!',cx,100);
    ctx.font='700 28px '+DISP;ctx.fillText(C.line,cx,138);ctx.globalAlpha=1;
    if(crest.complete){ctx.drawImage(crest,50,H-160,84,102);ctx.drawImage(crest,W-134,H-160,84,102)}
  }
}
