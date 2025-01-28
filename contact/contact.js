// Parçacık Sistemi
particlesJS('particles', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#6C63FF'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#6C63FF',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Form Animasyonları
const form = document.getElementById('contact-form');
const inputs = document.querySelectorAll('input, textarea');

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        gsap.to(input.nextElementSibling.nextElementSibling, {
            width: '100%',
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            gsap.to(input.nextElementSibling.nextElementSibling, {
                width: '0%',
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    });
});

// Form Gönderimi
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Form verilerini topla
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Buton animasyonu
    const btn = form.querySelector('.submit-btn');
    gsap.to(btn.querySelector('.btn-animation'), {
        scaleX: 1,
        duration: 0.3,
        ease: 'power2.out'
    });
    
    // Form gönderimi simülasyonu
    setTimeout(() => {
        gsap.to(btn.querySelector('.btn-animation'), {
            scaleX: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
        
        // Form temizleme
        form.reset();
    }, 2000);
});

// Sosyal Medya Butonları
const socialBtns = document.querySelectorAll('.social-btn');

socialBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        gsap.to(btn, {
            x: 10,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});