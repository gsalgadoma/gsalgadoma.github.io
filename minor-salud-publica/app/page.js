'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, BarChart3, BookOpen, Building2, CheckCircle2, ChevronDown,
  CircleDollarSign, GraduationCap, HeartPulse, Home, Landmark,
  Leaf, Mail, Menu, Microscope, Network, Scale, ShieldCheck, Sparkles,
  Stethoscope, Users, X, Brain, Globe2, BadgeCheck, ClipboardCheck
} from 'lucide-react';

const courses = [
  {
    step: '01', kicker: 'COMPRENDE', title: 'Introducción a la Salud Pública', semester: '1° semestre', credits: '4 créditos', icon: Users,
    bullets: [
      'Historia, conceptos, funciones y determinantes sociales de la salud.',
      'Demografía y encuestas nacionales para el diagnóstico poblacional.',
      'Prevención, atención primaria, salud global, pandemias y cambio climático.'
    ]
  },
  {
    step: '02', kicker: 'INVESTIGA', title: 'Introducción a la Epidemiología', semester: '2° semestre', credits: '4 créditos', icon: BarChart3,
    bullets: [
      'Indicadores como prevalencia, incidencia y mortalidad.',
      'Diseños de estudio, vigilancia epidemiológica y principios éticos.',
      'Transición epidemiológica y carga de enfermedad.'
    ]
  },
  {
    step: '03', kicker: 'TRANSFORMA', title: 'Políticas Públicas de Salud y Sistemas de Salud', semester: '1° y 2° semestre', credits: '4 créditos', icon: Landmark,
    bullets: [
      'Derecho a la salud, ciclo de políticas públicas y actores involucrados.',
      'Conflictos éticos y análisis de políticas nacionales contingentes.',
      'Sistemas de salud, financiamiento, FONASA, ISAPRES y AUGE/GES.'
    ]
  }
];

const issues = [
  { id: 'mental', title: 'Salud mental', icon: Brain, text: '¿Qué factores sociales, educativos y ambientales están influyendo? ¿Cómo medimos el problema y qué intervenciones pueden cambiarlo?' },
  { id: 'aging', title: 'Envejecimiento', icon: Users, text: '¿Cómo cambia una población que envejece? ¿Qué desafíos aparecen para los sistemas de salud, los cuidados y las políticas públicas?' },
  { id: 'climate', title: 'Cambio climático', icon: Globe2, text: '¿Cómo afectan las olas de calor, la contaminación, incendios y otros riesgos ambientales a la salud de las comunidades?' },
  { id: 'equity', title: 'Inequidades', icon: Scale, text: '¿Por qué el lugar donde vivimos, nuestros ingresos o educación se relacionan con diferencias evitables e injustas en salud?' },
  { id: 'chronic', title: 'Enfermedades crónicas', icon: HeartPulse, text: '¿Cómo prevenimos obesidad, diabetes, cáncer y enfermedad cardiovascular más allá de la atención individual?' },
  { id: 'outbreaks', title: 'Epidemias', icon: Microscope, text: '¿Cómo detectamos, investigamos y controlamos un brote? La vigilancia y el método epidemiológico convierten datos en decisiones.' }
];

const careers = {
  'Derecho': { icon: Scale, body: 'Derecho a la salud, regulación sanitaria, ética, diseño normativo y evaluación de políticas públicas.' },
  'Ingeniería': { icon: Network, body: 'Datos, modelamiento, sistemas complejos, gestión sanitaria y diseño de soluciones basadas en evidencia.' },
  'Psicología': { icon: Brain, body: 'Salud mental poblacional, prevención, promoción, determinantes sociales y evaluación de intervenciones.' },
  'Comunicación': { icon: Globe2, body: 'Comunicación de riesgo, campañas de prevención, alfabetización en salud y respuesta frente a desinformación.' },
  'Educación': { icon: GraduationCap, body: 'Promoción de salud en comunidades educativas, infancia, prevención y entornos saludables.' },
  'Kinesiología': { icon: Stethoscope, body: 'Prevención, actividad física, discapacidad, rehabilitación y análisis poblacional de necesidades de salud.' },
  'Fonoaudiología': { icon: Users, body: 'Discapacidad, envejecimiento, comunicación, deglución, prevención y necesidades de rehabilitación a nivel poblacional.' },
  'Terapia Ocupacional': { icon: Home, body: 'Participación, inclusión, determinantes sociales, comunidad y políticas que afectan la ocupación y calidad de vida.' },
  'Administración': { icon: Building2, body: 'Gestión de organizaciones sanitarias, financiamiento, evaluación de programas y sistemas de salud.' },
  'Otra carrera': { icon: Sparkles, body: 'La Salud Pública entrega una mirada transversal para entender problemas complejos, analizar evidencia y proponer soluciones desde tu disciplina.' }
};

