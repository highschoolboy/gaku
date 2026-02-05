document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  loadGallery();
});

/* ===== Navigation Logic ===== */
function initNavigation() {
  const navToggle = document.querySelector(".nav-toggle");
  const globalNav = document.querySelector(".global-nav");
  const navLinks = document.querySelectorAll(".global-nav__link");
  
  // Create overlay
  const overlay = document.createElement("div");
  overlay.classList.add("nav-overlay");
  document.body.appendChild(overlay);

  function openMenu() {
    navToggle.setAttribute("aria-expanded", "true");
    globalNav.setAttribute("aria-hidden", "false");
    overlay.classList.add("is-visible");
  }

  function closeMenu() {
    navToggle.setAttribute("aria-expanded", "false");
    globalNav.setAttribute("aria-hidden", "true");
    overlay.classList.remove("is-visible");
  }

  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Optional: Active Link Highlighting using IntersectionObserver
  const sections = document.querySelectorAll("section[id]");
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -80% 0px",
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${id}`) {
            link.setAttribute("aria-current", "true");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

/* ===== Gallery Logic ===== */
async function loadGallery() {
  const mediaSection = document.getElementById("media");
  if (!mediaSection) return;

  const container = mediaSection.querySelector(".container");
  
  // Clear existing static content if we want to replace it entirely
  // Keeping the heading
  const heading = container.querySelector("h2");
  container.innerHTML = "";
  if (heading) container.appendChild(heading);

  const grid = document.createElement("div");
  grid.classList.add("cards-grid", "cards-grid--media");
  container.appendChild(grid);

  try {
    const response = await fetch("gallery.json");
    if (!response.ok) throw new Error("Failed to load gallery data");
    const items = await response.json();

    items.forEach((item) => {
      const article = document.createElement("article");
      article.classList.add("media-card");
      if (item.className) {
        article.classList.add(item.className);
      }

      let mediaContent = "";
      if (item.type === "image") {
        mediaContent = `
          <div class="media-card__media">
            <img src="${item.thumbUrl}" alt="${item.title}" loading="lazy" />
          </div>
        `;
      } else if (item.type === "youtube") {
        mediaContent = `
          <div class="media-card__media">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/${item.youtubeId}" 
              title="${item.title}" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>
          </div>
        `;
      }

      article.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.caption || ""}</p>
        ${mediaContent}
      `;

      grid.appendChild(article);
    });
  } catch (error) {
    console.error("Gallery loading error:", error);
    const errorMsg = document.createElement("p");
    errorMsg.textContent = "ギャラリーの読み込みに失敗しました。";
    container.appendChild(errorMsg);
  }
}
