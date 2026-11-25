const CHAVE_CARRINHO = 'truffaBlancaCarrinho';
const IMAGENS_PRODUTOS = {
    'Azeite de Trufas Brancas': '../imagens/Produto_1.jpg',
    'Azeite de Trufas Negras': '../imagens/Produto_2.jpg',
    'Creme de Trufas Brancas': '../imagens/Produto_3.jpg',
    'Mel de Trufas Brancas': '../imagens/Produto_4.jpg',
    'Azeite de Trufas Brancas (Pote)': '../imagens/Produto_5.jpg',
    'Pasta de Risoto de Trufas Brancas': '../imagens/Produto_6.jpg',
    'Molho de Macarrão de Porcini e Trufas Negras': '../imagens/Produto_7.jpg',
    'Sal de Trufas Brancas': '../imagens/Produto_8.jpg',
    'Fettuccine Linguine com Trufas Negras': '../imagens/Produto_9.jpg'
};

const PRECOS_PRODUTOS = {
    'Azeite de Trufas Brancas': 87.90,
    'Azeite de Trufas Negras': 49.90,
    'Creme de Trufas Brancas': 59.90,
    'Mel de Trufas Brancas': 79.90,
    'Azeite de Trufas Brancas (Pote)': 49.90,
    'Pasta de Risoto de Trufas Brancas': 89.90,
    'Molho de Macarrão de Porcini e Trufas Negras': 49.90,
    'Sal de Trufas Brancas': 59.90,
    'Fettuccine Linguine com Trufas Negras': 69.90
};

let carrinho = carregarCarrinho();

function carregarCarrinho() {
    try {
        const itensSalvos = JSON.parse(localStorage.getItem(CHAVE_CARRINHO) || '[]');

        if (!Array.isArray(itensSalvos)) {
            return [];
        }

        const itensAgrupados = [];

        itensSalvos.forEach(item => {
            if (!item || typeof item.nome !== 'string') {
                return;
            }

            const itemExistente = itensAgrupados.find(produto => produto.nome === item.nome);
            const quantidade = Math.max(1, parseInt(item.quantidade, 10) || 1);

            if (itemExistente) {
                itemExistente.quantidade += quantidade;
            } else {
                itensAgrupados.push({
                    nome: item.nome,
                    preco: PRECOS_PRODUTOS[item.nome] !== undefined ? PRECOS_PRODUTOS[item.nome] : (Number(item.preco) || 0),
                    imagem: item.imagem || IMAGENS_PRODUTOS[item.nome],
                    quantidade: quantidade
                });
            }
        });

        return itensAgrupados;
    } catch (erro) {
        return [];
    }
}

function salvarCarrinho() {
    localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
}

function adicionarAoCarrinho(nome, preco, imagem) {
    const valor = Number(preco);

    if (!nome || !Number.isFinite(valor) || valor < 0) {
        return;
    }

    const itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            nome: nome,
            preco: valor,
            imagem: imagem || IMAGENS_PRODUTOS[nome],
            quantidade: 1
        });
    }

    salvarCarrinho();
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const listaHTML = document.getElementById('lista-carrinho');
    const totalHTML = document.getElementById('total-carrinho');

    if (!listaHTML || !totalHTML) {
        return;
    }

    listaHTML.innerHTML = '';
    let total = 0;

    carrinho.forEach((item, index) => {
        const preco = Number(item.preco) || 0;
        const quantidade = Number(item.quantidade) || 1;
        const subtotal = preco * quantidade;
        total += subtotal;

        const linha = document.createElement('li');
        linha.className = 'item-carrinho';

        const foto = document.createElement('img');
        foto.className = 'item-carrinho-foto';
        foto.src = item.imagem || IMAGENS_PRODUTOS[item.nome] || '../imagens/Produto_1.jpg';
        foto.alt = item.nome;

        const informacoes = document.createElement('div');
        informacoes.className = 'item-carrinho-informacoes';

        const descricao = document.createElement('div');
        descricao.className = 'item-carrinho-descricao';
        descricao.textContent = item.nome;

        const controleQuantidade = document.createElement('div');
        controleQuantidade.className = 'quantidade-carrinho';

        const botaoDiminuir = document.createElement('button');
        botaoDiminuir.type = 'button';
        botaoDiminuir.className = 'botao-quantidade';
        botaoDiminuir.textContent = '−';
        botaoDiminuir.setAttribute('aria-label', 'Diminuir quantidade de ' + item.nome);
        botaoDiminuir.onclick = function () {
            alterarQuantidade(index, -1);
        };

        const quantidadeHTML = document.createElement('span');
        quantidadeHTML.className = 'valor-quantidade';
        quantidadeHTML.textContent = quantidade;

        const botaoAumentar = document.createElement('button');
        botaoAumentar.type = 'button';
        botaoAumentar.className = 'botao-quantidade';
        botaoAumentar.textContent = '+';
        botaoAumentar.setAttribute('aria-label', 'Aumentar quantidade de ' + item.nome);
        botaoAumentar.onclick = function () {
            alterarQuantidade(index, 1);
        };

        controleQuantidade.appendChild(botaoDiminuir);
        controleQuantidade.appendChild(quantidadeHTML);
        controleQuantidade.appendChild(botaoAumentar);
        informacoes.appendChild(descricao);
        informacoes.appendChild(controleQuantidade);

        const valor = document.createElement('span');
        valor.className = 'item-carrinho-preco';
        valor.textContent = subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        const botaoRemover = document.createElement('button');
        botaoRemover.type = 'button';
        botaoRemover.className = 'botao-remover-item';
        botaoRemover.textContent = 'Remover';
        botaoRemover.setAttribute('aria-label', 'Remover ' + item.nome + ' do carrinho');
        botaoRemover.onclick = function () {
            removerItem(index);
        };

        linha.appendChild(foto);
        linha.appendChild(informacoes);
        linha.appendChild(valor);
        linha.appendChild(botaoRemover);
        listaHTML.appendChild(linha);
    });

    totalHTML.textContent = total.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const mensagemVazio = document.getElementById('carrinho-vazio');
    if (mensagemVazio) {
        mensagemVazio.hidden = carrinho.length > 0;
    }

    listaHTML.hidden = carrinho.length === 0;
}

function removerItem(index) {
    carrinho.splice(index, 1);
    salvarCarrinho();
    atualizarCarrinho();
}

function alterarQuantidade(index, alteracao) {
    carrinho[index].quantidade += alteracao;

    if (carrinho[index].quantidade <= 0) {
        removerItem(index);
        return;
    }

    salvarCarrinho();
    atualizarCarrinho();
}

function limparCarrinho() {
    carrinho = [];
    salvarCarrinho();
    atualizarCarrinho();
}

document.addEventListener('DOMContentLoaded', atualizarCarrinho);
