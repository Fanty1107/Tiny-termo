const bancoDePalavras = [
    "BRASIL", "CIDADE", "MUSICA", "VIAGEM", "PAIXAO", 
    "FUTURO", "ANIMAL", "ESPACO", "ESTUDO", "CODIGO"
];

const palavraSecreta = bancoDePalavras[Math.floor(Math.random() * bancoDePalavras.length)];

const maxTentativas = 6;
let tentativaAtual = 0;

const grid = document.getElementById("grid");
const inputPalpite = document.getElementById("inputPalpite");
const btnTentar = document.getElementById("btnTentar");
const mensagem = document.getElementById("mensagem");

for (let i = 0; i < maxTentativas; i++) {
    const linha = document.createElement("div");
    linha.className = "linha";
    for (let j = 0; j < 6; j++) {
        const celula = document.createElement("div");
        celula.className = "celula";
        celula.id = `celula-${i}-${j}`;
        linha.appendChild(celula);
    }
    grid.appendChild(linha);
}

function fazerPalpite() {
    if (tentativaAtual >= maxTentativas) return;

    const palpite = inputPalpite.value.toUpperCase();

    if (palpite.length !== 6) {
        mensagem.textContent = "A palavra deve ter exatamente 6 letras!";
        mensagem.style.color = "#e6cc80"; 
        return;
    }
    
    mensagem.textContent = ""; 
    
    let letrasSecretas = palavraSecreta.split("");
    let letrasPalpite = palpite.split("");
    
    let statusLetras = Array(6).fill("ausente"); 

    for (let i = 0; i < 6; i++) {
        if (letrasPalpite[i] === letrasSecretas[i]) {
            statusLetras[i] = "correta";
            letrasSecretas[i] = null; 
        }
    }

    for (let i = 0; i < 6; i++) {
        if (statusLetras[i] === "correta") continue; 
        
        const indexLetraPresente = letrasSecretas.indexOf(letrasPalpite[i]);
        if (indexLetraPresente !== -1) {
            statusLetras[i] = "presente";
            letrasSecretas[indexLetraPresente] = null; 
        }
    }

    for (let i = 0; i < 6; i++) {
        const celula = document.getElementById(`celula-${tentativaAtual}-${i}`);
        celula.textContent = letrasPalpite[i];
        celula.classList.add(statusLetras[i]);
    }

    if (palpite === palavraSecreta) {
        mensagem.textContent = "Você venceu! Parabéns!";
        mensagem.style.color = "var(--cor-correta)";
        finalizarJogo();
    } else {
        tentativaAtual++;
        if (tentativaAtual === maxTentativas) {
            mensagem.textContent = `Fim de jogo! A palavra era ${palavraSecreta}.`;
            mensagem.style.color = "red";
            finalizarJogo();
        }
    }

    inputPalpite.value = "";
    inputPalpite.focus();
}

function finalizarJogo() {
    inputPalpite.disabled = true;
    btnTentar.disabled = true;
}

inputPalpite.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        fazerPalpite();
    }
});
