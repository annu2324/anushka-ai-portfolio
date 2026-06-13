/* ==========================================
   ANUSHKA AI - CHATBOT.JS
   Gemini AI Digital Twin

   Features:
   - Gemini API Integration
   - Suggested Prompts
   - Typing Animation
   - Portfolio Knowledge Base
   - AI Personality
   - Local Memory
========================================== */

/* ==========================================
   GEMINI API CONFIG
========================================== */

/*
   Replace with your Gemini API Key

   Get API Key:
   https://aistudio.google.com/app/apikey
*/

const GEMINI_API_KEY = "AQ.Ab8RN6KakSC7zvN7hrDc6e_D3G-wo5Bp-lvhME7U4ysUjNl5Eg";

const GEMINI_URL =
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

/* ==========================================
   PORTFOLIO KNOWLEDGE BASE
========================================== */

const PORTFOLIO_CONTEXT = `

You are ANUSHKA AI.

You are a digital twin of Anushka Paigwar.

PERSONALITY:

- Professional
- Friendly
- Confident
- Helpful
- Future-focused

ABOUT ANUSHKA:

Name:
Anushka Paigwar

Role:
Frontend Developer
AI Builder
Future Full Stack Engineer

Current Focus:
- HTML
- CSS
- JavaScript
- Responsive Design
- DSA
- AI Applications

Future Goals:
- Full Stack Development
- Data Science
- Building AI Products

PROJECTS:

1. StudyPilot AI
AI-powered learning companion with:
- Personalized Roadmaps
- Quiz Generation
- Progress Tracking
- Weak Topic Detection

2. SkillNova AI
Adaptive AI learning platform.

Features:
- Learning Memory
- Personalized Teaching
- Capability Based Learning

3. Rolex Quantum
Luxury futuristic AI smartwatch concept.

SKILLS:

HTML: 90%
CSS: 85%
JavaScript: 75%
Responsive Design: 85%
DSA: 40%
AI Development: 70%

WHY HIRE ANUSHKA:

- Strong problem-solving mindset
- Passionate learner
- Builds real-world AI projects
- Strong frontend foundation
- Continuously improving technical skills

Always answer as if you represent Anushka professionally.

Keep responses concise, useful, and engaging.

`;

/* ==========================================
   ELEMENTS
========================================== */

const chatBox =
document.getElementById("chatBox");

const userInput =
document.getElementById("userInput");

const sendBtn =
document.getElementById("sendBtn");

const voiceBtn =
document.getElementById("voiceBtn");

const promptButtons =
document.querySelectorAll(
".suggested-prompts button"
);

/* ==========================================
   MEMORY
========================================== */

let chatHistory =
JSON.parse(
localStorage.getItem("anushka_ai_history")
) || [];

/* ==========================================
   MESSAGE CREATOR
========================================== */

function addMessage(message, type){

    const div =
    document.createElement("div");

    div.className =
    type === "user"
    ? "user-message"
    : "bot-message";

    div.innerHTML = message;

    chatBox.appendChild(div);

    chatBox.scrollTop =
    chatBox.scrollHeight;
}

/* ==========================================
   TYPING INDICATOR
========================================== */

function showTyping(){

    const typing =
    document.createElement("div");

    typing.className =
    "bot-message";

    typing.id =
    "typingIndicator";

    typing.innerHTML =
    `
    <div class="typing">
        <span></span>
        <span></span>
        <span></span>
    </div>
    `;

    chatBox.appendChild(typing);

    chatBox.scrollTop =
    chatBox.scrollHeight;
}

function removeTyping(){

    const typing =
    document.getElementById(
    "typingIndicator"
    );

    if(typing){
        typing.remove();
    }
}

/* ==========================================
   LOCAL PREDEFINED ANSWERS
========================================== */

function localAnswers(question){

    const q =
    question.toLowerCase();

    if(
        q.includes("about")
    ){
        return `
        Anushka Paigwar is a Frontend Developer and AI Builder passionate about creating intelligent products and modern web experiences.
        `;
    }

    if(
        q.includes("skills")
    ){
        return `
        Skills:
        HTML, CSS, JavaScript, Responsive Design, DSA and AI Development.
        `;
    }

    if(
        q.includes("project")
    ){
        return `
        Main Projects:
        StudyPilot AI,
        SkillNova AI,
        Rolex Quantum.
        `;
    }

    if(
        q.includes("hire")
    ){
        return `
        Anushka combines strong frontend skills, AI innovation, problem-solving ability and continuous learning.
        `;
    }

    return null;
}

/* ==========================================
   GEMINI REQUEST
========================================== */

async function askGemini(userMessage){

    try{

        const response =
        await fetch(
        GEMINI_URL,
        {
            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:JSON.stringify({

                contents:[

                    {
                        parts:[
                            {
                                text:
                                PORTFOLIO_CONTEXT +
                                "\n\nUser: " +
                                userMessage
                            }
                        ]
                    }

                ]
            })
        });

        const data =
        await response.json();

        return data
        .candidates[0]
        .content
        .parts[0]
        .text;

    }

    catch(error){

        console.error(error);

        return `
        Sorry, the AI service is currently unavailable.
        Please try again later.
        `;
    }
}

/* ==========================================
   SEND MESSAGE
========================================== */

async function sendMessage(){

    const message =
    userInput.value.trim();

    if(!message) return;

    addMessage(
        message,
        "user"
    );

    userInput.value = "";

    chatHistory.push({
        role:"user",
        content:message
    });

    localStorage.setItem(
        "anushka_ai_history",
        JSON.stringify(chatHistory)
    );

    showTyping();

    const localResponse =
    localAnswers(message);

    if(localResponse){

        setTimeout(()=>{

            removeTyping();

            addMessage(
                localResponse,
                "bot"
            );

            speakResponse(
                localResponse
            );

        },700);

        return;
    }

    const aiResponse =
    await askGemini(message);

    removeTyping();

    addMessage(
        aiResponse,
        "bot"
    );

    speakResponse(aiResponse);

    chatHistory.push({
        role:"assistant",
        content:aiResponse
    });

    localStorage.setItem(
        "anushka_ai_history",
        JSON.stringify(chatHistory)
    );
}

/* ==========================================
   BUTTON EVENTS
========================================== */

if(sendBtn){

    sendBtn.addEventListener(
        "click",
        sendMessage
    );
}

if(userInput){

    userInput.addEventListener(
        "keypress",
        e => {

            if(e.key === "Enter"){

                sendMessage();
            }

        }
    );
}

/* ==========================================
   SUGGESTED PROMPTS
========================================== */

promptButtons.forEach(button=>{

    button.addEventListener(
        "click",
        ()=>{

            userInput.value =
            button.innerText;

            sendMessage();
        }
    );

});

/* ==========================================
   VOICE OUTPUT
========================================== */

function speakResponse(text){

    if(
        !window.speechSynthesis
    ) return;

    const speech =
    new SpeechSynthesisUtterance(
        text
    );

    speech.rate = 1;
    speech.pitch = 1;

    speechSynthesis.speak(
        speech
    );
}

/* ==========================================
   GREETING MESSAGE
========================================== */

window.addEventListener(
"load",
()=>{

    setTimeout(()=>{

        addMessage(
        `
        👋 Hello!

        I'm ANUSHKA AI.

        Ask me about:
        • Skills
        • Projects
        • Learning Journey
        • Career Goals
        • Technical Experience
        `,
        "bot"
        );

    },500);

});

/* ==========================================
   DEBUG
========================================== */

console.log(
"ANUSHKA AI Chatbot Loaded Successfully"
);