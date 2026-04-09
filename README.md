# ConcurPG

App local de acompanhamento gamificado para estudo de questoes.

## O que foi criado

- App local com campanhas separadas para Unilab, TJCE e Dataprev.
- Painel principal mais limpo com level, GIF, XP, streak, ouro e atributos agregados.
- Botoes de adicionar e subtrair para Acerto Facil, Acerto Dificil e Erro em cada atributo de cada campanha.
- Regras automaticas:
  - Acerto Facil = +1 ponto de atributo, +10 XP, +12 ouro
  - Acerto Dificil = +0,5 ponto de atributo, +18 XP, +20 ouro
  - Erro = 0 ponto de atributo
- GIF carregado automaticamente a partir de [download.gif](download.gif).
- Estado salvo automaticamente em [concurpg-state.json](concurpg-state.json).

## Persistencia entre computadores

O app le e grava automaticamente o progresso em [concurpg-state.json](concurpg-state.json).
Se voce abrir este mesmo projeto em outro computador com esse arquivo sincronizado, o progresso sera carregado.

## Como abrir o app

1. Abra um terminal nesta pasta.
2. Rode npm.cmd start.
3. Abra no navegador: http://localhost:3210