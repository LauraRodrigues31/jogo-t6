// Estado da partida: reset() monta uma partida nova (vidas, zagueiros, itens,
// companheiras de tabela, zagueiras marcando e o Senador).

/* ---------- estado ---------- */
let S=null,keys={},last=0,state='menu',conf=[];
function reset(){
  const lives=C.id==='isabella'?7:C.id==='laiz'?6:5;
  S={t:0,cam:0,lives,max:lives,p:{x:120,y:275,inv:0,slow:0,boost:0,shield:0,dash:0,cd:0,dx:0,dy:0},
    foes:[],papers:[],items:[],mates:[],parts:[],msg:'',msgT:0,paperT:1.5,talk:{t:6,txt:'',who:'',left:0},tempo:false,
    boss:{x:0,y:265,hp:C.id==='tres'?2:3,max:C.id==='tres'?2:3,throwT:2},ball:null,hasBall:false,kick:null,arena:false,reveal:0,won:false,bord:0};
  for(let i=0;i<16;i++){const x=650+i*215+Math.random()*60;
    S.foes.push({x,y0:TOP+60+Math.random()*(BOT-TOP-120),amp:50+Math.random()*110,sp:.9+Math.random()*1.4,ph:Math.random()*6,chase:i%4===3,y:0,down:0});}
  {const pool=['beatriz','isabella','gabi','bruna'].filter(id=>id!==C.id).sort(()=>Math.random()-.5);
   if(C.id==='tres'){pool.splice(pool.indexOf('beatriz'),1);pool.unshift('beatriz')}
   [1900,3400].forEach((x,i)=>{const mc=ROSTER.find(r=>r.id===pool[i]);S.foes.push({x,y0:150+i*220,amp:40,sp:1,ph:0,y:270,down:0,bea:mc})})}
  [[900,'guarda'],[1500,'pizza'],[2100,'chopp'],[2700,'guarda'],[3300,'pizza'],[3800,'chopp']].forEach(([x,k])=>
    S.items.push({x,y:TOP+50+Math.random()*(BOT-TOP-100),k}));
  const others=ROSTER.filter(r=>r.id!==C.id).sort(()=>Math.random()-.5);
  const pick=[];if(PARTNER[C.id])pick.push(ROSTER.find(r=>r.id===PARTNER[C.id]));
  others.forEach(r=>{if(!pick.includes(r))pick.push(r)});
  const n=C.id==='gi'?4:2,xs=n===4?[800,1600,2400,3200]:[1250,2950];
  for(let i=0;i<n;i++)S.mates.push({x:xs[i],y:i%2?380:180,c:pick[i]});
}
function say(m,t=1.6){S.msg=m;S.msgT=t}
function talk(who,txt){S.talk={t:8+Math.random()*4,txt,who,left:2.6}}
