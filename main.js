// Variáveis globais
var plataforma; 
var slime; 
var cursors; 
var exp;
var placar;
var pontuacao = 0;
var vel = 200;
var locais = [150, 500, 700, 250];
var w = 800;
var h = 400;

// Configuração do jogo
var config = {
    type: Phaser.AUTO, 
    width: w, 
    height: h, 
    
    // Configurações de física
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
    
    // Lista de cenas do jogo
    scene: [telaInicial, Game, telaFinal]
}

// Criação do objeto do jogo com base na configuração
var game = new Phaser.Game(config);


