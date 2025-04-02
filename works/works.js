// Mouse pozisyonu için global değişkenler
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

// Sayfa yüklendiğinde çalışacak fonksiyon
document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initInteractions();
    initProjectCards();
    initBackHomeButton();
    initTechStack();
    initVisitButtons();
});

// Gelişmiş custom cursor
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const cursorText = document.querySelector('.cursor-text');

    // Mobil kontrolü
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (!isMobile && cursor && cursorFollower) {
        // Mouse hareketi için smooth animation
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // RAF ile smooth cursor hareketi
        function updateCursor() {
            // Smooth lerp hareketi
            const ease = 0.15;
            
            currentX += (mouseX - currentX) * ease;
            currentY += (mouseY - currentY) * ease;

            // Cursor pozisyonlarını güncelle
            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
            cursorFollower.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

            // Bir sonraki frame için tekrar çağır
            requestAnimationFrame(updateCursor);
        }
        updateCursor();

        // Hover efektleri
        const hoverElements = document.querySelectorAll('a, button, .tech-stack span, .project-info');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
                cursorFollower.classList.add('cursor-hover');
                
                // Hover olan elementin tipine göre cursor text'i güncelle
                if (element.classList.contains('back-home')) {
                    cursorText.textContent = 'Back';
                } else if (element.classList.contains('visit-btn')) {
                    cursorText.textContent = 'Visit';
                } else if (element.classList.contains('tech-stack')) {
                    cursorText.textContent = 'Tech';
                }
                cursorText.style.opacity = '1';
            });

            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
                cursorFollower.classList.remove('cursor-hover');
                cursorText.style.opacity = '0';
                setTimeout(() => {
                    cursorText.textContent = '';
                }, 300);
            });
        });

        // Sayfa dışına çıkıldığında cursor'u gizle
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            cursorFollower.style.opacity = '0';
        });

        // Sayfa içine girildiğinde cursor'u göster
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
            cursorFollower.style.opacity = '1';
        });
    } else {
        // Mobil cihazlarda cursor'u gizle
        if (cursor) cursor.style.display = 'none';
        if (cursorFollower) cursorFollower.style.display = 'none';
    }
}

// iframe ve diğer etkileşimler
function initInteractions() {
    const screens = document.querySelectorAll('.monitor-screen, .phone-screen');
    screens.forEach(screen => {
        const iframe = screen.querySelector('iframe');
        const overlay = screen.querySelector('.iframe-overlay');

        if (iframe && overlay) {
            let touchTimeout;
            
            // Mouse etkileşimi
            screen.addEventListener('mouseenter', () => {
                overlay.style.opacity = '0';
                overlay.style.visibility = 'hidden';
                iframe.style.pointerEvents = 'auto';
                
                // Cursor efekti
                const cursor = document.querySelector('.cursor');
                const cursorFollower = document.querySelector('.cursor-follower');
                const cursorText = document.querySelector('.cursor-text');
                
                if (cursor && cursorFollower && cursorText) {
                    cursor.classList.add('cursor-view');
                    cursorFollower.classList.add('cursor-view');
                    cursorText.textContent = 'View';
                    cursorText.style.opacity = '1';
                }
            });

            screen.addEventListener('mouseleave', () => {
                overlay.style.opacity = '1';
                overlay.style.visibility = 'visible';
                iframe.style.pointerEvents = 'none';
                
                // Cursor efekti reset
                const cursor = document.querySelector('.cursor');
                const cursorFollower = document.querySelector('.cursor-follower');
                const cursorText = document.querySelector('.cursor-text');
                
                if (cursor && cursorFollower && cursorText) {
                    cursor.classList.remove('cursor-view');
                    cursorFollower.classList.remove('cursor-view');
                    cursorText.style.opacity = '0';
                    setTimeout(() => {
                        cursorText.textContent = '';
                    }, 300);
                }
            });

            // Dokunma etkileşimi
            screen.addEventListener('touchstart', () => {
                clearTimeout(touchTimeout);
                overlay.style.opacity = '0';
                overlay.style.visibility = 'hidden';
                iframe.style.pointerEvents = 'auto';
            });

            screen.addEventListener('touchend', () => {
                touchTimeout = setTimeout(() => {
                    overlay.style.opacity = '1';
                    overlay.style.visibility = 'visible';
                    iframe.style.pointerEvents = 'none';
                }, 3000);
            });
        }
    });
}

// Proje kartları animasyonu
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);

        // Kart hover efekti
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Back home button
function initBackHomeButton() {
    const backHome = document.querySelector('.back-home');
    if (backHome) {
        backHome.addEventListener('mouseenter', () => {
            backHome.style.transform = 'translateY(-5px)';
            const icon = backHome.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(-5px)';
            }
        });

        backHome.addEventListener('mouseleave', () => {
            backHome.style.transform = 'translateY(0)';
            const icon = backHome.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(0)';
            }
        });
    }
}

// Tech stack
function initTechStack() {
    const techItems = document.querySelectorAll('.tech-stack span');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });
}

// Visit buttons
function initVisitButtons() {
    const visitButtons = document.querySelectorAll('.visit-btn');
    visitButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px)';
            const icon = button.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(5px)';
            }
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            const icon = button.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(0)';
            }
        });
    });
}

// iframe'lerin yüklenmesini bekle
window.addEventListener('load', () => {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        iframe.addEventListener('load', () => {
            const overlay = iframe.parentElement.querySelector('.iframe-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
                overlay.style.visibility = 'visible';
            }
        });
    });
});

// Scroll reveal efekti
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.project-card');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
});