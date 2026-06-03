'use strict';

// ── Data pools ──────────────────────────────────────────────────────────────

const USERNAME_LABELS = [
    "Username",
    "Email Address",
    "Phone Number",
    "Soul ID",
    "Spirit Animal (spelled backwards)",
    "Mother's Maiden Name",
    "Blood Type",
    "Favorite Color (hex only)",
    "Government Name",
    "Star Sign",
    "Childhood Pet's Name",
    "Dream Username",
    "Alt Account Name",
    "LinkedIn Headline",
    "Nickname from 3rd grade",
    "What your cat calls you",
    "Your villain origin name",
];

const PASSWORD_RULES = [
    "Must contain at least 1 emoji 🎰",
    "Emojis are STRICTLY forbidden. No exceptions.",
    "Must be exactly 47 characters long (not 46, not 48)",
    "Must be a palindrome",
    "Must include your blood type",
    "Cannot contain the letter 'e' — at all",
    "Must be written in reverse",
    "Must rhyme with the word 'password'",
    "Cannot be a word that exists in any known language",
    "Must start AND end with a prime number",
    "Must include at least one phase of the moon: 🌑🌒🌓🌔🌕",
    "Must be your deepest darkest secret",
    "Must not be your actual password",
    "Must contain a haiku (5-7-5 syllable structure)",
    "Must include the chemical symbol for gold",
    "Must be something your future self would regret",
    "All vowels must be uppercase, all consonants lowercase",
    "Must contain the sound of one hand clapping",
    "Must be at least 128 characters — for security™",
    "Must be exactly 1 character — for simplicity™",
    "Cannot start with a letter, number, or symbol",
    "Must taste like strawberries (we can tell)",
];

const SUBTITLES = [
    "Where every login is a gamble",
    "Your credentials are just a suggestion",
    "Security through total confusion",
    "98% of users give up. Be the 2%.",
    "The house always wins.",
    "Terms & conditions: you will not log in today.",
    "Powered by vibes and randomness",
    "Your data is safe* (*not really)",
    "Winning is theoretically possible",
    "Please try again. And again. And again.",
];

const RESULTS_FAIL = [
    "🎰 Not a 7 in sight. Come back when you're luckier.",
    "😴 Come back tomorrow. Maybe the wheel likes you then.",
    "📅 Your login appointment has been rescheduled to never.",
    "🚪 The door was right there. You just needed 7-7-7.",
    "💀 Access denied. The bouncer doesn't like your vibe.",
    "🃏 House always wins. Try again, champ.",
    "🌀 So close! (You weren't close.)",
    "🔴 Not today. Not tomorrow either, probably.",
    "🕰️ Please try again in: [ERROR: time not found]",
    "🤡 The wheel has spoken. It said no.",
    "📬 We've sent your login to the wrong address. Our bad.",
    "🧿 Bad energy detected. Come back after yoga.",
    "🥲 Maybe try a different username. And password. And life.",
    "☕ Take a break. Have a coffee. Still won't work though.",
    "🌍 Somewhere in the world, someone just logged in. Not you.",
    "📉 Your luck is trending downward. Strong sell signal.",
    "🎻 We'd play a sad song but we're too busy denying you.",
    "🪞 Have you tried looking in a mirror and reconsidering?",
    "📖 Wrong answer. Please consult the 321-page Terms for hints.",
    "🏳️ It's okay to give up. Many great people have.",
];

const RESULTS_WIN = [
    "🎊 7-7-7! JACKPOT! You're in. We're as surprised as you are.",
    "🍀 7-7-7! The impossible happened. Welcome, chosen one.",
    "✨ 7-7-7! Against all odds, the wheel chose YOU. Don't waste it.",
    "🎰 7-7-7! We can't believe it either. Please don't tell anyone.",
];

const LUCK_LEVELS = [
    "💀 DOOMED",
    "🪦 HOPELESS",
    "😰 NERVOUS",
    "🤔 MAYBE?",
    "🍀 LUCKY",
    "⭐ BLESSED",
    "🎰 JACKPOT??",
    "❓ NO IDEA",
    "🎲 FLIP A COIN",
    "😈 CURSED",
    "🔮 UNKNOWABLE",
    "🌀 CHAOTIC",
];

const CAPTCHA_HINTS = [
    "Hint: we rotated the numbers for security",
    "Hint: the answer changes every 3 seconds",
    "Hint: there is no correct answer",
    "Hint: try thinking in base 7",
    "Hint: it's a trick question",
    "Hint: your gut feeling is wrong",
    "Hint: the answer is not a number",
    "Hint: we lost the answer key",
];

// ── State ───────────────────────────────────────────────────────────────────

let attempts = 0;
let labelIndex = 0;
let escapeCount = 0;

// ── Helpers ─────────────────────────────────────────────────────────────────

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// ── Username label cycling ───────────────────────────────────────────────────

