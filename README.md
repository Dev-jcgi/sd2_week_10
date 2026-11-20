# DS2 · Semana 10 · Demo, versiones, gestión y entregables

**Desarrollo de Software 2 · Sección E · Capstone Delivery System**

Sesión de 2 horas con receso de 10 minutos para cerrar el proyecto. Todo es estático (GitHub Pages), sin servidor propio: el navegador del profesor es el centro de la sesión y los celulares se conectan directo a él con [PeerJS](https://peerjs.com) (WebRTC). **Un solo QR para toda la clase.**

| Parte | Ruta | Qué es |
|---|---|---|
| Inicio | `#/` | Los 4 temas y los enlaces del capstone (wiki, tags, milestones, pendientes, SemVer). |
| Presentación 2D | `#/presentacion` | reveal.js: una columna por tema (→) y detalle hacia abajo (↓). Diagramas animados con HTML y CSS. **P** abre el marcador de equipos, **ESC** la vista general. |
| Profesor | `#/profesor` | **Crear sesión** → aparece el QR. Al llegar a la diapositiva de una actividad, **se lanza sola** en los celulares. **P** muestra el podio. |
| Mi sesión (estudiante) | `#/vivo?s=<sesión>` | Escanea el QR, escribe su nombre y elige su equipo. Si su red no conecta, usa el código de respaldo de la diapositiva. |

## Temas y agenda

| Min | Qué |
|---|---|
| 0–10 | Inicio + **Actividad 1 · ¿Qué hace una buena demo?** (código DEMO) |
| 10–30 | Tema 1 · Demostración del producto: el flujo de punta a punta, el guion de 15 minutos, la preparación y el plan B |
| 30–50 | Tema 2 · Versionado de software: SemVer, tags anotados, SNAPSHOT y releases, con los tags del capstone |
| 50–60 | **Actividad 2 · Ponle número a la versión** (código TAGS) |
| 60–70 | Receso (diapositiva con cuenta regresiva) |
| 70–90 | Tema 3 · Gestión de proyectos: triple restricción, Scrum con LeSS, métricas y riesgos reales del capstone |
| 90–95 | **Actividad 3 · Gestión con datos** (código PLAN) |
| 95–113 | Tema 4 · Entregables del proyecto: qué se entrega y dónde, la DoD del proyecto y las fechas de cierre |
| 113–118 | **Actividad 4 · ¿Dónde va cada entregable?** (código ENTR) |
| 118–120 | Cierre y podio de equipos |

## Publicar en GitHub Pages

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. Cualquier push a `main` (o **Actions → Publicar en GitHub Pages → Run workflow**) publica el sitio en `https://<dominio>/sd2_week_10/`.

## Desarrollo local

```bash
npm install
npm run dev
```
