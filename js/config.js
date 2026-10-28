// Configurações gerais: atalhos, canvas, fontes e medidas do campo.
// Altere TOP/BOT para mudar a área jogável e LEVEL para o comprimento da fase.

const $=id=>document.getElementById(id);
const cv=$('c');let ctx=cv.getContext('2d');
const DISP='"Big Shoulders Display","Arial Narrow",Impact,sans-serif';
const H=540,TOP=60,BOT=468,LEVEL=4300,ARENA=LEVEL;
let W=960,SC=1;
const crest=new Image();crest.src="assets/escudo-t6.png";