function cycleLabelOnce() {
    labelIndex = (labelIndex + 1) % USERNAME_LABELS.length;
    const el = document.getElementById('username-label');
    el.textContent = USERNAME_LABELS[labelIndex];
    el.classList.add('flash-red');
    setTimeout(() => el.classList.remove('flash-red'), 350);
}

setInterval(cycleLabelOnce, 5000);

// ── Subtitle cycling ─────────────────────────────────────────────────────────

let subIndex = 0;
setInterval(() => {
    subIndex = (subIndex + 1) % SUBTITLES.length;
    const el = document.getElementById('subtitle');
    el.style.opacity = '0';
    setTimeout(() => {
        el.textContent = SUBTITLES[subIndex];
        el.style.opacity = '1';
    }, 400);
}, 3200);

// ── Password rule roulette ───────────────────────────────────────────────────

document.getElementById('password').addEventListener('keyup', () => {
    const el = document.getElementById('current-rule');
    el.textContent = rand(PASSWORD_RULES);
    el.classList.add('rule-flash');
    setTimeout(() => el.classList.remove('rule-flash'), 300);

    // Also randomly change the label itself
    if (Math.random() < 0.25) {
        document.querySelector('label[for="password"]').textContent =
            rand(["Password", "Secret Code", "Magic Words", "Pass-Phrase", "Spell", "The Forbidden Text", "Your Deepest Secret"]);
    }
});

// ── Captcha nonsense ─────────────────────────────────────────────────────────

let correctCaptcha = 0;

function refreshCaptcha() {
    const op = rand(['+', '-', '×']);
    let a, b;

    switch (op) {
        case '+': a = randInt(1, 50);  b = randInt(1, 50);  correctCaptcha = a + b; break;
        case '-': a = randInt(10, 99); b = randInt(1, a);   correctCaptcha = a - b; break;
        case '×': a = randInt(2, 12);  b = randInt(2, 12);  correctCaptcha = a * b; break;
    }

    document.getElementById('captcha-question').textContent = `${a} ${op} ${b} = ?`;
    document.getElementById('captcha-hint').textContent = rand(CAPTCHA_HINTS);
    document.getElementById('captcha-answer').value = '';

    // Randomly rename the captcha label
    document.getElementById('captcha-label').textContent = rand([
        "Security Check",
        "Human Verification",
        "Prove You Exist",
        "Are You a Bot? (Bots say no too)",
        "Math (approximately)",
        "Vibe Check",
        "IQ Test (unrelated)",
    ]);
}

refreshCaptcha();
// Captcha changes every 15 seconds
setInterval(refreshCaptcha, 15000);

// ── Submit button escape ──────────────────────────────────────────────────────

const btn = document.getElementById('submit-btn');

btn.addEventListener('mouseover', () => {
    // Escalating escape probability
    const escapeProbability = Math.min(0.3 + escapeCount * 0.15, 0.9);
    if (Math.random() < escapeProbability) {
        escapeCount++;
        const margin = 80;
        const x = randInt(margin, window.innerWidth - 180);
        const y = randInt(margin, window.innerHeight - 60);
        btn.classList.add('escaped');
        btn.style.left = x + 'px';
        btn.style.top  = y + 'px';

        // Taunt message
        const taunts = [
            "🎲 SPIN & LOGIN 🎲",
            "catch me if you can",
            "almost...",
            "nope 🎰",
            "wrong button",
            "try the other one",
            "getting warmer...",
            "👀",
        ];
        btn.textContent = rand(taunts);
        setTimeout(() => { btn.textContent = "🎲 SPIN & LOGIN 🎲"; }, 1200);
    }
});

// ── Slot machine ─────────────────────────────────────────────────────────────

const SLOT_SYMBOLS = ['7', 'BAR', '0', '6', '3', '9', '💀', '🃏', '⭐', '6', '9', '3'];
const WIN_SYMBOL   = '7';

function spinReel(reelEl, finalSymbol, duration) {
    return new Promise(resolve => {
        reelEl.classList.add('spinning');
        const fast = setInterval(() => {
            reelEl.textContent = rand(SLOT_SYMBOLS);
        }, 65);

        // Slow down phase — last 300ms show the final symbol flickering in
        setTimeout(() => {
            clearInterval(fast);
            let flickers = 0;
            const slow = setInterval(() => {
                reelEl.textContent = flickers % 2 === 0 ? rand(SLOT_SYMBOLS) : finalSymbol;
                flickers++;
                if (flickers >= 6) {
                    clearInterval(slow);
                    reelEl.textContent = finalSymbol;
                    reelEl.classList.remove('spinning');
                    reelEl.classList.add('landing');
                    setTimeout(() => reelEl.classList.remove('landing'), 350);
                    resolve();
                }
            }, 90);
        }, duration - 540);
    });
}

