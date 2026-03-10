/**
 * Edita este archivo para agregar plantas/categorías.
 * Estructura de una planta:
 * {
 *   id: "muicle",
 *   nombre: "Muicle",
 *   categorias: ["hipertension", "circulacion"],
 *   notas: ["...", "..."],
 *   precauciones: ["..."], // opcional
 *   imagen: "assets/muicle.jpg"
 * }
 */

const CATEGORIES = [
  { id: "relajantes", titulo: "Relajantes", className: "section--relajantes" },
  { id: "hipertension", titulo: "Hipertensión", className: "section--hipertension" },
  { id: "circulacion", titulo: "Circulación de la sangre", className: "section--circulacion" },
  { id: "diabetes", titulo: "Diabetes", className: "section--diabetes" },
  { id: "otros", titulo: "Otros", className: "section--otros" },
];

const PLANTS = [
  {
    id: "flor-de-castilla",
    nombre: "Flor de Castilla",
    categorias: ["relajantes", "circulacion"],
    notas: [
      "Depresión, ansiedad, estrés",
      "Cólicos, menopausia",
      "Circulación",
      "Digestivo y acelerador del metabolismo",
      "Antiséptico",
    ],
    imagen: "assets/flor-de-castilla.jpg",
  },
  {
    id: "hierba-de-san-juan",
    nombre: "Hierba de San Juan",
    categorias: ["relajantes"],
    notas: [
      "Antiséptico y cicatrizante",
      "Antidepresivo, ansiedad",
      "Menopausia",
      "Dolor de cabeza, migraña",
    ],
    precauciones: [
      "Puede interactuar con medicamentos (antidepresivos, anticonceptivos, anticoagulantes, etc.).",
    ],
    imagen: "assets/hierba-de-san-juan.jpg",
  },
  {
    id: "muicle",
    nombre: "Muicle",
    categorias: ["hipertension", "circulacion"],
    notas: [
      "Limpia la sangre",
      "Trata la presión arterial",
      "Alivia dolores de cabeza y de riñón",
      "Anemia (nota de herbolaria)",
    ],
    imagen: "assets/muicle.jpg",
  },
  {
    id: "te-verde",
    nombre: "Té verde",
    categorias: ["otros"],
    notas: [
      "Estimulante (cansancio/sueño)",
      "Colesterol (nota de herbolaria)",
      "Antioxidante",
      "Pérdida de peso (nota de herbolaria)",
      "Salud dental",
    ],
    precauciones: ["Si eres sensible a la cafeína, úsalo con moderación."],
    imagen: "assets/te-verde.jpg",
  },
  {
    id: "eucalipto",
    nombre: "Eucalipto",
    categorias: ["otros"],
    notas: [
      "Infecciones respiratorias",
      "Bronquitis, asma, faringitis",
      "Gripes, resfriados",
      "Dermatitis, reuma (nota de herbolaria)",
    ],
    imagen: "assets/eucalipto.jpg",
  },
  {
    id: "calendula",
    nombre: "Caléndula",
    categorias: ["otros"],
    notas: [
      "Problemas de la piel: úlceras, heridas, eczemas, varices",
      "Quemaduras, golpes",
      "Antiinflamatorio",
    ],
    imagen: "assets/calendula.jpg",
  },
  {
    id: "chintok",
    nombre: "Chintok",
    categorias: ["otros"],
    notas: [
      "Piedra en el riñón o vesícula (nota de herbolaria)",
      "Diurético natural",
      "Reduce inflamaciones y espasmos",
    ],
    imagen: "assets/chintok.jpg",
  },
  {
    id: "doradilla",
    nombre: "Doradilla",
    categorias: ["otros"],
    notas: [
      "Dolor de cintura",
      "Mal de orín, dolor de riñones",
      "Deshace piedras/arenilla (nota de herbolaria)",
      "Ácido úrico (nota de herbolaria)",
      "Vesícula biliar (nota de herbolaria)",
    ],
    imagen: "assets/doradilla.jpg",
  },
  {
    id: "rabo-de-vibora",
    nombre: "Rabo de víbora",
    categorias: ["otros"],
    notas: [
      "Úlceras estomacales, cólicos",
      "Piedras e infecciones urinarias",
      "Renales y cálculos (nota de herbolaria)",
      "Antioxidante",
    ],
    imagen: "assets/rabo-de-vibora.jpg",
  },

  // Plantilla rápida para que agregues más:
  // {
  //   id: "manzanilla",
  //   nombre: "Manzanilla",
  //   categorias: ["relajantes"],
  //   notas: ["Digestivo", "Relajante suave"],
  //   imagen: "assets/manzanilla.jpg",
  // },
];

const els = {
  sections: document.getElementById("sections"),
  q: document.getElementById("q"),
  toggleOtros: document.getElementById("toggleOtros"),
  previewImg: document.getElementById("previewImg"),
  previewMeta: document.getElementById("previewMeta"),
  modal: document.getElementById("modal"),
  modalTitle: document.getElementById("modalTitle"),
  modalTags: document.getElementById("modalTags"),
  modalNotes: document.getElementById("modalNotes"),
  modalCautions: document.getElementById("modalCautions"),
  modalImg: document.getElementById("modalImg"),
};

const state = {
  q: "",
  showOtros: true,
};

