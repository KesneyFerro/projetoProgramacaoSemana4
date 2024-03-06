// Classe da tela final do jogo
class telaFinal extends Phaser.Scene{
    constructor(){
        super({key:"telaFinal"})
    }
    // Pré-carregamento de assets
    preload(){
        this.load.image('bgFinal', 'assets/ceu');
        this.load.image('jogarNovamente', 'assets/jogar');
    }
    // Criação dos elementos da tela final
    create(){
        // Adiciona imagem de fundo
        this.add.image(w/2, h/2,'ceu').setScale(1);
        // Adiciona texto de agradecimento
        this.add.text(w/2-210, 50, 'Obrigado por Jogar', { fontSize: '40px', fontStyle: 'bold', fill: '#000000' })
        // Adiciona texto de instrução para jogar novamente
        this.add.text(180, 100, 'Clique em "JOGAR" para jogar novamente', { fontSize: '20px', fontStyle: 'bold', fill: '#000000' })
        // Adiciona botão de jogar novamente
        const botaoFinal =  this.add.image(w/2, 3.2*h/5,'jogar').setScale(.2);
        botaoFinal.setInteractive();
        botaoFinal.on('pointerdown', () =>{
            this.scene.stop();
            this.scene.start('telaInicial');
        })
    }
}
