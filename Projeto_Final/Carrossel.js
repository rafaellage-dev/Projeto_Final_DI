const trilho = document.getElementById('trilhoProdutos');
const container = document.querySelector('.carrossel-container');
const cards = trilho.querySelectorAll('.card');

let indiceAtual = 0;
const cardsVisiveis = 3;
const totalCards = cards.length;

function rolar(direcao) {
    indiceAtual += direcao;
    if (indiceAtual > totalCards - cardsVisiveis) {
        indiceAtual = 0;
    } else if (indiceAtual < 0) {
        indiceAtual = totalCards - cardsVisiveis;
    } 

    trilho.scrollTo({
        left: indiceAtual * 315,
        behavior: 'smooth'
    });
}

    let intervalo = setInterval(() => {
        rolar(1);
    }, 2000);

    container.addEventListener('mouseenter', () => {
        clearInterval(intervalo);
    });

    container.addEventListener('mouseleave', () => {
        intervalo = setInterval(() => {
            rolar(1);
        }, 2000);
    });

