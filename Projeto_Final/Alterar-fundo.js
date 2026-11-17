const botaoTema = document.getElementById('btn-tema');
const logo = document.getElementById('logo');
const img = document.getElementById('img-footer');
const toggle = document.getElementById('toggle');
const toggle_fnt = document.getElementById('toggle_fonte');

function aplicarTema(tema) {
    if (tema === 'escuro') {
        document.body.classList.add('dark-mode');
        if (logo) logo.src = 'Truffe__2_-removebg-preview.png';
        if (img) img.src = 'Truffe__2_-removebg-preview.png';
        if (toggle) toggle.src = 'Produtos em Destaque_fundo_escuro.png';
        if (toggle_fnt) toggle_fnt.src = 'Aa__1_-removebg-preview.png';
    } else {
        document.body.classList.remove('dark-mode');
        if (logo) logo.src = 'Truffa_negra_bg_removed.png';
        if (img) img.src = 'Truffa_negra_bg_removed.png';
        if (toggle) toggle.src = 'Fundo_claro_escuro.png';
        if (toggle_fnt) toggle_fnt.src = 'Aa-removebg-preview.png';
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