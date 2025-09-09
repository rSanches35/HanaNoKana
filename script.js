document.addEventListener("DOMContentLoaded", function () {

    // Muda para modo Hiragana por padrão
    tipoAtual = "hiragana";

    selecionarCategoria("seion");

    // Aplica visualmente a seleção ao botão principal
    document.getElementById("btnHiragana").classList.add("botao-selecionado");
    
    // Aplicar seleção inicial no mobile após um pequeno delay
    setTimeout(() => {
        atualizarSelecaoMobile("seion");
    }, 100);
});

// Mapeamento direto para cada sigilo (1  a 32)
const mapeamentoHiraganaSeions = [
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
    { kana: "り", romaji: "ri" },    { kana: "を", romaji: "o" },
    { kana: "る", romaji: "ru" },    { kana: "ん", romaji: "n" },
    { kana: "れ", romaji: "re" },
    { kana: "ろ", romaji: "ro" },
];

const mapeamentoHiraganaHanDakutens = [
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

const mapeamentoHiraganaYoons = [
    { kana: "きゃ", romaji: "kya" },    { kana: "ぎゃ", romaji: "gya" },    { kana: "しゃ", romaji: "sha" },    { kana: "じゃ", romaji: "ja" },
    { kana: "きゅ", romaji: "kyu" },    { kana: "ぎゅ", romaji: "gyu" },    { kana: "しゅ", romaji: "shu" },    { kana: "じゅ", romaji: "ju" },
    { kana: "きょ", romaji: "kyo" },    { kana: "ぎょ", romaji: "gyo" },    { kana: "しょ", romaji: "sho" },    { kana: "じょ", romaji: "jo" },

    { kana: "ちゃ", romaji: "cha" },    { kana: "にゃ", romaji: "nya" },    { kana: "ひゃ", romaji: "hya" },    { kana: "びゃ", romaji: "bya" },
    { kana: "ちゅ", romaji: "chu" },    { kana: "にゅ", romaji: "nyu" },    { kana: "ひゅ", romaji: "hyu" },    { kana: "びゅ", romaji: "byu" },
    { kana: "ちょ", romaji: "cho" },    { kana: "にょ", romaji: "nyo" },    { kana: "ひょ", romaji: "hyo" },    { kana: "びょ", romaji: "byo" },

    { kana: "ぴゃ", romaji: "pya" },    { kana: "みゃ", romaji: "mya" },    { kana: "りゃ", romaji: "rya" },
    { kana: "ぴゅ", romaji: "pyu" },    { kana: "みゅ", romaji: "myu" },    { kana: "りゅ", romaji: "ryu" },
    { kana: "ぴょ", romaji: "pyo" },    { kana: "みょ", romaji: "myo" },    { kana: "りょ", romaji: "ryo" },
];

// Mapeamentos de Katakana
const mapeamentoKatakanaSeions = [
    { kana: "ア", romaji: "a" },     { kana: "カ", romaji: "ka" },    { kana: "サ", romaji: "sa" },     { kana: "タ", romaji: "ta" },
    { kana: "イ", romaji: "i" },     { kana: "キ", romaji: "ki" },    { kana: "シ", romaji: "shi" },    { kana: "チ", romaji: "chi" },
    { kana: "ウ", romaji: "u" },     { kana: "ク", romaji: "ku" },    { kana: "ス", romaji: "su" },     { kana: "ツ", romaji: "tsu" },
    { kana: "エ", romaji: "e" },     { kana: "ケ", romaji: "ke" },    { kana: "セ", romaji: "se" },     { kana: "テ", romaji: "te" },
    { kana: "オ", romaji: "o" },     { kana: "コ", romaji: "ko" },    { kana: "ソ", romaji: "so" },     { kana: "ト", romaji: "to" },
    
    { kana: "ナ", romaji: "na" },    { kana: "ハ", romaji: "ha" },    { kana: "マ", romaji: "ma" },     { kana: "ヤ", romaji: "ya" },
    { kana: "ニ", romaji: "ni" },    { kana: "ヒ", romaji: "hi" },    { kana: "ミ", romaji: "mi" },     { kana: "ユ", romaji: "yu" },
    { kana: "ヌ", romaji: "nu" },    { kana: "フ", romaji: "fu" },    { kana: "ム", romaji: "mu" },     { kana: "ヨ", romaji: "yo" }, 
    { kana: "ネ", romaji: "ne" },    { kana: "ヘ", romaji: "he" },    { kana: "メ", romaji: "me" },
    { kana: "ノ", romaji: "no" },    { kana: "ホ", romaji: "ho" },    { kana: "モ", romaji: "mo" },
    
    { kana: "ラ", romaji: "ra" },    { kana: "ワ", romaji: "wa" },
    { kana: "リ", romaji: "ri" },    { kana: "ヲ", romaji: "wo" },
    { kana: "ル", romaji: "ru" },    { kana: "ン", romaji: "n" },
    { kana: "レ", romaji: "re" },
    { kana: "ロ", romaji: "ro" },
];

const mapeamentoKatakanaHanDakutens = [
    { kana: "ガ", romaji: "ga" },    { kana: "ザ", romaji: "za" },    { kana: "ダ", romaji: "da" },
    { kana: "ギ", romaji: "gi" },    { kana: "ジ", romaji: "ji" },    { kana: "ヂ", romaji: "ji" },
    { kana: "グ", romaji: "gu" },    { kana: "ズ", romaji: "zu" },    { kana: "ヅ", romaji: "zu" },
    { kana: "ゲ", romaji: "ge" },    { kana: "ゼ", romaji: "ze" },    { kana: "デ", romaji: "de" },
    { kana: "ゴ", romaji: "go" },    { kana: "ゾ", romaji: "zo" },    { kana: "ド", romaji: "do" },
    
    { kana: "バ", romaji: "ba" },    { kana: "パ", romaji: "pa" },
    { kana: "ビ", romaji: "bi" },    { kana: "ピ", romaji: "pi" },
    { kana: "ブ", romaji: "bu" },    { kana: "プ", romaji: "pu" },
    { kana: "ベ", romaji: "be" },    { kana: "ペ", romaji: "pe" },
    { kana: "ボ", romaji: "bo" },    { kana: "ポ", romaji: "po" },
];

const mapeamentoKatakanaYoons = [
    { kana: "キャ", romaji: "kya" },    { kana: "ギャ", romaji: "gya" },    { kana: "シャ", romaji: "sha" },    { kana: "ジャ", romaji: "ja" },
    { kana: "キュ", romaji: "kyu" },    { kana: "ギュ", romaji: "gyu" },    { kana: "シュ", romaji: "shu" },    { kana: "ジュ", romaji: "ju" },
    { kana: "キョ", romaji: "kyo" },    { kana: "ギョ", romaji: "gyo" },    { kana: "ショ", romaji: "sho" },    { kana: "ジョ", romaji: "jo" },

    { kana: "チャ", romaji: "cha" },    { kana: "ニャ", romaji: "nya" },    { kana: "ヒャ", romaji: "hya" },    { kana: "ビャ", romaji: "bya" },
    { kana: "チュ", romaji: "chu" },    { kana: "ニュ", romaji: "nyu" },    { kana: "ヒュ", romaji: "hyu" },    { kana: "ビュ", romaji: "byu" },
    { kana: "チョ", romaji: "cho" },    { kana: "ニョ", romaji: "nyo" },    { kana: "ヒョ", romaji: "hyo" },    { kana: "ビョ", romaji: "byo" },

    { kana: "ピャ", romaji: "pya" },    { kana: "ミャ", romaji: "mya" },    { kana: "リャ", romaji: "rya" },
    { kana: "ピュ", romaji: "pyu" },    { kana: "ミュ", romaji: "myu" },    { kana: "リュ", romaji: "ryu" },
    { kana: "ピョ", romaji: "pyo" },    { kana: "ミョ", romaji: "myo" },    { kana: "リョ", romaji: "ryo" },
];

// Estado global da categoria ativa
let letraEsperada = "";
let tipoAtual = "hiragana"; // "hiragana" ou "katakana"
let selecaoAtual = { tipo: "hiragana", categoria: "seion" }; // Seleção atual para o desktop

let categoriaAtual = mapeamentoHiraganaSeions;
const caracteresRecentes = [];

function selecionarCategoria(tipo) {
    if (somAtivo) tocarSom(somConfig);

    // Determina os mapeamentos baseado no tipo atual (hiragana ou katakana)
    let seion, dakuon, yoon;
    
    if (tipoAtual === "katakana") {
        seion = mapeamentoKatakanaSeions;
        dakuon = mapeamentoKatakanaHanDakutens;
        yoon = mapeamentoKatakanaYoons;
    } else {
        seion = mapeamentoHiraganaSeions;
        dakuon = mapeamentoHiraganaHanDakutens;
        yoon = mapeamentoHiraganaYoons;
    }

    switch (tipo) {
        case "completo":
            categoriaAtual = [...seion, ...dakuon, ...yoon];
            break;
        case "seion":
        case "hiragana": // alias para seion
        case "katakana": // alias para seion
            categoriaAtual = seion;
            break;
        case "dakuon":
            categoriaAtual = dakuon;
            break;
        case "yoon":
            categoriaAtual = yoon;
            break;
    }

    //limpar o vetor caracteresRecentes!
    caracteresRecentes.length = 0;
    carregarCaractere();
    
    // Atualizar seleção visual no mobile
    atualizarSelecaoMobile(tipo);
}

// Função para atualizar a seleção visual no mobile
function atualizarSelecaoMobile(categoriaAtiva) {
    // Remover seleção de todos os botões
    document.querySelectorAll('.categoria-btn').forEach(btn => {
        btn.classList.remove('selecionada');
    });
    
    // Marcar apenas a categoria ativa
    const btnAtivo = document.querySelector(`[data-categoria="${categoriaAtiva}"]`);
    if (btnAtivo) {
        btnAtivo.classList.add('selecionada');
    }
    
    // Marcar o botão tipo correspondente (Hiragana/Katakana)
    document.getElementById('btnHiraganaMobile')?.classList.remove('active');
    document.getElementById('btnKatakanaMobile')?.classList.remove('active');
    
    if (tipoAtual === 'hiragana') {
        document.getElementById('btnHiraganaMobile')?.classList.add('active');
    } else {
        document.getElementById('btnKatakanaMobile')?.classList.add('active');
    }
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
function carregarCaractere() {
    let indice;
    let caractere;

    // Garante que o caractere escolhido não está entre os 14 mais recentes
    do {
        indice = Math.floor(Math.random() * categoriaAtual.length);
        caractere = categoriaAtual[indice];
    } while (caracteresRecentes.includes(caractere.kana));

    caracteresRecentes.unshift(caractere.kana);
    if (caracteresRecentes.length > 15) {
        caracteresRecentes.pop();
    }

    letraEsperada = caractere.romaji;

    sigiloAleatorio.textContent = caractere.kana;
    // Verifica se o kana é Yoon (possui 2 caracteres)
    const ehYoon = caractere.kana.length >= 2;

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
        
        setTimeout(carregarCaractere, 1000);
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
  
  // Fecha menu de Katakana silenciosamente se estiver aberto
  const menuKatakana = document.getElementById("menuAnimadoKatakana");
  if (menuKatakana && menuKatakana.classList.contains("aberto")) {
    menuKatakana.classList.remove("aberto");
    menuKatakana.classList.add("fechado");
    setTimeout(() => {
      menuKatakana.remove();
    }, 500);
  }

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

    // Muda para modo Hiragana
    tipoAtual = "hiragana";

    // Aplica seleção visual APENAS se a seleção atual for do Hiragana
    setTimeout(() => {
        if (selecaoAtual.tipo === "hiragana") {
            const botaoAtual = menu.querySelector(`[data-tipo="${selecaoAtual.categoria}"]`);
            if (botaoAtual) {
                botaoAtual.classList.add('categoria-selecionada');
            }
        }
    }, 50);

    // Após o menu ser montado:
    menu.querySelectorAll("button").forEach((botao) => {
        botao.addEventListener("click", () => {
            if (somAtivo) somConfig.play();

            const tipo = botao.getAttribute("data-tipo");

            // Atualiza a seleção global para Hiragana
            selecaoAtual = { tipo: "hiragana", categoria: tipo };

            selecionarCategoria(tipo); // Reaproveita sua função

            // Limpa todas as seleções e aplica apenas no botão clicado
            document.querySelectorAll('.categoria-selecionada').forEach(el => {
                el.classList.remove('categoria-selecionada');
            });
            botao.classList.add('categoria-selecionada');

            // Aplica seleção visual ao botão principal e remove do outro
            document.getElementById("btnKatakana").classList.remove("botao-selecionado");
            document.getElementById("btnHiragana").classList.add("botao-selecionado");

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

const btnKatakana = document.getElementById("btnKatakana");

btnKatakana.addEventListener("click", function () {
  let menu = document.getElementById("menuAnimadoKatakana");
  
  // Fecha menu de Hiragana silenciosamente se estiver aberto
  const menuHiragana = document.getElementById("menuAnimado");
  if (menuHiragana && menuHiragana.classList.contains("aberto")) {
    menuHiragana.classList.remove("aberto");
    menuHiragana.classList.add("fechado");
    setTimeout(() => {
      menuHiragana.remove();
    }, 500);
  }

  if (!menu) {
    menu = document.createElement("div");
    menu.id = "menuAnimadoKatakana";
    document.body.appendChild(menu);

    menu.innerHTML = `
      <button class="menu-kana" data-tipo="completo">ユ<br><span>Completo</span></button>
      <button class="menu-kana" data-tipo="seion" id="btnBasicosKatakana">ア<br><span>Seion</span></button>
      <button class="menu-kana" data-tipo="dakuon">ゼ<br><span>Dakuon / Handakuon</span></button>
      <button class="menu-kana" data-tipo="yoon">ピャ<br><span>Yōon</span></button>
    `;

    // Muda para modo Katakana
    tipoAtual = "katakana";

    // Aplica seleção visual APENAS se a seleção atual for do Katakana
    setTimeout(() => {
        if (selecaoAtual.tipo === "katakana") {
            const botaoAtual = menu.querySelector(`[data-tipo="${selecaoAtual.categoria}"]`);
            if (botaoAtual) {
                botaoAtual.classList.add('categoria-selecionada');
            }
        }
    }, 50);

    // Após o menu ser montado:
    menu.querySelectorAll("button").forEach((botao) => {
        botao.addEventListener("click", () => {
            if (somAtivo) somConfig.play();

            const tipo = botao.getAttribute("data-tipo");

            // Atualiza a seleção global para Katakana
            selecaoAtual = { tipo: "katakana", categoria: tipo };

            selecionarCategoria(tipo); // Reaproveita sua função

            // Limpa todas as seleções e aplica apenas no botão clicado
            document.querySelectorAll('.categoria-selecionada').forEach(el => {
                el.classList.remove('categoria-selecionada');
            });
            botao.classList.add('categoria-selecionada');

            // Aplica seleção visual ao botão principal e remove do outro
            document.getElementById("btnHiragana").classList.remove("botao-selecionado");
            document.getElementById("btnKatakana").classList.add("botao-selecionado");

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
  const menuHiragana = document.getElementById("menuAnimado");
  const menuKatakana = document.getElementById("menuAnimadoKatakana");
  const botaoHiragana = document.getElementById("btnHiragana");
  const botaoKatakana = document.getElementById("btnKatakana");

  // Fecha menu Hiragana se clicado fora
  if (
    menuHiragana &&
    menuHiragana.classList.contains("aberto") &&
    !menuHiragana.contains(event.target) &&
    event.target !== botaoHiragana
  ) {
    if (somAtivo) somMenuFechar.play();
    menuHiragana.classList.remove("aberto");
    menuHiragana.classList.add("fechado");

    setTimeout(() => {
      menuHiragana.remove();
    }, 500);
  }

  // Fecha menu Katakana se clicado fora
  if (
    menuKatakana &&
    menuKatakana.classList.contains("aberto") &&
    !menuKatakana.contains(event.target) &&
    event.target !== botaoKatakana
  ) {
    if (somAtivo) somMenuFechar.play();
    menuKatakana.classList.remove("aberto");
    menuKatakana.classList.add("fechado");

    setTimeout(() => {
      menuKatakana.remove();
    }, 500);
  }
});

// Menu Mobile
document.addEventListener("DOMContentLoaded", function() {
    const botaoHamburger = document.getElementById('botaoHamburger');
    const menuMobile = document.getElementById('menuMobile');
    const bordaCirculo = document.getElementById('bordaCirculo');
    const backgroundFechamento = document.getElementById('backgroundFechamento');
    const btnHiraganaMobile = document.getElementById('btnHiraganaMobile');
    const btnKatakanaMobile = document.getElementById('btnKatakanaMobile');
    const categoriaBtns = document.querySelectorAll('.categoria-btn');
    
    // Função para garantir bloqueio de scroll no mobile
    function garantirBloqueioScroll() {
        if (window.innerWidth <= 768) {
            // Aplicar no HTML
            document.documentElement.style.overflow = 'hidden';
            document.documentElement.style.overflowX = 'hidden';
            document.documentElement.style.overflowY = 'hidden';
            document.documentElement.style.position = 'fixed';
            document.documentElement.style.width = '100%';
            document.documentElement.style.height = '100%';
            document.documentElement.style.maxWidth = '100%';
            document.documentElement.style.maxHeight = '100%';
            
            // Aplicar no BODY
            document.body.style.overflow = 'hidden';
            document.body.style.overflowX = 'hidden';
            document.body.style.overflowY = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.height = '100%';
            document.body.style.maxWidth = '100%';
            document.body.style.maxHeight = '100%';
            document.body.style.touchAction = 'none';
            document.body.style.userSelect = 'none';
            
            // Ocultar completamente elementos problemáticos
            const configElements = document.querySelectorAll('.config');
            configElements.forEach(el => {
                el.style.display = 'none';
                el.style.visibility = 'hidden';
                el.style.opacity = '0';
                el.style.pointerEvents = 'none';
            });
        }
    }
    
    // Aplicar bloqueio ao carregar e sempre que redimensionar
    garantirBloqueioScroll();
    window.addEventListener('resize', garantirBloqueioScroll);
    
    // Event listeners adicionais para prevenir scroll
    if (window.innerWidth <= 768) {
        // Prevenir scroll através de eventos
        document.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, { passive: false });
        
        document.addEventListener('wheel', function(e) {
            e.preventDefault();
        }, { passive: false });
        
        document.addEventListener('scroll', function(e) {
            e.preventDefault();
            window.scrollTo(0, 0);
        }, { passive: false });
        
        // Força a posição sempre no topo
        window.scrollTo(0, 0);
        setInterval(() => {
            if (window.innerWidth <= 768) {
                window.scrollTo(0, 0);
            }
        }, 100);
    }
    
    // Exemplos de kana para cada tipo
    const exemplosHiragana = {
        seion: 'あ',
        dakuon: 'が', 
        yoon: 'きゃ',
        completo: 'ゆ'
    };
    
    const exemplosKatakana = {
        seion: 'ア',
        dakuon: 'ガ',
        yoon: 'キャ', 
        completo: 'ユ'
    };
    
    let tipoSelecionado = 'hiragana';
    
    // Abrir/fechar menu
    botaoHamburger.addEventListener('click', function() {
        if (menuMobile.classList.contains('ativo')) {
            // Fechar menu
            botaoHamburger.classList.remove('ativo'); // Remove X, volta para hamburger
            backgroundFechamento.classList.add('ativo'); // Ativa background temporário
            bordaCirculo.classList.add('fechando');
            bordaCirculo.classList.remove('ativo');
            menuMobile.classList.add('fechando');
            menuMobile.classList.remove('ativo', 'abrindo');
            
            // Remove background quando círculo escuro começar (após 50ms)
            setTimeout(() => {
                backgroundFechamento.classList.remove('ativo');
            }, 50);
            
            setTimeout(() => {
                menuMobile.style.display = 'none';
                menuMobile.classList.remove('fechando');
                bordaCirculo.classList.remove('fechando');
            }, 400);
            
            if (somAtivo) somMenuFechar.play();
        } else {
            // Abrir menu
            botaoHamburger.classList.add('ativo'); // Transforma em X
            menuMobile.style.display = 'flex';
            bordaCirculo.classList.add('ativo');
            setTimeout(() => {
                menuMobile.classList.add('ativo', 'abrindo');
            }, 10);
            
            // Sincronizar menu com o estado atual do sistema
            setTimeout(() => {
                // Verificar qual tipo está ativo no sistema
                tipoSelecionado = tipoAtual;
                
                // Descobrir qual categoria está ativa no sistema
                let categoriaAtiva = '';
                if (categoriaAtual === mapeamentoHiraganaSeions || categoriaAtual === mapeamentoKatakanaSeions) {
                    categoriaAtiva = 'seion';
                } else if (categoriaAtual === mapeamentoHiraganaHanDakutens || categoriaAtual === mapeamentoKatakanaHanDakutens) {
                    categoriaAtiva = 'dakuon';
                } else if (categoriaAtual === mapeamentoHiraganaYoons || categoriaAtual === mapeamentoKatakanaYoons) {
                    categoriaAtiva = 'yoon';
                } else {
                    categoriaAtiva = 'completo';
                }
                
                // Atualizar exemplos e seleção visual
                atualizarExemplos();
                atualizarSelecaoMobile(categoriaAtiva);
            }, 100);
            
            // Remover a borda após a animação (0.65s + 0.0001s delay = ~0.65s)
            setTimeout(() => {
                bordaCirculo.classList.remove('ativo');
            }, 650);
            
            if (somAtivo) somMenuAbrir.play();
        }
    });
    
    // Fechar menu ao clicar fora
    menuMobile.addEventListener('click', function(e) {
        if (e.target === menuMobile) {
            botaoHamburger.classList.remove('ativo'); // Remove X, volta para hamburger
            backgroundFechamento.classList.add('ativo'); // Ativa background temporário
            bordaCirculo.classList.add('fechando');
            bordaCirculo.classList.remove('ativo');
            menuMobile.classList.add('fechando');
            menuMobile.classList.remove('ativo', 'abrindo');
            
            // Remove background quando círculo escuro começar (após 50ms)
            setTimeout(() => {
                backgroundFechamento.classList.remove('ativo');
            }, 50);
            
            setTimeout(() => {
                menuMobile.style.display = 'none';
                menuMobile.classList.remove('fechando');
                bordaCirculo.classList.remove('fechando');
            }, 400);
            
            if (somAtivo) somMenuFechar.play();
        }
    });
    
    // Alternar entre Hiragana e Katakana
    btnHiraganaMobile.addEventListener('click', function() {
        tipoSelecionado = 'hiragana';
        atualizarExemplos();
    });
    
    btnKatakanaMobile.addEventListener('click', function() {
        tipoSelecionado = 'katakana';
        atualizarExemplos();
    });
    
    // Atualizar exemplos de kana na grid
    function atualizarExemplos() {
        const exemplos = tipoSelecionado === 'hiragana' ? exemplosHiragana : exemplosKatakana;
        
        document.getElementById('exemploSeion').textContent = exemplos.seion;
        document.getElementById('exemploDakuon').textContent = exemplos.dakuon;
        document.getElementById('exemploYoon').textContent = exemplos.yoon;
        document.getElementById('exemploCompleto').textContent = exemplos.completo;
        
        // Limpar todas as seleções visuais quando o tipo muda
        document.querySelectorAll('.categoria-btn').forEach(btn => {
            btn.classList.remove('selecionada');
        });
        document.getElementById('btnHiraganaMobile')?.classList.remove('active');
        document.getElementById('btnKatakanaMobile')?.classList.remove('active');
    }
    
    // Selecionar categoria
    categoriaBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const categoria = this.dataset.categoria;
            
            // Aplicar seleção (sem fechar menu)
            tipoAtual = tipoSelecionado;
            selecionarCategoria(categoria);
            
            // Atualizar visualização dos botões desktop (se visíveis)
            document.querySelectorAll('.botao').forEach(botao => {
                botao.classList.remove('botao-selecionado');
            });
            
            if (tipoSelecionado === 'hiragana') {
                document.getElementById('btnHiragana').classList.add('botao-selecionado');
            } else {
                document.getElementById('btnKatakana').classList.add('botao-selecionado');
            }
        });
    });
    
    // Sincronizar controles mobile com desktop
    const controleAnimacaoMobile = document.getElementById('controleAnimacaoMobile');
    const controleVolumeMobile = document.getElementById('controleVolumeMobile');
    const iconeAnimacaoMobile = document.getElementById('iconeAnimacaoMobile');
    const iconeVolumeMobile = document.getElementById('iconeVolumeMobile');
    
    controleAnimacaoMobile.addEventListener('click', function() {
        document.getElementById('controleAnimacao').click();
        iconeAnimacaoMobile.src = document.getElementById('iconeAnimacao').src;
    });
    
    controleVolumeMobile.addEventListener('click', function() {
        document.getElementById('controleVolume').click();
        iconeVolumeMobile.src = document.getElementById('iconeVolume').src;
    });
});