const quiz = [
  {
    q: 'En una universidad aumentan los síntomas de ansiedad. ¿Qué te interesa conocer primero?',
    a: [
      ['Cuántas personas están afectadas y cómo ha cambiado en el tiempo', 'investiga'],
      ['Qué factores del entorno universitario podrían explicarlo', 'comprende'],
      ['Qué medidas o políticas podrían implementarse', 'transforma']
    ]
  },
  {
    q: 'Te muestran una diferencia importante de mortalidad entre dos comunas. Tu reacción es…',
    a: [
      ['Buscar los datos y comprobar cómo se calculó la diferencia', 'investiga'],
      ['Preguntar por vivienda, educación, ingresos y acceso a servicios', 'comprende'],
      ['Pensar qué decisiones públicas podrían reducir esa brecha', 'transforma']
    ]
  },
  {
    q: 'Frente a un brote de una enfermedad transmisible, te llama más la atención…',
    a: [
      ['Reconstruir quién enfermó, dónde y cuándo', 'investiga'],
      ['Entender por qué algunos grupos están más expuestos', 'comprende'],
      ['Diseñar una respuesta de prevención y control', 'transforma']
    ]
  },
  {
    q: '¿Qué frase se acerca más a tu manera de pensar?',
    a: [
      ['Sin buenos datos, es difícil decidir bien', 'investiga'],
      ['La salud depende de mucho más que la atención médica', 'comprende'],
      ['La evidencia debe traducirse en acciones concretas', 'transforma']
    ]
  }
];

const profiles = {
  comprende: { title: 'Mirada poblacional', text: 'Tiendes a mirar los determinantes y el contexto antes de explicar un problema de salud.', icon: Users },
  investiga: { title: 'Mirada epidemiológica', text: 'Te atrae medir, comparar y usar datos para entender qué está ocurriendo en una población.', icon: BarChart3 },
  transforma: { title: 'Mirada transformadora', text: 'Piensas rápidamente en cómo convertir evidencia en intervenciones, programas y políticas.', icon: Landmark }
};

function BrandArrow({ small=false }) {
  return <span className={small ? 'brand-arrow small' : 'brand-arrow'} aria-hidden="true"></span>;
}

