document.addEventListener("DOMContentLoaded", function () {

    selecionarCategoria("seion");

    // Aplica visualmente a seleção ao botão principal
    document.getElementById("btnHiragana").classList.add("botao-selecionado");
});

// Mapeamento direto para cada sigilo (1  a 32)
const mapeamentoSeions = [
    { kana: "あ", romaji: "a" },     { kana: "か", romaji: "ka" },    { kana: "さ", romaji: "sa" },     { kana: "た", romaji: "ta" },
    { kana: "い", romaji: "i" },     { kana: "き", romaji: "ki" },    { kana: "し", romaji: "shi" },    { kana: "ち", romaji: "chi" },
    { kana: "う", romaji: "u" },     { kana: "く", romaji: "ku" },    { kana: "す", romaji: "su" },     { kana: "つ", romaji: "tsu" },
    { kana: "え", romaji: "e" },     { kana: "け", romaji: "ke" },    { kana: "せ", romaji: "se" },     { kana: "て", romaji: "te" },
    { kana: "お", romaji: "o" },     { kana: "こ", romaji: "ko" },    { kana: "そ", romaji: "so" },     { kana: "と", romaji: "to" },
    
    { kana: "な", romaji: "na" },    { kana: "は", romaji: "ha" },    { kana: "ま", romaji: "ma" },     { kana: "や", romaji: "ya" },
    { kana: "に", romaji: "ni" },    { kana: "ひ", romaji: "hi" },    { kana: "み", romaji: "mi" },     { kana: "ゆ", romaji: "yu" },
    { kana: "ぬ", romaji: "nu" },    { kana: "ふ", romaji: "fu" },    { kana: "む", romaji: "mu" },     { kana: "よ", romaji: "yo" }, 
    { kana: "ね", romaji: "ne" },    { kana: "へ", romaji: "he" },    { kana: "め", romaji: "me" },
    { kana: "の", romaji: "no" },    { kana: "ほ", romaji: "ho" },    { kana: "も", romaji: "mo" },
    
    { kana: "ら", romaji: "ra" },    { kana: "わ", romaji: "wa" },
    { kana: "り", romaji: "ri" },    { kana: "を", romaji: "wo" },
    { kana: "る", romaji: "ru" },    { kana: "ん", romaji: "n" },
    { kana: "れ", romaji: "re" },
    { kana: "ろ", romaji: "ro" },
];

const mapeamentoDaHandakutens = [
    { kana: "が", romaji: "ga" },    { kana: "ざ", romaji: "za" },    { kana: "だ", romaji: "da" },
    { kana: "ぎ", romaji: "gi" },    { kana: "じ", romaji: "ji" },    { kana: "ぢ", romaji: "ji" },
    { kana: "ぐ", romaji: "gu" },    { kana: "ず", romaji: "zu" },    { kana: "づ", romaji: "zu" },
    { kana: "げ", romaji: "ge" },    { kana: "ぜ", romaji: "ze" },    { kana: "で", romaji: "de" },
    { kana: "ご", romaji: "go" },    { kana: "ぞ", romaji: "zo" },    { kana: "ど", romaji: "do" },
    
    { kana: "ば", romaji: "ba" },    { kana: "ぱ", romaji: "pa" },
    { kana: "び", romaji: "bi" },    { kana: "ぴ", romaji: "pi" },
    { kana: "ぶ", romaji: "bu" },    { kana: "ぷ", romaji: "pu" },
    { kana: "べ", romaji: "be" },    { kana: "ぺ", romaji: "pe" },
    { kana: "ぼ", romaji: "bo" },    { kana: "ぽ", romaji: "po" },
];

