/* ==========================================
   ANUSHKA AI - APP.JS
   Core Functionality
   - AOS Animations
   - Typed.js Hero Text
   - Mobile Navigation
   - Sticky Navbar
   - Animated Counters
   - Chart.js Skills Dashboard
   - Smooth Scroll
   - Contact Form Handler
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       AOS INITIALIZATION
    ========================================== */

    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: "ease-in-out"
    });

    /* ==========================================
       TYPED HERO TEXT
    ========================================== */

    if (document.querySelector("#typing")) {

        new Typed("#typing", {
            strings: [
                "Frontend Developer",
                "AI Builder",
                "Future Full Stack Engineer",
                "JavaScript Enthusiast",
                "Digital Innovator"
            ],

            typeSpeed: 60,
            backSpeed: 35,
            backDelay: 1800,
            loop: true,
            showCursor: true
        });
    }

    /* ==========================================
       MOBILE NAVIGATION
    ========================================== */

    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {

        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });

        document.querySelectorAll(".nav-links a")
            .forEach(link => {

                link.addEventListener("click", () => {
                    navLinks.classList.remove("active");
                });

            });
    }

    /* ==========================================
       STICKY NAVBAR EFFECT
    ========================================== */

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar.style.background =
                "rgba(15,17,17,0.95)";

            navbar.style.boxShadow =
                "0 10px 25px rgba(0,0,0,0.4)";
        }

        else {

            navbar.style.background =
                "rgba(15,17,17,0.7)";

            navbar.style.boxShadow =
                "none";
        }

    });

    /* ==========================================
       SMOOTH SCROLLING
    ========================================== */

    document.querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener("click", function (e) {

                e.preventDefault();

                const target =
                    document.querySelector(
                        this.getAttribute("href")
                    );

                if (target) {

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }

            });

        });

    /* ==========================================
       COUNTER ANIMATION
    ========================================== */

    const counters =
        document.querySelectorAll(".counter");

    const counterObserver =
        new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const counter = entry.target;

                    const target =
                        +counter.dataset.target;

                    let count = 0;

                    const increment =
                        target / 100;

                    const updateCounter = () => {

                        if (count < target) {

                            count += increment;

                            counter.innerText =
                                Math.ceil(count);

                            requestAnimationFrame(
                                updateCounter
                            );
                        }

                        else {

                            counter.innerText =
                                target;
                        }
                    };

                    updateCounter();

                    counterObserver.unobserve(
                        counter
                    );
                }

            });

        }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    /* ==========================================
       CHART.JS SKILLS CHART
    ========================================== */

    const chartCanvas =
        document.getElementById("skillsChart");

    if (chartCanvas) {

        new Chart(chartCanvas, {

            type: "radar",

            data: {

                labels: [
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "Responsive",
                    "DSA",
                    "AI Development"
                ],

                datasets: [

                    {
                        label: "Skill Level",

                        data: [
                            90,
                            85,
                            75,
                            85,
                            40,
                            70
                        ],

                        backgroundColor:
                            "rgba(255,255,255,0.15)",

                        borderColor:
                            "#ffffff",

                        borderWidth: 2,

                        pointBackgroundColor:
                            "#ffffff",

                        pointRadius: 4
                    }

                ]
            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {

                        labels: {

                            color: "#ffffff",

                            font: {
                                family:
                                    "Times New Roman"
                            }
                        }
                    }
                },

                scales: {

                    r: {

                        angleLines: {
                            color:
                                "rgba(255,255,255,0.1)"
                        },

                        grid: {
                            color:
                                "rgba(255,255,255,0.1)"
                        },

                        pointLabels: {

                            color: "#ffffff",

                            font: {
                                size: 14
                            }
                        },

                        ticks: {

                            color: "#ffffff",

                            backdropColor:
                                "transparent"
                        }
                    }
                }
            }

        });

        chartCanvas.parentElement.style.height =
            "500px";
    }

    /* ==========================================
       CONTACT FORM
    ========================================== */

    const contactForm =
        document.querySelector(".contact-form");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (e) {

                e.preventDefault();

                const button =
                    contactForm.querySelector(
                        "button"
                    );

                const originalText =
                    button.innerText;

                button.innerText =
                    "Sending...";

                button.disabled = true;

                setTimeout(() => {

                    button.innerText =
                        "Message Sent ✓";

                    button.style.background =
                        "#ffffff";

                    button.style.color =
                        "#000000";

                    const success =
                        document.createElement(
                            "div"
                        );

                    success.classList.add(
                        "success-message"
                    );

                    success.innerText =
                        "Thank you! Your message has been received.";

                    contactForm.appendChild(
                        success
                    );

                    contactForm.reset();

                    setTimeout(() => {

                        success.remove();

                        button.innerText =
                            originalText;

                        button.disabled = false;

                    }, 4000);

                }, 1500);

            });
    }

    /* ==========================================
       ACTIVE NAV LINK
    ========================================== */

    const sections =
        document.querySelectorAll("section");

    const navItems =
        document.querySelectorAll(
            ".nav-links a"
        );

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.clientHeight;

            if (
                pageYOffset >= sectionTop &&
                pageYOffset <
                sectionTop + sectionHeight
            ) {
                current = section.getAttribute("id");
            }
        });

        navItems.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${current}`
            ) {
                link.classList.add("active");
            }

        });

    });

    /* ==========================================
       HERO BUTTON ANIMATION
    ========================================== */

    const heroButtons =
        document.querySelectorAll(
            ".primary-btn, .secondary-btn"
        );

    heroButtons.forEach(button => {

        button.addEventListener(
            "mouseenter",
            () => {

                button.style.transform =
                    "translateY(-5px)";
            });

        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform =
                    "translateY(0)";
            });

    });

    /* ==========================================
       REVEAL ON SCROLL
    ========================================== */

    const revealElements =
        document.querySelectorAll(
            ".project-card, .skill-card, .resume-card, .timeline-item"
        );

    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "fade-in"
                        );
                    }

                });

            },
            {
                threshold: 0.1
            }
        );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* ==========================================
       CONSOLE SIGNATURE
    ========================================== */

    console.log(`
    ==========================================
           ANUSHKA AI PORTFOLIO
    ==========================================
           Interactive Digital Twin
           Built with HTML/CSS/JS
    ==========================================
    `);

});

/* ==========================================
   EMAILJS CONTACT FORM
========================================== */

emailjs.init("pjBYnPuDDLSdPHnbd");

const contactForm =
document.getElementById("contactForm");

if(contactForm){

    contactForm.addEventListener(
        "submit",
        function(e){

            e.preventDefault();

            const btn =
            this.querySelector("button");

            btn.innerText =
            "Sending...";

            emailjs.send(
                "service_2r201kc",
                "template_ggxggrd",
                {
                    from_name:
                    document.getElementById("name").value,

                    from_email:
                    document.getElementById("email").value,

                    message:
                    document.getElementById("message").value
                }
            )

            .then(() => {

                btn.innerText =
                "Message Sent ✓";

                alert(
                "Message sent successfully!"
                );

                this.reset();

                setTimeout(() => {

                    btn.innerText =
                    "Send Message";

                },3000);

            })

            .catch(error => {

                console.error(error);

                btn.innerText =
                "Send Message";

                alert(
                "Failed to send message."
                );

            });

        }
    );
}