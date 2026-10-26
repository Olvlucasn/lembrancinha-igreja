// ==============================================================
// MOMENTO DEVOCIONAL - conversa estilo WhatsApp com "Jesus digitando"
//
// Tudo acontece no celular da pessoa: nada é enviado para lugar nenhum.
// A conversa some ao sair da página; só os versículos que a pessoa
// escolher guardar ficam salvos no próprio aparelho.
//
// As respostas de Jesus usam somente palavras Dele nos Evangelhos.
// ==============================================================

// Cada sentimento: palavras para reconhecer (sem acento, minúsculas),
// falas de Jesus nos Evangelhos, versículos de apoio e louvores sugeridos.
const SENTIMENTOS = {
  ansiedade: {
    palavras: ["ansios", "ansiedade", "preocup", "nervos", "agonia", "aflit", "aperto no peito", "nao consigo dormir", "insonia", "pensando demais", "medo do que vai", "crise"],
    jesus: [
      ["Não andeis ansiosos pela vossa vida. Olhai as aves do céu: vosso Pai celestial as alimenta. Não valeis vós muito mais do que elas?", "Mateus 6:25-26"],
      ["Deixo-vos a paz, a minha paz vos dou. Não se turbe o vosso coração, nem se atemorize.", "João 14:27"],
      ["Não vos inquieteis pelo dia de amanhã, pois o amanhã trará os seus cuidados. Basta a cada dia o seu mal.", "Mateus 6:34"],
    ],
    versiculos: [
      ["Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.", "1 Pedro 5:7"],
      ["Não andeis ansiosos por coisa alguma; em tudo, porém, sejam conhecidas diante de Deus as vossas petições. E a paz de Deus guardará o vosso coração.", "Filipenses 4:6-7"],
      ["Em paz me deito e logo pego no sono, porque só tu, Senhor, me fazes habitar em segurança.", "Salmos 4:8"],
    ],
    louvores: [["Aquieta Minh'alma", "Ministério Zoe"], ["Lugar Secreto", "Gabriela Rocha"]],
  },
  medo: {
    palavras: ["medo", "assust", "pavor", "receio", "insegur", "apavor", "tenho medo", "com medo"],
    jesus: [
      ["Tende bom ânimo! Sou eu. Não temais.", "Mateus 14:27"],
      ["Não temas, crê somente.", "Marcos 5:36"],
      ["E eis que estou convosco todos os dias, até a consumação dos séculos.", "Mateus 28:20"],
    ],
    versiculos: [
      ["Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te fortaleço, e te ajudo.", "Isaías 41:10"],
      ["O Senhor é a minha luz e a minha salvação; a quem temerei?", "Salmos 27:1"],
      ["Porque Deus não nos deu espírito de covardia, mas de poder, de amor e de moderação.", "2 Timóteo 1:7"],
    ],
    louvores: [["Ousado Amor", "Isaías Saad"], ["Oceanos", "Ana Nóbrega"]],
  },
  tristeza: {
    palavras: ["triste", "tristeza", "chorando", "chorei", "chorar", "choro", "desanim", "pra baixo", "para baixo", "deprimid", "vazio", "sem vontade", "magoad", "machucad", "coracao partido", "decepcion"],
    jesus: [
      ["Bem-aventurados os que choram, porque serão consolados.", "Mateus 5:4"],
      ["Na verdade vos digo que vós chorareis, mas a vossa tristeza se converterá em alegria.", "João 16:20"],
      ["Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.", "Mateus 11:28"],
    ],
    versiculos: [
      ["Perto está o Senhor dos que têm o coração quebrantado.", "Salmos 34:18"],
      ["O choro pode durar uma noite, mas a alegria vem pela manhã.", "Salmos 30:5"],
      ["Ele sara os de coração quebrantado e lhes pensa as feridas.", "Salmos 147:3"],
    ],
    louvores: [["Ressuscita-me", "Aline Barros"], ["Deus Me Ama", "Thalles Roberto"]],
  },
  solidao: {
    palavras: ["sozinh", "solidao", "ninguem me", "abandon", "excluid", "sem amigos", "ninguem liga", "isolad", "esquecid", "nao tenho ninguem"],
    jesus: [
      ["Não vos deixarei órfãos; voltarei para vós.", "João 14:18"],
      ["E eis que estou convosco todos os dias, até a consumação dos séculos.", "Mateus 28:20"],
      ["Já não vos chamo servos, mas tenho-vos chamado amigos.", "João 15:15"],
    ],
    versiculos: [
      ["Ainda que meu pai e minha mãe me desamparem, o Senhor me acolherá.", "Salmos 27:10"],
      ["Há amigo mais chegado do que um irmão.", "Provérbios 18:24"],
      ["Não te deixarei, nem te desampararei.", "Hebreus 13:5"],
    ],
    louvores: [["Ousado Amor", "Isaías Saad"], ["Deus Me Ama", "Thalles Roberto"]],
  },
  culpa: {
    palavras: ["culpa", "culpad", "errei", "pequei", "pecado", "vergonha", "arrependid", "me perdoa", "nao mereco", "fiz coisa errada", "decepcionei"],
    jesus: [
      ["Nem eu tampouco te condeno; vai e não peques mais.", "João 8:11"],
      ["Os sãos não precisam de médico, mas sim os doentes. Eu não vim chamar justos, mas pecadores.", "Marcos 2:17"],
      ["Haverá alegria no céu por um pecador que se arrepende.", "Lucas 15:7"],
    ],
    versiculos: [
      ["Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar e nos purificar de toda injustiça.", "1 João 1:9"],
      ["Agora, pois, já nenhuma condenação há para os que estão em Cristo Jesus.", "Romanos 8:1"],
      ["Se alguém está em Cristo, nova criatura é: as coisas velhas já passaram.", "2 Coríntios 5:17"],
    ],
    louvores: [["Tua Graça Me Basta", "Toque no Altar"], ["Raridade", "Anderson Freire"]],
  },
  cansaco: {
    palavras: ["cansad", "cansaco", "exaust", "esgotad", "sem forca", "nao aguento", "desistir", "pesado", "sobrecarreg", "estressad", "estresse"],
    jesus: [
      ["Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.", "Mateus 11:28"],
      ["Tomai sobre vós o meu jugo e aprendei de mim, que sou manso e humilde de coração, e achareis descanso para a vossa alma.", "Mateus 11:29"],
      ["Vinde vós, à parte, para um lugar deserto, e descansai um pouco.", "Marcos 6:31"],
    ],
    versiculos: [
      ["Os que esperam no Senhor renovarão as suas forças; subirão com asas como águias.", "Isaías 40:31"],
      ["A minha graça te basta, porque o poder se aperfeiçoa na fraqueza.", "2 Coríntios 12:9"],
      ["Tudo posso naquele que me fortalece.", "Filipenses 4:13"],
    ],
    louvores: [["Lugar Secreto", "Gabriela Rocha"], ["Aquieta Minh'alma", "Ministério Zoe"]],
  },
  autoestima: {
    palavras: ["feio", "feia", "nao sou bom", "nao sou boa", "inutil", "nao valho", "me odeio", "rejeitad", "comparo", "insuficiente", "ninguem gosta", "nao sirvo", "fracassad"],
    jesus: [
      ["Não temais; mais valeis vós do que muitos pardais.", "Mateus 10:31"],
      ["Vós sois a luz do mundo.", "Mateus 5:14"],
      ["Não fostes vós que me escolhestes a mim; pelo contrário, eu vos escolhi a vós.", "João 15:16"],
    ],
    versiculos: [
      ["Eu te louvo porque de um modo assombroso e maravilhoso fui feito.", "Salmos 139:14"],
      ["Visto que foste precioso aos meus olhos, digno de honra, e eu te amei.", "Isaías 43:4"],
      ["Antes que te formasse no ventre, eu te conheci.", "Jeremias 1:5"],
    ],
    louvores: [["Raridade", "Anderson Freire"], ["Deus Me Ama", "Thalles Roberto"]],
  },
  familia: {
    palavras: ["briga", "brigando", "brigou", "discuti", "discussao", "meus pais", "minha mae", "meu pai", "familia", "irmao", "irma", "separa", "divorcio", "em casa"],
    jesus: [
      ["Bem-aventurados os pacificadores, porque serão chamados filhos de Deus.", "Mateus 5:9"],
      ["O meu mandamento é este: que vos ameis uns aos outros, assim como eu vos amei.", "João 15:12"],
      ["Deixo-vos a paz, a minha paz vos dou.", "João 14:27"],
    ],
    versiculos: [
      ["Se possível, quanto depender de vós, tende paz com todos os homens.", "Romanos 12:18"],
      ["Sede uns para com os outros benignos, misericordiosos, perdoando-vos uns aos outros.", "Efésios 4:32"],
      ["Eu e a minha casa serviremos ao Senhor.", "Josué 24:15"],
    ],
    louvores: [["Bondade de Deus", "Isaías Saad"], ["Ousado Amor", "Isaías Saad"]],
  },
  raiva: {
    palavras: ["raiva", "odio", "irritad", "nervoso com", "revolt", "injustic", "com raiva", "estou bravo", "estou brava"],
    jesus: [
      ["Amai os vossos inimigos e orai pelos que vos perseguem.", "Mateus 5:44"],
      ["Bem-aventurados os mansos, porque herdarão a terra.", "Mateus 5:5"],
      ["Perdoai, e sereis perdoados.", "Lucas 6:37"],
    ],
    versiculos: [
      ["Irai-vos e não pequeis; não se ponha o sol sobre a vossa ira.", "Efésios 4:26"],
      ["A resposta branda desvia o furor.", "Provérbios 15:1"],
      ["Todo homem seja pronto para ouvir, tardio para falar, tardio para se irar.", "Tiago 1:19"],
    ],
    louvores: [["Aquieta Minh'alma", "Ministério Zoe"], ["Lugar Secreto", "Gabriela Rocha"]],
  },
  futuro: {
    palavras: ["futuro", "decisao", "decidir", "nao sei o que fazer", "escolha", "faculdade", "vestibular", "enem", "emprego", "trabalho", "prova", "duvida", "caminho certo", "proposito"],
    jesus: [
      ["Buscai primeiro o Reino de Deus e a sua justiça, e todas estas coisas vos serão acrescentadas.", "Mateus 6:33"],
      ["Eu sou o caminho, e a verdade, e a vida.", "João 14:6"],
      ["Pedi, e dar-se-vos-á; buscai, e encontrareis; batei, e abrir-se-vos-á.", "Mateus 7:7"],
    ],
    versiculos: [
      ["Porque sou eu que conheço os planos que tenho para vocês, planos de dar a vocês esperança e um futuro.", "Jeremias 29:11"],
      ["Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.", "Provérbios 3:5"],
      ["Instruir-te-ei e te ensinarei o caminho que deves seguir.", "Salmos 32:8"],
    ],
    louvores: [["Algo Novo", "Kemuel"], ["Grandes Coisas", "Fernandinho"]],
  },
  luto: {
    palavras: ["morreu", "faleceu", "falecimento", "luto", "perdi minha", "perdi meu", "saudade", "partiu", "velorio", "doente", "doenca", "hospital", "cancer"],
    jesus: [
      ["Eu sou a ressurreição e a vida. Quem crê em mim, ainda que esteja morto, viverá.", "João 11:25"],
      ["Na casa de meu Pai há muitas moradas. Vou preparar-vos lugar.", "João 14:2"],
      ["Não se turbe o vosso coração; credes em Deus, crede também em mim.", "João 14:1"],
    ],
    versiculos: [
      ["E Deus limpará de seus olhos toda lágrima, e não haverá mais morte, nem pranto, nem clamor, nem dor.", "Apocalipse 21:4"],
      ["Ainda que eu ande pelo vale da sombra da morte, não temerei mal nenhum, porque tu estás comigo.", "Salmos 23:4"],
      ["Perto está o Senhor dos que têm o coração quebrantado.", "Salmos 34:18"],
    ],
    louvores: [["Ressuscita-me", "Aline Barros"], ["Oceanos", "Ana Nóbrega"]],
  },
  gratidao: {
    palavras: ["feliz", "alegr", "grato", "grata", "gratidao", "obrigad", "bencao", "abencoad", "consegui", "passei", "passei na", "passei no", "deu certo", "agradec", "muito bem", "otimo", "maravilh"],
    jesus: [
      ["Tenho-vos dito isto para que a minha alegria permaneça em vós, e a vossa alegria seja completa.", "João 15:11"],
      ["Eu vim para que tenham vida, e a tenham em abundância.", "João 10:10"],
      ["Assim brilhe a vossa luz diante dos homens, para que vejam as vossas boas obras e glorifiquem a vosso Pai.", "Mateus 5:16"],
    ],
    versiculos: [
      ["Este é o dia que o Senhor fez; regozijemo-nos e alegremo-nos nele.", "Salmos 118:24"],
      ["Em tudo dai graças.", "1 Tessalonicenses 5:18"],
      ["Grandes coisas fez o Senhor por nós, e, por isso, estamos alegres.", "Salmos 126:3"],
    ],
    louvores: [["Bondade de Deus", "Isaías Saad"], ["Grandes Coisas", "Fernandinho"]],
  },
  geral: {
    palavras: [],
    jesus: [
      ["Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.", "Mateus 11:28"],
      ["E eis que estou convosco todos os dias, até a consumação dos séculos.", "Mateus 28:20"],
      ["Permanecei em mim, e eu permanecerei em vós.", "João 15:4"],
    ],
    versiculos: [
      ["O Senhor é o meu pastor; nada me faltará.", "Salmos 23:1"],
      ["Entrega o teu caminho ao Senhor, confia nele, e ele tudo fará.", "Salmos 37:5"],
      ["As misericórdias do Senhor se renovam a cada manhã.", "Lamentações 3:22-23"],
    ],
    louvores: [["Lugar Secreto", "Gabriela Rocha"], ["Bondade de Deus", "Isaías Saad"]],
  },
};

