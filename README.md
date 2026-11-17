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
```

🚀 Despliegue y Ejecución Local
Dado que la aplicación utiliza fetch() para leer data/writeups.json, requiere servirse a través de HTTP (abrir index.html directamente vía file:// será bloqueado por la política CORS del navegador).

Opción 1: Python HTTP Server (Recomendado)
Clona este repositorio:

Bash
git clone [https://github.com/](https://github.com/)[tu-usuario]/[nombre-del-repo].git
cd [nombre-del-repo]
Levanta un servidor local en el puerto 8000:

Bash
python -m http.server 8000
Abre tu navegador en http://localhost:8000.

Opción 2: VS Code Live Server
Abre la carpeta del proyecto en Visual Studio Code y haz clic en "Go Live" en la barra inferior derecha.

📝 Cómo Añadir un Nuevo Write-up
Para publicar una nueva máquina o reto resuelto, añade un objeto al arreglo de data/writeups.json siguiendo esta plantilla:

```JSON
{
  "id": "nombre-maquina",
  "type": "machine",
  "name": "Nombre Máquina",
  "os": "Linux",
  "difficulty": "Easy",
  "status": "Retired",
  "date": "2026-11-17",
  "tags": ["Nmap", "SQLi", "SUID"],
  "summary": "Breve resumen de dos líneas sobre el vector de entrada y escalada.",
  "protected": false,
  "content": {
    "tldr": "Resumen ejecutivo del compromiso completo.",
    "enumText": "Descripción de la fase de reconocimiento:",
    "enumCommand": "nmap -sC -sV 10.10.10.X",
    "enumOutput": "80/tcp open http Apache httpd",
    "exploit": "Explicación paso a paso del acceso inicial.",
    "privesc": "Explicación de la escalada de privilegios a root/SYSTEM.",
    "images": [
      {
        "src": "assets/img/evidencia.png",
        "caption": "Fig 1. Descripción de la captura de pantalla."
      }
    ],
    "remediation": "Medidas técnicas recomendadas para mitigar las vulnerabilidades encontradas."
  }
}
```
(Para añadir un reto en lugar de una máquina, cambia "type": "challenge" y reemplaza "os" por "category": "Web" o "Forensics").

⚠️ Aviso Legal y Ético
Todo el contenido publicado en este repositorio tiene fines estrictamente educativos y de demostración profesional en entornos de laboratorio controlados (Hack The Box). De acuerdo con las políticas de la plataforma, no se publican soluciones de máquinas o retos activos.
