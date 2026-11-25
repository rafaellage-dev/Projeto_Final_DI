const botaoFonte = document.getElementById('btn-fonte');

function aplicarFonte(fonte) {
    if (fonte === 'grande') {
        document.body.classList.add('grande');
    } else {
        document.body.classList.remove('grande');
    }
}

const fonteSalva = localStorage.getItem('fonte');
if (fonteSalva) {
    aplicarFonte(fonteSalva);
}

if (botaoFonte) {
    botaoFonte.addEventListener('click', function(evento) {
        evento.preventDefault();
        
        const isGrande = document.body.classList.contains('grande');
        const novaFonte = isGrande ? 'normal' : 'grande';
        
        aplicarFonte(novaFonte);
        localStorage.setItem('fonte', novaFonte);
    });
}