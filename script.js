/**
 * Socture - Social Media Platform per Pronostici
 * script.js - Logica interattiva del frontend
 */

// Immagini per il sito - Percorsi dal repository GitHub
const IMAGES = {
  logo: '/workspaces/Socture/img/logo.PNG',
  // Immagini usate come avatar e contenuti
  img10: '/workspaces/Socture/img/10.jpg',
  img20: '/workspaces/Socture/img/20.jpg',
  img30: '/workspaces/Socture/img/30.jpg',
  img40: '/workspaces/Socture/img/40.jpg',
  img50: '/workspaces/Socture/img/50.jpg',
  img60: '/workspaces/Socture/img/60.jpg',
  img70: '/workspaces/Socture/img/70.jpg'
};

// Dati per le storie/previsioni
const stories = {
  'Storia 1': {
    username: 'silvia_berg',
    avatar: IMAGES.img10,
    title: 'L\'Italia agli Europei 2025',
    description: 'L\'Italia raggiungerà almeno le semifinali ai prossimi Europei di calcio, battendo almeno una tra Germania e Francia nel percorso.',
    yes: 45,
    no: 55,
    timeLeft: '1h rimaste',
    image: IMAGES.img20
  },
  'Storia 2': {
    username: 'tech_oracle',
    avatar: IMAGES.img30,
    title: 'Il futuro dell\'AI generativa',
    description: 'Entro il 2026, almeno il 30% dei contenuti online sarà generato da AI e sarà indistinguibile dai contenuti creati dagli umani.',
    yes: 62,
    no: 38,
    timeLeft: '3h rimaste',
    image: IMAGES.img40
  },
  'Storia 3': {
    username: 'futurecast',
    avatar: IMAGES.img50,
    title: 'Cambiamenti climatici 2025',
    description: 'L\'estate 2025 sarà la più calda degli ultimi 50 anni in Europa, con temperature medie superiori di 2°C rispetto alla media storica.',
    yes: 78,
    no: 22,
    timeLeft: '5h rimaste',
    image: IMAGES.img60
  },
  'Storia 4': {
    username: 'weather_ex',
    avatar: IMAGES.img70,
    title: 'Futuro degli smartphone',
    description: 'Entro i prossimi 2 anni, i telefoni pieghevoli rappresenteranno oltre il 30% del mercato smartphone premium.',
    yes: 38,
    no: 62,
    timeLeft: '8h rimaste',
    image: IMAGES.img10
  },
  'Storia 5': {
    username: 'cryptoking',
    avatar: IMAGES.img20,
    title: 'Bitcoin oltre i 100K',
    description: 'Bitcoin supererà i 100.000€ entro la fine del 2025, grazie all\'adozione da parte di almeno 3 nuove grandi aziende tech.',
    yes: 82,
    no: 18,
    timeLeft: '12h rimaste',
    image: IMAGES.img30
  },
  'Storia 6': {
    username: 'oscar_pred',
    avatar: IMAGES.img40,
    title: 'Oscar 2026',
    description: 'Il prossimo film di Christopher Nolan vincerà almeno 5 premi Oscar, incluso miglior film e miglior regia.',
    yes: 55,
    no: 45,
    timeLeft: '1g rimasta',
    image: IMAGES.img50
  },
  'Storia 7': {
    username: 'fashion_g',
    avatar: IMAGES.img60,
    title: 'Trend moda 2026',
    description: 'Il colore dominante nelle collezioni primavera/estate 2026 sarà il viola in tutte le sue sfumature, con almeno il 40% delle collezioni principali che lo utilizzeranno.',
    yes: 29,
    no: 71,
    timeLeft: '2g rimaste',
    image: IMAGES.img70
  }
};

// Elementi DOM
let predictionModal;
let modalClose;
let modalAvatar;
let modalUsername;
let modalTime;
let modalTitle;
let modalDescription;
let modalImage;
let modalProgress;
let modalYes;
let modalNo;
let createBtn;
let sidebarCreateBtn;
let mobileCreateBtn;

/**
 * Inizializza l'applicazione
 */
function initApp() {
  // Ottieni riferimenti DOM
  predictionModal = document.getElementById('story-modal');
  modalClose = document.getElementById('modal-close');
  modalAvatar = document.getElementById('modal-avatar');
  modalUsername = document.getElementById('modal-username');
  modalTime = document.getElementById('modal-time');
  modalTitle = document.getElementById('modal-title');
  modalDescription = document.getElementById('modal-description');
  modalImage = document.getElementById('modal-image');
  modalProgress = document.getElementById('modal-progress');
  modalYes = document.getElementById('modal-yes');
  modalNo = document.getElementById('modal-no');
  createBtn = document.getElementById('create-btn');
  sidebarCreateBtn = document.getElementById('sidebar-create-btn');
  mobileCreateBtn = document.getElementById('mobile-create-btn');
  
  // Imposta event listeners
  if (modalClose) {
    modalClose.addEventListener('click', closePredictionModal);
  }
  
  // Inizializza componenti interattivi
  initializeVoteButtons();
  initializeSocialActions();
  initializeCategoryFilter();
  initializeAccuracyChart();
  
  // Event listeners per pulsanti di creazione
  if (createBtn) {
    createBtn.addEventListener('click', showCreateModal);
  }
  
  if (sidebarCreateBtn) {
    sidebarCreateBtn.addEventListener('click', showCreateModal);
  }
  
  if (mobileCreateBtn) {
    mobileCreateBtn.addEventListener('click', showCreateModal);
  }
  
  // Gestisci gli eventi di scroll per effetti parallax
  window.addEventListener('scroll', handleScroll);
  
  // Aggiorna le immagini sulle pagine
  updateImagesOnPage();
}

