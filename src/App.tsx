import { useState, useEffect } from 'react'
import { animate, createTimeline, stagger } from 'animejs'
import PocketBase from 'pocketbase'
import './App.css'

const pb = new PocketBase('https://poketbasecartas.codestudio.pe')

/* ── Data (edit freely) ───────────────── */
const NAV_ITEMS = [
  { href: '#home',       label: 'Inicio'      },
  { href: '#about',      label: 'Sobre mí'    },
  { href: '#experience', label: 'Experiencia' },
  { href: '#projects',   label: 'Proyectos'   },
  { href: '#contact',    label: 'Contacto'    },
]

const JOBS = [
  {
    company:  'Serprocom Perú SAC.',
    title:    'Supervisor  de Redes e Infraestructura',
    period:   '07/2025 — 12/2025',
    location: 'Cajamarca, Perú',
    roles: [
      'Control, soporte y mantenimiento de sistemas de control de flotas, DISPATCH.',
      'Programación en PHP y Python para ayudar a mejorarla cobertura de la red Mesh.',
      'Cableado estructurado.',
      'Implementación de redes en distintos puntos de unidad minera.',
      'Instalación y configuración de radio enlaces.',
      'Configuración y mantenimiento de radios Handy y radio base.',
      'Configuración y soporte de la red Mesh para operación minera Shahuindo con ARUBA.',
      'Verificación y soporte de red Vivero y Operaciones mina.',
      'Soporte de Dispatch en volquetes y excavadoras de alta precisión.',
    ],
  },
  {
    company:  'Serprocom Perú SAC.',
    title:    'Analista de Redes',
    period:   '05/2024 — 06/2025',
    location: 'Cajamarca, Perú',
    roles: [
      'Programación en Python para ayudar a mejorarla cobertura de la red Mesh.',
      'Cableado estructurado.',
      'Instalación de radio enlaces.',
      'Configuración y mantenimiento de radios Handy y radio base.',
      'Mantenimiento preventivo de equipos de cómputo.',
      'Configuración y soporte de la red Mesh para operación minera Shahuindo con ARUBA.',
      'Soporte de Dispatch en volquetes y excavadoras de alta precisión.',
    ],
  },
  {
    company:  'E y L Consultores',
    title:    'Asistente de Telecomunicaciones',
    period:   '12/2023 — 03/2024',
    location: 'Lima, Perú',
    roles: [
      'Cotizaciones de diferentes proyectos.',
      'Desarrollo de proyectos ya aprobados.',
      'Implementación de cableado estructurado.',
      'Configuración de equipos de telecomunicaciones (cisco).',
      'Creación de reportes de la estructura de telecomunicaciones instaladas.',
    ],
  },
  {
    company:  'Municipalidad Provincial de San Marcos',
    title:    'Asistente de TI',
    period:   '09/2023 — 11/2023',
    location: 'Cajamarca, Perú',
    roles: [
      'Programación de sistemas para agilización del almacén en lenguaje C#.',
      'Ejecución de proyectos para la automatización de procesos dentro de la Municipalidad.',
      'Soporte de incidencias técnicas en todas las sedes de las Municipalidad.',
      'Soporte y actualización de los sistemas existentes de TI.',
      'Administración de redes dentro y fuera de la Municipalidad.',
      'Desarrollo de software para algunos procesos dentro de la Municipalidad.',
      'Documentación de los proyectos asignados.',
      'Realización de informes técnicos',
    ],
  },
  {
    company:  'Alvisoft',
    title:    'Asistente de Sistemas',
    period:   '12/2021 — 12/2022',
    location: 'Lima, Perú',
    roles: [
      'Programación de módulos para elsistema de planillas en Alvisoft en C#.',
      'Programación de módulos en C++ para integraciones con plataforma de planillas.',
      'Soporte y solución a lasincidencias de operatividad delsistema de planillas',
      'Diseño, desarrollo e implementación de nuevos módulos para el sistema de planillas.',
      'Registro y reporte de los problemassolucionados en elsistema de planillas.',
      'Atención y solución de incidencias de los diferentes usuarios del sistema de planillas.',
      'Capacitación de todo el sistema para colaboradores nuevos en la empresa.',
    ],
  },
]

