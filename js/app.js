let writeups = [];
let currentType = 'machine'; // 'machine' o 'challenge'
let currentFilter = 'all';

const grid = document.getElementById('machinesGrid');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const tabBtns = document.querySelectorAll('.tab-btn');
const backBtn = document.getElementById('backBtn');

// Elementos del Modal de Imágenes
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.getElementById('modalClose');

async function loadWriteups() {
    try {
        const response = await fetch('data/writeups.json');
        if (!response.ok) throw new Error('No se pudo cargar data/writeups.json');
        writeups = await response.json();
        renderItems();
    } catch (error) {
        console.error(error);
        grid.innerHTML = `<p style="color: var(--hard); font-family: var(--font-mono);">
            Error cargando writeups.json. Usa un servidor local (Live Server o python3 -m http.server) para probarlo.
        </p>`;
    }
}

function renderItems() {
    const query = searchInput.value.toLowerCase();
    grid.innerHTML = '';

    const filtered = writeups.filter(item => {
        const matchesType = (item.type || 'machine') === currentType;
        const matchesFilter = currentFilter === 'all' || item.difficulty === currentFilter;
        const matchesSearch = item.name.toLowerCase().includes(query) ||
                              item.summary.toLowerCase().includes(query) ||
                              (item.category && item.category.toLowerCase().includes(query)) ||
                              item.tags.some(t => t.toLowerCase().includes(query));
        return matchesType && matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `<p style="color: var(--text-muted); font-family: var(--font-mono);">No se encontraron resultados con estos filtros.</p>`;
        return;
    }

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'machine-card';
        card.addEventListener('click', () => openWriteup(item));

        // Muestra OS si es máquina, o Categoría (Web, Forensics, etc.) si es challenge
        const badgeLabel = item.type === 'challenge' ? item.category : item.os;

        card.innerHTML = `
            <div class="card-top">
                <span class="os-badge">${badgeLabel}</span>
                <span class="diff-badge diff-${item.difficulty}">${item.difficulty}</span>
            </div>
            <div class="machine-title">
                ${item.name}
                ${item.protected ? '<span class="lock-icon" title="Activo - Requiere Flag">🔒</span>' : ''}
            </div>
            <p class="machine-summary">${item.summary}</p>
            <div class="card-footer">
                ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        `;
        grid.appendChild(card);
    });
}

function openWriteup(item) {
    if (item.protected) {
        const flag = prompt("Este contenido sigue activo en Hack The Box.\nIngresa el hash de la Flag para desbloquear el write-up:");
        if (!flag) return;
        alert("Hash incorrecto. Por normativa de HTB, los write-ups activos solo son accesibles para quienes ya los han resuelto.");
        return;
    }

    document.getElementById('directory-view').style.display = 'none';
    const articleView = document.getElementById('article-view');
    const container = document.getElementById('article-container');

    const metaLabel = item.type === 'challenge' ? `Categoría: ${item.category}` : `OS: ${item.os}`;
    const step3Title = item.type === 'challenge' ? '03. Análisis & Resolución' : '03. Explotación (Foothold)';
    const step4Title = item.type === 'challenge' ? '04. Obtención de Flag / Conclusiones' : '04. Escalada de Privilegios';

    // Generar bloque de imágenes si existen
    let imagesHTML = '';
    if (item.content.images && item.content.images.length > 0) {
        imagesHTML = `<h2>05. Evidencias & Capturas</h2>` + item.content.images.map(img => `
            <figure class="evidence-figure">
                <img src="${img.src}" alt="${img.caption}" data-zoom>
                <figcaption>${img.caption}</figcaption>
            </figure>
        `).join('');
    }

    container.innerHTML = `
        <div class="article-header">
            <div class="article-header-top">
                <h1>${item.name} - Write-up</h1>
                <span class="diff-badge diff-${item.difficulty}">${item.difficulty}</span>
            </div>
            <div class="article-meta">
                <span>${metaLabel}</span>
                <span>|</span>
                <span>Resuelto: ${item.date}</span>
                <span>|</span>
                <span>Estado: ${item.status}</span>
            </div>
        </div>

        <div class="article-content">
            <h2>01. Resumen Ejecutivo (TL;DR)</h2>
            <p>${item.content.tldr}</p>

            <h2>02. Enumeración & Reconocimiento</h2>
            <p>${item.content.enumText}</p>
            <div class="code-block">
                <div class="code-header">
                    <span>bash</span>
                    <button class="copy-btn" data-copy>Copiar</button>
                </div>
                <pre>${item.content.enumCommand}</pre>
            </div>
            <div class="code-block">
                <div class="code-header"><span>output</span></div>
                <pre>${item.content.enumOutput}</pre>
            </div>

            <h2>${step3Title}</h2>
            <p>${item.content.exploit}</p>

            <h2>${step4Title}</h2>
            <p>${item.content.privesc}</p>

            ${imagesHTML}

            <div class="remediation-box">
                <h3>🛡️ Recomendaciones de Remediación</h3>
                <p>${item.content.remediation}</p>
            </div>
        </div>
    `;

    // Eventos para copiar código
    container.querySelectorAll('[data-copy]').forEach(btn => {
        btn.addEventListener('click', () => {
            const code = btn.parentElement.nextElementSibling.innerText;
            navigator.clipboard.writeText(code);
            btn.innerText = "¡Copiado!";
            setTimeout(() => btn.innerText = "Copiar", 2000);
        });
    });

    // Eventos para ampliar imágenes en el modal
    container.querySelectorAll('[data-zoom]').forEach(img => {
        img.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImg.src = img.src;
            modalCaption.innerText = img.alt;
        });
    });

    articleView.style.display = 'block';
    window.scrollTo(0, 0);
}

function showDirectory() {
    document.getElementById('article-view').style.display = 'none';
    document.getElementById('directory-view').style.display = 'block';
}

// Cambio de pestañas (Máquinas vs Challenges)
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentType = btn.dataset.type;
        renderItems();
    });
});

// Filtros de dificultad
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderItems();
    });
});

searchInput.addEventListener('input', renderItems);
backBtn.addEventListener('click', showDirectory);

// Cerrar modal de imagen
modalClose.addEventListener('click', () => modal.style.display = 'none');
modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

// Inicializar
loadWriteups();