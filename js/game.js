// Lógica do jogo: movimento, colisões, poderes de cada jogadora, itens,
// tabelinhas, chefão, chutes e gols. É chamado a cada quadro por main.js.

/* ---------- lógica ---------- */
function hit(){const p=S.p;if(p.inv>0||p.shield>0||state!=='play')return;S.lives--;p.inv=1.3;beep(140,.25,'sawtooth',.08);
  if(S.lives<=0){state='lose';$('loseTxt').textContent=C.name+' levou cartão vermelho do retrocesso. Respira, ajeita a chuteira e volta.';setTimeout(()=>show('ovLose'),500);return}
  if(S.lives===1&&!S.tempo){S.tempo=true;setTimeout(()=>{if(state==='play'){S.lives++;say('Tempo técnico da Tainá: +1 vida',2);talk('Tainá','Respira e volta!')}},700)}
}
function shoot(){if(state!=='play'||!S.hasBall)return;S.hasBall=false;S.kick={x:S.p.x+16,y:S.p.y+20,vx:(C.id==='ligia'?1300:C.id==='laiz'?1150:850)*W/960};beep(320,.08,'square',.08)}
function spawnBall(){if(state!=='play')return;if(C.id==='gi'){S.ball={x:Math.min(S.p.x+40,S.boss.x-120),y:S.p.y+20};say('Bola servida pra garçonete!',1.2);return}S.ball={x:ARENA+120+Math.random()*Math.max(200,W-560),y:TOP+60+Math.random()*(BOT-TOP-120)}}

