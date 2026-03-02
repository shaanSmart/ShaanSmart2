// ══════════════════════════════════════════════════════════════════════
// SHAANSMART — MAIN ENTRY POINT
// Wires all modules together, handles screens and user interactions
// ══════════════════════════════════════════════════════════════════════
import { supa, signIn, signUp, signOut, getSession, getAccountName, getChildren, addChild, updateChildStars, saveSession } from './db';
import { loadQuestionsForCategory, trackAnswer, buildColorMap, randomCheer, shuffle, getFallbackBank, fontSizeForLength, masteryLabel, masteryClass } from './quiz';
import { cheer, gentle, cancelSpeech, configureVoice, setupMic, toggleMic, stopMic } from './speech';
import { loadConfig, getConfig, updateConfig, toggleConfig } from './settings';
import { loadProgress, getProgress, logSession, syncStarsFromDB } from './progress';
import { buildCalmAudio, stopCalmAudio } from './audio';
import { SUBJECTS, getCategoriesForSubject, getSectionsForSubject, findCategory } from './categories';
// ── State ─────────────────────────────────────────────────────────────
let currentUser = null;
let currentChild = null;
let childGradeNew = 2;
let selectedAvatar = '🌟';
let authMode = 'login';
let curSubj = 'math';
let curGrade = 2;
let curCategory = null;
let curCategoryTags = [];
let queue = [];
let qIdx = 0;
let curQ = null;
let answered = false;
let roundOK = 0;
let wrongQs = [];
let colorMap = [];
// Game state
let gmSubj = 'math';
let gmTime = 60;
let gmScore = 0;
let gmStreak = 0;
let gmBest = 0;
let gmInterval = null;
let gmTimeLeft = 0;
let gmColorMap = [];
let gmCurQ = null;
let gmAnswered = false;
// Calm state
let calmTimer = null;
let calmReturnScreen = 'quiz';
// ── Helpers ───────────────────────────────────────────────────────────
function $(id) {
    const el = document.getElementById(id);
    if (!el)
        throw new Error(`Element #${id} not found`);
    return el;
}
function $q(sel) {
    return document.querySelector(sel);
}
function $all(sel) {
    return document.querySelectorAll(sel);
}
// ── Screen Management ─────────────────────────────────────────────────
export function showScreen(name) {
    $all('.screen').forEach(s => s.classList.remove('active'));
    $(name).classList.add('active');
    $('cel').classList.remove('show');
    if (name === 'progress')
        renderProgress();
    if (name === 'home')
        renderBadges();
    if (name === 'settings')
        applySettings();
    if (name === 'quiz' || name === 'game')
        updateBreakButtons();
    if (name !== 'quiz') {
        $q('#transition-warn')?.classList.remove('show');
    }
}
// ── Auth ──────────────────────────────────────────────────────────────
export function authTab(mode) {
    authMode = mode;
    $('tab-login').classList.toggle('active', mode === 'login');
    $('tab-signup').classList.toggle('active', mode === 'signup');
    $('auth-btn').textContent = mode === 'login' ? 'Sign In' : 'Create Account';
    $('auth-name').style.display = mode === 'signup' ? '' : 'none';
    $('auth-pass').autocomplete =
        mode === 'login' ? 'current-password' : 'new-password';
    showAuthErr('');
}
export function showAuthErr(msg) {
    $('auth-err').textContent = msg;
    $('auth-err').classList.toggle('show', !!msg);
}
export async function authSubmit() {
    const emailEl = $('auth-email');
    const passEl = $('auth-pass');
    const nameEl = $('auth-name');
    const btn = $('auth-btn');
    const email = (emailEl.value || emailEl.defaultValue || '').trim();
    const pass = passEl.value || passEl.defaultValue || '';
    const name = (nameEl.value || nameEl.defaultValue || '').trim();
    if (!email || !pass) {
        showAuthErr('Please tap each field and type your details');
        if (!email) {
            emailEl.style.borderColor = '#e05050';
            emailEl.focus();
        }
        else {
            passEl.style.borderColor = '#e05050';
            passEl.focus();
        }
        return;
    }
    emailEl.style.borderColor = '';
    passEl.style.borderColor = '';
    if (authMode === 'signup' && !name) {
        showAuthErr('Please enter your name');
        return;
    }
    btn.textContent = '...';
    btn.disabled = true;
    showAuthErr('');
    try {
        if (authMode === 'login') {
            await signIn(email, pass);
        }
        else {
            const data = await signUp(email, pass, name);
            if (!data.session) {
                showAuthErr('Check your email to confirm your account, then sign in!');
                authTab('login');
            }
        }
    }
    catch (err) {
        const msg = err instanceof Error ? err.message : JSON.stringify(err);
        showAuthErr(msg || 'Connection failed');
    }
    finally {
        btn.textContent = authMode === 'login' ? 'Sign In' : 'Create Account';
        btn.disabled = false;
    }
}
// Auth field input listeners
;
['auth-email', 'auth-pass'].forEach(id => {
    const el = document.getElementById(id);
    if (el)
        el.addEventListener('input', () => { el.style.borderColor = ''; showAuthErr(''); });
});
// Auth state listener
supa.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
        currentUser = session.user;
        await loadProfiles();
        showScreen('profiles');
    }
    else if (event === 'SIGNED_OUT') {
        currentUser = null;
        currentChild = null;
        showScreen('auth');
    }
});
(async () => {
    try {
        const session = await getSession();
        if (session?.user) {
            currentUser = session.user;
            await loadProfiles();
            showScreen('profiles');
        }
        else {
            showScreen('auth');
        }
    }
    catch (_) {
        showScreen('auth');
    }
})();
// ── Profiles ──────────────────────────────────────────────────────────
async function loadProfiles() {
    if (!currentUser)
        return;
    const grid = $('prof-grid');
    grid.innerHTML = '<div class="spinner show" style="grid-column:1/-1"></div>';
    const accountName = await getAccountName(currentUser.id);
    if (accountName) {
        $('prof-account-name').textContent = 'Welcome, ' + accountName + '!';
    }
    const kids = await getChildren(currentUser.id);
    window._kids = kids;
    let html = kids.map((kid, idx) => `
    <div class="prof-card" onclick="selectChild(${idx})">
      <div class="prof-avatar">${kid.avatar_emoji}</div>
      <div class="prof-name">${kid.name}</div>
      <div class="prof-grade">Grade ${kid.grade}</div>
    </div>`).join('');
    html += `<div class="prof-card add" onclick="openAddChild()">
    <div class="prof-avatar">➕</div>
    <div class="prof-name">Add Child</div>
    <div class="prof-grade">New profile</div>
  </div>`;
    grid.innerHTML = html;
}
export function selectChild(idx) {
    const kids = window._kids ?? [];
    currentChild = kids[idx] ?? null;
    if (!currentChild)
        return;
    const cfg = getConfig();
    if (currentChild.settings)
        updateConfig(currentChild.settings);
    applySettings();
    curGrade = currentChild.grade;
    $all('.grade-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('g' + curGrade)?.classList.add('active');
    loadProgress();
    syncStarsFromDB(currentChild.total_stars ?? 0, currentChild.streak ?? 0);
    renderBadges();
    showScreen('home');
}
// ── Add Child ─────────────────────────────────────────────────────────
export function openAddChild() {
    $('add-child-modal').classList.add('show');
    $('child-name').value = '';
    childGradeNew = 2;
    $all('#cg1,#cg2,#cg3,#cg4,#cg5').forEach(b => b.classList.remove('active'));
    document.getElementById('cg2')?.classList.add('active');
    selectedAvatar = '🌟';
    $all('.avatar-opt').forEach(b => b.classList.remove('sel'));
    $q('.avatar-opt[data-emoji="🌟"]')?.classList.add('sel');
}
export function closeAddChild() {
    $('add-child-modal').classList.remove('show');
}
export function pickAvatar(el) {
    $all('.avatar-opt').forEach(b => b.classList.remove('sel'));
    el.classList.add('sel');
    selectedAvatar = el.dataset['emoji'] ?? '🌟';
}
export function pickChildGrade(g, btn) {
    childGradeNew = g;
    $all('#cg1,#cg2,#cg3,#cg4,#cg5').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}
export async function saveChild() {
    if (!currentUser)
        return;
    const name = $('child-name').value.trim();
    if (!name) {
        $('child-err').textContent = 'Please enter a name';
        $('child-err').classList.add('show');
        return;
    }
    try {
        await addChild(currentUser.id, name, childGradeNew, selectedAvatar);
        closeAddChild();
        await loadProfiles();
    }
    catch (err) {
        const msg = err instanceof Error ? err.message : 'Error saving child';
        $('child-err').textContent = msg;
        $('child-err').classList.add('show');
    }
}
// ── Grade Selection ───────────────────────────────────────────────────
export function setGrade(g) {
    curGrade = g;
    $all('.grade-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('g' + g)?.classList.add('active');
}
// ── Category Menu ─────────────────────────────────────────────────────
export function showCategory(subj) {
    curSubj = subj;
    const cats = getCategoriesForSubject(subj);
    // Life/Science: no category menu, go straight to quiz
    if (!cats.length) {
        void startCategory(subj, 'mix');
        return;
    }
    const emojiMap = { math: '🔢', reading: '📖', vocab: '💬' };
    const titleMap = { math: 'Math Topics', reading: 'Reading Topics', vocab: 'Vocabulary & Words' };
    const subMap = {
        math: 'Choose what to practice — or mix it all up!',
        reading: 'Pick a topic to read about today!',
        vocab: 'Build your word power — tap a category!',
    };
    $('cat-title').textContent = (emojiMap[subj] ?? '📚') + ' ' + (titleMap[subj] ?? 'Topics');
    $('cat-sub').textContent = subMap[subj] ?? 'Choose a category!';
    const sections = getSectionsForSubject(subj);
    let html = '';
    sections.forEach(sec => {
        html += `<div class="cat-section">${sec.label}</div><div class="cat-grid">`;
        sec.ids.forEach(id => {
            const cat = cats.find(c => c.id === id);
            if (!cat)
                return;
            const wide = cat.wide ? ' wide' : '';
            html += `<div class="cat-card ${cat.color}${wide}" onclick="startCategory('${subj}','${id}')">
        <div class="cat-icon">${cat.icon}</div>
        <div>
          <div class="cat-name">${cat.name}</div>
          <div class="cat-desc">${cat.desc}</div>
        </div>
      </div>`;
        });
        html += '</div>';
    });
    $('cat-content').innerHTML = html;
    showScreen('category');
}
export async function startCategory(subj, categoryId) {
    curSubj = subj;
    curCategory = categoryId;
    const cat = findCategory(subj, categoryId);
    curCategoryTags = cat?.tags ?? [];
    qIdx = 0;
    roundOK = 0;
    wrongQs = [];
    const meta = SUBJECTS[subj] ?? SUBJECTS['math'];
    $('quiz-subj').textContent = (cat ? cat.icon + ' ' : '') + (cat?.name ?? meta.name);
    $('quiz-subj').style.color = meta.color;
    const cfg = getConfig();
    const dbQ = await loadQuestionsForCategory(currentChild?.id ?? null, subj, curGrade, curCategoryTags);
    const rawQ = dbQ ?? getFallbackBank(subj, curGrade);
    queue = shuffle(rawQ).slice(0, cfg.qCount);
    showScreen('quiz');
    renderQ();
}
// ── Quiz Rendering ────────────────────────────────────────────────────
function renderQ() {
    if (!queue[qIdx])
        return;
    curQ = queue[qIdx];
    answered = false;
    const pct = Math.round((qIdx / queue.length) * 100);
    $('prog-fill').style.width = pct + '%';
    $('prog-lbl').textContent = `Question ${qIdx + 1} of ${queue.length}`;
    const img = curQ.image ? `<div class="q-img">${curQ.image}</div>` : '';
    const passage = curQ.passage ? `<div class="passage-box"><div class="passage-label">📖 Read this passage</div><div class="passage-text">${curQ.passage}</div></div>` : '';
    let masteryBadgeHtml = '';
    if (curQ.timesSeen > 0) {
        const m = curQ.mastery ?? 0;
        if (m > 0) {
            masteryBadgeHtml = `<div class="q-meta">
        <span class="q-meta-badge ${masteryClass(m)}">${masteryLabel(m)}</span>
        <span class="q-meta-badge">Seen ${curQ.timesSeen}x · ${Math.round(curQ.accuracy ?? 0)}% correct</span>
      </div>`;
        }
    }
    $('q-box').innerHTML = `${passage}${masteryBadgeHtml}${img}<div class="q-text">${curQ.text}</div>`;
    const vals = shuffle([curQ.answer, ...curQ.dist]).slice(0, 4);
    while (vals.length < 4)
        vals.push('?');
    colorMap = buildColorMap(curQ);
    const isLong = colorMap.some(c => String(c.value).length > 12);
    $('ans-grid').innerHTML = colorMap.map(c => `<button class="ans-btn ${c.id}${isLong ? ' long-ans' : ''}" id="opt-${c.idx}" onclick="pick(${c.idx})">
      <div class="btn-bar"></div>
      <div class="btn-num" id="num-${c.idx}">${c.value}</div>
    </button>`).join('');
    colorMap.forEach(c => {
        const el = document.getElementById('num-' + c.idx);
        if (el)
            el.style.fontSize = fontSizeForLength(String(c.value).length);
    });
    const fb = $('feedback');
    fb.className = 'feedback';
    fb.innerHTML = '';
    micStateUI('idle');
    $('next-btn').style.display = 'none';
    checkTransitionWarn();
}
export function pick(idx) {
    if (answered || !curQ)
        return;
    answered = true;
    stopMic();
    const chosen = colorMap[idx];
    const ok = chosen.value === curQ.answer;
    const right = colorMap.find(c => c.value === curQ.answer);
    if (right)
        document.getElementById('opt-' + right.idx)?.classList.add('correct');
    if (!ok)
        document.getElementById('opt-' + idx)?.classList.add('wrong');
    void trackAnswer(currentChild?.id ?? null, curQ, ok);
    const fb = $('feedback');
    if (ok) {
        roundOK++;
        $('quiz-stars').textContent = String((getProgress().totalStars) + roundOK);
        const phrase = randomCheer();
        fb.className = 'feedback show good';
        fb.innerHTML = `<div>${phrase}</div>${curQ.eq ? `<div class="eq">${curQ.eq}</div>` : ''}`;
        if (curQ.timesSeen >= 2) {
            const pct = Math.round(((curQ.accuracy ?? 0) * curQ.timesSeen + 100) / (curQ.timesSeen + 1));
            const star = pct >= 80 ? '⭐ Mastered!' : pct >= 60 ? '📈 Getting it!' : '';
            if (star)
                fb.innerHTML += `<div class="mastery-hint">${star}</div>`;
        }
        setTimeout(() => cheer(phrase), 300);
    }
    else {
        wrongQs.push(curQ.text);
        fb.className = 'feedback show bad';
        fb.innerHTML = `<div>💙 Good try! The answer is <strong>${curQ.answer}</strong></div>${curQ.eq ? `<div class="eq">${curQ.eq}</div>` : ''}`;
        if (curQ.timesSeen >= 2) {
            const pct = Math.round(((curQ.accuracy ?? 0) * curQ.timesSeen) / (curQ.timesSeen + 1));
            fb.innerHTML += `<div class="mastery-hint">Seen ${curQ.timesSeen + 1} times · ${pct}% correct so far</div>`;
        }
        setTimeout(() => gentle(`Good try Shaan. The answer is ${curQ.answer}.`), 300);
    }
    $('next-btn').style.display = 'block';
    setTimeout(() => { if (answered)
        nextQ(); }, ok ? 3800 : 5000);
}
function nextQ() {
    qIdx++;
    if (qIdx >= queue.length) {
        logSession(curSubj, curGrade, queue.length, roundOK, wrongQs);
        if (currentUser && currentChild) {
            void saveSession(currentChild.id, currentUser.id, curSubj, curGrade, 'standard', queue.length, roundOK, roundOK);
            const newStars = (currentChild.total_stars ?? 0) + roundOK;
            currentChild.total_stars = newStars;
            void updateChildStars(currentChild.id, newStars);
        }
        $('cel-msg').textContent = `You got ${roundOK} out of ${queue.length} right! ⭐ ${getProgress().totalStars} total stars`;
        $('cel').classList.add('show');
        setTimeout(() => cheer(`Shaan you finished! You got ${roundOK} right! You are absolutely incredible and I am so proud of you!`), 400);
    }
    else {
        renderQ();
    }
}
export function newRound() {
    $('cel').classList.remove('show');
    void startCategory(curSubj, curCategory ?? 'mix');
}
function checkTransitionWarn() {
    const warn = $q('#transition-warn');
    if (!warn)
        return;
    warn.classList.toggle('show', queue.length - qIdx === 2);
}
// ── Progress Screen ───────────────────────────────────────────────────
function renderProgress() {
    const p = getProgress();
    let sub = '';
    ['math', 'reading', 'vocab', 'life', 'science'].forEach(s => {
        const d = p.bySubject[s];
        const m = SUBJECTS[s];
        const pct = d && d.attempts > 0 ? Math.round(d.correct / d.attempts * 100) : null;
        sub += `<div class="stat-row"><span class="stat-lbl">${m.name}</span>${pct !== null
            ? `<div class="subj-bar"><div class="subj-fill" style="width:${pct}%;background:${m.color}"></div></div><span class="stat-val ${pct >= 70 ? 'green' : ''}">${pct}%</span>`
            : '<span class="stat-val" style="color:var(--muted)">Not yet</span>'}</div>`;
    });
    $('prog-content').innerHTML = `
    <div class="stat-card">
      <h3>Overall</h3>
      <div class="stat-row"><span class="stat-lbl">⭐ Total Stars</span><span class="stat-val green">${p.totalStars}</span></div>
      <div class="stat-row"><span class="stat-lbl">🔥 Day Streak</span><span class="stat-val green">${p.streak}</span></div>
      <div class="stat-row"><span class="stat-lbl">📅 Sessions</span><span class="stat-val">${p.sessions.length}</span></div>
    </div>
    <div class="stat-card"><h3>By Subject</h3>${sub}</div>
    <button class="print-btn" onclick="printReport()">🖨️ Print Teacher Report</button>`;
}
export function printReport() {
    const p = getProgress();
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    let rows = '';
    ['math', 'reading', 'vocab', 'life', 'science'].forEach(s => {
        const d = p.bySubject[s];
        const m = SUBJECTS[s];
        rows += `<tr><td>${m.name}</td><td>${d ? d.correct : 0}</td><td>${d ? d.attempts : 0}</td><td><strong>${d && d.attempts > 0 ? Math.round(d.correct / d.attempts * 100) + '%' : '—'}</strong></td></tr>`;
    });
    const w = window.open('', '_blank');
    if (!w)
        return;
    w.document.write(`<!DOCTYPE html><html><head><title>ShaanSmart Report</title><style>body{font-family:Arial,sans-serif;padding:40px;max-width:700px;margin:0 auto}h1{color:#2a5fa8}table{width:100%;border-collapse:collapse;margin:16px 0}th,td{text-align:left;padding:10px 12px;border-bottom:1px solid #eee}th{background:#f0f4ff;color:#2a5fa8}@media print{button{display:none}}</style></head><body><h1>🌟 ShaanSmart — Progress Report</h1><p><strong>Student:</strong> Shaan &nbsp; <strong>Date:</strong> ${today}</p><p>⭐ Stars: <strong>${p.totalStars}</strong> &nbsp; 🔥 Streak: <strong>${p.streak} days</strong> &nbsp; Sessions: <strong>${p.sessions.length}</strong></p><table><thead><tr><th>Subject</th><th>Correct</th><th>Attempted</th><th>Accuracy</th></tr></thead><tbody>${rows}</tbody></table><p>Shaan answered by saying or pointing to a color-coded button. All responses are his own.</p><button onclick="window.print()">🖨️ Print</button></body></html>`);
    w.document.close();
}
// ── Badges ────────────────────────────────────────────────────────────
function renderBadges() {
    const p = getProgress();
    $('home-stars').textContent = String(p.totalStars);
    $('home-streak').textContent = String(p.streak);
    $('quiz-stars').textContent = String(p.totalStars);
    ['math', 'reading', 'life', 'science', 'vocab'].forEach(s => {
        const d = p.bySubject[s];
        const el = document.getElementById(s + '-badge');
        if (el && d && d.attempts > 0)
            el.textContent = Math.round(d.correct / d.attempts * 100) + '%';
    });
}
// ── Settings ──────────────────────────────────────────────────────────
function applySettings() {
    const cfg = getConfig();
    configureVoice(cfg.voice, cfg.volume);
    const tv = document.getElementById('tog-voice');
    if (tv)
        tv.className = 'set-toggle ' + (cfg.voice ? 'on' : 'off');
    const vs = document.getElementById('vol-slider');
    if (vs)
        vs.value = String(Math.round(cfg.volume * 100));
    ['sq5', 'sq10'].forEach(id => document.getElementById(id)?.classList.remove('active'));
    document.getElementById('sq' + cfg.qCount)?.classList.add('active');
    const tb = document.getElementById('tog-break');
    if (tb)
        tb.className = 'set-toggle ' + (cfg.breakOn ? 'on' : 'off');
    ['bs-big', 'bs-small'].forEach(id => document.getElementById(id)?.classList.remove('active'));
    document.getElementById('bs-' + cfg.breakStyle)?.classList.add('active');
    [30, 60, 90, 120].forEach(d => {
        document.getElementById('cd' + d)?.classList.toggle('active', cfg.calmDur === d);
        document.getElementById('gt' + d)?.classList.toggle('active', cfg.gameTime === d);
    });
    gmTime = cfg.gameTime;
    updateBreakButtons();
}
export function toggleSetting(key, btn) {
    const cfg = toggleConfig(key);
    btn.className = 'set-toggle ' + (cfg[key] ? 'on' : 'off');
    configureVoice(cfg.voice, cfg.volume);
    updateBreakButtons();
}
export function setVolume(val) {
    updateConfig({ volume: val / 100 });
    configureVoice(getConfig().voice, getConfig().volume);
}
export function setQCount(n, btn) {
    updateConfig({ qCount: n });
    ['sq5', 'sq10'].forEach(id => document.getElementById(id)?.classList.remove('active'));
    btn.classList.add('active');
}
export function setBreakStyle(style, btn) {
    updateConfig({ breakStyle: style });
    ['bs-big', 'bs-small'].forEach(id => document.getElementById(id)?.classList.remove('active'));
    btn.classList.add('active');
    updateBreakButtons();
}
export function setCalmDur(d) {
    updateConfig({ calmDur: d });
    [30, 60, 90, 120].forEach(x => document.getElementById('cd' + x)?.classList.toggle('active', x === d));
}
export function setGameTime(d) {
    updateConfig({ gameTime: d });
    gmTime = d;
    [30, 60, 90, 120].forEach(x => document.getElementById('gt' + x)?.classList.toggle('active', x === d));
}
function updateBreakButtons() {
    const cfg = getConfig();
    const show = cfg.breakOn;
    const style = cfg.breakStyle;
    for (const prefix of ['', 'game-']) {
        const big = document.getElementById(prefix + 'break-btn-big');
        const small = document.getElementById(prefix + 'break-btn-small');
        if (big)
            big.className = 'break-btn-big' + (show && style === 'big' ? ' show' : '');
        if (small)
            small.className = 'break-btn-small' + (show && style === 'small' ? ' show' : '');
    }
}
export function toggleMute() {
    const cfg = getConfig();
    updateConfig({ voice: !cfg.voice });
    configureVoice(getConfig().voice, getConfig().volume);
    const btn = document.getElementById('mute-btn');
    if (btn)
        btn.textContent = getConfig().voice ? '🔊' : '🔇';
    if (!getConfig().voice)
        cancelSpeech();
}
// ── Calm Break ────────────────────────────────────────────────────────
export function startCalm() {
    calmReturnScreen = $q('.screen.active')?.id ?? 'quiz';
    if (calmTimer)
        clearInterval(calmTimer);
    cancelSpeech();
    buildCalmAudio();
    const cfg = getConfig();
    let left = cfg.calmDur;
    const fill = document.getElementById('calm-fill');
    const lbl = document.getElementById('calm-lbl');
    if (fill)
        fill.style.width = '100%';
    if (lbl)
        lbl.textContent = cfg.calmDur + ' seconds';
    showScreen('calm');
    calmTimer = setInterval(() => {
        left--;
        const pct = Math.max(0, (left / cfg.calmDur) * 100);
        if (fill) {
            fill.style.transition = 'width 1s linear';
            fill.style.width = pct + '%';
        }
        if (lbl)
            lbl.textContent = left > 0 ? left + ' seconds' : 'Ready when you are 🌟';
        if (left <= 0 && calmTimer)
            clearInterval(calmTimer);
    }, 1000);
}
export function endCalm() {
    if (calmTimer)
        clearInterval(calmTimer);
    stopCalmAudio();
    showScreen(calmReturnScreen);
}
// ── Mic UI ────────────────────────────────────────────────────────────
function micStateUI(state, extra = '') {
    const el = document.getElementById('mic-st');
    if (!el)
        return;
    if (state === 'idle') {
        el.className = 'mic-st';
        el.textContent = '';
    }
    else if (state === 'listening') {
        el.className = 'mic-st listening';
        el.textContent = '🔴 Listening…' + (extra ? ' ' + extra : '');
    }
    else {
        el.className = 'mic-st heard';
        el.textContent = '✅ ' + extra;
    }
}
export function handleMicToggle() {
    if (!getConfig().micOn)
        return;
    toggleMic();
}
// ── Game Mode (stub — full impl carries over from original) ───────────
export function gsPickSubj(subj, el) {
    gmSubj = subj;
    $all('.gs-subj-card').forEach(b => b.classList.remove('sel'));
    el.classList.add('sel');
}
export function gsPickTime(t, btn) {
    gmTime = t;
    $all('.gs-btn[data-time]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}
// ── Expose to HTML onclick attributes ────────────────────────────────
// (During migration, global functions bridge HTML onclick= calls)
const G = window;
G.showScreen = showScreen;
G.authTab = authTab;
G.authSubmit = () => setTimeout(() => void authSubmit(), 100);
G.signOut = () => void signOut();
G.selectChild = selectChild;
G.openAddChild = openAddChild;
G.closeAddChild = closeAddChild;
G.pickAvatar = pickAvatar;
G.pickChildGrade = pickChildGrade;
G.saveChild = () => void saveChild();
G.setGrade = setGrade;
G.showCategory = showCategory;
G.startCategory = (s, c) => void startCategory(s, c);
G.pick = pick;
G.newRound = newRound;
G.printReport = printReport;
G.toggleSetting = toggleSetting;
G.setVolume = setVolume;
G.setQCount = setQCount;
G.setBreakStyle = setBreakStyle;
G.setCalmDur = setCalmDur;
G.setGameTime = setGameTime;
G.toggleMute = toggleMute;
G.startCalm = startCalm;
G.endCalm = endCalm;
G.handleMicToggle = handleMicToggle;
G.gsPickSubj = gsPickSubj;
G.gsPickTime = gsPickTime;
// ── Init ──────────────────────────────────────────────────────────────
loadConfig();
loadProgress();
applySettings();
setupMic({
    onMatch: (colorId, colorIdx) => {
        micStateUI('heard', `Heard: ${colorId}`);
        stopMic();
        setTimeout(() => pick(colorIdx), 380);
    },
    onInterim: (text) => {
        if (text.length > 0)
            micStateUI('listening', `"${text}"`);
    },
    onStateChange: (state, extra) => {
        micStateUI(state, extra);
        const btn = document.getElementById('mic-btn');
        if (!btn)
            return;
        if (state === 'listening') {
            btn.classList.add('active');
            btn.textContent = '🔴';
        }
        else {
            btn.classList.remove('active');
            btn.textContent = '🎤';
        }
    },
});
// Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(() => { });
    });
}
