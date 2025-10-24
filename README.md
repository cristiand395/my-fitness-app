# 🏋️ My Fitness App

**My Fitness App** es una aplicación web open source diseñada para registrar y visualizar **entrenamientos, peso corporal y calorías**.  
El objetivo es ofrecer una experiencia completa, moderna y personalizable que pueda usarse tanto de forma personal como autoalojada en servidores propios (via Docker).

---

## 🚀 Objetivos del proyecto

- Crear una aplicación **usable y moderna** para el seguimiento de entrenamiento y nutrición.  
- Construir una **base sólida** para futuras versiones con IA (análisis y recomendaciones automáticas). 
- Mantener un enfoque **educativo y progresivo** para aprender de cada módulo (Next.js, PostgreSQL, Drizzle, Docker, Testing, etc).  
- Desarrollar una arquitectura **modular y escalable**, lista para integraciones futuras (IA, social, pagos, etc).

---

## 🧠 Stack tecnológico

| Categoría | Tecnología | Descripción |
|------------|-------------|--------------|
| **Frontend** | [React 19](https://react.dev/) | Nueva versión estable de React |
|  | [Next.js 16](https://nextjs.org/) | Framework base con App Router y API Routes |
|  | [TypeScript](https://www.typescriptlang.org/) | Tipado estático y mejor mantenimiento |
|  | [Tailwind CSS v4](https://tailwindcss.com/) | Estilos rápidos, consistentes y responsive |
|  | [shadcn/ui](https://ui.shadcn.com/) | Componentes accesibles y personalizables |
|  | [GSAP](https://gsap.com/) | Animaciones fluidas y transiciones suaves |
|  | [View Transitions API](https://developer.mozilla.org/docs/Web/API/View_Transitions_API) | Transiciones nativas entre vistas |
|  | [Lightweight Charts](https://github.com/tradingview/lightweight-charts) | Gráficos ligeros y altamente optimizados |
| **Backend** | API Routes (Next.js) | Endpoints internos para CRUD |
|  | [Drizzle ORM](https://orm.drizzle.team/) | ORM moderno y typesafe |
|  | [PostgreSQL](https://www.postgresql.org/) | Base de datos principal |
|  | [Better Auth](https://better-auth.com/) | Autenticación simple y segura (email/password) |
| **Infraestructura** | [Docker](https://www.docker.com/) + Docker Compose | Entorno de desarrollo reproducible |
|  | [pnpm](https://pnpm.io/) | Gestor de dependencias rápido y eficiente |
| **Testing** | [Playwright](https://playwright.dev/) | Tests end-to-end para cada feature |
| **CI/CD (futuro)** | GitHub Actions | Tests y despliegues automáticos |
| **Integraciones futuras** | OpenAI API, Video models (como VEO3 o similares) | IA y generación de contenido multimedia |

---

## 🌍 Características previstas (v1)

- Registro de usuario (email y contraseña).  
- Registro manual de **entrenamientos**:
  - Tipo de ejercicio
  - Series, repeticiones, peso
  - Entrenamientos personalizados
- Registro manual de **peso corporal y calorías**.
- **Gráficos** de progreso (peso, rendimiento, calorías).  
- **Modo oscuro**, animaciones básicas y UI responsive.  
- Preparado para **multiidioma** (inicialmente español, luego traducción con LLM).  
- Docker Compose listo para autoalojar fácilmente.  
- **Testing** de cada módulo desde el inicio.  

---
˛
## 🛠️ Roadmap General

### 🏁 Etapa 1 — Configuración base
- [✅] Crear proyecto Next.js 16 con pnpm  
- [✅] Configurar TypeScript  
- [✅] Instalar y configurar Tailwind v4  
- [✅] Integrar shadcn/ui
- [ ] Configurar Drizzle ORM con PostgreSQ
- [ ] Dockerizar entorno de desarrollo  
- [ ] Crear `.env.dev` con variables base  

---

### 🧱 Etapa 2 — Estructura y Base de Datos
- [ ] Modelar base de datos inicial con Drizzle
  - [ ] Users
  - [ ] Workouts
  - [ ] Exercises
  - [ ] Sets
  - [ ] Calories
  - [ ] WeightLogs
- [ ] Crear migraciones iniciales  
- [ ] Semillas de ejemplo (fixtures)  

---

### 🔐 Etapa 3 — Autenticación
- [ ] Implementar Better Auth (email + password)
- [ ] Rutas protegidas en Next.js
- [ ] Persistencia de sesión  
- [ ] Proxy de protección  

---

### 🏋️ Etapa 4 — Funcionalidad de Entrenamientos
- [ ] CRUD de entrenamientos  
- [ ] Creación de rutinas personalizadas  
- [ ] Registro de series/repeticiones/peso  
- [ ] Visualización de historial  
- [ ] Gráficos de progreso (Lightweight Charts)  

---

### ⚖️ Etapa 5 — Peso y Calorías
- [ ] Registro manual de calorías diarias  
- [ ] Registro manual de peso corporal  
- [ ] Visualización en gráficos  

---

### 🎨 Etapa 6 — UI y Experiencia de Usuario
- [ ] Diseño responsivo  
- [ ] Modo oscuro  
- [ ] Animaciones GSAP y transiciones suaves  
- [ ] Traducción base (es/en)  

---

### 🧪 Etapa 7 — Testing y CI/CD
- [ ] Configurar Playwright  
- [ ] Tests E2E por módulo  
- [ ] GitHub Actions (build + test)  

---

### 🤖 Etapa 8 — Fase futura (v2)
- [ ] Integración con OpenAI API (chat y recomendaciones)  
- [ ] Análisis nutricional inteligente  
- [ ] Módulo social (amigos, retos, feed)  
- [ ] Generación automática de videos guía (modelos externos)  
- [ ] Integración de pagos o planes premium  

---

## 📚 Roadmap de aprendizaje

| Tema | Objetivo | Recurso sugerido |
|------|-----------|------------------|
| Next.js 15 | Dominar App Router y API Routes | [Next.js Docs](https://nextjs.org/docs) |
| Drizzle ORM | Aprender migraciones y relaciones | [Drizzle Docs](https://orm.drizzle.team/docs) |
| Docker | Aprender a dockerizar Next + Postgres | [Docker Compose Guide](https://docs.docker.com/compose/) |
| Tailwind v4 | Mejorar diseño responsive | [Tailwind Docs](https://tailwindcss.com/docs) |
| Testing con Playwright | Pruebas E2E reales | [Playwright Docs](https://playwright.dev/) |
| Autenticación moderna | Implementar Better Auth | [Better Auth Docs](https://better-auth.com/) |
| Charts y animaciones | Crear UI atractiva | GSAP + Lightweight Charts |

---

## 🌐 Despliegue (futuro)
El despliegue se hará en **Vercel**, con backend y base de datos dockerizados para entornos de desarrollo.  
Se incluirán parámetros para **limitar usuarios activos** en entornos públicos.

---

## 💬 Licencia
Proyecto open source (MIT).  
Creado con fines de aprendizaje, contribución y autouso.

---

## 📦 Estado del proyecto

- [ ⏳ ] Etapa 1: Configuración base  
- [ ] Etapa 2: Base de datos  
- [ ] Etapa 3: Autenticación  
- [ ] Etapa 4: Entrenamientos  
- [ ] Etapa 5: Peso y Calorías  
- [ ] Etapa 6: UI / UX  
- [ ] Etapa 7: Testing / CI  
- [ ] Etapa 8: IA y módulos futuros  

---

## ✨ Créditos
Desarrollado con ❤️ y 🧠 por Cristian Davila.  
Inspirado en la idea de crear una app de fitness moderna, educativa y personalizable.