const mapeamentoYoons = [
    { kana: "きや", romaji: "kya" },    { kana: "ぎや", romaji: "gya" },    { kana: "しや", romaji: "sha" },    { kana: "じや", romaji: "ja" },
    { kana: "きゆ", romaji: "kyu" },    { kana: "ぎゆ", romaji: "gyu" },    { kana: "しゆ", romaji: "shu" },    { kana: "じゆ", romaji: "ju" },
    { kana: "きよ", romaji: "kyo" },    { kana: "ぎよ", romaji: "gyo" },    { kana: "しよ", romaji: "sho" },    { kana: "じよ", romaji: "jo" },

    { kana: "ちや", romaji: "cha" },    { kana: "にや", romaji: "nya" },    { kana: "ひや", romaji: "hya" },    { kana: "びや", romaji: "bya" },
    { kana: "ちゆ", romaji: "chu" },    { kana: "にゆ", romaji: "nyu" },    { kana: "ひゆ", romaji: "hyu" },    { kana: "びゆ", romaji: "byu" },
    { kana: "ちよ", romaji: "cho" },    { kana: "によ", romaji: "nyo" },    { kana: "ひよ", romaji: "hyo" },    { kana: "びよ", romaji: "byo" },

    { kana: "ぴや", romaji: "pya" },    { kana: "みや", romaji: "mya" },    { kana: "りや", romaji: "rya" },
    { kana: "ぴゆ", romaji: "pyu" },    { kana: "みゆ", romaji: "myu" },    { kana: "りゆ", romaji: "ryu" },
    { kana: "ぴよ", romaji: "pyo" },    { kana: "みよ", romaji: "myo" },    { kana: "りよ", romaji: "ryo" },
];

// Estado global da categoria ativa
let letraEsperada = "";

let categoriaAtual = mapeamentoSeions;
const hiraganasRecentes = [];

function selecionarCategoria(tipo) {
    if (somAtivo) tocarSom(somConfig);

    switch (tipo) {
        case "completo":
            categoriaAtual = [...mapeamentoSeions, ...mapeamentoDaHandakutens, ...mapeamentoYoons];
            break;
        case "seion":
        case "hiragana": // alias para seion
            categoriaAtual = mapeamentoSeions;
            break;
        case "dakuon":
            categoriaAtual = mapeamentoDaHandakutens;
            break;
        case "yoon":
            categoriaAtual = mapeamentoYoons;
            break;
    }

    //limpar o vetor hiraganasRecentes!
    carregarHiragana();
}

// Sons
const somConfig = new Audio('sons/config.mp3');
const somCorreto = new Audio('sons/correto.mp3');
const somIncorreto = new Audio('sons/incorreto.mp3');

const somMenuAbrir = new Audio('sons/menuAbrir.mp3');
const somMenuFechar = new Audio('sons/menuFechar.mp3');

function tocarSom(som) {
    som.pause();   // Pausa o som caso ainda esteja tocando
    som.currentTime = 0;  // Reinicia o áudio
    som.play();  // Reproduz o som
}

// Variável para controlar o estado do som (ativo ou mudo)
let somAtivo = true;

// Referências aos elementos do DOM
const sigiloAleatorio = document.getElementById("sigiloAleatorio");
const inputElement = document.querySelector('input[type="text"]');

const iconeVolume = document.getElementById("iconeVolume");
const controleVolume = document.getElementById("controleVolume");

const iconeAnimacao = document.getElementById("iconeAnimacao");
const controleAnimacao = document.getElementById("controleAnimacao");

// Função para carregar novo sigilo
function carregarHiragana() {
    let indice;
    let hiragana;

    // Garante que o hiragana escolhido não está entre os 14 mais recentes
    do {
        indice = Math.floor(Math.random() * categoriaAtual.length);
        hiragana = categoriaAtual[indice];
    } while (hiraganasRecentes.includes(hiragana.kana));

    hiraganasRecentes.unshift(hiragana.kana);
    if (hiraganasRecentes.length > 15) {
        hiraganasRecentes.pop();
    }

    letraEsperada = hiragana.romaji;

    sigiloAleatorio.textContent = hiragana.kana;
    // Verifica se o kana é Yoon (possui 2 caracteres)
    const ehYoon = hiragana.kana.length >= 2;

    sigiloAleatorio.className = "sigilo"; // Reseta classes anteriores
    if (ehYoon) {
      sigiloAleatorio.classList.add("sigilo-yoon");
    }

    document.body.classList.remove("hidden");
}

