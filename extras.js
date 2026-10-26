// ==============================================================
// NOVIDADES EM TESTE ("versão máxima")
// Só liga para quem tem "extras": true no pessoas.json.
// Depois de aprovadas, é só colocar "extras": true nas outras pessoas.
// ==============================================================

function ativarExtras() {
  document.body.classList.add("extras");
  extrasVisorDeFotos();
  extrasPlayerDeAudio();
  extrasPotinho();
  extrasConversa();
  extrasCaminho();
}

// ---------- 1. Fotos em tela cheia: deslizar entre elas, com o versículo embaixo ----------
function extrasVisorDeFotos() {
  const fotos = pessoa.fotos.map(f => typeof f === "string" ? { src: f } : f);
  const visor = document.createElement("div");
  visor.id = "visor";
  visor.innerHTML = `
    <button class="visor-fechar" aria-label="Fechar">×</button>
    <button class="visor-seta esq" aria-label="Foto anterior">‹</button>
    <button class="visor-seta dir" aria-label="Próxima foto">›</button>
    <figure><img alt=""><figcaption></figcaption></figure>
    <div class="visor-contador"></div>`;
  document.body.appendChild(visor);
  let atual = 0;

  const mostrar = i => {
    atual = (i + fotos.length) % fotos.length;
    const f = fotos[atual];
    const img = visor.querySelector("img");
    img.classList.remove("entra"); void img.offsetWidth; img.classList.add("entra");
    img.src = f.src;
    visor.querySelector("figcaption").innerHTML = f.versiculo ? `“${esc(f.versiculo)}”<small>${esc(f.ref)}</small>` : "";
    visor.querySelector(".visor-contador").textContent = `${atual + 1} / ${fotos.length}`;
  };
  const fechar = () => visor.classList.remove("aberto");

  // As polaroids chamam ampliar(src): passa a abrir o visor
  window.ampliar = src => { mostrar(Math.max(0, fotos.findIndex(f => f.src === src))); visor.classList.add("aberto"); };

  visor.querySelector(".visor-fechar").onclick = fechar;
  visor.querySelector(".esq").onclick = e => { e.stopPropagation(); mostrar(atual - 1); };
  visor.querySelector(".dir").onclick = e => { e.stopPropagation(); mostrar(atual + 1); };
  visor.addEventListener("click", e => { if (e.target === visor) fechar(); });
  document.addEventListener("keydown", e => {
    if (!visor.classList.contains("aberto")) return;
    if (e.key === "Escape") fechar();
    if (e.key === "ArrowLeft") mostrar(atual - 1);
    if (e.key === "ArrowRight") mostrar(atual + 1);
  });
  // Deslizar o dedo para os lados troca de foto; para baixo fecha
  let x0 = null, y0 = null;
  visor.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  visor.addEventListener("touchend", e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) mostrar(atual + (dx < 0 ? 1 : -1));
    else if (dy > 90) fechar();
    x0 = y0 = null;
  });

  // Dica discreta embaixo do topo da História
  const linha = document.getElementById("linha-tempo");
  linha.insertAdjacentHTML("beforebegin", '<p class="dica-fotos">Toque numa foto para ver em tela cheia</p>');
}

// ---------- 2. Player de áudio com barra de progresso e tempo ----------
function extrasPlayerDeAudio() {
  const formatar = s => isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "--:--";
  document.querySelectorAll("#cartao-audio .audio-item").forEach(item => {
    const audio = item.querySelector("audio");
    audio.preload = "metadata";
    item.insertAdjacentHTML("beforeend", `
      <div class="progresso">
        <span class="t-atual">0:00</span>
        <input type="range" min="0" max="1000" value="0" aria-label="Posição do áudio">
        <span class="t-total">--:--</span>
      </div>`);
    const barra = item.querySelector(".progresso input");
    const pintar = () => barra.style.setProperty("--p", (barra.value / 10) + "%");
    audio.addEventListener("loadedmetadata", () => { item.querySelector(".t-total").textContent = formatar(audio.duration); });
    audio.addEventListener("timeupdate", () => {
      if (!audio.duration) return;
      barra.value = Math.round(audio.currentTime / audio.duration * 1000);
      item.querySelector(".t-atual").textContent = formatar(audio.currentTime);
      pintar();
    });
    audio.addEventListener("ended", () => { barra.value = 0; pintar(); item.querySelector(".t-atual").textContent = "0:00"; });
    barra.addEventListener("input", () => {
      if (audio.duration) audio.currentTime = barra.value / 1000 * audio.duration;
      pintar();
    });
  });
}

