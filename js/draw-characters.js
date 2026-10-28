// Desenho dos personagens no canvas: jogadoras (com e sem burca), zagueiros de terno,
// Senador, projetos de lei, itens, bola e balões de fala.

/* ---------- desenho ---------- */
function drawPerson(c,x,y,sc,bob,burca,o={}){
  const g=ctx;g.save();g.translate(x,y);g.scale(sc,sc*(c.h||1));const bw0=c.w||1;
  const leg=Math.sin(bob)*5;
  g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(0,28,15,5,0,0,7);g.fill();
  if(burca){g.scale(bw0,1);
    g.fillStyle='#4a4f5c';g.beginPath();g.moveTo(-7,-40);g.quadraticCurveTo(0,-46,7,-40);g.lineTo(13,-20);
    g.quadraticCurveTo(20+leg*.4,10,18,26);g.lineTo(-18,26);g.quadraticCurveTo(-20-leg*.4,10,-13,-20);g.closePath();g.fill();
    g.strokeStyle='#363a45';g.lineWidth=1.5;for(let i=-8;i<=8;i+=8){g.beginPath();g.moveTo(i*.6,-14);g.lineTo(i*1.4,24);g.stroke()}
    g.fillStyle='#2a2d36';g.fillRect(-6,-33,12,6);g.strokeStyle='#5c6270';g.lineWidth=.7;
    for(let i=-5;i<=5;i+=2.5){g.beginPath();g.moveTo(i,-33);g.lineTo(i,-27);g.stroke()}
    g.fillStyle='#e9eef5';g.beginPath();g.ellipse(-6+leg,27,5,3,0,0,7);g.ellipse(6-leg,27,5,3,0,0,7);g.fill();
    g.restore();return;
  }
  const bw=c.w||1;
  g.strokeStyle=c.skin;g.lineWidth=5*Math.min(1.25,bw);g.lineCap='round';
  g.beginPath();g.moveTo(-5*bw,12);g.lineTo(-6*bw+leg,20);g.moveTo(5*bw,12);g.lineTo(6*bw-leg,20);g.stroke();
  const sock=o.coach?'#0d2a52':c.gk?'#111':'#0d2a52';
  g.strokeStyle=sock;g.lineWidth=6*Math.min(1.2,bw);g.beginPath();g.moveTo(-6*bw+leg,19);g.lineTo(-6*bw+leg,25);g.moveTo(6*bw-leg,19);g.lineTo(6*bw-leg,25);g.stroke();
  g.fillStyle=o.coach?'#fff':'#d8f24a';g.fillRect(-6*bw-4+leg,25,8,4);g.fillRect(6*bw-4-leg,25,8,4);
  g.fillStyle=o.coach?'#0d2a52':'#111';g.fillRect(-11*bw,4,22*bw,10);
  const half=12*bw;
  g.fillStyle=o.coach?'#173f78':c.gk?'#0b0b14':'#0d2a52';g.beginPath();g.roundRect(-half,-18,half*2,24,4);g.fill();
  if(o.coach){g.fillStyle='#f4f7fb';g.fillRect(-1,-18,2,24)}
  else{g.fillStyle=c.gk?'#3fd0ff':'#1d4c8f';for(let i=-half+3;i<half;i+=6)g.fillRect(i,-18,2.4,24)}
  const aw=c.arms?8:5;g.strokeStyle=c.skin;g.lineWidth=aw;
  g.beginPath();g.moveTo(-half,-14);g.lineTo(-half-4,-2-leg*.5);g.moveTo(half,-14);g.lineTo(half+4,-2+leg*.5);g.stroke();
  if(c.gk){g.fillStyle='#3fd0ff';g.beginPath();g.arc(-half-4,-1-leg*.5,4,0,7);g.arc(half+4,-1+leg*.5,4,0,7);g.fill()}
  if(o.coach){g.fillStyle='#c9a46a';g.fillRect(half,-8,9,12);g.fillStyle='#fff';g.fillRect(half+1.5,-6,6,8)}
  else{g.fillStyle='#fff';g.font='900 13px '+DISP;g.textAlign='center';g.fillText(c.num,0,0)}
  // cabeça
  const hc=c.hc;
  if(c.hair==='rabo'){g.fillStyle=hc;g.beginPath();g.ellipse(11,-26+Math.sin(bob)*2,4,9,.4,0,7);g.fill()}
  if(c.hair==='lenco'||c.hair==='cacho'){g.fillStyle=hc;for(let a=0;a<14;a++){const r=a/14*Math.PI*1.5+Math.PI*.75;g.beginPath();g.arc(Math.cos(r)*11.5,-28+Math.sin(r)*11.5,5,0,7);g.fill()}}
  g.fillStyle=c.skin;g.beginPath();g.arc(0,-28,10,0,7);g.fill();
  g.fillStyle=hc;
  if(c.hair==='rabo'){g.beginPath();g.arc(0,-31,10,Math.PI,0);g.fill()}
  else if(c.hair==='cacho'){for(let a=0;a<6;a++){g.beginPath();g.arc(-8+a*3.2,-37+Math.abs(a-2.5)*1.2,4.5,0,7);g.fill()}}
  else if(c.hair==='curto'){g.beginPath();g.arc(0,-30,10.6,Math.PI*.92,Math.PI*2.08);g.fill()}
  else if(c.hair==='lenco'){g.fillStyle=c.scarf;g.beginPath();g.arc(0,-31,11,Math.PI*1.02,Math.PI*1.98);g.fill();
    g.beginPath();g.moveTo(9,-36);g.lineTo(17,-42);g.lineTo(16,-33);g.closePath();g.moveTo(9,-36);g.lineTo(18,-34);g.lineTo(13,-28);g.closePath();g.fill();
    g.fillStyle='#fff';g.globalAlpha=.35;for(let i=-6;i<=6;i+=4){g.beginPath();g.arc(i,-36,1,0,7);g.fill()}g.globalAlpha=1}
  if(c.helmet){g.fillStyle='#f4f7fb';g.beginPath();g.arc(0,-30,12,Math.PI*.95,Math.PI*2.05);g.closePath();g.fill();
    g.fillStyle='#0d2a52';g.fillRect(-1.6,-42,3.2,11);g.fillRect(-12,-31,24,2.5);
    g.fillStyle='#f4f7fb';g.beginPath();g.roundRect(-13,-31,5,9,2);g.roundRect(8,-31,5,9,2);g.fill()}
  g.fillStyle='#1b1b1b';g.beginPath();g.arc(-3.5,-27,1.4,0,7);g.arc(3.5,-27,1.4,0,7);g.fill();
  if(c.glasses){g.strokeStyle='#111';g.lineWidth=1.3;g.beginPath();g.arc(-3.8,-27,3.2,0,7);g.moveTo(6.9,-27);g.arc(3.8,-27,3.2,0,7);g.moveTo(-.6,-27);g.lineTo(.6,-27);g.stroke()}
  g.strokeStyle='#1b1b1b';g.lineWidth=1.3;g.beginPath();
  if(o.angry){g.moveTo(-6,-31);g.lineTo(-2,-29.5);g.moveTo(6,-31);g.lineTo(2,-29.5);g.moveTo(-3,-22);g.lineTo(3,-22)}
  else g.arc(0,-24,3.5,.2,Math.PI-.2);
  g.stroke();
  g.restore();
}
function drawSuit(x,y,bob,big=1,label){
  ctx.save();ctx.translate(x,y);ctx.scale(big,big);const leg=Math.sin(bob)*4;
  ctx.fillStyle='rgba(0,0,0,.35)';ctx.beginPath();ctx.ellipse(0,28,15,5,0,0,7);ctx.fill();
  ctx.strokeStyle='#22252b';ctx.lineWidth=6;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-5,10);ctx.lineTo(-5+leg,26);ctx.moveTo(5,10);ctx.lineTo(5-leg,26);ctx.stroke();
  ctx.fillStyle='#3b3f47';ctx.beginPath();ctx.roundRect(-14,-18,28,30,5);ctx.fill();
  ctx.fillStyle='#fff';ctx.beginPath();ctx.moveTo(-5,-18);ctx.lineTo(0,-6);ctx.lineTo(5,-18);ctx.fill();
  ctx.fillStyle='#7a1f2b';ctx.beginPath();ctx.moveTo(-2,-16);ctx.lineTo(2,-16);ctx.lineTo(1.5,-4);ctx.lineTo(0,-1);ctx.lineTo(-1.5,-4);ctx.fill();
  ctx.fillStyle='#5a3d24';ctx.fillRect(13,-2,10,8);
  ctx.fillStyle='#e8c3a0';ctx.beginPath();ctx.arc(0,-28,10,0,7);ctx.fill();
  ctx.fillStyle='#6f6a63';ctx.beginPath();ctx.arc(0,-31,10,Math.PI*1.05,Math.PI*1.95);ctx.fill();
  ctx.strokeStyle='#222';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(-6,-31);ctx.lineTo(-2,-29);ctx.moveTo(6,-31);ctx.lineTo(2,-29);ctx.stroke();
  ctx.beginPath();ctx.arc(0,-20,3.5,Math.PI+.3,-.3);ctx.stroke();
  if(label){ctx.fillStyle='#c9a227';ctx.save();ctx.rotate(-.55);ctx.fillRect(-20,-6,40,6);ctx.restore()}
  ctx.restore();
}
function drawPaper(x,y,r,kind){
  ctx.save();ctx.translate(x,y);ctx.rotate(r);
  if(kind==='burca'){ctx.fillStyle='#4a4f5c';ctx.beginPath();ctx.moveTo(0,-14);ctx.quadraticCurveTo(14,-6,12,14);ctx.lineTo(-12,14);ctx.quadraticCurveTo(-14,-6,0,-14);ctx.fill();
    ctx.fillStyle='#2a2d36';ctx.fillRect(-5,-8,10,4);}
  else{ctx.fillStyle='#f7f3e6';ctx.fillRect(-12,-15,24,30);ctx.fillStyle='#b3261e';ctx.font='900 12px '+DISP;
    ctx.textAlign='center';ctx.fillText('PL',0,-2);ctx.fillStyle='#9a9a9a';for(let i=3;i<13;i+=4)ctx.fillRect(-8,i,16,1.5);}
  ctx.restore();
}
function drawItem(it,t){
  const y=it.y+Math.sin(t*3+it.x)*4;ctx.save();ctx.translate(it.x,y);
  ctx.fillStyle='rgba(124,200,255,.2)';ctx.beginPath();ctx.arc(0,0,21,0,7);ctx.fill();
  ctx.font='26px serif';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(it.k==='guarda'?'☔':it.k==='pizza'?'🍕':'🍺',0,1);ctx.restore();
}
function drawBall(x,y,glow){ctx.save();if(glow){ctx.fillStyle='rgba(124,200,255,.35)';ctx.beginPath();ctx.arc(x,y,20,0,7);ctx.fill()}
  ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x,y,7,0,7);ctx.fill();ctx.fillStyle='#111';ctx.beginPath();ctx.arc(x,y,2.6,0,7);ctx.fill();ctx.restore()}
function bubble(x,y,txt,col='#f4f7fb'){ctx.font='700 15px '+DISP;const w=ctx.measureText(txt).width+16;
  ctx.fillStyle=col;ctx.beginPath();ctx.roundRect(x-w/2,y-24,w,22,6);ctx.fill();ctx.beginPath();ctx.moveTo(x-5,y-3);ctx.lineTo(x+5,y-3);ctx.lineTo(x,y+4);ctx.fill();
  ctx.fillStyle='#0d2a52';ctx.textAlign='center';ctx.fillText(txt,x,y-8)}
