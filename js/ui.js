// Telas (início, escolha de jogadora, vitória, derrota) e grade de escolha do elenco.

function show(id){document.querySelectorAll('.overlay').forEach(o=>o.classList.toggle('on',o.id===id))}
$('toSelect').onclick=()=>{buildGrid();show('ovSelect')};
function start(){reset();conf=[];show(null);state='play';apito();try{if(!AC&&!muted)AC=new (window.AudioContext||window.webkitAudioContext)()}catch(e){}}
$('play').onclick=start;$('retry').onclick=start;$('again').onclick=start;
$('change').onclick=$('change2').onclick=()=>{buildGrid();show('ovSelect')};

function buildGrid(){
  const grid=$('grid');grid.innerHTML='';
  ROSTER.forEach(r=>{
    const b=document.createElement('button');b.className='pl';b.setAttribute('aria-pressed',r===C);
    const pc=document.createElement('canvas');pc.width=152;pc.height=172;
    b.appendChild(pc);const nb=document.createElement('b');nb.textContent=r.name;b.appendChild(nb);
    const sp=document.createElement('span');sp.textContent=r.tag;b.appendChild(sp);
    b.onclick=()=>{C=r;grid.querySelectorAll('.pl').forEach(x=>x.setAttribute('aria-pressed',x===b));detail()};
    grid.appendChild(b);
    const keep=ctx;ctx=pc.getContext('2d');ctx.setTransform(1,0,0,1,0,0);
    const g=ctx.createLinearGradient(0,0,0,172);g.addColorStop(0,'#173f78');g.addColorStop(1,'#0b2346');ctx.fillStyle=g;ctx.fillRect(0,0,152,172);
    drawPerson(r,76,112,2.15,0,false);ctx=keep;
  });
  detail();
}
function detail(){$('dName').textContent=C.name+': '+C.tag;$('dDesc').textContent=(C.desc?C.desc+' ':'')+C.power}
