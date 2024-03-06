// Classe do jogo
class Game extends Phaser.Scene{
    constructor(){
        super({key: "Game"})
    }
    // Pré-carregamento de assets
    preload(){
        this.load.image('ceu', 'assets/ceu.png');
        this.load.image('ground', 'assets/ground.png');
        this.load.spritesheet('slime', 'assets/slime.png', {frameWidth: 256, frameHeight:256});
        this.load.image('exp', 'assets/exp.png');
    }
    // Criação dos elementos do jogo
    create(){
        // Adiciona imagem de fundo
        this.add.image(w/2, h/2, 'ceu').setScale(.8);
        // Cria grupo de plataformas estáticas
        plataforma = this.physics.add.staticGroup();
        // Cria e posiciona plataformas
        plataforma.create(400, 425, 'ground').setScale(1).refreshBody();
        plataforma.create(500, 250, 'ground').setScale(.2).refreshBody();
        plataforma.create(300, 325, 'ground').setScale(.2).refreshBody();

        // Cria e configura o personagem slime
        slime = this.physics.add.sprite(100, 200, 'slime').setScale(0.3);
        slime.setCollideWorldBounds(true);
        this.physics.add.collider(slime, plataforma);
        slime.body.setSize(200, 200, true);

        // Cria grupo de experiências (exp)
        exp = this.physics.add.group();
        // Cria e posiciona experiências
        exp.create(locais[0], 300, 'exp').setScale(.4).setBounce(.8);
        exp.create(locais[1], 300, 'exp').setScale(.4).setBounce(.8);
        exp.create(locais[2], 300, 'exp').setScale(.4).setBounce(.8);
        exp.create(locais[1], 200, 'exp').setScale(.4).setBounce(.8);
        exp.create(locais[3], 100, 'exp').setScale(.4).setBounce(.8);
        this.physics.add.collider(exp, plataforma);

        // Define o tamanho dos corpos de colisão das experiências
        exp.children.iterate((exp) => {
            exp.body.setSize(40, 40, true);
        });
        // Adiciona texto informativo
        this.add.text(30,30,'Colete as experiências!', { fontSize: '30px', fill: '#000000' })
        placar = this.add.text(600, 30, 'exp:0/5', { fontSize: '30px', fill: '#000000' })

        // Adiciona colisão entre o personagem slime e as experiências
        this.physics.add.overlap(slime, exp.getChildren(), function (slime, exp) {
            exp.disableBody(true, true); 
            pontuacao += 1; 
            placar.setText('exp:' + pontuacao + '/5'); 
        });

        // Criação das animações do personagem
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('slime', { start: 2, end: 2 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('slime', { start: 0, end: 0 }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('slime', { start: 1, end: 1 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('slime', { start: 4, end: 4 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('slime', { start: 3, end: 3 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'upSide',
            frames: this.anims.generateFrameNumbers('slime', { start: 3, end: 3 }),
            frameRate: 10,
            repeat: 0
        });

        // Configuração do teclado
        cursors = this.input.keyboard.createCursorKeys(); 
        slime.anims.play('idle', true);

    }
    // Atualização do jogo
    update(){
        while (true){
             // Lidar com o movimento
            if (cursors.up.isDown && slime.body.touching.down) {
                // Pular
                slime.anims.play('up');
                slime.setVelocityY(-2 * vel); // Ajustar a velocidade do pulo
            } else if (cursors.left.isDown) {
                // Mover para a esquerda
                slime.setVelocityX(-vel); // Ajustar a velocidade horizontal
                slime.anims.play('left', true);
            } else if (cursors.right.isDown) {
                // Mover para a direita
                slime.setVelocityX(vel); // Ajustar a velocidade horizontal
                slime.anims.play('right', true);
            } else if (!slime.body.touching.down) {
                // Animação de queda
                slime.anims.play('down');
            }else if (cursors.up.isDown && cursors.left.isDown) {
                slime.anims.play('upSide');
                slime.setVelocity(-vel, -2*vel);
            }else if (cursors.up.isDown && cursors.right.isDown) {
                slime.anims.play('upSide');
                slime.setVelocity(vel, -2*vel);
            } else {
                // Em repouso
                slime.setVelocityX(0); // Adicionar um pouco de atrito ou desaceleração
                slime.anims.play('idle', true);
            }
        
            // Verifica se a pontuação atingiu o objetivo
            if (pontuacao === 5) {
                this.scene.stop();
                this.scene.start('telaFinal');
                pontuacao = 0
            }
            break
        }

    }
}
