// Gerenciamento de navegação e modais
document.addEventListener("DOMContentLoaded", function () {
  // Elementos
  const pages = document.querySelectorAll(".app-page");
  const modals = document.querySelectorAll(".modal");
  const buttons = document.querySelectorAll("[data-action]");

  // Inicializar modais como ocultos
  modals.forEach((modal) => {
    modal.style.display = "none";
  });

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
      targetPage.classList.add("slide-in-right");

      // Remover classe de animação após conclusão
      setTimeout(() => {
        targetPage.classList.remove("slide-in-right");
      }, 300);
    }
  }

  // Configurar botões com base em data-action
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const action = this.getAttribute("data-action");
      const target = this.getAttribute("data-target");
      openPage(target);
    });
  });

  // Efeito de toque em botões (estilo app)
  const allButtons = document.querySelectorAll("button");
  allButtons.forEach((button) => {
    button.addEventListener("touchstart", function () {
      this.style.opacity = "0.8";
    });

    button.addEventListener("touchend", function () {
      this.style.opacity = "1";
    });
  });

  const audio = new Audio("img/music.mp3");

  // Event listeners para o áudio
  audio.addEventListener("timeupdate", updateProgress);

  let isPlaying = false;
  document
    .getElementById("playPauseBtn")
    .addEventListener("click", togglePlayPause);

  function playSong() {
    audio.loop = true;
    audio.play();
  }

  function togglePlayPause() {
    if (isPlaying) {
      audio.pause();
      playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      isPlaying = false;
    } else {
      audio
        .play()
        .then(() => {
          playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
          isPlaying = true;
        })
        .catch((error) => {
          console.error("Erro ao reproduzir áudio:", error);
          playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
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
