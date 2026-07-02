const perguntas = [
    { q: "Quem venceu a primeira Copa do Mundo?", opcoes: ["Brasil", "Uruguai", "Argentina", "Alemanha"], correta: 1 },
    { q: "Quantas vezes o Brasil foi campeão Mundial de Vôlei?", opcoes: ["3 vezes", "1 vez", "10 vezes", "6 vezes"], correta: 0 },
    { q: "Qual o estado Brasileiro que faz fronteira com mais estados do Brasil?", opcoes: ["São Paulo", "Minas Gerais", "Rio de Janeiro", "Bahia"], correta: 3 },
    { q: "Qual é o maior planeta do Sistema Solar?", opcoes: ["Terra", "Saturno", "Júpiter", "Marte"], correta: 2 },
    { q: "Qual é a capital da Austrália?", opcoes: ["Sydney", "Melbourne", "Canberra", "Perth"], correta: 2 },
    { q: "Qual elemento químico possui o símbolo 'Au'?", opcoes: ["Prata", "Ouro", "Alumínio", "Argônio"], correta: 1 },
    { q: "Em que ano o homem pisou na Lua pela primeira vez?", opcoes: ["1965", "1967", "1969", "1971"], correta: 2 },
    { q: "Quantos continentes existem na Terra considerando o modelo mais utilizado no Brasil?", opcoes: ["5", "6", "7", "8"], correta: 1 },
    { q: "Qual é o animal terrestre mais rápido do mundo?", opcoes: ["Leão", "Cavalo", "Guepardo", "Antílope"], correta: 2 },
    { q: "Qual destes países faz parte da América do Sul?", opcoes: ["México", "Panamá", "Uruguai", "Costa Rica"], correta: 2 }
];

let indiceAtual = 0;
let pontos = 0;

function resetarEstado() {
    const botoes = document.getElementById("botoesOpcoes");
    botoes.innerHTML = "";
    document.getElementById("btnProximo").disabled = true;
    document.getElementById("resultado").innerText = "";
}

function carregaPergunta() {
    resetarEstado();
    const perguntaAtual = perguntas[indiceAtual];
    document.getElementById("pergunta").innerText = perguntaAtual.q;

    perguntaAtual.opcoes.forEach((texto, indice) => {
        const botao = document.createElement("button");
        botao.innerText = texto;
        botao.className = "opcao";
        botao.onclick = () => selecionarOpcao(indice);
        document.getElementById("botoesOpcoes").appendChild(botao);
    });
}

function selecionarOpcao(indice) {
    const perguntaAtual = perguntas[indiceAtual];
    const resultado = document.getElementById("resultado");

    if (indice === perguntaAtual.correta) {
        pontos++;
        resultado.innerText = "Correto!";
    } else {
        resultado.innerText = `Errado! A resposta certa é: ${perguntaAtual.opcoes[perguntaAtual.correta]}`;
    }

    document.querySelectorAll(".opcao").forEach((botao) => {
        botao.disabled = true;
    });

    document.getElementById("btnProximo").disabled = false;
}

function getClassificacao(pontos, total) {
    const percentual = (pontos / total) * 100;
    if (percentual >= 70) {
        return "inteligente";
    }
    if (percentual >= 40) {
        return "mediana";
    }
    return "burra";
}

function proximaPergunta() {
    indiceAtual++;

    if (indiceAtual < perguntas.length) {
        carregaPergunta();
    } else {
        const classificacao = getClassificacao(pontos, perguntas.length);
        document.getElementById("pergunta").innerText = "Quiz finalizado!";
        document.getElementById("botoesOpcoes").innerHTML = "";
        document.getElementById("resultado").innerText = `Você acertou ${pontos} de ${perguntas.length} perguntas. Você é ${classificacao}!`;
        document.getElementById("btnProximo").disabled = true;
    }
}

document.addEventListener("DOMContentLoaded", carregaPergunta);