// =====================================================
// AWESOME CHURCH INTERNATIONAL
// COMPLETE WEBSITE JAVASCRIPT
// =====================================================

document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {

    // =================================================
    // 1. MOBILE NAVIGATION
    // =================================================

    const menuToggle = document.getElementById("menu-toggle");
    const navigation = document.getElementById("navigation");

    function closeMenu() {

        if (!menuToggle || !navigation) return;

        navigation.classList.remove("active");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
    }

    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navigation.classList.toggle("active");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

        });

        // Close after selecting a navigation link.

        navigation.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", closeMenu);

        });

        // Close when clicking outside the navigation.

        document.addEventListener("click", (event) => {

            const clickedInsideMenu =
                navigation.contains(event.target) ||
                menuToggle.contains(event.target);

            if (!clickedInsideMenu) {
                closeMenu();
            }

        });

        // Close with Escape key.

        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });

        // Close the mobile menu when returning to desktop size.

        window.addEventListener("resize", () => {

            if (window.innerWidth > 800) {
                closeMenu();
            }

        });

    }


    // =================================================
    // 2. HEADER SCROLL EFFECT
    // =================================================

    const header = document.getElementById("header");

    function updateHeader() {

        if (!header) return;

        header.classList.toggle(
            "scrolled",
            window.scrollY > 50
        );

    }

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });


    // =================================================
    // 3. AUTOMATIC COPYRIGHT YEAR
    // =================================================

    const yearElement = document.getElementById("current-year");

    if (yearElement) {

        yearElement.textContent = new Date().getFullYear();

    }


    // =================================================
    // 4. GENERAL SCROLL REVEAL
    // =================================================

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(

            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.12
            }

        );

        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add("visible");

        });

    }


    // =================================================
    // 5. LEADERSHIP CARDS
    // HORIZONTAL ENTRANCE
    // LEFT TO RIGHT, THEN STABLE GRID
    // =================================================

    const leadershipGrids = document.querySelectorAll(
        ".leaders-grid"
    );

    leadershipGrids.forEach((grid) => {

        const cards = grid.querySelectorAll(".leader-card");

        if (!cards.length) return;

        function revealLeadershipCards() {

            cards.forEach((card, index) => {

                card.style.transitionDelay = `${index * 160}ms`;

                card.classList.add("show");

            });

        }

        if ("IntersectionObserver" in window) {

            const leadershipObserver = new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            revealLeadershipCards();

                            observer.unobserve(entry.target);

                        }

                    });

                },

                {
                    threshold: 0.12
                }

            );

            leadershipObserver.observe(grid);

        } else {

            revealLeadershipCards();

        }

    });


    // =================================================
    // 6. CONTACT FORM
    // =================================================

    const contactForm = document.getElementById("contact-form");

    const formStatus = document.getElementById("form-status");

    if (contactForm) {

        contactForm.addEventListener("submit", (event) => {

            event.preventDefault();

            if (!contactForm.checkValidity()) {

                contactForm.reportValidity();

                return;

            }

            if (formStatus) {

                formStatus.textContent =
                    "Your details have been entered successfully. The church website still needs an official email address or message-delivery service before messages can be sent.";

                formStatus.style.display = "block";

            } else {

                alert(
                    "The contact form is not connected to a message-delivery service yet."
                );

            }

        });

    }


    // =================================================
    // 7. GENERAL BUTTON AND LINK INTERACTIONS
    // =================================================

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // =================================================
    // WEBSITE INITIALIZATION COMPLETE
    // =================================================

    console.log("Awesome Church International website initialized.");

});