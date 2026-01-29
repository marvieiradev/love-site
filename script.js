// Gerenciamento de navegação e modais
document.addEventListener("DOMContentLoaded", function () {
  // Elementos
  const pages = document.querySelectorAll(".app-page");
  const buttons = document.querySelectorAll("[data-action]");
  const mainImage = document.getElementById("main-image");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const progress = document.getElementById("progress");
  const musicLabel = document.getElementById("music");
  let isPlaying = false;
  const music = {
    title: "Djavan - Oceano",
    audio: "music/oceano.mp3",
  };
  const imagens = ["img/casal1.webp", "img/casal2.webp"];
  const audio = new Audio(music.audio);
  let indiceAtual = 0;

  // Função para abrir página
  function openPage(pageId) {
    // Esconder todas as páginas
    pages.forEach((page) => {
      page.classList.remove("active");
    });

    // Mostrar a página selecionada
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add("active");
      targetPage.classList.add("slide-up");
      // Remover classe de animação após conclusão
      setTimeout(() => {
        targetPage.classList.remove("slide-up");
      }, 300);
    }
  }

  // Configurar botões com base em data-action
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      const target = this.getAttribute("data-target");
      openPage(target);
    });
  });

  function trocarImagem() {
    indiceAtual = (indiceAtual + 1) % imagens.length;
    mainImage.src = imagens[indiceAtual];
  }

  setInterval(trocarImagem, 3500);

  // Gerenciamento do player de áudio
  audio.addEventListener("timeupdate", updateProgress);
  playPauseBtn.addEventListener("click", togglePlayPause);

  //Iniciar/pausar áudio
  function togglePlayPause() {
    musicLabel.textContent = music.title;
    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
      playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      isPlaying = false;
    } else {
      audio
        .play()
        .then(() => {
          playPauseBtn.innerHTML = '<i class="fa-solid fa-stop"></i>';
          isPlaying = true;
        })
        .catch((error) => {
          console.error("Erro ao reproduzir áudio:", error);
          playPauseBtn.innerHTML = '<i class="fa-solid fa-stop"></i>';
        });
    }
  }

  // Atualizar barra de progresso
  function updateProgress() {
    if (audio.duration) {
      const progressPercent = (audio.currentTime / audio.duration) * 100;
      progress.style.width = `${progressPercent}%`;
    }
  }
});
