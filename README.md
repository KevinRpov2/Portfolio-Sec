# 🛡️ Hack The Box Portfolio & Technical Write-ups

[![GitHub Pages](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-9fef00?style=for-the-badge&logo=github&logoColor=0b0e14)](https://kevinrpov2.github.io/Portfolio-Sec/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)]()
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)]()
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)]()

Portafolio web estático diseñado para documentar y exhibir mis avances, metodologías de intrusión y análisis forense en **Hack The Box (HTB)**. Construido con enfoque en reclutadores técnicos y líderes de ciberseguridad para demostrar habilidades prácticas en enumeración, explotación, escalada de privilegios y remediación defensiva.

---

## ✨ Características Principales

* **Doble Módulo de Contenido:** Separación clara entre **Máquinas (Boxes)** y **Challenges & Sherlocks** (Web, Forensics, Crypto, Reverse Engineering).
* **Filtrado y Búsqueda en Tiempo Real:** Búsqueda dinámica por nombre, técnica, CVE o palabras clave, combinada con filtros por nivel de dificultad (`Easy`, `Medium`, `Hard`).
* **Estructura de Informe Profesional:** Cada *write-up* está estandarizado en fases: *Resumen Ejecutivo (TL;DR)*, *Enumeración*, *Explotación (Foothold)*, *Escalada de Privilegios* y *Recomendaciones de Remediación*.
* **Bloques de Código Interactivos:** Comandos y salidas de consola formateados con botón de copiado rápido al portapapeles.
* **Visor de Evidencias (Lightbox):** Galería integrada para ampliar capturas de pantalla de herramientas (Nmap, Burp Suite, Wireshark, shells).
* **Cumplimiento de Normativas HTB:** Bloqueo preventivo para máquinas o retos activos con el fin de respetar las políticas de divulgación de Hack The Box.
* **Arquitectura Desacoplada:** El contenido se gestiona íntegramente desde un archivo JSON, permitiendo publicar nuevos reportes sin modificar la estructura HTML/JS.

---

## 📁 Arquitectura del Proyecto

```text
WEB_HTB/
├── index.html          # Estructura principal y vista de detalle (SPA)
├── css/
│   └── styles.css      # Estilos responsivos y tema oscuro inspirado en HTB
├── js/
│   └── app.js          # Lógica de carga asíncrona (Fetch API), filtros y modal
├── data/
│   └── writeups.json   # Base de datos estructurada de máquinas y retos
└── assets/
    ├── cv.pdf          # Hoja de vida descargable
    ├── favicon.png     # Icono de pestaña del navegador
    └── img/            # Capturas de pantalla y evidencias técnicas
