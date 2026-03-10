# Herbolaria (GitHub Pages)

Sitio estático con notas personales. Pasa el cursor sobre cada planta para ver la foto (panel fijo a la derecha). En móvil, toca una tarjeta para ver detalle.

## Estructura

- `index.html`
- `styles.css`
- `app.js` (datos + render)
- `assets/` (fotos)

## Cómo publicarlo en GitHub Pages (rápido)

1. Crea un repo (ej: `herbolaria-notas`).
2. Sube TODO este folder al repo.
3. GitHub → Settings → Pages → Deploy from a branch → Branch: `main` / Folder: `/ (root)`.
4. Listo.

## Cómo agregar plantas

Edita `app.js` → arreglo `PLANTS`:

- `categorias`: usa `relajantes`, `hipertension`, `circulacion`, `diabetes`, `otros`
- `imagen`: pon la ruta relativa, ej: `assets/manzanilla.jpg`

Tip: si quieres nuevas categorías, agrégalas en `CATEGORIES`.