// Sinais de que a pessoa pode estar em perigo: a resposta muda para cuidado e ajuda real
const SINAIS_DE_RISCO = ["me matar", "suicid", "quero morrer", "vontade de morrer", "nao quero mais viver", "acabar com a minha vida", "tirar minha vida", "me machucar", "me cortar", "me cortando", "automutil", "sumir pra sempre", "sumir para sempre", "nao aguento mais viver"];
const SINAIS_DE_ABUSO = ["abusou", "abuso", "me bate", "me bateu", "apanho", "apanhei", "violencia", "estupr", "me tocou", "tocou em mim", "me ameaca", "me ameacou", "assedi"];

// Mensagens curtas do dia a dia: resposta curta, sem novo versículo
const RESPOSTAS_LEVES = {
  agradecimento: {
    palavras: ["obrigad", "brigad", "valeu", "vlw", "grato", "grata", "gratidao", "agradeco"],
    jesus: [["A paz seja convosco.", "João 20:19"], ["Vai-te em paz.", "Lucas 7:50"]],
    dica: "Sempre que quiser conversar de novo, é só escrever aqui.",
  },
  amem: {
    palavras: ["amem", "aleluia", "gloria a deus", "gloria"],
    jesus: [["Bem-aventurados os que ouvem a palavra de Deus e a guardam.", "Lucas 11:28"]],
    dica: "Guarde essa palavra no coração. Quando quiser, é só escrever de novo.",
  },
  saudacao: {
    palavras: ["oi", "oii", "ola", "bom dia", "boa tarde", "boa noite jesus", "eai", "e ai", "opa", "hey"],
    jesus: [["A paz seja convosco.", "João 20:19"]],
    dica: "Como está o seu coração hoje?",
  },
  despedida: {
    palavras: ["tchau", "ate mais", "ate logo", "ate amanha", "boa noite", "fui", "falou", "flw"],
    jesus: [["E eis que estou convosco todos os dias, até a consumação dos séculos.", "Mateus 28:20"]],
    dica: "Até logo. Volte sempre que precisar.",
  },
  concordancia: {
    palavras: ["ok", "okay", "ta bom", "ta", "entendi", "sim", "certo", "uhum", "aham", "beleza", "blz", "vou ouvir", "vou ler"],
    jesus: [["Permanecei em mim, e eu permanecerei em vós.", "João 15:4"]],
    dica: "Se quiser, conte mais sobre o que está sentindo.",
  },
};

