// Classe da tela inicial do jogo
class telaInicial extends Phaser.Scene{
    constructor(){
        super({key:'telaInicial'})
    }
    // Pré-carregamento de assets
    preload(){
        this.load.image('ceu', 'assets/ceu.png');
        this.load.image('jogar', 'assets/jogar.png');
        this.load.image('controles', 'assets/controles.png');
    }
    // Criação dos elementos da tela inicial
    create(){
        // Adiciona imagem de fundo
        this.add.image(w/2, h/2,'ceu').setScale(1);
        // Adiciona texto do título
        this.add.text(w/2-130, 50, 'SlimeGrowth', { fontSize: '40px', fontStyle: 'bold', fill: '#000000' })
        // Adiciona texto de controles
        this.add.text(100, h/3, 'Controles do Jogo:', { fontSize: '20px', fontStyle: 'bold', fill: '#000000' })
        // Adiciona imagem de controles
        this.add.image(200, 3*h/5,'controles').setScale(.7);
        // Adiciona botão de iniciar o jogo
        const botaoInicial =  this.add.image(3*w/4, 3.2*h/5,'jogar').setScale(.2);
        botaoInicial.setInteractive();
        botaoInicial.on('pointerdown', () =>{
            this.scene.stop();
            this.scene.start('Game');
        })
    }
}
