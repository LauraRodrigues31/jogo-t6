// Desenho do campo: gramado, linhas, gol, faixas de patrocínio.
// goalX() e mouth() definem a posição e o tamanho do gol.

/* ---------- campo ---------- */
const goalX=()=>ARENA+W-50;
function mouth(){const e=C.id==='maressa'?28:0;return [200-e,330+e]}
function drawField(cam){
  for(let x=Math.floor(cam/80)*80;x<cam+W+80;x+=80){ctx.fillStyle=(x/80)%2?'#1d4a35':'#1a4430';ctx.fillRect(x-cam,0,80,H)}
  ctx.strokeStyle='rgba(244,247,251,.7)';ctx.lineWidth=3;
  ctx.beginPath();ctx.moveTo(0,TOP-14);ctx.lineTo(W,TOP-14);ctx.moveTo(0,BOT+22);ctx.lineTo(W,BOT+22);ctx.stroke();
  [1400,2900].forEach(cx=>{if(cx-cam>-150&&cx-cam<W+150){ctx.beginPath();ctx.moveTo(cx-cam,TOP-14);ctx.lineTo(cx-cam,BOT+22);ctx.stroke();ctx.beginPath();ctx.arc(cx-cam,(TOP+BOT)/2+4,78,0,7);ctx.stroke()}});
  if(cam+W>ARENA){
    const M=[200,330],gx=goalX()-cam;ctx.beginPath();ctx.moveTo(ARENA-cam,TOP-14);ctx.lineTo(ARENA-cam,BOT+22);ctx.stroke();
    ctx.strokeRect(gx-170,M[0]-90,170,M[1]-M[0]+180);
    ctx.fillStyle='rgba(244,247,251,.12)';ctx.fillRect(gx,M[0],34,M[1]-M[0]);
    ctx.strokeStyle='#fff';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(gx,M[0]);ctx.lineTo(gx+34,M[0]);ctx.lineTo(gx+34,M[1]);ctx.lineTo(gx,M[1]);ctx.stroke();
    ctx.strokeStyle='rgba(255,255,255,.25)';ctx.lineWidth=1;for(let y=M[0];y<M[1];y+=10){ctx.beginPath();ctx.moveTo(gx,y);ctx.lineTo(gx+34,y);ctx.stroke()}
  }
  ctx.fillStyle='rgba(244,247,251,.08)';ctx.font='900 120px '+DISP;ctx.textAlign='center';
  for(let x=700;x<LEVEL;x+=1500){if(x-cam>-300&&x-cam<W+300)ctx.fillText('T6',x-cam,330)}
  ctx.font='700 17px '+DISP;
  for(let x=0;x<LEVEL+W;x+=520){const sx=x-cam+60;if(sx>-220&&sx<W+50){ctx.fillStyle='#0d2a52';ctx.fillRect(sx,10,180,24);ctx.fillStyle='#f4f7fb';ctx.textAlign='left';
    ctx.fillText(['#JOGAMIGA','FUTEBOL PARA MULHERES','SEM BURCA, COM CHUTEIRA','T6 NA CANCHA'][(x/520)%4|0],sx+8,28)}}
}