const conversa = { usados: new Set(), ocupado: false };

// A palavra precisa começar no início de uma palavra do texto
// (assim "obrigado" não é confundido com "briga")
function temPalavra(texto, palavra) {
  const p = palavra.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp("(^|[^a-z0-9])" + p).test(texto);
}

function semAcento(t) {
  return t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function sortear(lista) {
  const livres = lista.filter(item => !conversa.usados.has(item[1] + item[0].slice(0, 12)));
  const escolhido = (livres.length ? livres : lista)[Math.floor(Math.random() * (livres.length || lista.length))];
  conversa.usados.add(escolhido[1] + escolhido[0].slice(0, 12));
  return escolhido;
}

function entenderSentimento(texto) {
  const t = semAcento(texto);
  if (SINAIS_DE_RISCO.some(p => temPalavra(t, p))) return "risco";
  if (SINAIS_DE_ABUSO.some(p => temPalavra(t, p))) return "abuso";
  let melhor = "geral", pontos = 0;
  for (const [nome, s] of Object.entries(SENTIMENTOS)) {
    const p = s.palavras.filter(palavra => temPalavra(t, palavra)).length;
    if (p > pontos) { melhor = nome; pontos = p; }
  }
  // Mensagem curta sem sentimento claro: obrigado, amém, oi, tchau, ok... ou pedir para contar mais
  const curta = t.split(/\s+/).filter(Boolean).length <= 5;
  if (curta && melhor === "geral") {
    for (const [nome, r] of Object.entries(RESPOSTAS_LEVES)) {
      if (r.palavras.some(p => temPalavra(t, p))) return "leve:" + nome;
    }
    return "contar-mais";
  }
  if (curta && melhor === "gratidao" && RESPOSTAS_LEVES.agradecimento.palavras.some(p => temPalavra(t, p))) return "leve:agradecimento";
  return melhor;
}

// ---------- tela ----------
function montarConversa() {
  const aba = document.getElementById("aba-conversa");
  const avatar = pessoa.capa || "arte/arte1.jpg";
  aba.innerHTML = `
    <div class="zap">
      <div class="zap-topo">
        <div class="zap-avatar" style="background-image:url('${avatar}')"></div>
        <div>
          <div class="zap-nome">Jesus</div>
          <div class="zap-status" id="zap-status">online</div>
        </div>
      </div>
      <div class="zap-aviso">
        <strong>Isso foi pensado com carinho para você.</strong>
        Ninguém tem acesso a nenhuma destas informações: é especialmente seu.
        O que você escrever fica só no seu celular e é apagado quando você sair.
      </div>
      <div class="zap-mensagens" id="zap-mensagens"></div>
      <form class="zap-escrever" id="zap-form" autocomplete="off">
        <textarea id="zap-texto" rows="1" placeholder="Escreva o que está no seu coração…" maxlength="800"></textarea>
        <button type="submit" aria-label="Enviar"><svg viewBox="0 0 24 24"><path d="M3 20l18-8L3 4v6l12 2-12 2z"/></svg></button>
      </form>
      <div class="zap-guardados" id="zap-guardados"></div>
    </div>`;

  const form = document.getElementById("zap-form");
  const campo = document.getElementById("zap-texto");
  campo.addEventListener("input", () => { campo.style.height = "auto"; campo.style.height = Math.min(campo.scrollHeight, 120) + "px"; campo.style.overflowY = campo.scrollHeight > 120 ? "auto" : "hidden"; });
  campo.addEventListener("focus", () => document.body.classList.add("escrevendo"));
  campo.addEventListener("blur", () => setTimeout(() => document.body.classList.remove("escrevendo"), 150));
  campo.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); form.requestSubmit(); } });
  form.addEventListener("submit", e => {
    e.preventDefault();
    const texto = campo.value.trim();
    if (!texto || conversa.ocupado) return;
    campo.value = ""; campo.style.height = "auto";
    balao("eu", esc(texto).replace(/\n/g, "<br>"));
    responder(texto);
  });

  mostrarGuardados();
  // Primeira mensagem
  setTimeout(() => digitarEEnviar([
    { tipo: "jesus", fala: ["Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.", "Mateus 11:28"] },
    { tipo: "dica", html: `${esc(pessoa.nome)}, este é o seu momento devocional. Conte o que você está sentindo hoje, do seu jeito.` },
  ]), 500);
}

