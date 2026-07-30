document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       🧭 HEADER & NAVIGATION TOGGLE
       ========================================================================== */
    const header = document.getElementById("header");
    const mobileToggle = document.getElementById("mobileToggle");
    const navItems = document.getElementById("navItems");
    const navLinks = document.querySelectorAll(".nav-items a");

    if (mobileToggle && navItems) {
        mobileToggle.addEventListener("click", () => {
            navItems.classList.toggle("active");
            const icon = mobileToggle.querySelector("i");
            if (navItems.classList.contains("active")) {
                icon.className = "fa-solid fa-xmark";
            } else {
                icon.className = "fa-solid fa-bars";
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navItems) navItems.classList.remove("active");
            if (mobileToggle) mobileToggle.querySelector("i").className = "fa-solid fa-bars";
        });
    });

    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    /* ==========================================================================
       🤖 CANDIDATE AI ASSISTANT CHAT BOT CONSOLE
       ========================================================================== */
    const chatStream = document.getElementById("chatStream");
    const chatInputText = document.getElementById("chatInputText");

    const kb = [
        {
            keywords: ["botify", "whatsapp", "saas", "railway"],
            reply: "🚀 <b>Botify — Multi-Tenant WhatsApp Bot SaaS</b> (<i>✓ Live Railway Deployment</i>)<br>Production-grade multi-tenant SaaS platform enabling retail businesses to deploy AI agents with Groq LLM integration, appointment booking, subscription plans, and instant QR sessions.<br>👉 Live App: <a href='https://web-production-c6fdbb.up.railway.app/login' target='_blank' style='color:#38bdf8; font-weight:700;'>web-production-c6fdbb.up.railway.app/login</a>"
        },
        {
            keywords: ["dream", "elevate", "bakery", "cake", "baking"],
            reply: "🎂 <b>The Dream Elevate</b> (<i>✓ Live Client Website</i>)<br>Premium baking tools, cake decorating equipment, & professional bakery supplies e-commerce platform.<br>👉 Live Site: <a href='https://dream-elevate.vercel.app/' target='_blank' style='color:#38bdf8; font-weight:700;'>dream-elevate.vercel.app</a>"
        },
        {
            keywords: ["saivi", "boutique", "dress", "fashion", "upi"],
            reply: "👗 <b>The Saivi Collection</b> (<i>✓ Live Client Website</i>)<br>High-fashion boutique e-commerce platform featuring dynamic dress catalog, instant UPI payment QR integration, and WhatsApp orders.<br>👉 Live Site: <a href='https://saivi-collection.vercel.app/' target='_blank' style='color:#38bdf8; font-weight:700;'>saivi-collection.vercel.app</a>"
        },
        {
            keywords: ["vizro", "freelancing", "agency", "platform"],
            reply: "🌐 <b>VIZRO VERTEX</b> (<i>Mukil's Freelancing Agency Platform</i>)<br>Custom software engineering and AI bot integration suite built by Mukil.<br>👉 Live Page: <a href='https://vizro.vercel.app/' target='_blank' style='color:#38bdf8; font-weight:700;'>vizro.vercel.app</a>"
        },
        {
            keywords: ["jarvis", "prime", "voice", "speech", "react"],
            reply: "🎙️ <b>Jarvis Prime AI Agent</b> (<i>✓ Production Build</i>)<br>Voice-controlled autonomous AI desktop assistant built in Python with speech recognition, system command execution, ReAct cognitive reasoning loop, and web search telemetry."
        },
        {
            keywords: ["billing", "sgc", "electron", "pdf", "invoice"],
            reply: "💻 <b>SGC Billing Desktop Application</b><br>Desktop invoice generation software built with Electron and React featuring Puppeteer PDF rendering and Google Drive OAuth backup."
        },
        {
            keywords: ["telegram", "groq", "handwritten", "bot"],
            reply: "🤖 <b>AI Billing Automation Bot</b><br>AI-powered handwritten invoice parser built with Groq Vision API and Telegram Bot interface for instant PDF receipt generation and Cloudinary hosting."
        },
        {
            keywords: ["infosys", "java", "certification"],
            reply: "☕ Mukil is an <b>Infosys Certified Java Programmer</b> (2024)! Accredited in Object-Oriented Programming, Data Structures, Algorithms, and Core Java development."
        },
        {
            keywords: ["internship", "hero", "ibm", "experience"],
            reply: "🏢 Mukil has completed 2 internships:<br>1. <b>Hero MotoCorp Ltd.</b> – R&D Division Intern (1 Month automotive research & product development).<br>2. <b>IBM</b> – AI & Automation Virtual Internship (2026)."
        },
        {
            keywords: ["education", "college", "cgpa", "vsb", "school"],
            reply: "🎓 <b>Education Details</b>:<br>• <b>B.Tech IT</b> at VSB Engineering College, Karur (2023 – 2027) | Current CGPA: <b>7.9 / 10</b><br>• <b>Class XII (HSC)</b> at Bharani Park Matric Hr. Sec. School | <b>69.33%</b>."
        },
        {
            keywords: ["contact", "email", "phone", "github", "linkedin", "leetcode"],
            reply: "📬 <b>Contact Mukil S</b>:<br>• Email: mukilarasu55@gmail.com<br>• Phone: +91 90800 30538<br>• GitHub: github.com/Mukil630<br>• LinkedIn: linkedin.com/in/mukilarasu-s-333771302<br>• LeetCode: leetcode.com/u/Mukil55"
        }
    ];

    window.sendUserChatMessage = function() {
        if (!chatInputText || !chatStream) return;
        const msg = chatInputText.value.trim();
        if (!msg) return;

        appendChatBubble(msg, "user");
        chatInputText.value = "";

        setTimeout(() => {
            const botReply = generateBotResponse(msg);
            appendChatBubble(botReply, "bot");
        }, 600);
    };

    window.askAiConsole = function(promptText) {
        if (chatInputText) {
            chatInputText.value = promptText;
            window.sendUserChatMessage();
            document.getElementById("ai-assistant").scrollIntoView({ behavior: "smooth" });
        }
    };

    function appendChatBubble(text, sender) {
        const msgDiv = document.createElement("div");
        msgDiv.className = `chat-msg ${sender}`;

        const avatar = document.createElement("div");
        avatar.className = "chat-avatar";
        avatar.innerHTML = sender === "bot" ? '<i class="fa-solid fa-robot"></i>' : '<i class="fa-solid fa-user"></i>';

        const bubble = document.createElement("div");
        bubble.className = "chat-bubble";
        bubble.innerHTML = text;

        msgDiv.appendChild(avatar);
        msgDiv.appendChild(bubble);
        chatStream.appendChild(msgDiv);
        chatStream.scrollTop = chatStream.scrollHeight;
    }

    function generateBotResponse(input) {
        const lower = input.toLowerCase();
        for (const item of kb) {
            if (item.keywords.some(kw => lower.includes(kw))) {
                return item.reply;
            }
        }
        return `Mukil is a <b>Full-Stack Developer & AI Engineer</b> (B.Tech IT @ VSB Engineering College, 7.9 CGPA). He has built live projects like <b>Botify WhatsApp Bot SaaS</b> (Live Railway), <b>The Dream Elevate</b> (Live Client), <b>The Saivi Collection</b> (Live Client), and <b>Jarvis Prime AI Agent</b>. Type a project name to inspect!`;
    }

    /* ==========================================================================
       📊 METRIC COUNTER ANIMATION
       ========================================================================== */
    let metricsAnimated = false;
    function checkMetricsScroll() {
        if (metricsAnimated) return;
        const metricsEl = document.querySelector(".hero-metrics");
        if (!metricsEl) return;
        const rect = metricsEl.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.85) {
            metricsAnimated = true;
            document.querySelectorAll(".metric-num").forEach(item => {
                const target = parseFloat(item.getAttribute("data-target"));
                if (target) {
                    let current = 0;
                    const step = target > 5 ? 0.2 : 0.1;
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            item.textContent = target % 1 === 0 ? target : target.toFixed(1);
                            clearInterval(timer);
                        } else {
                            item.textContent = current % 1 === 0 ? Math.floor(current) : current.toFixed(1);
                        }
                    }, 40);
                }
            });
        }
    }

    window.addEventListener("scroll", checkMetricsScroll);
    checkMetricsScroll();

    /* ==========================================================================
       🚀 PROJECT CATEGORY FILTERING
       ========================================================================== */
    window.filterProjects = function(category) {
        const filterBtns = document.querySelectorAll(".filter-btn");
        filterBtns.forEach(btn => btn.classList.remove("active"));
        event.target.classList.add("active");

        const cards = document.querySelectorAll(".projects-grid .project-card");
        cards.forEach(card => {
            const cardCat = card.getAttribute("data-cat");
            if (category === "all" || cardCat.includes(category)) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    };

    /* ==========================================================================
       🪟 PROJECT MODAL INSPECT & OPEN SANDBOX
       ========================================================================== */
    const projectDetails = {
        botify: {
            title: "Botify — Multi-Tenant WhatsApp Bot SaaS",
            badge: "✓ Live Railway Deployment",
            badgeClass: "live-railway",
            tech: ["Multi-Tenant SaaS", "WhatsApp Bot Engine", "Groq LLM API", "React / Node", "PostgreSQL"],
            description: "Production-grade multi-tenant WhatsApp Bot SaaS platform enabling retail businesses to deploy AI agents with Groq LLM integration, appointment booking, subscription plans, and instant QR sessions.",
            liveLink: "https://web-production-c6fdbb.up.railway.app/login",
            linkText: "Open Live Railway Deployment →"
        },
        dreamelevate: {
            title: "The Dream Elevate",
            badge: "✓ Live Client Website",
            badgeClass: "live-client",
            tech: ["Bakery Supplies", "Baking Tools Store", "E-Commerce Web", "WhatsApp Ordering", "React / Node"],
            description: "Premium baking tools, cake decorating equipment, & professional bakery supplies e-commerce platform featuring dynamic item catalog viewer and direct WhatsApp order trigger.",
            liveLink: "https://dream-elevate.vercel.app/",
            linkText: "Open Live Client Website →"
        },
        saivi: {
            title: "The Saivi Collection",
            badge: "✓ Live Client Website",
            badgeClass: "live-client",
            tech: ["Boutique E-Commerce", "UPI Payment QR", "WhatsApp Orders", "Fashion Store", "JavaScript"],
            description: "High-fashion boutique e-commerce platform featuring dynamic dress catalog, instant UPI payment QR integration, and direct WhatsApp order placement.",
            liveLink: "https://saivi-collection.vercel.app/",
            linkText: "Open Live Client Website →"
        },
        jarvis: {
            title: "Jarvis Prime AI Agent",
            badge: "✓ Production Build",
            badgeClass: "production",
            tech: ["Python", "Speech Synthesis", "ReAct AI Agent", "System Automation", "REST APIs"],
            description: "Voice-controlled autonomous AI desktop assistant built in Python with speech recognition, system command execution, ReAct cognitive reasoning loop, and web search telemetry.",
            liveLink: "https://github.com/Mukil630",
            linkText: "Inspect GitHub Code →"
        },
        sgc: {
            title: "SGC Billing – Desktop Invoice Application",
            badge: "✓ Freelance Desktop App",
            badgeClass: "freelance",
            tech: ["Electron", "React", "Puppeteer PDF", "Google Drive OAuth", "Node.js"],
            description: "Desktop invoice generation software built with Electron and React featuring Puppeteer PDF rendering and Google Drive OAuth cloud backup.",
            liveLink: "https://github.com/Mukil630",
            linkText: "Inspect GitHub Code →"
        },
        "telegram-ocr": {
            title: "AI Billing Automation Bot",
            badge: "✓ Groq & Telegram Bot",
            badgeClass: "freelance",
            tech: ["Groq Vision API", "Telegram Bot API", "Cloudinary", "Python"],
            description: "AI-powered handwritten invoice parser built with Groq Vision API and Telegram Bot for instant PDF receipt generation and Cloudinary hosting.",
            liveLink: "https://github.com/Mukil630",
            linkText: "Inspect GitHub Code →"
        }
    };

    window.openProjectModal = function(key) {
        const modal = document.getElementById("projectModal");
        const body = document.getElementById("modalContentBody");
        const details = projectDetails[key];

        if (modal && body && details) {
            body.innerHTML = `
                <div style="margin-bottom:14px;">
                    <span class="project-type-badge ${details.badgeClass}">${details.badge}</span>
                </div>
                <h2 style="font-size:22px; font-weight:800; margin-bottom:12px; color:var(--text-primary);">${details.title}</h2>
                <p style="font-size:14px; color:var(--text-secondary); line-height:1.6; margin-bottom:20px;">${details.description}</p>
                <h4 style="font-size:13px; font-weight:700; margin-bottom:10px; color:var(--text-primary);">Technology & Key Modules:</h4>
                <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:28px;">
                    ${details.tech.map(t => `<span class="ptag">${t}</span>`).join('')}
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-light); padding-top:18px;">
                    <a href="${details.liveLink}" target="_blank" class="btn btn-blue btn-sm"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${details.linkText}</a>
                    <button class="btn btn-outline btn-sm" onclick="closeProjectModal()">Close Modal</button>
                </div>
            `;
            modal.classList.add("active");
        }
    };

    window.closeProjectModal = function() {
        const modal = document.getElementById("projectModal");
        if (modal) modal.classList.remove("active");
    };

    /* ==========================================================================
       📋 CLIPBOARD & TOAST NOTIFICATION
       ========================================================================== */
    window.copyText = function(text, label) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(`${label} copied: ${text}`);
        });
    };

    function showToast(msg) {
        const toast = document.getElementById("toast");
        if (!toast) return;
        toast.textContent = msg;
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }

    /* ==========================================================================
       📝 CONTACT FORM SUBMISSION
       ========================================================================== */
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            showToast("Message Sent! Thank you mapla, Mukilarasu will respond soon.");
            contactForm.reset();
        });
    }
});
