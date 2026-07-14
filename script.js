// ============================================
// MOBILE NAV TOGGLE
// ============================================
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

function closeMenu(){
  navMenu.classList.remove("open");
  navToggle.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// ============================================
// SMOOTH SCROLL (with sticky-header offset via CSS scroll-margin-top)
// ============================================
const links = document.querySelectorAll('nav a[href^="#"]');

links.forEach(link => {
  link.addEventListener("click", e => {
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
    closeMenu();
  });
});

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const navObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);

sections.forEach(section => navObserver.observe(section));

// ============================================
// SCROLL REVEAL
// ============================================
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach(el => revealObserver.observe(el));

// ============================================
// ANIMATED SKILL BARS
// ============================================
const skillEls = document.querySelectorAll(".skill");

const skillObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

skillEls.forEach(el => skillObserver.observe(el));

// ============================================
// BACK TO TOP
// ============================================
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 500);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ============================================
// PROFILE PHOTO FALLBACK (shows initials if assets/profile.jpg is missing)
// ============================================
const profileImg = document.getElementById("profileImg");

profileImg.addEventListener("error", () => {
  const fallback = document.createElement("div");
  fallback.className = "photo-fallback";
  fallback.textContent = "RW";
  profileImg.replaceWith(fallback);
});
