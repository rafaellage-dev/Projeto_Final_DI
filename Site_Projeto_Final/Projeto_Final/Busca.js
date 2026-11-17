const nomesProdutos = [
    "Azeite de Trufas Brancas",
    "Azeite de Trufas Negras",
    "Creme de Trufas Brancas",
    "Mel de Trufas Brancas",
    "Azeite de Trufas Brancas (Pote)",
    "Pasta de Risoto de Trufas Brancas",
    "Molho de Macarrão de Porcini e Trufas Negras",
    "Sal de Trufas Brancas",
    "Fettuccine Linguine com Trufas Negras"
]
const paginasProdutos = {
    "Azeite de Trufas Brancas": "azeite-de-trufas-brancas.html",
    "Azeite de Trufas Negras":"azeite-de-trufas-negras.html",
    "Creme de Trufas Brancas": "creme-de-trufas-brancas.html",
    "Mel de Trufas Brancas": "mel-de-trufas-brancas.html",
    "Azeite de Trufas Brancas (Pote)": "azeite-de-trufas-brancas-(pote).html",
    "Pasta de Risoto de Trufas Brancas": "pasta-de-risoto-de-trufas-brancas.html",
    "Molho de Macarrão de Porcini e Trufas Negras": "molho-de-macarrao-de-porcini-e-trufas-negras.html",
    "Sal de Trufas Brancas": "sal-de-trufas-brancas.html",
    "Fettuccine Linguine com Trufas Negras": "fettuccine-linguine-com-trufas-negras.html"
}
const campoBusca = document.querySelector("#campo-busca");
const sugestoes = document.querySelector("#sugestoes-busca");
const formulario = campoBusca.closest("form");

campoBusca.addEventListener("input", () => {
    const termo = campoBusca.value.trim().toLocaleLowerCase("pt-BR");

    sugestoes.replaceChildren();

    if (!termo) return;

    const resultados = nomesProdutos.filter((nome) =>
    nome.toLocaleLowerCase("pt-BR").includes(termo)
);

resultados.forEach((nome) => {
    const opcao = document.createElement("button");
    opcao.type = "button";
    opcao.textContent = nome;

    opcao.addEventListener("click", () => {
      window.location.href = paginasProdutos[nome];
    });

    sugestoes.appendChild(opcao);
   });
});

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const termo = campoBusca.value.trim().toLocaleLowerCase("pt-BR");

  const produto = nomesProdutos.find(nome =>
    nome.toLocaleLowerCase("pt-BR") === termo
  );

  if (produto) {
    window.location.href = paginasProdutos[produto];
  }
});