// Função para verificar a resposta
function verificarResposta() {
    const resposta = inputElement.value.trim().toLowerCase();

    if (resposta === letraEsperada) {
        if (somAtivo) tocarSom(somCorreto);
        sigiloAleatorio.classList.add("brilho");
        sigiloAleatorio.classList.add("sigilo-correto");

        adicionarResposta(letraEsperada);
        
        setTimeout(carregarHiragana, 1000);
    } else {
        if (somAtivo) tocarSom(somIncorreto);

        // Reinicia a animação do tilt
        sigiloAleatorio.classList.remove("sigilo-incorreto"); 
        void sigiloAleatorio.offsetWidth; // Força o reflow do elemento
        sigiloAleatorio.classList.add("sigilo-incorreto");

        // Garante que a cor volte ao normal após a animação
        setTimeout(() => {
            sigiloAleatorio.classList.remove("sigilo-incorreto");
        }, 500); // Deve ser um pouco maior que o tempo da animação CSS (0.2s * 3 loops)
    }

    inputElement.value = "";
}

// Alterna entre som ativo e mudo ao clicar no ícone
controleVolume.addEventListener("click", function () {
    if (!somAtivo) tocarSom(somConfig);
    somAtivo = !somAtivo;
    iconeVolume.src = somAtivo ? "imagens/volumeOn.png" : "imagens/volumeOff.png";
});

controleAnimacao.addEventListener("click", function () {
    animationActive = !animationActive;

    const canvas = document.getElementById("background-canvas");
    const btnToggle = document.getElementById("togglePetals");

    // Alternar visibilidade do canvas
    canvas.style.display = animationActive ? "block" : "none";

    // Atualizar botão (opcional)
    if (btnToggle) {
        btnToggle.textContent = animationActive ? "Desativar pétalas" : "Ativar pétalas";
    }

    // Atualizar ícone
    iconeAnimacao.src = animationActive
        ? "imagens/animacaoOn.png"
        : "imagens/animacaoOff.png";

    // Controlar movimento dos galhos
    const galhos = [
        document.getElementById("galho1"),
        document.getElementById("galho2"),
        document.getElementById("galho3"),
        document.getElementById("galho4"),
        document.getElementById("galho5"),
    ];

    galhos.forEach(galho => {
        if (animationActive) {
            galho.classList.remove("pausar-vento");
        } else {
            galho.classList.add("pausar-vento");
        }
    });

    if (somAtivo) tocarSom(somConfig);
});

// Adiciona o evento "Enter" para verificar a resposta
inputElement.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        verificarResposta();
    }
});

function adicionarResposta(letraEsperada){}



const app = new PIXI.Application({
      view: document.getElementById("background-canvas"),
      resizeTo: window,
      transparent: true
    });

    let animationActive = true;

    const petals = [];
    const numPetals = 35;
    const colors = [0xffa6c9, 0xffc0cb, 0xffb6d5];

    function createPetal() {
      const petal = new PIXI.Graphics();
      petal.beginFill(colors[Math.floor(Math.random() * colors.length)]);
      petal.drawEllipse(0, 0, 8, 12);
      petal.endFill();

      petal.x = Math.random() * window.innerWidth;
      petal.y = Math.random() * -window.innerHeight;
      petal.rotation = Math.random() * Math.PI * 2;

      app.stage.addChild(petal);

      petals.push({
        sprite: petal,
        speed: 1 + Math.random() * 1.5,
        rotationSpeed: (Math.random() - 0.5) * 0.05
      });
    }

    for (let i = 0; i < numPetals; i++) {
      createPetal();
    }

    app.ticker.add(() => {
      if (!animationActive) return;

      petals.forEach((p) => {
        p.sprite.y += p.speed;
        p.sprite.x += Math.sin(p.sprite.y * 0.01);
        p.sprite.rotation += p.rotationSpeed;

        if (p.sprite.y > window.innerHeight) {
          p.sprite.y = Math.random() * -50;
          p.sprite.x = Math.random() * window.innerWidth;
        }
      });
    });

    window.addEventListener("resize", () => {
      app.renderer.resize(window.innerWidth, window.innerHeight);
    });

    function toggleAnimation() {
      animationActive = !animationActive;

      const canvas = document.getElementById("background-canvas");
      const btn = document.getElementById("togglePetals");

      if (animationActive) {
        canvas.style.display = "block";
        btn.textContent = "Desativar pétalas";
      } else {
        canvas.style.display = "none";
        btn.textContent = "Ativar pétalas";
      }
    }