/**
 * Aggiorna tutte le immagini sulla pagina con i percorsi corretti
 */
function updateImagesOnPage() {
  // Aggiorna il logo
  const logoElements = document.querySelectorAll('.logo');
  logoElements.forEach(el => {
    el.src = IMAGES.logo;
  });
  
  // Aggiorna le immagini degli avatar usando una rotazione per varietà
  const avatarElements = document.querySelectorAll('.user-avatar, .avatar-small, .profile-avatar, .suggestion-avatar, .mobile-avatar, .sidebar-avatar');
  avatarElements.forEach((el, index) => {
    const imageKeys = [IMAGES.img10, IMAGES.img20, IMAGES.img30, IMAGES.img40, IMAGES.img50, IMAGES.img60, IMAGES.img70];
    el.src = imageKeys[index % imageKeys.length];
  });
  
  // Aggiorna le immagini delle previsioni con le immagini fornite
  const predictionImages = document.querySelectorAll('.prediction-image');
  predictionImages.forEach((el, index) => {
    const imageKeys = [IMAGES.img20, IMAGES.img30, IMAGES.img40, IMAGES.img50, IMAGES.img60, IMAGES.img70, IMAGES.img10];
    el.src = imageKeys[index % imageKeys.length];
  });
  
  // Aggiorna le immagini dei post
  const postImages = document.querySelectorAll('.prediction-media');
  postImages.forEach((el, index) => {
    const imageKeys = [IMAGES.img30, IMAGES.img40, IMAGES.img50, IMAGES.img60, IMAGES.img70, IMAGES.img10, IMAGES.img20];
    el.src = imageKeys[index % imageKeys.length];
  });
}

/**
 * Apre il modal di una previsione
 * @param {string} storyId - ID della previsione da visualizzare
 */
function openStoryModal(storyId) {
  const story = stories[storyId];
  if (!story) return;
  
  // Aggiorna contenuto del modal
  modalAvatar.src = story.avatar;
  modalUsername.textContent = story.username;
  modalTime.textContent = story.timeLeft;
  modalTitle.textContent = story.title;
  modalDescription.textContent = story.description;
  modalImage.src = story.image;
  modalProgress.style.width = `${story.yes}%`;
  modalYes.textContent = `${story.yes}% Si avvererà`;
  modalNo.textContent = `${story.no}% Non si avvererà`;
  
  // Mostra il modal
  predictionModal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Previene lo scrolling del body
  
  // Inizia timer per chiusura automatica
  startAutoCloseTimer();
}

/**
 * Chiude il modal della previsione
 */
function closePredictionModal() {
  predictionModal.classList.remove('active');
  document.body.style.overflow = ''; // Ripristina scrolling
  
  // Ferma il timer di auto-chiusura
  if (window.storyTimer) {
    clearTimeout(window.storyTimer);
  }
}

/**
 * Inizia il timer per chiudere automaticamente la previsione
 */
function startAutoCloseTimer() {
  // Ferma il timer esistente se presente
  if (window.storyTimer) {
    clearTimeout(window.storyTimer);
  }
  
  // Imposta il nuovo timer (10 secondi)
  window.storyTimer = setTimeout(() => {
    closePredictionModal();
  }, 10000);
}

/**
 * Mostra il modal per creare una nuova previsione
 * Da implementare completamente
 */
function showCreateModal() {
  alert('Funzionalità di creazione in fase di sviluppo');
  // Qui andrebbe implementato il codice per mostrare il modal di creazione
}

/**
 * Inizializza i pulsanti di voto
 */