export default function Page() {
  const [menu, setMenu] = useState(false);
  const [issue, setIssue] = useState('mental');
  const [career, setCareer] = useState('Otra carrera');
  const [quizOpen, setQuizOpen] = useState(false);
  const [qi, setQi] = useState(0);
  const [scores, setScores] = useState({ comprende:0, investiga:0, transforma:0 });
  const [result, setResult] = useState(null);

  const selectedIssue = useMemo(() => issues.find(i => i.id === issue), [issue]);
  const selectedCareer = careers[career];

  function answer(type) {
    const next = { ...scores, [type]: scores[type] + 1 };
    setScores(next);
    if (qi === quiz.length - 1) {
      const winner = Object.entries(next).sort((a,b) => b[1]-a[1])[0][0];
      setResult(winner);
    } else setQi(qi + 1);
  }

  function resetQuiz() {
    setQi(0); setScores({ comprende:0, investiga:0, transforma:0 }); setResult(null);
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Uandes"><img src="/uandes-logo.png" alt="Uandes" /></a>
        <nav className={menu ? 'nav open' : 'nav'}>
          <a href="#porque" onClick={()=>setMenu(false)}>¿Por qué?</a>
          <a href="#recorrido" onClick={()=>setMenu(false)}>El Minor</a>
          <a href="#problemas" onClick={()=>setMenu(false)}>Problemas reales</a>
          <a href="#carrera" onClick={()=>setMenu(false)}>Tu carrera</a>
          <button className="nav-quiz" onClick={()=>{setQuizOpen(true);setMenu(false)}}>Quiz</button>
          <a href="#contacto" onClick={()=>setMenu(false)}>Contacto</a>
        </nav>
        <a className="btn btn-dark top-cta" href="https://www.uandes.cl/estudiantes/minors/minor-en-salud-publica/" target="_blank" rel="noreferrer">Conoce el Minor <ArrowRight size={16}/></a>
        <button className="menu-button" onClick={()=>setMenu(!menu)} aria-label="Abrir menú">{menu?<X/>:<Menu/>}</button>
      </header>

      <section id="inicio" className="hero section-pad">
        <div className="mountain mountain-one"></div><div className="mountain mountain-two"></div>
        <div className="hero-grid container">
          <motion.div initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:.6}}>
            <div className="eyebrow"><BrandArrow small/> MINOR EN SALUD PÚBLICA</div>
            <h1>Tu profesión puede cambiar personas.<br/><span>La Salud Pública puede cambiar poblaciones.</span></h1>
            <p className="hero-copy">Comprende los problemas. Analiza la evidencia. Propón soluciones para mejorar la salud de las comunidades.</p>
            <div className="hero-actions">
              <a className="btn btn-red" href="#recorrido">Descubre el Minor <ArrowRight size={18}/></a>
              <button className="btn btn-ghost" onClick={()=>setQuizOpen(true)}>¿Tienes mirada de Salud Pública?</button>
            </div>
            <div className="mini-stats">
              <div><strong>3</strong><span>asignaturas</span></div>
              <div><strong>12</strong><span>créditos SCT</span></div>
              <div><strong>1</strong><span>mirada interdisciplinaria</span></div>
            </div>
          </motion.div>
          <motion.div className="hero-panel" initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} transition={{delay:.15,duration:.6}}>
            <div className="hero-orbit orb1"><Home/></div><div className="hero-orbit orb2"><GraduationCap/></div><div className="hero-orbit orb3"><Leaf/></div><div className="hero-orbit orb4"><HeartPulse/></div>
            <div className="hero-core"><div className="pulse-ring"></div><Users size={54}/><b>Salud poblacional</b><span>Personas · comunidades · sistemas</span></div>
            <div className="panel-note"><BarChart3 size={24}/><p>La salud de las personas depende de mucho más que la atención médica.</p></div>
          </motion.div>
        </div>
      </section>

      <section id="porque" className="section-pad light-section">
        <div className="container">
          <div className="section-head split"><div><span className="eyebrow dark"><BrandArrow small/> UNA MIRADA MÁS AMPLIA</span><h2>¿Qué determina nuestra salud?</h2></div><p>La Salud Pública estudia cómo las condiciones sociales, económicas, ambientales y sanitarias influyen en la salud de poblaciones completas.</p></div>
          <div className="det-grid">
            {[
              [Home,'Vivienda','Entornos seguros y saludables'],[GraduationCap,'Educación','Más oportunidades de vida'],[CircleDollarSign,'Ingreso','Menores brechas en salud'],[Leaf,'Entorno','Ciudades y ambientes saludables'],[HeartPulse,'Acceso a salud','Sistemas más justos y equitativos']
            ].map(([Icon,t,s])=><motion.article whileHover={{y:-5}} className="det-card" key={t}><Icon/><h3>{t}</h3><p>{s}</p></motion.article>)}
          </div>
        </div>
      </section>

      <section id="recorrido" className="section-pad journey-section">
        <div className="container">
          <div className="section-head"><span className="eyebrow dark"><BrandArrow small/> TU RECORRIDO</span><h2>Comprende. Investiga. Transforma.</h2><p>Tres asignaturas que conectan determinantes, método epidemiológico y decisiones públicas.</p></div>
          <div className="course-grid">
            {courses.map((c,idx)=>{ const Icon=c.icon; return <motion.article initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:idx*.12}} className="course-card" key={c.title}>
              <div className="course-top"><span className="step">{c.step}</span><Icon/></div>
              <div className="course-kicker">{c.kicker}</div><h3>{c.title}</h3>
              <div className="chips"><span>{c.credits}</span><span>{c.semester}</span></div>
              <ul>{c.bullets.map(b=><li key={b}><CheckCircle2 size={17}/>{b}</li>)}</ul>
            </motion.article>})}
          </div>
        </div>
      </section>

      <section id="problemas" className="section-pad problems-section">
        <div className="container">
          <div className="section-head split"><div><span className="eyebrow"><BrandArrow small/> APLÍCALO A LA REALIDAD</span><h2>Explora problemas reales</h2></div><p>Selecciona un desafío y descubre cómo cambia cuando lo miras desde la Salud Pública.</p></div>
          <div className="issue-layout">
            <div className="issue-tabs">{issues.map(i=>{const Icon=i.icon; return <button key={i.id} className={issue===i.id?'active':''} onClick={()=>setIssue(i.id)}><Icon size={21}/>{i.title}</button>})}</div>
            <motion.div key={issue} initial={{opacity:0,x:10}} animate={{opacity:1,x:0}} className="issue-detail">
              <selectedIssue.icon size={38}/><h3>{selectedIssue.title}</h3><p>{selectedIssue.text}</p>
              <div className="lens-grid"><div><Users/><b>Comprende</b><span>¿Qué factores explican el problema?</span></div><div><BarChart3/><b>Investiga</b><span>¿Qué dicen los datos?</span></div><div><Landmark/><b>Transforma</b><span>¿Qué podemos hacer?</span></div></div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="carrera" className="section-pad light-section">
        <div className="container career-grid">
          <div>
            <span className="eyebrow dark"><BrandArrow small/> CONECTA CON TU DISCIPLINA</span><h2>¿Qué tiene que ver con tu carrera?</h2><p>El Minor está pensado para integrar la Salud Pública con diferentes ámbitos profesionales.</p>
            <label className="select-label" htmlFor="career">Selecciona tu carrera</label>
            <div className="select-wrap"><select id="career" value={career} onChange={e=>setCareer(e.target.value)}>{Object.keys(careers).map(c=><option key={c}>{c}</option>)}</select><ChevronDown size={18}/></div>
            <p className="restriction-note"><ShieldCheck size={17}/> Restricciones oficiales: Medicina, Enfermería y Obstetricia y Puericultura no pueden cursar este Minor.</p>
          </div>
          <motion.div key={career} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} className="career-card">
            <selectedCareer.icon size={46}/><span className="mini-label">SALUD PÚBLICA + {career.toUpperCase()}</span><h3>{career}</h3><p>{selectedCareer.body}</p><div className="career-claim"><BadgeCheck/> Una mirada poblacional puede ampliar las decisiones de tu profesión.</div>
          </motion.div>
        </div>
      </section>

      <section className="section-pad quiz-banner">
        <div className="container quiz-banner-inner">
          <div><span className="eyebrow"><BrandArrow small/> 2 MINUTOS</span><h2>¿Tienes mirada de Salud Pública?</h2><p>Responde cuatro preguntas y descubre qué forma de pensar aparece primero en ti.</p></div>
          <button className="btn btn-white" onClick={()=>setQuizOpen(true)}>Comenzar quiz <ArrowRight size={18}/></button>
        </div>
      </section>

      <section className="section-pad info-section">
        <div className="container info-grid">
          <article><BookOpen/><h3>Propósito</h3><p>Formar estudiantes con conocimientos sólidos sobre salud poblacional, determinantes y problemas sanitarios locales y globales, con formación ética y responsabilidad social.</p></article>
          <article><ClipboardCheck/><h3>Prerrequisitos</h3><p>Las dos primeras asignaturas no tienen prerrequisitos. Políticas Públicas de Salud y Sistemas de Salud requiere haber cursado ambas.</p></article>
          <article><Building2/><h3>Impartido por</h3><p>Escuela de Enfermería, Universidad de los Andes.</p></article>
        </div>
      </section>

      <section id="contacto" className="final-cta section-pad">
        <div className="container final-grid">
          <div><span className="eyebrow"><BrandArrow small/> MINOR EN SALUD PÚBLICA</span><h2>Una mirada distinta para grandes desafíos.</h2><p>Comprende. Investiga. Transforma.</p></div>
          <div className="cta-stack"><a className="btn btn-white" href="https://www.uandes.cl/estudiantes/minors/minor-en-salud-publica/" target="_blank" rel="noreferrer">Conoce el programa oficial <ArrowRight size={18}/></a><a className="contact-link" href="mailto:gsalgadom@uandes.cl"><Mail size={17}/> Gabriel Salgado Maldonado · gsalgadom@uandes.cl</a></div>
        </div>
      </section>

      <footer><div className="container footer-inner"><img src="/uandes-logo.png" alt="Uandes"/><span>Minor en Salud Pública · Escuela de Enfermería</span><a href="#inicio">Volver arriba ↑</a></div></footer>

      {quizOpen && <div className="modal-backdrop" onMouseDown={()=>setQuizOpen(false)}><div className="quiz-modal" onMouseDown={e=>e.stopPropagation()}>
        <button className="close" onClick={()=>setQuizOpen(false)}><X/></button>
        {!result ? <>
          <div className="quiz-progress"><span>Pregunta {qi+1} de {quiz.length}</span><div><i style={{width:`${((qi+1)/quiz.length)*100}%`}}></i></div></div>
          <h3>{quiz[qi].q}</h3><div className="answers">{quiz[qi].a.map(([txt,type])=><button key={txt} onClick={()=>answer(type)}>{txt}<ArrowRight size={18}/></button>)}</div>
        </> : (()=>{const P=profiles[result];const Icon=P.icon;return <div className="result"><div className="result-icon"><Icon/></div><span>Tu resultado</span><h3>{P.title}</h3><p>{P.text}</p><div className="result-note">En Salud Pública, las tres miradas se complementan: comprender, investigar y transformar.</div><button className="btn btn-red" onClick={resetQuiz}>Repetir quiz</button></div>})()}
      </div></div>}
    </main>
  );
}