const TECHS = [
  { name: 'PHP',        tag: 'Backend'  },
  { name: 'PYTHON',     tag: 'Backend'  },
  { name: 'C#',         tag: 'Backend'  },
  { name: 'SQL',        tag: 'Backend'  },
  { name: 'React',      tag: 'Frontend' },
  { name: 'JavaScript', tag: 'Frontend' },
]

const PROJECTS = [
  {
    num: '01',
    title: 'IMPERIO GYM',
    desc: 'Desarrollo de una aplicación web para la gestión de gimnasios, incluyendo registro de usuarios, membresías y dispositivos de registro de cleintes y personal.',
    techs: ['PHP', 'Vue.js', 'Postgres Sql'],
    year: '2024',
    link: 'https://imperiogym.pe/',
  },
  {
    num: '02',
    title: 'COLEGIO DE PSICÓLOGOS DE CAJAMARCA',
    desc: 'Desarrollo de una aplicación web para la gestión de colegiados, incluyendo registro de los mismos, pagos de colegiatura, registro de noticias y eventos del colegio de psicólogos.',
    techs: ['PHP', 'Vue.js', 'Postgres Sql'],
    year: '2025',
    link: 'https://cdrcajamarca.pe/',
  },
  {
    num: '03',
    title: 'PINEADO DISPATCH - MINERA SHAHUINDO',
    desc: 'Este programa fue realizado para hacer el pineado a excavadoras de alta precisión y volquetes, en la red mesh, con esto podemos saber qué porcentaje de error tenemos en los paquetes perdidos de la conexión con la red interna.',
    techs: ['PYTHON'],
    year: '2025',
    link: 'https://github.com/piero096/PINEADO-DISPATCH-SHAHUINDO.git',
  },
  {
    num: '04',
    title: 'UBICACIÓN DE DISPOSITIVOS EN RED MESH - MINERA SHAHUINDO',
    desc: 'Aplicación web para visualizar en tiempo real la ubicación de equipos en el mapa de la mina Shahuindo mediante geolocalización.',
    techs: ['REACT', 'NODE.JS', 'ARDUINO'],
    year: '2025',
    link: 'https://github.com/piero096/UBICACIONMAPS.git',
  },
]

const LIGHT_BG = new Set(['about'])

const SECTION_HEADING: Record<string, string> = {
  home:       '#home',
  about:      '#about .about-heading',
  experience: '#experience .sec-heading',
  projects:   '#projects .sec-heading',
  contact:    '#contact .contact-heading',
}


