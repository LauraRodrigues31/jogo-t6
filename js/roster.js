// Elenco do T6: nomes, apelidos, visual, poderes e frases de cada jogadora.
// É aqui que você muda nome, número, cor de pele, cabelo e frases.
// Não mude o campo "id": ele é usado em game.js para ativar os poderes.

/* ---------- elenco ---------- */
const ROSTER=[
 {id:'tres',name:'3',num:'3',pos:'Atacante',tag:'Caçula do time',skin:'#e8bf98',hair:'rabo',hc:'#2a1a10',w:.94,h:.88,helmet:true,
  desc:'Joga de capacete, é zoada de criança, mas é quem mais faz gol.',power:'Faro de gol: precisa de só 2 gols pra virar o jogo.',
  line:'Chama a 3!'},
 {id:'ligia',name:'Lígia',num:'27',pos:'Atacante',tag:'Bombada',skin:'#e9be97',hair:'rabo',hc:'#3b2616',arms:true,
  desc:'“Pra mim ninguém manda uma dessa!”',power:'Bomba: chute tão rápido que o Senador mal reage.',
  line:'“Pra mim ninguém manda uma dessa!”',bordao:'Pra mim ninguém manda uma dessa!'},
 {id:'gabi',name:'Gabi',num:'7',tag:'Passa nada',skin:'#f2cba7',hair:'rabo',hc:'#e0bd6e',
  desc:'',power:'Projeto de lei bate nela e volta: nunca fica lenta.',
  line:'“Uhhull!”',bordao:'Uhhull!'},
 {id:'isabella',name:'Isabella',num:'2',pos:'Zagueira',tag:'Bella',skin:'#e3b48c',hair:'rabo',hc:'#4a2e1a',glasses:true,
  desc:'',power:'Começa com 7 vidas.',
  line:'A Bella subiu da zaga e guardou.'},
 {id:'blue',name:'Blue',num:'6',pos:'Lateral',tag:'Sem freio',skin:'#f0c7a4',hair:'curto',hc:'#3a9cff',w:.8,
  desc:'',power:'Rápida e sempre indo pra frente, mesmo sem tocar.',
  line:'Não freou e foi parar dentro do gol.'},
 {id:'bruna',name:'Bruna',num:'4',tag:'Elegante',skin:'#e6bb93',hair:'curto',hc:'#3b2616',glasses:true,w:1.28,
  desc:'',power:'Desvia com classe: os obstáculos acertam menos ela.',
  line:'Gol com classe. Elegância é isso.'},
 {id:'day',name:'Day',num:'11',tag:'Como um raio',skin:'#e2b48a',hair:'rabo',hc:'#1c120b',h:.8,
  desc:'1 metro de pura velocidade.',power:'A mais rápida do T6, deixa rastro de raio.',
  line:'Ninguém viu passar. Só ficou o raio.'},
 {id:'maressa',name:'Maressa',num:'9',tag:'Cuidado, ela chuta',skin:'#b27c55',hair:'cacho',hc:'#1c120b',
  desc:'“Palmeiraaas, caraio!”',power:'O gol fica maior pra ela e o Senador demora pra reagir.',
  line:'“Palmeiraaas, caraio!”',bordao:'Palmeiraaas, caraio!'},
 {id:'gi',name:'Gi',num:'10',pos:'Meia',tag:'Rodo do meio-campo',skin:'#e6b98f',hair:'rabo',hc:'#5a3a1e',
  desc:'Garçonete de gol.',power:'O dobro de tabelinhas, e a bola chega servida no pé dela.',
  line:'“Boraa!”',bordao:'Boraa!'},
 {id:'beatriz',name:'Beatriz',num:'5',pos:'Zagueira',tag:'O paredão',skin:'#a8714a',hair:'lenco',hc:'#1c120b',scarf:'#e0608a',h:1.16,
  desc:'Eu amo paredão grande. Ama marcar a 3.',power:'Derruba zagueiro de terno no caminho (recarrega em 3 s).',
  line:'“Eu amoo paredão grande!”',bordao:'Eu amoo paredão grande!'},
 {id:'laiz',name:'Laiz',num:'14',tag:'Crossfiteira',skin:'#f2cba7',hair:'rabo',hc:'#d9b45a',h:1.12,arms:true,
  desc:'',power:'Aguenta mais (6 vidas) e chuta forte.',
  line:'“Pra você, amorzinho!” (dedicado à Alê)',bordao:'Pra você, amorzinho!'},
 {id:'ale',name:'Alê',num:'8',tag:'Cuidado! Dribla muito',skin:'#dfae86',hair:'curto',hc:'#2a1a10',
  desc:'Dribla e faz gol.',power:'Dribla zagueiro de terno sem perder vida (recarrega em 2 s).',
  line:'“Golaçooo de costume!”',bordao:'Golaçooo de costume!'},
];
const TAINA={name:'Tainá',skin:'#e4b48c',hair:'rabo',hc:'#2a1a10'};
const PARTNER={ligia:'gabi',gabi:'ligia',laiz:'ale',ale:'laiz'};
let C=ROSTER[0];

// Frases que a técnica Tainá grita da lateral e zoeiras da 3
const TAINA_LINES=['Fecha a linha!','Olha a marcação!','Bora, T6!','Cabeça erguida!','Toca e passa!','Isso, menina!'];
const TRES_LINES=['Criança é a vó!','Quem tá zoando agora?','Me passa que eu resolvo','Caçula, mas artilheira'];
