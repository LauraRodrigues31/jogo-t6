# O T6 joga sem burca ⚽

Joguinho de navegador do time de futebol feminino T6: atravesse o campo, desvie dos zagueiros de terno e dos projetos de lei, e marque o gol contra o Senador do Retrocesso pra tirar a burca de vez.

## Como jogar
- **Celular** (na horizontal): joystick para mover, botão para chutar.
- **Computador:** setas ou WASD para mover, espaço para chutar.

## Estrutura do projeto

```
index.html            estrutura das telas e ordem dos scripts
css/style.css         visual das telas, joystick e botões
assets/escudo-t6.png  escudo do time
js/
  config.js           medidas do campo, canvas e fonte
  roster.js           ELENCO: nomes, apelidos, visual, poderes e frases
  audio.js            efeitos sonoros e trilha gerada no navegador
  draw-characters.js  desenho das jogadoras, zagueiros, Senador, itens e bola
  draw-field.js       desenho do campo e do gol
  state.js            monta uma partida nova (vidas, obstáculos, marcadoras)
  ui.js               telas de início, escolha, vitória e derrota
  input.js            teclado, joystick e botão de chutar
  game.js             regras: movimento, colisões, poderes, chefão e gols
  render.js           desenha cada quadro, o HUD e a revelação final
  main.js             ajusta a tela e roda o loop do jogo
```

Os scripts são JavaScript puro, sem bibliotecas nem build. Eles são carregados em sequência no `index.html` e compartilham variáveis globais, por isso a ordem importa.

## Onde mexer
- **Nomes, frases e visual das jogadoras:** `js/roster.js`.
- **Poderes:** `js/game.js` (procure pelo `id` da jogadora, ex.: `C.id==='ligia'`).
- **Dificuldade do Senador:** `js/game.js`, na parte "chefão".
- **Textos das telas:** `index.html`.

## Rodar localmente
Basta abrir o `index.html` no navegador.

## Publicar no GitHub Pages
Em **Settings → Pages**, escolha a branch `main` e a pasta `/ (root)`.