function update(dt){
  const p=S.p;S.t+=dt;
  const base=C.id==='day'?330:C.id==='blue'?280:235;
  let sp=(p.slow>0?base*.55:base)*(p.boost>0?1.4:1);
  let vx=0,vy=0;
  if(keys.arrowleft||keys.a)vx--;if(keys.arrowright||keys.d)vx++;if(keys.arrowup||keys.w)vy--;if(keys.arrowdown||keys.s)vy++;
  const n=Math.hypot(vx,vy)||1;p.x+=vx/n*sp*dt;p.y+=vy/n*sp*dt;
  const jm=Math.min(1,Math.hypot(jx,jy));if(jm>0){p.x+=jx/Math.max(1,Math.hypot(jx,jy))*sp*dt;p.y+=jy/Math.max(1,Math.hypot(jx,jy))*sp*dt}
  p.moving=vx||vy||jm>0;
  if(p.dash>0){p.x+=420*dt;p.dash-=dt}
  if(C.id==='blue'&&!S.arena){p.x+=70*dt;p.moving=true}
  p.y=Math.max(TOP,Math.min(BOT,p.y));
  const maxX=S.arena?S.boss.x-90:LEVEL+W;p.x=Math.max(S.arena?ARENA+30:S.cam+30,Math.min(maxX,p.x));
  ['inv','slow','boost','shield','cd'].forEach(k=>p[k]=Math.max(0,p[k]-dt));
  if(C.id==='day'&&p.moving&&Math.random()<.6)S.parts.push({x:p.x-8,y:p.y-10+Math.random()*20,l:.35});
  S.parts.forEach(q=>q.l-=dt);S.parts=S.parts.filter(q=>q.l>0);
  if(!S.arena){S.cam=Math.max(S.cam,Math.min(p.x-W*.3,ARENA));
    if(p.x>ARENA+60){S.arena=true;S.cam=ARENA;S.boss.x=goalX()-110;say('Lá vem o Senador do Retrocesso!',2.2);apito();talk('Tainá','Agora é com você!');setTimeout(spawnBall,2500)}}
  const hr=C.id==='bruna'?.6:1;
  S.foes.forEach(f=>{if(f.down){f.down+=dt;return}
    f.y=f.y0+Math.sin(S.t*f.sp+f.ph)*f.amp;
    if(f.bea){if(Math.abs(f.x-p.x)<420){f.x+=Math.sign(p.x-f.x)*90*dt;f.y0+=Math.sign(p.y-f.y)*110*dt}}
    else if(f.chase&&Math.abs(f.x-p.x)<320)f.y0+=Math.sign(p.y-f.y)*60*dt;
    f.y=Math.max(TOP,Math.min(BOT,f.y));
    if(Math.abs(f.x-p.x)<24*hr&&Math.abs(f.y-p.y)<34*hr){
      if(f.bea){if(p.slow<=0){p.slow=1.4;const mid=f.bea.id;
        say(mid==='beatriz'&&C.id==='tres'?'A Beatriz ama marcar a 3!':mid==='gabi'?'Passa nada! A Gabi te segurou.':mid==='beatriz'?'Parou no paredão da Beatriz!':mid==='isabella'?'A Bella te marcou de perto!':'A Bruna te marcou com elegância!');beep(300,.1,'triangle')}}
      else if(C.id==='beatriz'&&p.cd<=0){f.down=.001;p.cd=3;say('Desarme do paredão!');beep(500,.1,'square',.07)}
      else if(C.id==='ale'&&p.cd<=0){p.cd=2;p.inv=.8;say('Driblou!');beep(760,.08,'square',.06)}
      else hit()}});
  if(!S.arena){S.paperT-=dt;if(S.paperT<=0){S.paperT=1.1+Math.random()*1.2;S.papers.push({x:S.cam+W+30,y:TOP+Math.random()*(BOT-TOP),vx:-220-Math.random()*120,vy:0,r:0,k:Math.random()<.35?'burca':'pl'})}}
  S.papers.forEach(o=>{o.x+=o.vx*dt;o.y+=o.vy*dt;o.r+=dt*3;
    if(!o.dead&&Math.abs(o.x-p.x)<22*hr&&Math.abs(o.y-(p.y-8))<30*hr){o.dead=true;
      if(p.shield>0)beep(900,.06,'sine');
      else if(C.id==='gabi'&&(o.k==='burca'||!S.arena)){say('Passa nada!');beep(700,.06,'sine')}
      else if(o.k==='burca'){p.slow=2.2;say('Mais um pano por cima. Ficou pesado!');beep(180,.15,'triangle')}
      else if(S.arena)hit();
      else{p.slow=1.6;say('Projeto de lei no caminho!');beep(220,.12,'triangle')}}});
  S.papers=S.papers.filter(o=>!o.dead&&o.x>S.cam-60&&o.x<S.cam+W+80&&o.y>-40&&o.y<H+40);
  const reach=30;
  S.items.forEach(it=>{if(!it.got&&Math.hypot(it.x-p.x,it.y-p.y)<reach){it.got=true;beep(880,.1,'sine');
    if(it.k==='guarda'){p.shield=4.5;say('Guarda-chuva do T6: nada te molha!')}
    else if(it.k==='pizza'){S.lives=Math.min(S.max,S.lives+1);say('Pizza pós-jogo adiantada: +1 vida')}
    else{p.boost=4;say('Chopp da resenha: pernas leves!')}}});
  S.mates.forEach(m=>{if(!m.used&&Math.hypot(m.x-p.x,m.y-p.y)<36){m.used=true;p.dash=.55;p.inv=Math.max(p.inv,1);
    say(PARTNER[C.id]===m.c.id?'Tabelinha de casal com a '+m.c.name+'!':'Tabelinha com a '+m.c.name+'!');beep(660,.08);beep(990,.12)}});
  // falas
  S.talk.t-=dt;if(S.talk.left>0)S.talk.left-=dt;
  if(S.talk.t<=0){if(C.id==='tres'&&Math.random()<.45)talk(C.name,TRES_LINES[Math.random()*TRES_LINES.length|0]);
    else talk('Tainá',TAINA_LINES[Math.random()*TAINA_LINES.length|0])}
  // chefão
  if(S.arena){
    const b=S.boss,M=mouth();const target=S.hasBall||S.kick?p.y:265+Math.sin(S.t*1.3)*110;
    const bs=(S.kick?30+(b.max-b.hp)*8:(S.hasBall?85:75)+(b.max-b.hp)*15)*(C.id==='maressa'?.6:1)*(S.kick&&C.id==='ligia'?.35:1);
    b.y+=Math.max(-bs*dt,Math.min(bs*dt,target-b.y));b.y=Math.max(M[0]+16,Math.min(M[1]-16,b.y));
    b.throwT-=dt;if(b.throwT<=0){b.throwT=1.55-(b.max-b.hp)*.25;
      const a0=Math.atan2(p.y-b.y,p.x-b.x),k=Math.random()<.5?'burca':'pl',sp2=230+(b.max-b.hp)*40;
      [-.22,0,.22].forEach(d=>S.papers.push({x:b.x-20,y:b.y-10,vx:Math.cos(a0+d)*sp2,vy:Math.sin(a0+d)*sp2,r:0,k}));beep(260,.06,'square',.04)}
    if(S.ball&&Math.hypot(S.ball.x-p.x,S.ball.y-(p.y+20))<(C.id==='gi'?40:30)){S.ball=null;S.hasBall=true;say('Bola dominada! Mira e chuta.',1.4)}
    if(S.kick){const k=S.kick;k.x+=k.vx*dt;
      if(Math.abs(k.x-b.x)<20&&Math.abs(k.y-b.y)<25){S.kick=null;say('O Senador defendeu! Tenta de novo.');beep(150,.2,'sawtooth');setTimeout(spawnBall,900)}
      else if(k.x>goalX()+10){S.kick=null;
        if(k.y>M[0]+6&&k.y<M[1]-6){b.hp--;golSom();if(C.bordao)S.bord=2.2;
          if(b.hp<=0){S.reveal=.001;S.papers=[];state='reveal'}
          else{say('GOOOL! Falta'+(b.hp>1?'m ':' ')+b.hp+' pra virar o jogo',2);setTimeout(spawnBall,1300)}}
        else{say('Pra fora! Bola de novo.');setTimeout(spawnBall,900)}}}
  }
  if(S.bord>0)S.bord-=dt;
  if(S.msgT>0)S.msgT-=dt;
}