const btnHiragana = document.getElementById("btnHiragana");

btnHiragana.addEventListener("click", function () {
  let menu = document.getElementById("menuAnimado");

  if (!menu) {
    menu = document.createElement("div");
    menu.id = "menuAnimado";
    document.body.appendChild(menu);

    menu.innerHTML = `
      <button class="menu-kana" data-tipo="completo">ゆ<br><span>Completo</span></button>
      <button class="menu-kana" data-tipo="seion" id="btnBasicos">あ<br><span>Seion</span></button>
      <button class="menu-kana" data-tipo="dakuon">ぜ<br><span>Dakuon / Handakuon</span></button>
      <button class="menu-kana" data-tipo="yoon">ぴや<br><span>Yōon</span></button>
    `;

    // Detecta qual é a categoria atual e aplica a classe ao botão correspondente
    let categoriaAtiva = "seion";
    if (categoriaAtual.length === mapeamentoDaHandakutens.length) categoriaAtiva = "dakuon";
    else if (categoriaAtual.length === mapeamentoYoons.length) categoriaAtiva = "yoon";
    else if (categoriaAtual.length > mapeamentoSeions.length + 10) categoriaAtiva = "completo";

    menu.querySelectorAll(".menu-kana").forEach(btn => {
      if (btn.getAttribute("data-tipo") === categoriaAtiva) {
        btn.classList.add("categoria-selecionada");
      }
    });

    document.getElementById("btnHiragana").classList.add("botao-selecionado");

    // Após o menu ser montado:
    menu.querySelectorAll("button").forEach((botao) => {
        botao.addEventListener("click", () => {
            if (somAtivo) somConfig.play();

            const tipo = botao.getAttribute("data-tipo");

            selecionarCategoria(tipo); // Reaproveita sua função

            // Atualiza a seleção visual
            menu.querySelectorAll("button").forEach(b => b.classList.remove("categoria-selecionada"));
            botao.classList.add("categoria-selecionada");

            // Fecha o menu animadamente
            menu.classList.remove("aberto");
            menu.classList.add("fechado");

            setTimeout(() => {
                menu.remove();
            }, 500);
        });
    });
    
    if (somAtivo) somMenuAbrir.play();

    void menu.offsetWidth; // Reflow for animation
    menu.classList.add("aberto");
    return;
  }

  if (menu.classList.contains("aberto")) {
    if (somAtivo) somMenuFechar.play();
    menu.classList.remove("aberto");
    menu.classList.add("fechado");

    setTimeout(() => {
      menu.remove();
    }, 500);
  } else {
    menu.classList.remove("fechado");
    void menu.offsetWidth;
    menu.classList.add("aberto");
  }
});

document.addEventListener("click", function (event) {
  const menu = document.getElementById("menuAnimado");
  const botao = document.getElementById("btnHiragana");

  if (
    menu &&
    menu.classList.contains("aberto") &&
    !menu.contains(event.target) &&
    event.target !== botao
  ) {
    if (somAtivo) somMenuFechar.play();
    menu.classList.remove("aberto");
    menu.classList.add("fechado");

    setTimeout(() => {
      menu.remove();
    }, 500);
  }
});


