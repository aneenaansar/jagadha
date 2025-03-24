


// Scroll Animation Script for Jagadha Website

document.addEventListener('DOMContentLoaded', () => {
    // Configure the Intersection Observer
    const observerOptions = {
      root: null, // using the viewport as root
      rootMargin: '0px',
      threshold: 0.15 // trigger when 15% of the element is visible
    };
  
    // Animation styles for different sections
    const animations = {
      'header': 'slide-down',
      'hero-section': 'fade-in',
      'centered-section': 'fade-in-up',
      'our-story-section': 'fade-in-up',
      'testimonial': 'fade-in-up',
      'ayurveda-section': 'fade-in-up',
      'products-section': 'fade-in-right',
      'features-section': 'fade-in-up',
      'outlet-section': 'fade-in-up',
      'contact-section': 'fade-in-up',
      'footer': 'fade-in-up'
    };
  
    // Elements with special animations
    const specialElements = {
      // '.story-image:first-child': 'rotate-in-left',
      // '.story-image:nth-child(2)': 'pop-in',
      // '.story-image:last-child': 'rotate-in-right',
      '.product-image': 'slide-in-left',
      '.product-description': 'slide-in-right',
      '.testimonial-image': 'slide-in-left',
      '.testimonial-text': 'slide-in-right',
      '.feature-box': 'fade-in-up-staggered',
      '.social-link': 'pop-in-staggered'
    };
  
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
      /* Base animation styles */
      [data-animate] {
        opacity: 0;
        transition: transform 0.8s ease, opacity 0.8s ease;
        will-change: transform, opacity;
      }
      
      /* Animation for visible elements */
      [data-animate].animate {
        opacity: 1;
        transform: translate(0, 0) rotate(0) scale(1);
      }
      
      /* Animation variations */
      [data-animate="fade-in"] {
        opacity: 0;
      }
      
      [data-animate="fade-in-up"] {
        opacity: 0;
        transform: translateY(40px);
      }
      
      [data-animate="fade-in-right"] {
        opacity: 0;
        transform: translateX(-40px);
      }
      
      [data-animate="fade-in-left"] {
        opacity: 0;
        transform: translateX(40px);
      }
      
      [data-animate="slide-down"] {
        transform: translateY(-30px);
        opacity: 0;
      }
      
      [data-animate="slide-in-left"] {
        transform: translateX(-50px);
        opacity: 0;
      }
      
      [data-animate="slide-in-right"] {
        transform: translateX(50px);
        opacity: 0;
      }
      
      [data-animate="pop-in"] {
        transform: scale(0.8);
        opacity: 0;
      }
      
      [data-animate="pop-in-delayed"] {
        transform: scale(0.8);
        opacity: 0;
        transition-delay: 0.3s;
      }
      
      [data-animate="rotate-in-left"] {
        transform: rotate(-10deg) translateX(-30px);
        opacity: 0;
      }
      
      [data-animate="rotate-in-right"] {
        transform: rotate(10deg) translateX(30px);
        opacity: 0;
      }
      
      /* Staggered animations */
      [data-animate="fade-in-up-staggered"] {
        opacity: 0;
        transform: translateY(40px);
      }
      
      [data-animate="fade-in-up-staggered"].animate:nth-child(1) {
        transition-delay: 0s;
      }
      
      [data-animate="fade-in-up-staggered"].animate:nth-child(2) {
        transition-delay: 0.2s;
      }
      
      [data-animate="fade-in-up-staggered"].animate:nth-child(3) {
        transition-delay: 0.4s;
      }
      
      [data-animate="pop-in-staggered"] {
        transform: scale(0.8);
        opacity: 0;
      }
      
      [data-animate="pop-in-staggered"].animate:nth-child(1) {
        transition-delay: 0s;
      }
      
      [data-animate="pop-in-staggered"].animate:nth-child(2) {
        transition-delay: 0.1s;
      }
      
      [data-animate="pop-in-staggered"].animate:nth-child(3) {
        transition-delay: 0.2s;
      }
      
      [data-animate="pop-in-staggered"].animate:nth-child(4) {
        transition-delay: 0.3s;
      }
  
      /* Carousel animation enhancement */
      .carousel-slide {
        transition: transform 0.5s ease, opacity 0.5s ease;
      }
  
      /* Add a gentle hover effect on product images */
      .product-image:hover {
        transform: scale(1.05);
        transition: transform 0.5s ease-in-out;
      }
  
      /* Button hover animations */
      .buy-now, .product-button button {
        transition: transform 0.3s ease, background-color 0.3s ease;
      }
  
      .buy-now:hover, .product-button button:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      }
  
      /* Nav links enhanced animation */
      .nav a {
        transition: color 0.3s ease, transform 0.3s ease;
      }
  
      .nav a:hover {
        transform: translateY(-2px);
      }
    `;
    document.head.appendChild(style);
  
    // Initialize sections with data attributes
    Object.keys(animations).forEach(sectionClass => {
      const section = document.querySelector(`.${sectionClass}`);
      if (section) {
        section.setAttribute('data-animate', animations[sectionClass]);
      }
    });
  
    // Initialize special elements
    Object.keys(specialElements).forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        element.setAttribute('data-animate', specialElements[selector]);
      });
    });
  
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add animation class when element is visible
          entry.target.classList.add('animate');
          
          // Stop observing after animation is triggered
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    // Observe all elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(element => {
      observer.observe(element);
    });
  
    // Special handling for carousel
    const carousel = document.querySelector('.carousel');
    if (carousel) {
      let currentSlide = 0;
      const slides = carousel.querySelectorAll('.carousel-slide');
      const totalSlides = slides.length;
      
      // Initialize slides
      slides.forEach((slide, index) => {
        if (index !== 0) {
          slide.style.opacity = '0';
          slide.style.position = 'absolute';
          slide.style.top = '0';
          slide.style.left = '0';
          slide.style.width = '100%';
        } else {
          slide.style.opacity = '1';
        }
      });
  
      // Function to change slides
      const changeSlide = () => {
        slides.forEach(slide => {
          slide.style.opacity = '0';
          slide.style.position = 'absolute';
        });
        
        currentSlide = (currentSlide + 1) % totalSlides;
        
        slides[currentSlide].style.opacity = '1';
        slides[currentSlide].style.position = 'relative';
      };
  
      // Auto-change slides every 5 seconds
      setInterval(changeSlide, 5000);
    }
  
    // Add parallax effect to the hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroImages = heroSection.querySelectorAll('.hero-image');
        
        heroImages.forEach(img => {
          const speed = 0.5; // Parallax speed factor
          img.style.transform = `translateY(${scrolled * speed}px)`;
        });
      });
    }
  
    // Add smooth scrolling for all navigation links
    document.querySelectorAll('.nav a').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Initialize animations for elements already in viewport on page load
    const triggerAnimationsInView = () => {
      document.querySelectorAll('[data-animate]').forEach(element => {
        const rect = element.getBoundingClientRect();
        const isInViewport = rect.top <= window.innerHeight * 0.85;
        
        if (isInViewport) {
          element.classList.add('animate');
          observer.unobserve(element);
        }
      });
    };
    
    // Trigger animations for elements in view on page load
    setTimeout(triggerAnimationsInView, 100);
  });


  // Add this to your existing script.js file
  document.addEventListener('DOMContentLoaded', () => {
    // Tab Functionality
    const tabs = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to the clicked tab
            tab.classList.add('active');
            
            // Find corresponding tab content and make it active
            const targetTabId = tab.getAttribute('data-tab');
            const targetTabContent = document.getElementById(targetTabId);
            if (targetTabContent) {
                targetTabContent.classList.add('active');
            }
        });
    });

    // Carousel Functionality
    function initializeCarousels() {
        document.querySelectorAll('.carousel-container').forEach(container => {
            const track = container.querySelector('.carousel-track');
            const slides = Array.from(track.children);
            const dotsContainer = container.querySelector('.carousel-dots');
            const prevButton = container.querySelector('.prev');
            const nextButton = container.querySelector('.next');
           
            let currentIndex = 0;
           
            // Create dots for each slide
            slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('carousel-dot');
                if (index === 0) dot.classList.add('active');
                
                dot.addEventListener('click', () => {
                    currentIndex = index;
                    updateCarousel();
                });
                
                dotsContainer.appendChild(dot);
            });
           
            // Update carousel based on current index
            function updateCarousel() {
                slides.forEach((slide, index) => {
                    slide.classList.toggle('active', index === currentIndex);
                });
               
                dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            }
           
            // Handle previous button click
            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateCarousel();
            });
           
            // Handle next button click
            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateCarousel();
            });
           
            // Auto-advance slides every 5 seconds
            setInterval(() => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateCarousel();
            }, 5000);
        });
    }

    // Initialize all carousels
    initializeCarousels();
});