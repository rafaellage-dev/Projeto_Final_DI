const botaoTema = document.getElementById('btn-tema');
const logo = document.getElementById('logo');
const img = document.getElementById('img-footer');
const toggle = document.getElementById('toggle');
const toggle_fnt = document.getElementById('toggle_fonte');
const iconeCarrinho = document.getElementById('carrinho');

function aplicarTema(tema) {
    if (tema === 'escuro') {
        document.body.classList.add('dark-mode');
        if (logo) logo.src = '../imagens/Truffe__2_-removebg-preview.png';
        if (img) img.src = '../imagens/Truffe__2_-removebg-preview.png';
        if (toggle) toggle.src = '../imagens/Produtos em Destaque_fundo_escuro.png';
        if (toggle_fnt) toggle_fnt.src = '../imagens/Aa__1_-removebg-preview.png';
        if (iconeCarrinho) iconeCarrinho.src = '../imagens/carrinho_bg-removebg-preview.png';
    } else {
        document.body.classList.remove('dark-mode');
        if (logo) logo.src = '../imagens/Truffa_negra_bg_removed.png';
        if (img) img.src = '../imagens/Truffa_negra_bg_removed.png';
        if (toggle) toggle.src = '../imagens/Fundo_claro_escuro.png';
        if (toggle_fnt) toggle_fnt.src = '../imagens/Aa-removebg-preview.png';
        if (iconeCarrinho) iconeCarrinho.src = '../imagens/carrinho-removebg-preview.png';

    }
}

const temaSalvo = localStorage.getItem('tema');
if (temaSalvo) {
    aplicarTema(temaSalvo);
}

if (botaoTema) {
    botaoTema.addEventListener('click', function(evento) {
        evento.preventDefault();
        
        const isDark = document.body.classList.contains('dark-mode');
        const novoTema = isDark ? 'claro' : 'escuro';
        
        aplicarTema(novoTema);
        localStorage.setItem('tema', novoTema);
    });
}
