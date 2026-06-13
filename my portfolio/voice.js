/* ==========================================
   ANUSHKA AI - VOICE.JS
   Voice Assistant System

   Features:
   - Speech Recognition
   - Voice Commands
   - Voice Input Button
   - Speech Synthesis
   - Auto Chat Integration
   - Continuous Listening Option
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       ELEMENTS
    ========================================== */

    const voiceBtn =
        document.getElementById("voiceBtn");

    const userInput =
        document.getElementById("userInput");

    const sendBtn =
        document.getElementById("sendBtn");

    /* ==========================================
       BROWSER SUPPORT CHECK
    ========================================== */

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        console.warn(
            "Speech Recognition not supported."
        );

        if (voiceBtn) {

            voiceBtn.disabled = true;

            voiceBtn.innerHTML =
                '<i class="fas fa-microphone-slash"></i>';
        }

        return;
    }

    /* ==========================================
       SPEECH RECOGNITION
    ========================================== */

    const recognition =
        new SpeechRecognition();

    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.lang = "en-US";

    /* ==========================================
       SPEAK FUNCTION
    ========================================== */

    window.speakText = function (text) {

        if (!window.speechSynthesis) return;

        speechSynthesis.cancel();

        const speech =
            new SpeechSynthesisUtterance(text);

        speech.rate = 1;

        speech.pitch = 1;

        speech.volume = 1;

        const voices =
            speechSynthesis.getVoices();

        const preferredVoice =
            voices.find(
                voice =>
                    voice.lang.includes("en")
            );

        if (preferredVoice) {
            speech.voice = preferredVoice;
        }

        speechSynthesis.speak(speech);
    };

    /* ==========================================
       STOP SPEAKING
    ========================================== */

    window.stopSpeaking = function () {

        speechSynthesis.cancel();
    };

    /* ==========================================
       START LISTENING
    ========================================== */

    function startListening() {

        try {

            recognition.start();

        } catch (error) {

            console.log(
                "Recognition already running."
            );
        }
    }

    /* ==========================================
       VOICE BUTTON CLICK
    ========================================== */

    if (voiceBtn) {

        voiceBtn.addEventListener(
            "click",
            startListening
        );
    }

    /* ==========================================
       LISTENING START
    ========================================== */

    recognition.onstart = () => {

        voiceBtn.classList.add(
            "listening"
        );

        voiceBtn.innerHTML =
            '<i class="fas fa-microphone"></i>';

        console.log(
            "Voice recognition started"
        );
    };

    /* ==========================================
       LISTENING END
    ========================================== */

    recognition.onend = () => {

        voiceBtn.classList.remove(
            "listening"
        );

        voiceBtn.innerHTML =
            '<i class="fas fa-microphone"></i>';
    };

    /* ==========================================
       SPEECH RESULT
    ========================================== */

    recognition.onresult = event => {

        const transcript =
            event.results[0][0].transcript;

        console.log(
            "Voice Input:",
            transcript
        );

        userInput.value =
            transcript;

        processVoiceCommand(
            transcript
        );
    };

    /* ==========================================
       RECOGNITION ERROR
    ========================================== */

    recognition.onerror = event => {

        console.error(
            "Voice Error:",
            event.error
        );

        voiceBtn.classList.remove(
            "listening"
        );
    };

    /* ==========================================
       VOICE COMMANDS
    ========================================== */

    function processVoiceCommand(
        command
    ) {

        const text =
            command.toLowerCase();

        /* ----------------------------
           Stop Speaking
        ---------------------------- */

        if (
            text.includes("stop speaking")
        ) {

            stopSpeaking();

            return;
        }

        /* ----------------------------
           Scroll Down
        ---------------------------- */

        if (
            text.includes("scroll down")
        ) {

            window.scrollBy({
                top: 600,
                behavior: "smooth"
            });

            return;
        }

        /* ----------------------------
           Scroll Up
        ---------------------------- */

        if (
            text.includes("scroll up")
        ) {

            window.scrollBy({
                top: -600,
                behavior: "smooth"
            });

            return;
        }

        /* ----------------------------
           Go Home
        ---------------------------- */

        if (
            text.includes("go home")
        ) {

            document
                .getElementById("home")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

            return;
        }

        /* ----------------------------
           Open Projects
        ---------------------------- */

        if (
            text.includes("show projects")
        ) {

            document
                .getElementById("projects")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

            return;
        }

        /* ----------------------------
           Open Skills
        ---------------------------- */

        if (
            text.includes("show skills")
        ) {

            document
                .getElementById("skills")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

            return;
        }

        /* ----------------------------
           Open Resume
        ---------------------------- */

        if (
            text.includes("show resume")
        ) {

            document
                .getElementById("resume")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

            return;
        }

        /* ----------------------------
           Contact Section
        ---------------------------- */

        if (
            text.includes("contact")
        ) {

            document
                .getElementById("contact")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

            return;
        }

        /* ----------------------------
           Ask AI Automatically
        ---------------------------- */

        if (sendBtn) {

            sendBtn.click();
        }
    }

    /* ==========================================
       KEYBOARD SHORTCUT
       CTRL + SHIFT + V
    ========================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.ctrlKey &&
                event.shiftKey &&
                event.key.toLowerCase() === "v"
            ) {

                startListening();
            }
        }
    );

    /* ==========================================
       AUTO SPEAK GREETING
    ========================================== */

    window.addEventListener(
        "load",
        () => {

            setTimeout(() => {

                const greeting =
                    `Welcome to ANUSHKA AI.
                     Your interactive AI portfolio.
                     You can speak with me using the microphone button.`;

                speakText(greeting);

            }, 2500);
        }
    );

    /* ==========================================
       ENHANCED CHATBOT INTEGRATION
    ========================================== */

    window.readLastBotMessage =
        function () {

            const botMessages =
                document.querySelectorAll(
                    ".bot-message"
                );

            if (
                botMessages.length > 0
            ) {

                const latest =
                    botMessages[
                        botMessages.length - 1
                    ];

                speakText(
                    latest.innerText
                );
            }
        };

    console.log(
        "ANUSHKA AI Voice Assistant Loaded"
    );
});

/* ==========================================
   OPTIONAL CSS FOR VOICE BUTTON
========================================== */

/*
Add this to style.css

.listening {

    animation:
        pulseVoice 1s infinite;

    background:white !important;

    color:black !important;
}

@keyframes pulseVoice {

    0% {
        transform:scale(1);
    }

    50% {
        transform:scale(1.15);
    }

    100% {
        transform:scale(1);
    }
}
*/