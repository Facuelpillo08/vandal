# VANDAL // CLUB — Barbería de Autor & Tatuajes

Sitio web oficial de **VANDAL // CLUB**, estudio híbrido de barbería clásica y tatuajes de autor con estética noir arquitectónica.

## 🚀 Despliegue en Vercel

El proyecto está 100% configurado y optimizado para desplegarse en **Vercel** sin pasos complejos.

### Opción 1: Conectar repositorio de GitHub (Recomendado)
1. Crea un repositorio en GitHub (ej. `vandal-club`).
2. Sube el código local:
   ```bash
   git add .
   git commit -m "feat: VANDAL CLUB production ready"
   git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
   git push -u origin main
   ```
3. Ingresa a [vercel.com/new](https://vercel.com/new).
4. Selecciona tu repositorio. Vercel detectará automáticamente:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Haz clic en **Deploy**.

### Opción 2: Despliegue directo mediante Vercel CLI
```bash
npx vercel
```
Para producción directa:
```bash
npx vercel --prod
```

---

## 🛠️ Tecnologías y Características
- **React 19** + **Vite 8**
- **Tailwind CSS 3** con paleta Obsidian, Stone y Copper
- **GSAP 3** + **ScrollTrigger** (animaciones 60fps, parallax interactivo y mask reveals)
- **Lenis Smooth Scroll** (desplazamiento cinemático con física lerp sincronizada)
- **Sistema de Rutas SPA y 404 personalizada** (`vercel.json` con rewrites automáticos)
- **Estimador interactivo de tatuajes** y **reserva en tiempo real vía WhatsApp**
- **Iconografía y PWA WebManifest** configurados en `/public`
