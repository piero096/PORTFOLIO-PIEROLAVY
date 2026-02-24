import { useState, useEffect } from 'react'
import './App.css'

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
    company:  'Empresa Tecnológica S.A.',
    title:    'Desarrollador Frontend Senior',
    period:   'Ene 2023 — Presente',
    location: 'Buenos Aires, Argentina',
    roles: [
      'Desarrollé interfaces de usuario con React y TypeScript para aplicaciones SaaS con más de 50.000 usuarios activos mensuales.',
      'Lideré la migración del sistema de diseño legacy a una arquitectura de componentes moderna, reduciendo el tiempo de desarrollo en un 40%.',
      'Colaboré con el equipo de backend en el diseño e implementación de APIs RESTful consumidas por aplicaciones móviles y web.',
      'Mentoring a desarrolladores junior y revisión de código en un equipo de 8 personas distribuidas.',
    ],
  },
  {
    company:  'Agencia Digital Lorem',
    title:    'Desarrollador Web Full Stack',
    period:   'Mar 2021 — Dic 2022',
    location: 'Remoto',
    roles: [
      'Construí y mantuve aplicaciones web con PHP (Laravel), MySQL y Vue.js para clientes del sector retail y logístico.',
      'Implementé pasarelas de pago y sistemas de facturación electrónica integrados con APIs de terceros (MercadoPago, AFIP).',
      'Optimicé consultas de base de datos críticas logrando una mejora del 60% en tiempos de respuesta.',
      'Participé activamente en metodología Scrum, gestionando sprints quincenales y revisiones de sprint.',
    ],
  },
  {
    company:  'StartUp InnovaCode',
    title:    'Desarrollador Junior',
    period:   'Jun 2019 — Feb 2021',
    location: 'Buenos Aires, Argentina',
    roles: [
      'Desarrollé funcionalidades para un CRM interno utilizando Java Spring Boot y Angular como stack principal.',
      'Automaticé procesos de generación de reportes, ahorrando aproximadamente 15 horas semanales al equipo de operaciones.',
      'Participé en el diseño de la arquitectura de microservicios que permitió escalar el sistema de 1K a 20K usuarios.',
    ],
  },
]

const TECHS = [
  { name: 'PHP',        tag: 'Backend'  },
  { name: 'Java',       tag: 'Backend'  },
  { name: 'React',      tag: 'Frontend' },
  { name: 'JavaScript', tag: 'Frontend' },
  { name: 'CSS',        tag: 'Frontend' },
  { name: 'Node.js',    tag: 'Backend'  },
]

const PROJECTS = [
  {
    num: '01',
    title: 'Nombre del Proyecto',
    desc: 'Descripción del proyecto. Explica qué problema resuelve, qué tecnologías usaste y cuál fue tu aporte principal en el desarrollo.',
    techs: ['React', 'Node.js'],
    year: '2024',
    link: '#',
  },
  {
    num: '02',
    title: 'Nombre del Proyecto',
    desc: 'Descripción del proyecto. Explica qué problema resuelve, qué tecnologías usaste y cuál fue tu aporte principal en el desarrollo.',
    techs: ['PHP', 'MySQL'],
    year: '2024',
    link: '#',
  },
  {
    num: '03',
    title: 'Nombre del Proyecto',
    desc: 'Descripción del proyecto. Explica qué problema resuelve, qué tecnologías usaste y cuál fue tu aporte principal en el desarrollo.',
    techs: ['Java', 'Spring'],
    year: '2023',
    link: '#',
  },
]

/* About section has a light bg → nav needs dark colors */
const LIGHT_BG = new Set(['about'])

/* Selector for the main heading of each section.
   The nav item becomes active when that heading scrolls past 60% of the viewport. */
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

  useEffect(() => {
    const ids = NAV_ITEMS.map(n => n.href.slice(1))

    const onScroll = () => {
      // The active section is the last one whose heading has crossed
      // 60% down from the top of the viewport.
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
    onScroll() // set correct state on first render
    return () => window.removeEventListener('scroll', onScroll)
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
        <span className="lavy-text">Lavy</span>
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

          <div className="about-left">
            <p className="eyebrow">— Sobre mí</p>
            <h2 className="about-heading">
              Desarrollador<br />Full Stack
            </h2>
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

          <div className="about-right">
            <p className="eyebrow">— Stack técnico</p>
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
                  <a href={p.link} className="proj-link">Ver proyecto →</a>
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
              <span className="contact-detail">hello@pierolavy.com</span>
              <span className="contact-detail">Buenos Aires, Argentina</span>
            </div>
          </div>

          <form className="contact-form" onSubmit={e => e.preventDefault()}>
            <div className="form-field">
              <label className="form-label">Nombre</label>
              <input className="form-input" type="text" placeholder="Tu nombre completo" />
            </div>
            <div className="form-field">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" placeholder="tu@email.com" />
            </div>
            <div className="form-field">
              <label className="form-label">Mensaje</label>
              <textarea className="form-input form-textarea"
                placeholder="Cuéntame sobre tu proyecto…" rows={5} />
            </div>
            <button className="form-submit" type="submit">
              Enviar mensaje <span className="btn-arrow">→</span>
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
          <a href="#" className="ft-link">GitHub</a>
          <a href="#" className="ft-link">LinkedIn</a>
          <a href="#" className="ft-link">Email</a>
        </div>
      </footer>

    </div>
  )
}

export default App