async function spinSlots(isWin) {
    const reels = [
        document.getElementById('reel-1'),
        document.getElementById('reel-2'),
        document.getElementById('reel-3'),
    ];

    let symbols;
    if (isWin) {
        symbols = [WIN_SYMBOL, WIN_SYMBOL, WIN_SYMBOL];
    } else {
        // Generate three symbols that are NOT all sevens
        do {
            symbols = [rand(SLOT_SYMBOLS), rand(SLOT_SYMBOLS), rand(SLOT_SYMBOLS)];
        } while (symbols.every(s => s === WIN_SYMBOL));
    }

    // Reels stop one by one with increasing delay
    await spinReel(reels[0], symbols[0], 1400);
    await spinReel(reels[1], symbols[1], 900);
    await spinReel(reels[2], symbols[2], 600);

    // Color feedback
    if (isWin) {
        reels.forEach(r => { r.style.color = '#44ff88'; r.style.textShadow = '0 0 16px #44ff88, 0 0 32px #00cc44'; });
        setTimeout(() => reels.forEach(r => { r.style.color = ''; r.style.textShadow = ''; }), 3000);
    }
}

// ── Handle submit ────────────────────────────────────────────────────────────

async function handleSubmit(e) {
    e.preventDefault();

    // ── Validation ──
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const captchaInput = parseInt(document.getElementById('captcha-answer').value.trim(), 10);
    const resultEl = document.getElementById('result-msg');

    if (!username || !password) {
        resultEl.textContent = '⚠️ Fill in all fields. Yes, both of them.';
        resultEl.style.color = '#ffaa00';
        resultEl.classList.add('visible');
        setTimeout(() => resultEl.classList.remove('visible'), 3000);
        return false;
    }

    if (isNaN(captchaInput) || captchaInput !== correctCaptcha) {
        resultEl.textContent = `❌ Wrong answer. Hint: it's ${correctCaptcha}. Just kidding. Maybe.`;
        resultEl.style.color = '#ffaa00';
        resultEl.classList.add('visible');
        setTimeout(() => resultEl.classList.remove('visible'), 3500);
        refreshCaptcha();
        return false;
    }

    btn.disabled = true;
    btn.textContent = '⏳ SPINNING...';

    attempts++;
    document.getElementById('attempt-count').textContent = attempts;
    document.getElementById('luck-level').textContent = rand(LUCK_LEVELS);

    // Hide old result
    resultEl.classList.remove('visible');

    // Decide outcome FIRST (~15% win), then animate to match
    const isWin = Math.random() < 0.15;
    await spinSlots(isWin);

    // Show result matching slot outcome
    if (isWin) {
        // Remove all stuck emojis
        document.querySelectorAll('.fly-emoji').forEach(el => el.remove());
        // Show win screen
        document.getElementById('win-screen').classList.add('active');
        resultEl.textContent = rand(RESULTS_WIN);
        resultEl.style.color = '#44ff88';
        resultEl.classList.add('visible');
    } else {
        resultEl.textContent = rand(RESULTS_FAIL);
        resultEl.style.color = '';
        // More emojis accumulate with each failed attempt (max 5 per spin)
        spawnFailEmojis(Math.min(attempts, 5));
    }
    resultEl.classList.add('visible');
    if (!isWin) {
        setTimeout(() => resultEl.classList.remove('visible'), 4000);
    }

    btn.disabled = false;
    btn.textContent = '🎲 SPIN & LOGIN 🎲';

    // Side effects
    const roll = Math.random();

    if (roll < 0.35) {
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        document.getElementById('captcha-answer').value = '';
    }

    if (roll > 0.5 && roll < 0.7) {
        btn.classList.remove('escaped');
        btn.style.left = '';
        btn.style.top  = '';
        escapeCount = 0;
    }

    if (roll > 0.7) {
        refreshCaptcha();
    }

    // Cycle label on every submit too
    cycleLabelOnce();

    return false;
}

// ── Flying emoji on fail ─────────────────────────────────────────────────────

const FAIL_EMOJIS = ['😜', '😄', '🤣', '😂', '😆', '😝', '🤪', '😅'];

function spawnEmoji() {
    const el = document.createElement('span');
    el.className = 'fly-emoji';
    el.textContent = rand(FAIL_EMOJIS);

    // Random final position anywhere on screen
    const x = randInt(20, window.innerWidth - 100);
    const y = randInt(20, window.innerHeight - 100);
    el.style.left = x + 'px';
    el.style.top  = y + 'px';

    // Random start & end rotation for each emoji
    const startRot = randInt(-720, 720);
    const endRot   = randInt(-45, 45);
    el.style.setProperty('--start-rot', startRot + 'deg');
    el.style.setProperty('--end-rot',   endRot   + 'deg');

    document.body.appendChild(el);
}

function spawnFailEmojis(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => spawnEmoji(), i * 120);
    }
}

// ── Idle chaos: random label flicker every ~8s ───────────────────────────────

setInterval(() => {
    if (Math.random() < 0.4) cycleLabelOnce();
}, 8000);
