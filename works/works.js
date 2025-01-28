// GSAP'ı kaydet
gsap.registerPlugin(ScrollTrigger);

// Sayfa Yükleyici
class PageLoader {
    constructor() {
        this.loader = document.querySelector('.loader');
        this.loaderBar = document.querySelector('.loader-bar-fill');
        this.loaderProgress = document.querySelector('.loader-progress');
        this.progress = 0;
        this.loadingDuration = 2000; // 2 saniye
        this.init();
    }

    init() {
        const increment = 100 / (this.loadingDuration / 20); // Her 20ms'de artış miktarı
        
        const interval = setInterval(() => {
            this.progress = Math.min(100, this.progress + increment);
            this.updateLoader();
            
            if (this.progress >= 100) {
                clearInterval(interval);
                this.completeLoading();
            }
        }, 20);
    }

    updateLoader() {
        this.loaderBar.style.width = `${this.progress}%`;
        this.loaderProgress.textContent = `${Math.round(this.progress)}%`;
    }

  // Loader tamamlandıktan sonra back button'u göster
// Mevcut loader kodunuzun completeLoading fonksiyonuna ekleyin:

completeLoading() {
    gsap.to(this.loader, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            this.loader.style.display = 'none';
            this.initPageAnimations();
            
            // Back button animasyonu
            gsap.to('.back-home', {
                opacity: 1,
                x: 0,
                duration: 0.5,
                ease: 'power3.out',
                delay: 0.2
            });
        }
    });
}

    initPageAnimations() {
        // Header animasyonları
        gsap.to('.title', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
        });

        gsap.to('.subtitle', {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out'
        });

        // Featured project animasyonu
        gsap.to('.project-featured', {
            opacity: 1,
            duration: 1,
            delay: 0.4,
            ease: 'power3.out'
        });

        // Regular projects için scroll animasyonları
        gsap.utils.toArray('.project-card').forEach((card, i) => {
            gsap.to(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top bottom-=100',
                    end: 'top center',
                    toggleActions: 'play none none reverse'
                },
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: i * 0.1,
                ease: 'power3.out'
            });
        });
    }
}

// Smooth Scroll
class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }

    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Sayfa yüklendiğinde başlat
window.addEventListener('load', () => {
    new PageLoader();
    new SmoothScroll();
});