/* ── Component ────────────────────────── */
function App() {
  const [active, setActive] = useState('home')

  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await pb.collection('portafolio_piero').create(form)
      setStatus('ok')
      setForm({ nombre: '', email: '', mensaje: '' })
      setTimeout(() => setStatus('idle'), 4000)
    } catch (err) {
      console.error('PocketBase error:', err)
      setStatus('error')
    }
  }

  /* ── Scroll tracking ── */
  useEffect(() => {
    const ids = NAV_ITEMS.map(n => n.href.slice(1))
    const onScroll = () => {
      const trigger = window.innerHeight * 0.6
      let current = ids[0]
      for (const id of ids) {
        const el = document.querySelector(SECTION_HEADING[id]) as HTMLElement | null
        if (!el) continue
        if (el.getBoundingClientRect().top <= trigger) current = id
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Anime.js animations ── */
  useEffect(() => {

    /* Observer con entrada Y salida */
    function watch(sel: string, enter: () => void, exit: () => void) {
      const el = document.querySelector(sel)
      if (!el) return
      let inside = false
      new IntersectionObserver(([e]) => {
        if (e.isIntersecting && !inside)  { inside = true;  enter() }
        if (!e.isIntersecting && inside)  { inside = false; exit()  }
      }, { threshold: 0.12 }).observe(el)
    }

    /* ─── HERO entrance (una sola vez al cargar) ─── */
    const tl = createTimeline({ defaults: { ease: 'outExpo' } })
    tl.add('.piero-bg', {
      clipPath: ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'],
      opacity:  [0, 1], duration: 1600,
    })
    .add('.piero-bg-mobile', {
      clipPath: ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'],
      opacity:  [0, 1], duration: 1600,
    }, 0)
    .add('.lavy-char', {
      opacity: [0, 1], translateY: [-80, 0], rotate: ['-14deg', '0deg'],
      delay: stagger(75), duration: 900, ease: 'outBack',
    }, '-=1000')
    .add('.hero-shimmer', {
      translateX: ['-5%', '105%'], duration: 1100, ease: 'linear',
    }, '-=400')
    .add('.timeline-item', {
      opacity: [0, 1], translateX: [50, 0], delay: stagger(80), duration: 700,
    }, '-=700')
    .add('.scroll-hint', {
      opacity: [0, 1], translateY: [24, 0], duration: 600,
    }, '-=250')

    /* ─── ABOUT ─── */
    watch('#about',
      () => {
        animate('.about-photo-wrap',          { opacity: [0,1], translateX: [-40,0], duration: 900, ease: 'outExpo' })
        animate('.about-left-col .eyebrow',   { opacity: [0,1], translateY: [20,0],  duration: 700, delay: 180, ease: 'outExpo' })
        animate('.about-role',                { opacity: [0,1], translateY: [30,0],  duration: 800, delay: 280, ease: 'outExpo' })
        animate('.about-left-col .body-text', { opacity: [0,1], translateY: [20,0],  duration: 700, delay: stagger(110, { start: 420 }), ease: 'outExpo' })
        animate('.about-right-col',           { opacity: [0,1], translateX: [35,0],  duration: 900, delay: 250, ease: 'outExpo' })
        animate('.tech-item',                 { opacity: [0,1], translateX: [-20,0], duration: 600, delay: stagger(65, { start: 520 }), ease: 'outExpo' })
      },
      () => {
        animate('.about-photo-wrap',          { opacity: [1,0], translateX: [0,-30], duration: 450, ease: 'inExpo' })
        animate('.about-role',                { opacity: [1,0], translateY: [0,-20], duration: 400, ease: 'inExpo' })
        animate('.about-left-col .eyebrow',   { opacity: [1,0], translateY: [0,-15], duration: 380, ease: 'inExpo' })
        animate('.about-left-col .body-text', { opacity: [1,0], translateY: [0,-15], duration: 350, delay: stagger(40), ease: 'inExpo' })
        animate('.about-right-col',           { opacity: [1,0], translateX: [0,25],  duration: 420, ease: 'inExpo' })
      }
    )

    /* ─── EXPERIENCE ─── */
    watch('#experience',
      () => {
        animate('#experience .exp-header', { opacity: [0,1], translateX: [-40,0], duration: 900, ease: 'outExpo' })
        animate('.exp-card',               { opacity: [0,1], translateY: [30,0],  duration: 700, delay: stagger(90, { start: 250 }), ease: 'outExpo' })
      },
      () => {
        animate('#experience .exp-header', { opacity: [1,0], translateX: [0,-30], duration: 450, ease: 'inExpo' })
        animate('.exp-card',               { opacity: [1,0], translateY: [0,-20], duration: 380, delay: stagger(50), ease: 'inExpo' })
      }
    )

    /* ─── PROJECTS ─── */
    watch('#projects',
      () => {
        animate('#projects .projects-header', { opacity: [0,1], translateX: [40,0],  duration: 900, ease: 'outExpo' })
        animate('.project-card',              { opacity: [0,1], translateY: [35,0],  duration: 750, delay: stagger(110, { start: 300 }), ease: 'outExpo' })
      },
      () => {
        animate('#projects .projects-header', { opacity: [1,0], translateX: [0,30],  duration: 450, ease: 'inExpo' })
        animate('.project-card',              { opacity: [1,0], translateY: [0,-20], duration: 380, delay: stagger(50), ease: 'inExpo' })
      }
    )

    /* ─── CONTACT ─── */
    watch('#contact',
      () => {
        animate('#contact .contact-heading', { opacity: [0,1], translateY: [50,0],  duration: 1000, ease: 'outExpo' })
        animate('.form-field',               { opacity: [0,1], translateY: [25,0],  duration: 650,  delay: stagger(90, { start: 350 }), ease: 'outExpo' })
        animate('.form-submit',              { opacity: [0,1], translateY: [20,0],  duration: 600,  delay: 700, ease: 'outExpo' })
      },
      () => {
        animate('#contact .contact-heading', { opacity: [1,0], translateY: [0,-30], duration: 450, ease: 'inExpo' })
        animate('.form-field',               { opacity: [1,0], translateY: [0,-15], duration: 350, delay: stagger(35), ease: 'inExpo' })
        animate('.form-submit',              { opacity: [1,0], translateY: [0,-15], duration: 300, ease: 'inExpo' })
      }
    )

  }, [])

  const navDark = LIGHT_BG.has(active)

  return (
    <div className="app">

      {/* ── SIDE NAV ── */}
      <aside className={`sidenav${navDark ? ' sidenav--dark' : ''}`}>
        <nav className="sidenav-timeline">
          <div className="timeline-track" />
          <ul className="timeline-items">
            {NAV_ITEMS.map(({ href, label }) => {
              const id = href.slice(1)
              return (
                <li key={href} className={`timeline-item${active === id ? ' is-active' : ''}`}>
                  <a href={href}>{label}</a>
                  <span className="timeline-dot" />
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>

      {/* ── HERO ── */}
      <section id="home" className="hero">
        <svg className="piero-bg" viewBox="0 0 1000 562"
          preserveAspectRatio="none" aria-hidden="true">
          <text x="500" y="550" textAnchor="middle"
            textLength="1000" lengthAdjust="spacingAndGlyphs"
            fontFamily="'Bebas Neue', sans-serif"
            fontSize="750" fill="#c93628">
            PIERO
          </text>
        </svg>
        <div className="piero-bg-mobile" aria-hidden="true">PIERO</div>

        {/* Wrapper fijo para centrado — NO tocado por anime.js */}
        <div className="lavy-outer" aria-hidden="true">
          {['L','a','v','y'].map((ch, i) => (
            <span key={i} className="lavy-char">{ch}</span>
          ))}
        </div>

        {/* Línea de shimmer que barre el hero */}
        <div className="hero-shimmer" aria-hidden="true" />

        <div className="grain" aria-hidden="true" />
        <div className="scroll-hint" aria-hidden="true">
          <span className="scroll-line" />
          <span className="scroll-label">scroll</span>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="section about-section">
        <span className="sec-num" aria-hidden="true">01</span>
        <div className="about-inner">

          {/* ── IZQUIERDA: foto + texto ── */}
          <div className="about-left-col">

            {/* Foto e "INGENIERO DE SISTEMAS" en la misma fila */}
            <div className="about-photo-row">
              <div className="about-photo-wrap">
                <img
                  src="/piero-photo.png"
                  alt="Piero Lavy"
                  className="about-photo"
                />
              </div>
              <p className="about-role">
                <span className="about-role-top">INGENIERO</span>
                <span className="about-role-bottom">DE SISTEMAS</span>
              </p>
            </div>

            <p className="eyebrow">— Sobre mí</p>
            <p className="body-text">
              Hola, soy <strong>Piero Lavy</strong>. Desarrollador apasionado por construir
              experiencias digitales que combinan diseño visual impactante con soluciones
              técnicas robustas.
            </p>
            <p className="body-text">
              Disfruto cada fase del proceso: desde la arquitectura hasta el despliegue final.
              Siempre buscando nuevos desafíos y aprendiendo tecnologías emergentes.
            </p>
          </div>

          {/* ── DERECHA: stack técnico ── */}
          <div className="about-right-col">
            <p className="eyebrow about-stack-label">— Stack técnico</p>
            <ul className="tech-list">
              {TECHS.map(t => (
                <li key={t.name} className="tech-item">
                  <span className="tech-name">{t.name}</span>
                  <span className="tech-badge">{t.tag}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="section exp-section">
        <span className="sec-num" aria-hidden="true">02</span>
        <div className="exp-header">
          <p className="eyebrow eyebrow--dim">— Experiencia</p>
          <h2 className="sec-heading">Últimos<br />trabajos</h2>
        </div>
        <ol className="exp-list">
          {JOBS.map((job, i) => (
            <li key={i} className="exp-card">
              <div className="exp-left">
                <span className="exp-period">{job.period}</span>
                <span className="exp-location">{job.location}</span>
              </div>
              <div className="exp-right">
                <p className="exp-company">{job.company}</p>
                <h3 className="exp-title">{job.title}</h3>
                <ul className="exp-roles">
                  {job.roles.map((r, j) => (
                    <li key={j} className="exp-role">{r}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="section projects-section">
        <span className="sec-num" aria-hidden="true">03</span>
        <div className="projects-header">
          <p className="eyebrow eyebrow--dim">— Proyectos</p>
          <h2 className="sec-heading">Trabajo<br />selecto</h2>
        </div>
        <ul className="projects-list">
          {PROJECTS.map(p => (
            <li key={p.num} className="project-card">
              <span className="proj-num">{p.num}</span>
              <div className="proj-body">
                <div className="proj-top">
                  <h3 className="proj-title">{p.title}</h3>
                  <span className="proj-year">{p.year}</span>
                </div>
                <p className="proj-desc">{p.desc}</p>
                <div className="proj-bottom">
                  <div className="proj-tags">
                    {p.techs.map(t => <span key={t} className="ptag">{t}</span>)}
                  </div>
                  <a href={p.link} className="proj-link" target='_blank'>Ver proyecto →</a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section contact-section">
        <span className="sec-num" aria-hidden="true">04</span>
        <div className="contact-inner">

          <div className="contact-left">
            <p className="eyebrow eyebrow--cream">— Contacto</p>
            <h2 className="contact-heading">
              Hablemos<br />de tu idea
            </h2>
            <p className="contact-sub">
              ¿Tienes un proyecto en mente? Estoy disponible para
              freelance y colaboraciones.
            </p>
            <div className="contact-meta">
              <span className="contact-detail">lavypiero096@gmail.com</span>
              <span className="contact-detail">Cajamarca, Perú</span>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label className="form-label">Nombre</label>
              <input
                className="form-input"
                type="text"
                placeholder="Tu nombre completo"
                value={form.nombre}
                onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
                required
              />
            </div>
            <div className="form-field">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                type="email"
                placeholder="tu@email.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
              />
            </div>
            <div className="form-field">
              <label className="form-label">Mensaje</label>
              <textarea
                className="form-input form-textarea"
                placeholder="Cuéntame sobre tu proyecto…"
                rows={5}
                value={form.mensaje}
                onChange={e => setForm(f => ({ ...f, mensaje: e.target.value }))}
                required
              />
            </div>
            {status === 'ok' && (
              <p className="form-status form-status--ok">¡Mensaje enviado! Me pondré en contacto pronto.</p>
            )}
            {status === 'error' && (
              <p className="form-status form-status--error">Algo salió mal. Intenta de nuevo.</p>
            )}
            <button className="form-submit" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Enviando…' : <>Enviar mensaje <span className="btn-arrow">→</span></>}
            </button>
          </form>

        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-brand">
          <span className="ft-piero">PIERO</span>
          <span className="ft-lavy">Lavy</span>
        </div>
        <span className="ft-copy">© 2026 — Todos los derechos reservados</span>
        <div className="ft-links">
          <a href="https://github.com/piero096" className="ft-link" target="_blank">GitHub</a>
          <a href="https://www.linkedin.com/in/piero-alessandro-lavy-aguilar-a8b6282a1?utm_source=share_via&utm_content=profile&utm_medium=member_ios" className="ft-link" target="_blank">LinkedIn</a>
        </div>
      </footer>

    </div>
  )
}

export default App