// ---------- 3. Potinho: contagem para a próxima palavra e palavras já recebidas ----------
function extrasPotinho() {
  const chave = "historico-pote-" + pessoa.id;
  const ler = () => { try { return JSON.parse(localStorage.getItem(chave)) || []; } catch (e) { return []; } };

  const original = window.mostrarPapel;
  window.mostrarPapel = animar => {
    original(animar);
    const [texto, ref] = versiculoDoDia();
    const hist = ler().filter(v => v.dia !== hojeChave());
    localStorage.setItem(chave, JSON.stringify([{ dia: hojeChave(), texto, ref }, ...hist].slice(0, 60)));
    desenhar();
  };

  function desenhar() {
    const area = document.getElementById("papel-area");
    const volte = area.querySelector(".volte");
    if (volte) {
      const amanha = new Date(); amanha.setHours(24, 0, 0, 0);
      const min = Math.max(1, Math.round((amanha - new Date()) / 60000));
      volte.innerHTML = `Uma nova palavra chega em <strong>${Math.floor(min / 60)}h ${String(min % 60).padStart(2, "0")}min</strong>.`;
    }
    const anteriores = ler().filter(v => v.dia !== hojeChave());
    let lista = document.getElementById("pote-historico");
    if (!lista) {
      lista = document.createElement("div");
      lista.id = "pote-historico";
      area.parentElement.appendChild(lista);
    }
    lista.innerHTML = anteriores.length ? `
      <div class="hist-titulo">Palavras que você já recebeu</div>
      ${anteriores.slice(0, 14).map(v => `<div class="hist-item">“${v.texto}”<small>${v.ref}</small></div>`).join("")}` : "";
  }

  if (document.querySelector("#papel-area .papel")) window.mostrarPapel(false);
  setInterval(() => { if (document.querySelector("#papel-area .volte")) desenhar(); }, 30000);
}

// ---------- 4. Conversa: atalhos para começar e um aviso de nova mensagem ----------
function extrasConversa() {
  if (!pessoa.conversa) return;
  const botaoNav = document.getElementById("nav-conversa");
  // Bolinha de "mensagem nova" no menu até a pessoa abrir a conversa
  setTimeout(() => { if (!document.querySelector(".zap")) botaoNav.classList.add("nova"); }, 7000);
  botaoNav.addEventListener("click", () => botaoNav.classList.remove("nova"));

  const original = window.montarConversa;
  window.montarConversa = () => {
    original();
    const atalhos = ["Estou ansioso(a)", "Estou triste", "Me sinto sozinho(a)", "Estou cansado(a)", "Estou feliz e grato(a)", "Tenho medo do futuro"];
    const form = document.getElementById("zap-form");
    form.insertAdjacentHTML("beforebegin", `<div class="zap-atalhos" id="zap-atalhos">${atalhos.map(a => `<button type="button">${a}</button>`).join("")}</div>`);
    const caixa = document.getElementById("zap-atalhos");
    caixa.querySelectorAll("button").forEach(b => b.onclick = () => {
      if (conversa.ocupado) return;
      document.getElementById("zap-texto").value = b.textContent;
      form.requestSubmit();
    });
    // Some depois da primeira mensagem
    form.addEventListener("submit", () => caixa.classList.add("some"), { once: true });
  };
}

// ---------- 5. Caminho guiado: no fim de cada aba, um convite para a próxima ----------
function extrasCaminho() {
  const ordem = [...document.querySelectorAll("nav button")].filter(b => b.style.display !== "none");
  const textos = {
    mensagem: "Ouça uma mensagem de quem te ama",
    conversa: "Converse com Jesus sobre o seu coração",
    pote: "Tire a sua palavra de hoje no potinho",
    louvor: "Termine ouvindo um louvor",
  };
  ordem.forEach((btn, i) => {
    const proximo = ordem[i + 1];
    if (!proximo || btn.dataset.aba === "conversa") return;
    const aba = document.getElementById("aba-" + btn.dataset.aba);
    const destino = aba.querySelector(".conteudo") || aba;
    const link = document.createElement("button");
    link.className = "proximo-passo";
    link.innerHTML = `<span>Próximo</span>${textos[proximo.dataset.aba] || "Continuar"} →`;
    link.onclick = () => trocarAba(proximo);
    destino.appendChild(link);
  });
}