function balao(quem, html, extra = "") {
  const lista = document.getElementById("zap-mensagens");
  const hora = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  const div = document.createElement("div");
  div.className = `zap-balao ${quem} ${extra}`;
  div.innerHTML = `${html}<span class="zap-hora">${hora}</span>`;
  lista.appendChild(div);
  lista.scrollTop = lista.scrollHeight;
  div.scrollIntoView({ behavior: "smooth", block: "nearest" });
  return div;
}

function digitando(ligado) {
  document.getElementById("zap-status").textContent = ligado ? "digitando…" : "online";
  const lista = document.getElementById("zap-mensagens");
  const antigo = document.getElementById("zap-digitando");
  if (antigo) antigo.remove();
  if (ligado) {
    const d = document.createElement("div");
    d.id = "zap-digitando";
    d.className = "zap-balao jesus digitando";
    d.innerHTML = "<span></span><span></span><span></span>";
    lista.appendChild(d);
    d.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

const espera = ms => new Promise(r => setTimeout(r, ms));

async function digitarEEnviar(partes) {
  conversa.ocupado = true;
  for (const parte of partes) {
    digitando(true);
    const tamanho = (parte.fala ? parte.fala[0] : parte.html || "").length;
    await espera(Math.min(1200 + tamanho * 22, 3800));
    digitando(false);
    if (parte.tipo === "jesus") {
      conversa.usados.add(parte.fala[1] + parte.fala[0].slice(0, 12)); // não repetir esta fala depois
      balao("jesus", `<div class="zap-fala">${parte.fala[0]}</div><div class="zap-ref">${parte.fala[1]}</div>`);
    } else if (parte.tipo === "versiculo") {
      const [texto, ref] = parte.fala;
      const b = balao("jesus", `
        <div class="zap-cartao">
          <div class="zap-rotulo">Leia esta palavra</div>
          <div class="zap-fala">“${texto}”</div>
          <div class="zap-ref">${ref}</div>
          <button class="zap-guardar">Guardar este versículo</button>
        </div>`);
      b.querySelector(".zap-guardar").onclick = ev => guardarVersiculo(texto, ref, ev.currentTarget);
    } else if (parte.tipo === "louvor") {
      const [titulo, artista] = parte.louvor;
      const link = "https://open.spotify.com/search/" + encodeURIComponent(`${titulo} ${artista}`);
      balao("jesus", `
        <a class="zap-louvor" href="${link}" target="_blank" rel="noopener">
          <span class="zap-nota">♪</span>
          <span><span class="zap-rotulo">Ouça este louvor</span><br><strong>${titulo}</strong> · ${artista}</span>
        </a>`);
    } else {
      balao("jesus", parte.html, parte.tipo === "ajuda" ? "ajuda" : "dica");
    }
    await espera(450);
  }
  conversa.ocupado = false;
}

function responder(texto) {
  const sentimento = entenderSentimento(texto);

  if (sentimento === "risco" || sentimento === "abuso") {
    const contato = sentimento === "risco"
      ? `<a href="tel:188">Ligar para o CVV · 188</a> (gratuito, 24 horas, também tem chat em cvv.org.br)`
      : `<a href="tel:100">Ligar para o Disque 100</a> (gratuito, 24 horas, pode ser anônimo)`;
    digitarEEnviar([
      { tipo: "jesus", fala: ["Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.", "Mateus 11:28"] },
      { tipo: "ajuda", html: `
        <strong>Você é muito importante, e o que você está sentindo é sério.</strong><br>
        Você não precisa passar por isso sozinho(a). Converse <strong>agora</strong> com alguém de confiança:
        seus pais, seu pastor ou um líder da igreja.<br><br>
        ${contato}<br>
        Se estiver em perigo agora, ligue <a href="tel:190">190</a>.` },
      { tipo: "versiculo", fala: ["Perto está o Senhor dos que têm o coração quebrantado.", "Salmos 34:18"] },
    ]);
    return;
  }

  if (sentimento.startsWith("leve:")) {
    const r = RESPOSTAS_LEVES[sentimento.slice(5)];
    digitarEEnviar([{ tipo: "jesus", fala: sortear(r.jesus) }, { tipo: "dica", html: r.dica }]);
    return;
  }
  if (sentimento === "contar-mais") {
    digitarEEnviar([{ tipo: "dica", html: "Conte um pouco mais: o que está acontecendo no seu coração? Pode escrever do seu jeito, sem pressa." }]);
    return;
  }

  const s = SENTIMENTOS[sentimento];
  digitarEEnviar([
    { tipo: "jesus", fala: sortear(s.jesus) },
    { tipo: "versiculo", fala: sortear(s.versiculos) },
    { tipo: "louvor", louvor: s.louvores[Math.floor(Math.random() * s.louvores.length)] },
  ]);
}

// ---------- versículos guardados (só no celular) ----------
function chaveGuardados() { return "guardados-" + pessoa.id; }

function lerGuardados() {
  try { return JSON.parse(localStorage.getItem(chaveGuardados())) || []; } catch (e) { return []; }
}

function guardarVersiculo(texto, ref, botao) {
  const lista = lerGuardados();
  if (!lista.some(v => v.ref === ref)) lista.unshift({ texto, ref });
  localStorage.setItem(chaveGuardados(), JSON.stringify(lista.slice(0, 50)));
  botao.textContent = "Guardado ♥";
  botao.disabled = true;
  mostrarGuardados();
}

function mostrarGuardados() {
  const area = document.getElementById("zap-guardados");
  const lista = lerGuardados();
  if (!lista.length) { area.innerHTML = ""; return; }
  area.innerHTML = `
    <div class="zap-guardados-titulo">Seus versículos guardados</div>
    ${lista.map(v => `<div class="zap-guardado">“${v.texto}”<small>${v.ref}</small></div>`).join("")}`;
}
