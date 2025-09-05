/**
 * Landing Page Interactive Script
 * Handles smooth animations, interactions, and user experience enhancements
 */

class LandingPage {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupIntersectionObserver();
    this.addLoadingStates();
    this.setupKeyboardNavigation();
    this.addParticleEffect();
  }

  /**
   * Setup event listeners for interactive elements
   */
  setupEventListeners() {
    const buttons = document.querySelectorAll(".btn");

    buttons.forEach((button) => {
      // Add ripple effect on click
      button.addEventListener("click", (e) => this.createRippleEffect(e));

      // Add loading state
      button.addEventListener("click", (e) => this.handleButtonClick(e));

      // Add hover sound effect (optional)
      button.addEventListener("mouseenter", () => this.playHoverSound());
    });

    // Add scroll-based animations
    window.addEventListener("scroll", () => this.handleScroll());

    // Add resize handler for responsive adjustments
    window.addEventListener("resize", () => this.handleResize());
  }

  /**
   * Create ripple effect on button click
   */
  createRippleEffect(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement("span");
    ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  /**
   * Handle button click with loading state
   */
  handleButtonClick(e) {
    const button = e.currentTarget;
    const container = document.querySelector(".container");

    // Add loading class
    container.classList.add("loading");

    // Add loading animation to button
    button.style.transform = "scale(0.95)";
    button.style.opacity = "0.8";

    // Simulate loading delay for better UX
    setTimeout(() => {
      container.classList.remove("loading");
      button.style.transform = "";
      button.style.opacity = "";
    }, 300);
  }

  /**
   * Professional hover feedback (visual only)
   */
  playHoverSound() {
    // Removed audio feedback for professional appearance
    // Visual feedback is handled by CSS transitions
  }

  /**
   * Setup intersection observer for scroll animations
   */
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll(".btn, .subtitle");
    animatedElements.forEach((el) => observer.observe(el));
  }

  /**
   * Handle scroll events for parallax effects
   */
  handleScroll() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".bg-circle");

    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.1;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }

  /**
   * Handle window resize
   */
  handleResize() {
    // Debounce resize events
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.adjustLayoutForScreenSize();
    }, 250);
  }

  /**
   * Adjust layout based on screen size
   */
  adjustLayoutForScreenSize() {
    const isMobile = window.innerWidth <= 768;
    const container = document.querySelector(".container");

    if (isMobile) {
      container.classList.add("mobile-layout");
    } else {
      container.classList.remove("mobile-layout");
    }
  }

  /**
   * Add loading states and transitions
   */
  addLoadingStates() {
    // Add CSS for ripple animation
    const style = document.createElement("style");
    style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .animate-in {
                animation: fadeInUp 0.8s ease-out forwards;
            }
            
            .mobile-layout .button-container {
                flex-direction: column;
                gap: 1rem;
            }
        `;
    document.head.appendChild(style);
  }

  /**
   * Setup keyboard navigation
   */
  setupKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains("btn")) {
          e.preventDefault();
          focusedElement.click();
        }
      }

      // Add arrow key navigation between buttons
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        this.navigateButtons(e.key === "ArrowDown" ? 1 : -1);
      }
    });
  }

  /**
   * Navigate between buttons with arrow keys
   */
  navigateButtons(direction) {
    const buttons = Array.from(document.querySelectorAll(".btn"));
    const currentIndex = buttons.indexOf(document.activeElement);
    const nextIndex =
      (currentIndex + direction + buttons.length) % buttons.length;

    buttons[nextIndex].focus();
  }

  /**
   * Add professional background enhancement
   */
  addParticleEffect() {
    // Removed particle effects for professional appearance
    // Background is handled by CSS with subtle geometric shapes
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new LandingPage();
});

// Add smooth scrolling for anchor links
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

// Add performance optimization
if ("requestIdleCallback" in window) {
  requestIdleCallback(() => {
    // Preload critical resources
    const criticalImages = document.querySelectorAll("img[data-preload]");
    criticalImages.forEach((img) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = img.src;
      document.head.appendChild(link);
    });
  });
}
