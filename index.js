const { createApp } = Vue;

createApp({
    data() {
        return {
            heroi: { vida: 100, defendendo: false, reducaoDano: 0 },
            vilao: { vida: 100, defendendo: false },
            heroiImg: '/images/hero/default.gif',
            vilaoImg: '/images/villain/default.gif',
            correrCount: 0,
            mensagemStatus: "A treta tá rolando",
            jogoAtivo: true
        }
    },

    methods: {
        atacar(isHeroi) {
            if (!this.jogoAtivo) return;
            if (isHeroi) {
                this.heroiImg = '/images/hero/attack.gif';
                setTimeout(() => {
                    this.heroiImg = '/images/hero/default.gif';
                }, 3000);
                this.vilao.vida -= 10;
                this.verificarVida();
                this.acaoVilao();
            } else {
                this.heroi.vida -= 20;
                this.verificarVida();
            }
        },
        defender(isHeroi) {
            if (!this.jogoAtivo) return;
            if (isHeroi) {
                this.heroi.defendendo = true;
                this.heroi.reducaoDano = 0.95; // Define redução de dano de 5%
                this.heroiImg = '/images/hero/defend.gif';
                setTimeout(() => {
                    this.heroiImg = '/images/hero/default.gif';
                    this.heroi.defendendo = false;
                }, 3000);
                this.acaoVilao();
            }
        },
        usarPocao(isHeroi) {
            if (!this.jogoAtivo) return;
            if (isHeroi) {
                this.heroiImg = '/images/hero/potion.gif';
                setTimeout(() => {
                    this.heroiImg = '/images/hero/default.gif';
                }, 3000);
                this.heroi.vida += 30;
                this.heroi.vida = Math.min(this.heroi.vida, 100);
                this.verificarVida();
                this.acaoVilao();
            }
        },
        correr(isHeroi) {
            if (!this.jogoAtivo) return;
            if (isHeroi) {
                if (this.correrCount < 3) {
                    this.heroiImg = '/images/hero/run.gif';
                    setTimeout(() => {
                        this.heroiImg = '/images/hero/default.gif';
                    }, 3000);
                    this.correrCount++;
                    this.acaoVilao();
                } else {
                    this.mensagemStatus = "Não pode mais correr, vacilão!";
                }
            }
        },
        acaoVilao() {
            if (!this.jogoAtivo) return;
            const acoes = ['atacar', 'defender', 'usarPocao', 'correr'];
            const acaoAleatoria = acoes[Math.floor(Math.random() * acoes.length)];
            switch (acaoAleatoria) {
                case 'atacar':
                    this.vilaoImg = '/images/villain/attack.gif';
                    setTimeout(() => {
                        this.vilaoImg = '/images/villain/default.gif';
                    }, 3000);
                    let dano = 20;
                    if (this.heroi.defendendo && this.heroi.reducaoDano > 0) {
                        dano *= this.heroi.reducaoDano;
                        this.heroi.reducaoDano = 0; // Reset após o uso
                    }
                    this.heroi.vida -= dano;
                    break;
                case 'defender':
                    this.vilao.defendendo = true;
                    this.vilaoImg = '/images/villain/defend.gif';
                    setTimeout(() => {
                        this.vilaoImg = '/images/villain/default.gif';
                        this.vilao.defendendo = false;
                    }, 3000);
                    break;
                case 'usarPocao':
                    this.vilaoImg = '/images/villain/potion.gif';
                    setTimeout(() => {
                        this.vilaoImg = '/images/villain/default.gif';
                    }, 3000);
                    this.vilao.vida += 30;
                    this.vilao.vida = Math.min(this.vilao.vida, 100);
                    break;
                case 'correr':
                    this.vilaoImg = '/images/villain/run.gif';
                    setTimeout(() => {
                        this.vilaoImg = '/images/villain/default.gif';
                    }, 3000);
                    break;
            }
        },
        verificarVida() {
            if (this.heroi.vida <= "0" || this.heroi.vida === "0") {
                this.mensagemStatus = "GAME OVER!!! (PERDEU PLAYBOY SAFADO)";
                this.heroi.vida = 0; // Garante que a vida não fique negativa.
                this.finalizarJogo();
            } else if (this.vilao.vida <= 0 || this.vilao.vida === 0) {
                this.mensagemStatus = "Você ganhou!!!! Tu é foda mermão!";
                this.vilao.vida = 0; // Garante que a vida não fique negativa.
                this.finalizarJogo();
            }
        }
        ,
        finalizarJogo() {
            this.jogoAtivo = false;
        }
    }
}).mount("#app");