function normalize(s) {
  return (s ?? "")
    .toString()
    .normalize("NFD")
    .replace(/\\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

function plantMatches(plant, qNorm) {
  if (!qNorm) return true;
  const haystack = [
    plant.nombre,
    ...(plant.notas ?? []),
    ...(plant.precauciones ?? []),
  ].join(" | ");
  return normalize(haystack).includes(qNorm);
}

function categoryTitle(id) {
  return CATEGORIES.find((c) => c.id === id)?.titulo ?? id;
}

function render() {
  const qNorm = normalize(state.q);
  const plantsFiltered = PLANTS.filter((p) => plantMatches(p, qNorm));

  const byCategory = new Map(CATEGORIES.map((c) => [c.id, []]));
  for (const p of plantsFiltered) {
    const cats = Array.isArray(p.categorias) && p.categorias.length ? p.categorias : ["otros"];
    let placed = false;

    for (const c of cats) {
      if (!byCategory.has(c)) continue;
      byCategory.get(c).push(p);
      placed = true;
    }

    if (!placed) byCategory.get("otros").push(p);
  }

  els.sections.innerHTML = "";

  for (const cat of CATEGORIES) {
    if (cat.id === "otros" && !state.showOtros) continue;

    const list = byCategory.get(cat.id) ?? [];
    const section = document.createElement("section");
    section.className = `section ${cat.className}`;
    section.dataset.category = cat.id;

    const head = document.createElement("div");
    head.className = "section__head";

    const title = document.createElement("h2");
    title.className = "section__title";
    title.textContent = cat.titulo;

    const count = document.createElement("div");
    count.className = "section__count";
    count.textContent = list.length ? `${list.length} planta(s)` : "—";

    head.append(title, count);

    const cards = document.createElement("div");
    cards.className = "cards";

    if (!list.length) {
      const empty = document.createElement("div");
      empty.className = "card";
      empty.tabIndex = 0;
      empty.setAttribute("role", "note");
      empty.innerHTML = `
        <div class="card__title">Sin elementos todavía</div>
        <ul class="card__notes">
          <li>Edita <code>app.js</code> y agrega plantas a esta categoría.</li>
          <li>Tip: usa la plantilla comentada al final del arreglo <code>PLANTS</code>.</li>
        </ul>
      `;
      cards.appendChild(empty);
    } else {
      for (const plant of list) cards.appendChild(createCard(plant));
    }

    section.append(head, cards);
    els.sections.appendChild(section);
  }
}

function createCard(plant) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "card";
  btn.dataset.plantId = plant.id;

  const title = document.createElement("div");
  title.className = "card__title";
  title.textContent = plant.nombre;

  const notes = document.createElement("ul");
  notes.className = "card__notes";

  for (const n of (plant.notas ?? []).slice(0, 4)) {
    const li = document.createElement("li");
    li.textContent = n;
    notes.appendChild(li);
  }

  const tags = document.createElement("div");
  tags.className = "card__tags";
  for (const cid of (plant.categorias ?? [])) {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = categoryTitle(cid);
    tags.appendChild(span);
  }

  btn.append(title, notes, tags);

  btn.addEventListener("mouseenter", () => setPreview(plant));
  btn.addEventListener("focus", () => setPreview(plant));
  btn.addEventListener("mouseleave", clearPreview);
  btn.addEventListener("blur", clearPreview);
  btn.addEventListener("click", () => openModal(plant));

  return btn;
}

function setPreview(plant) {
  const hasImg = Boolean(plant.imagen);
  els.previewImg.style.display = hasImg ? "block" : "none";
  els.previewImg.src = hasImg ? plant.imagen : "";
  els.previewImg.alt = hasImg ? `Foto: ${plant.nombre}` : "";

  const metaLines = [
    `<strong>${escapeHtml(plant.nombre)}</strong>`,
    ...(plant.notas ?? []).slice(0, 3).map((x) => `• ${escapeHtml(x)}`),
    "<span class=\\"muted\\">Click para ver detalle</span>",
  ];
  els.previewMeta.innerHTML = metaLines.join("<br />");
}

function clearPreview() {
  els.previewImg.style.display = "none";
  els.previewImg.src = "";
  els.previewImg.alt = "";
  els.previewMeta.textContent = "";
}

function openModal(plant) {
  els.modalTitle.textContent = plant.nombre;

  els.modalTags.innerHTML = "";
  for (const cid of (plant.categorias ?? [])) {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = categoryTitle(cid);
    els.modalTags.appendChild(span);
  }

  els.modalNotes.innerHTML = "";
  for (const note of (plant.notas ?? [])) {
    const li = document.createElement("li");
    li.textContent = note;
    els.modalNotes.appendChild(li);
  }

  const cautions = plant.precauciones ?? [];
  if (cautions.length) {
    els.modalCautions.hidden = false;
    els.modalCautions.innerHTML = `<strong>Precauciones:</strong><ul>${cautions
      .map((c) => `<li>${escapeHtml(c)}</li>`)
      .join("")}</ul>`;
  } else {
    els.modalCautions.hidden = true;
    els.modalCautions.innerHTML = "";
  }

  els.modalImg.src = plant.imagen ?? "";
  els.modalImg.alt = plant.imagen ? `Foto: ${plant.nombre}` : "";

  if (typeof els.modal.showModal === "function") els.modal.showModal();
  else alert("Tu navegador no soporta <dialog>. Usa un navegador moderno.");
}

function escapeHtml(s) {
  return (s ?? "")
    .toString()
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function wireControls() {
  els.q.addEventListener("input", (e) => {
    state.q = e.target.value ?? "";
    render();
  });

  els.toggleOtros.addEventListener("change", (e) => {
    state.showOtros = Boolean(e.target.checked);
    render();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") clearPreview();
  });
}

(function main() {
  wireControls();
  render();
})();