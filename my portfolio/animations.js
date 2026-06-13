/* ==========================================
   ANUSHKA AI - ANIMATIONS.JS
   Premium Startup Animations

   Features:
   - Floating Particles
   - Mouse Spotlight Effect
   - Scroll Progress Bar
   - Parallax Hero
   - Card Tilt Effect
   - Cursor Glow
   - Reveal Animations
   - Premium Micro Interactions
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       SCROLL PROGRESS BAR
    ========================================== */

    const progressBar =
        document.createElement("div");

    progressBar.id = "scrollProgress";

    document.body.appendChild(
        progressBar
    );

    window.addEventListener(
        "scroll",
        () => {

            const scrollTop =
                window.scrollY;

            const docHeight =
                document.documentElement
                .scrollHeight -
                window.innerHeight;

            const progress =
                (scrollTop / docHeight) * 100;

            progressBar.style.width =
                progress + "%";
        }
    );

    /* ==========================================
       CURSOR GLOW EFFECT
    ========================================== */

    const glow =
        document.createElement("div");

    glow.classList.add(
        "cursor-glow"
    );

    document.body.appendChild(
        glow
    );

    document.addEventListener(
        "mousemove",
        e => {

            glow.style.left =
                e.clientX + "px";

            glow.style.top =
                e.clientY + "px";
        }
    );

    /* ==========================================
       HERO PARALLAX
    ========================================== */

    const hero =
        document.querySelector(
            ".hero"
        );

    window.addEventListener(
        "scroll",
        () => {

            const scrolled =
                window.scrollY;

            if (hero) {

                hero.style.transform =
                    `translateY(${scrolled * 0.2}px)`;
            }
        }
    );

    /* ==========================================
       FLOATING PARTICLES
    ========================================== */

    createParticles();

    function createParticles() {

        const particleContainer =
            document.createElement(
                "div"
            );

        particleContainer.classList.add(
            "particles-container"
        );

        document.body.appendChild(
            particleContainer
        );

        for (
            let i = 0;
            i < 50;
            i++
        ) {

            const particle =
                document.createElement(
                    "span"
                );

            particle.classList.add(
                "particle"
            );

            particle.style.left =
                Math.random() * 100 + "%";

            particle.style.top =
                Math.random() * 100 + "%";

            particle.style.animationDelay =
                Math.random() * 8 + "s";

            particle.style.animationDuration =
                8 + Math.random() * 10 + "s";

            particleContainer.appendChild(
                particle
            );
        }
    }

    /* ==========================================
       CARD TILT EFFECT
    ========================================== */

    const cards =
        document.querySelectorAll(
            ".project-card, .skill-card, .resume-card, .glass-card"
        );

    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            e => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    e.clientX -
                    rect.left;

                const y =
                    e.clientY -
                    rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    (y - centerY) / 15;

                const rotateY =
                    (centerX - x) / 15;

                card.style.transform =
                    `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-8px)
                    `;
            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    `
                    perspective(1000px)
                    rotateX(0)
                    rotateY(0)
                    translateY(0)
                    `;
            }
        );
    });

    /* ==========================================
       BUTTON RIPPLE EFFECT
    ========================================== */

    const buttons =
        document.querySelectorAll(
            ".primary-btn, .secondary-btn, button"
        );

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function (e) {

                const ripple =
                    document.createElement(
                        "span"
                    );

                ripple.classList.add(
                    "ripple"
                );

                const rect =
                    this.getBoundingClientRect();

                ripple.style.left =
                    e.clientX -
                    rect.left +
                    "px";

                ripple.style.top =
                    e.clientY -
                    rect.top +
                    "px";

                this.appendChild(
                    ripple
                );

                setTimeout(() => {

                    ripple.remove();

                }, 700);
            }
        );
    });

    /* ==========================================
       SECTION REVEAL
    ========================================== */

    const revealSections =
        document.querySelectorAll(
            "section"
        );

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );
                        }
                    }
                );
            },
            {
                threshold: 0.15
            }
        );

    revealSections.forEach(
        section => {

            revealObserver.observe(
                section
            );
        }
    );

    /* ==========================================
       STAGGER PROJECT ANIMATION
    ========================================== */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );

    projectCards.forEach(
        (card, index) => {

            card.style.animationDelay =
                `${index * 0.15}s`;
        }
    );

    /* ==========================================
       FLOATING ICONS
    ========================================== */

    const floatingItems =
        document.querySelectorAll(
            ".floating-icon"
        );

    floatingItems.forEach(
        item => {

            item.style.animationDuration =
                4 +
                Math.random() * 4 +
                "s";
        }
    );

    /* ==========================================
       NAVBAR SHRINK EFFECT
    ========================================== */

    const navbar =
        document.querySelector(
            ".navbar"
        );

    window.addEventListener(
        "scroll",
        () => {

            if (
                window.scrollY > 100
            ) {

                navbar.classList.add(
                    "navbar-small"
                );
            }

            else {

                navbar.classList.remove(
                    "navbar-small"
                );
            }
        }
    );

    /* ==========================================
       TEXT REVEAL EFFECT
    ========================================== */

    const headings =
        document.querySelectorAll(
            ".section-title h2"
        );

    headings.forEach(
        heading => {

            const observer =
                new IntersectionObserver(
                    entries => {

                        entries.forEach(
                            entry => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    heading.classList.add(
                                        "text-reveal"
                                    );
                                }
                            }
                        );
                    }
                );

            observer.observe(
                heading
            );
        }
    );

    console.log(
        "ANUSHKA AI Premium Animations Loaded"
    );

});