function initializeVoteButtons() {
  // Pulsanti voto feed
  const yesButtons = document.querySelectorAll('.vote-yes-btn');
  const noButtons = document.querySelectorAll('.vote-no-btn');
  
  // Pulsanti voto modal
  const modalYesBtn = document.querySelector('.modal-vote-yes-btn');
  const modalNoBtn = document.querySelector('.modal-vote-no-btn');
  
  // Funzione per gestire il click sui pulsanti di voto
  function handleVoteClick(button, isYesVote) {
    // Trova il container del voto (post o modal)
    const container = button.closest('.vote-meter, .modal-vote-meter');
    const progressBar = container.querySelector('.vote-progress, .modal-vote-progress');
    const yesLabel = container.querySelector('.vote-yes, .modal-vote-yes');
    const noLabel = container.querySelector('.vote-no, .modal-vote-no');
    
    // Ottieni la percentuale attuale
    let currentWidth = parseInt(progressBar.style.width) || 50;
    
    // Aggiorna la percentuale in base al voto
    let newValue;
    if (isYesVote) {
      newValue = Math.min(currentWidth + 5, 100);
    } else {
      newValue = Math.max(currentWidth - 5, 0);
    }
    
    // Aggiorna la UI
    progressBar.style.width = `${newValue}%`;
    yesLabel.textContent = `${newValue}% Si avvererà`;
    noLabel.textContent = `${100 - newValue}% Non si avvererà`;
    
    // Effetto pulsazione al click
    button.classList.add('pulse');
    setTimeout(() => {
      button.classList.remove('pulse');
    }, 500);
  }
  
  // Aggiungi event listener ai pulsanti nel feed
  yesButtons.forEach(btn => {
    btn.addEventListener('click', () => handleVoteClick(btn, true));
  });
  
  noButtons.forEach(btn => {
    btn.addEventListener('click', () => handleVoteClick(btn, false));
  });
  
  // Aggiungi event listener ai pulsanti nel modal
  if (modalYesBtn) {
    modalYesBtn.addEventListener('click', () => handleVoteClick(modalYesBtn, true));
  }
  
  if (modalNoBtn) {
    modalNoBtn.addEventListener('click', () => handleVoteClick(modalNoBtn, false));
  }
}

/**
 * Inizializza le azioni social (like, commenti, salva)
 */
function initializeSocialActions() {
  // Like buttons
  const heartIcons = document.querySelectorAll('.action-btn .fa-heart');
  
  heartIcons.forEach(heart => {
    heart.addEventListener('click', function() {
      // Toggle classe per cambiare icona
      if (this.classList.contains('far')) {
        this.classList.remove('far');
        this.classList.add('fas', 'text-red-500', 'pulse');
        
        // Incrementa contatore
        const post = this.closest('.prediction-card');
        const likesEl = post.querySelector('.likes-count');
        const likesText = likesEl.textContent;
        const match = likesText.match(/(\d+)/);
        
        if (match) {
          const likesCount = parseInt(match[0]);
          likesEl.textContent = `${likesCount + 1} Mi piace`;
        }
        
        // Rimuovi animazione
        setTimeout(() => {
          this.classList.remove('pulse');
        }, 1000);
      } else {
        this.classList.remove('fas', 'text-red-500');
        this.classList.add('far');
        
        // Decrementa contatore
        const post = this.closest('.prediction-card');
        const likesEl = post.querySelector('.likes-count');
        const likesText = likesEl.textContent;
        const match = likesText.match(/(\d+)/);
        
        if (match) {
          const likesCount = parseInt(match[0]);
          likesEl.textContent = `${likesCount - 1} Mi piace`;
        }
      }
    });
  });
  
  // Bookmark buttons
  const bookmarkIcons = document.querySelectorAll('.action-btn .fa-bookmark');
  
  bookmarkIcons.forEach(bookmark => {
    bookmark.addEventListener('click', function() {
      if (this.classList.contains('far')) {
        this.classList.remove('far');
        this.classList.add('fas', 'text-blue-500');
      } else {
        this.classList.remove('fas', 'text-blue-500');
        this.classList.add('far');
      }
    });
  });
}

/**
 * Inizializza il filtro delle categorie
 */
function initializeCategoryFilter() {
  const categoryButtons = document.querySelectorAll('.category-btn');
  
  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Rimuovi classe active da tutti i pulsanti
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      
      // Aggiungi classe active al pulsante cliccato
      this.classList.add('active');
      
      // Qui si potrebbe implementare il filtraggio effettivo dei post
      // Per ora è solo visuale
    });
  });
}

/**
 * Inizializza il grafico dell'accuratezza
 */
function initializeAccuracyChart() {
  const chartElement = document.querySelector('.accuracy-chart');
  
  if (chartElement) {
    const percentage = parseInt(chartElement.getAttribute('data-percentage'));
    const circle = chartElement.querySelector('.accuracy-circle');
    
    if (circle) {
      // Calcola il valore di stroke-dashoffset in base alla percentuale
      const radius = 36;
      const circumference = 2 * Math.PI * radius;
      const dashOffset = circumference * (1 - percentage / 100);
      
      // Imposta il valore di stroke-dashoffset
      circle.style.strokeDasharray = circumference;
      circle.style.strokeDashoffset = dashOffset;
    }
  }
}

/**

 * Gestisce gli effetti di scroll
 */
function handleScroll() {
  // Implementare effetti di parallax o altri effetti di scrolling qui
}

// Esegui l'inizializzazione quando il DOM è completamente caricato
document.addEventListener('DOMContentLoaded', initApp);

/**
 * Funzione helper per prevenire default su event
 * @param {Event} e - Evento da prevenire
 */
function preventDefault(e) {
  e.preventDefault();
}

/**
 * Funzioni per debug
 */
function logError(message) {
  console.error(`[Socture Error]: ${message}`);
}

window.onerror = function(message, source, lineno, colno, error) {
  logError(`${message} at ${source}:${lineno}:${colno}`);
  return true;
};
