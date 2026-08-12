import React, { useState, useEffect, useRef } from 'react';
import {
  Code2, Terminal, Layers, Mail, FileText, ArrowRight, Send, MapPin, Sparkles, ExternalLink, X
} from 'lucide-react';

// ── Brand icons ───────────────────────────────────────────────
import {
  SiJavascript, SiPython, SiReact, SiNextdotjs, SiNodedotjs,
  SiExpress, SiMongodb, SiMysql, SiDocker, SiGit, SiGithub,
  SiLinux, SiFigma, SiHtml5, SiCss, SiCisco, SiNeon,
  SiLeetcode, SiGeeksforgeeks, SiFirebase
} from 'react-icons/si';
import { FaJava, FaTrophy, FaMedal, FaGraduationCap, FaLinkedinIn } from 'react-icons/fa';
import { VscCode, VscTerminal } from 'react-icons/vsc';

import { profileData, projectsData, experienceData, skillsData } from './data/portfolioData';
import ProjectModal from './components/ProjectModal';
import heroPhoto from './assets/hero.jpeg';

// ── Skill icon map (brand colors kept on icons) ───────────────
const SKILL_ICONS = {
  'Java': { icon: <FaJava />, color: '#E76F00' },
  'Python': { icon: <SiPython />, color: '#3776AB' },
  'JavaScript': { icon: <SiJavascript />, color: '#D4A800' },
  'HTML': { icon: <SiHtml5 />, color: '#E34F26' },
  'CSS': { icon: <SiCss />, color: '#1572B6' },
  'React': { icon: <SiReact />, color: '#22B5CC' },
  'React Native': { icon: <SiReact />, color: '#22B5CC' },
  'Next.js': { icon: <SiNextdotjs />, color: '#111111' },
  'Node.js': { icon: <SiNodedotjs />, color: '#339933' },
  'Express.js': { icon: <SiExpress />, color: '#444444' },
  'MongoDB': { icon: <SiMongodb />, color: '#47A248' },
  'MySQL': { icon: <SiMysql />, color: '#4479A1' },
  'NeonDB': { icon: <SiNeon />, color: '#00B377' },
  'Git': { icon: <SiGit />, color: '#F05032' },
  'GitHub': { icon: <SiGithub />, color: '#111111' },
  'Linux': { icon: <SiLinux />, color: '#B8960C' },
  'Docker': { icon: <SiDocker />, color: '#2496ED' },
  'CI/CD': { icon: <VscCode />, color: '#007ACC' },
  'VS Code': { icon: <VscCode />, color: '#007ACC' },
  'Figma': { icon: <SiFigma />, color: '#F24E1E' },
  'Cisco Packet Tracer': { icon: <SiCisco />, color: '#1BA0D7' },
  'Firebase': { icon: <SiFirebase />, color: '#FFCA28' },
};

function SkillBadge({ name }) {
  const entry = SKILL_ICONS[name];
  return (
    <span className="skill-badge">
      {entry && (
        <span style={{ color: entry.color, fontSize: 15, lineHeight: 1 }}>
          {entry.icon}
        </span>
      )}
      {name}
    </span>
  );
}

// ── Typewriter hook ──────────────────────────────────────────
const TYPING_PHRASES = [
  'Computer Engineering student with experience in software development, UI/UX design, and real-world projects.',
  'Skilled in building modern web applications, collaborating in teams, and solving complex problems.',
  'Looking to contribute as a Software Development Engineer, Full Stack Developer, or DevOps Engineer.',
];

function useTypewriter(phrases, { typeSpeed = 45, deleteSpeed = 22, pauseMs = 4000 } = {}) {
  const [text, setText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = phrases[phraseIdx];
    let timer;

    if (isDeleting) {
      if (text === '') {
        setIsDeleting(false);
        setPhraseIdx((prev) => (prev + 1) % phrases.length);
      } else {
        timer = setTimeout(() => {
          setText(currentFullText.slice(0, text.length - 1));
        }, deleteSpeed);
      }
    } else {
      if (text === currentFullText) {
        timer = setTimeout(() => setIsDeleting(true), pauseMs);
      } else {
        timer = setTimeout(() => {
          setText(currentFullText.slice(0, text.length + 1));
        }, typeSpeed);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIdx, phrases, typeSpeed, deleteSpeed, pauseMs]);

  return { text, fullText: phrases[phraseIdx] };
}

function Typewriter() {
  const { text, fullText } = useTypewriter(TYPING_PHRASES);
  return (
    <p className="font-medium mb-10 max-w-lg" style={{ color: '#0d0d0d', lineHeight: 1.7, fontSize: 15, minHeight: 90, position: 'relative' }}>
      {/* Invisible full text with a hidden cursor ensures exact word-wrapping matches the visible text */}
      <span style={{ visibility: 'hidden' }}>
        {fullText}
        <span style={{ display: 'inline-block', width: 2, marginLeft: 2 }} />
      </span>
      {/* Visible typing text overlaid exactly on top */}
      <span style={{ position: 'absolute', left: 0, top: 0, width: '100%' }}>
        {text}
        <span
          style={{
            display: 'inline-block',
            width: 2,
            height: '1em',
            background: '#F07800',
            marginLeft: 2,
            verticalAlign: 'text-bottom',
            animation: 'blink 0.9s step-end infinite',
          }}
        />
      </span>
    </p>
  );
}

// ── Section heading ───────────────────────────────────────────
function SectionHeading({ plain, accent }) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-extrabold tracking-tight mb-3">
        {plain} <span style={{ color: '#F07800' }}>{accent}</span>
      </h2>
      <div className="section-bar" />
    </div>
  );
}

// ── Interactive Click Ripple ──────────────────────────────────
function ClickRipple() {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      // Don't trigger ripple if clicking a link/button to avoid interrupting fast navigation
      // or we can just trigger it globally.
      const newRipple = { x: e.clientX, y: e.clientY, id: Date.now() };
      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 4800);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="water-ripple"
          style={{ left: ripple.x, top: ripple.y }}
        >
          <div className="water-ripple-ring" />
          {/* <div className="water-ripple-ring" />
          <div className="water-ripple-ring" /> */}
        </div>
      ))}
    </>
  );
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [viewImage, setViewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // TODO: Replace with your actual Web3Forms access key
          access_key: "ed22a5c1-17e4-4f46-bd24-8993fa5d8169",
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormSubmitted(true);
        setTimeout(() => setFormSubmitted(false), 4000);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitError(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setSubmitError("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#FAF6EF', color: '#111111', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <ClickRipple />

      {/* ── Nav ──────────────────────────────────────────────────── */}
      <nav style={{ background: '#FAF6EF', borderBottom: '1.5px solid #E8DFD0', position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 40 }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-xl font-extrabold tracking-tight" style={{ color: '#111111' }}>
            RA<span style={{ color: '#F07800' }}>.</span>
          </a>
          <div className="hidden md:flex gap-7 text-sm font-semibold" style={{ color: '#444' }}>
            {['About', 'Skills', 'Experience', 'Projects', 'Achievements', 'Contact'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="nav-link" style={{ color: '#444', textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.color = '#F07800'}
                onMouseLeave={e => e.target.style.color = '#444'}
              >{l}</a>
            ))}
          </div>
          <a href="#contact" className="btn-primary btn-shimmer" style={{ padding: '8px 20px', borderRadius: 999, fontSize: 12 }}>
            Hire Me
          </a>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6" style={{ paddingTop: 104, paddingBottom: 48 }}>
        <div className="flex flex-col-reverse md:flex-row items-center gap-14">

          {/* Left – text */}
          <div className="flex-1">
            {/* Availability tag */}
            <>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <svg width="158" height="27" style={{ display: 'block' }}>
                  <polygon
                    points="6,1 157,1 157,26 1,26 1,7"
                    fill="none"
                    stroke="#f0eaea"
                    strokeWidth="1"
                  />
                </svg>

                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '0 12px 0 10px'
                  }}
                >
                  <span style={{ position: 'relative', display: 'inline-flex', width: 4, height: 4 }}>
                    <span
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        background: '#ea580c',
                        opacity: 0.5,
                        animation: 'badgePing 2s cubic-bezier(0,0,0.2,1) infinite'
                      }}
                    />
                    <span
                      style={{
                        position: 'relative',
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        background: '#ea580c'
                      }}
                    />
                  </span>

                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 600,
                      letterSpacing: 0.8,
                      textTransform: 'uppercase',
                      color: '#1a1a1a',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Open to opportunities
                  </span>
                </div>
              </div>

              <style>{`
    @keyframes badgePing {
      0% { transform: scale(1); opacity: 0.5; }
      75%, 100% { transform: scale(2.6); opacity: 0; }
    }
  `}</style>
            </>

            <h1 className="font-extrabold tracking-tight leading-tight mb-4" style={{ fontSize: 'clamp(38px, 5vw, 60px)' }}>
              Hi, I'm <span style={{ color: '#F07800' }}>{profileData.name}</span>.
            </h1>

            {/* Role pills — all equal */}
            <div className="flex flex-wrap gap-2 mb-6">
              {profileData.targetRoles.map((role) => (
                <span
                  key={role}
                  style={{
                    background: '#FAF6EF',
                    color: '#F07800',
                    border: '1.5px solid #F07800',
                    borderRadius: 999,
                    padding: '5px 14px',
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {role}
                </span>
              ))}
            </div>

            <Typewriter />

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 mt-8">
              <a href="#projects" className="btn-primary">
                <Code2 style={{ width: 16, height: 16 }} /> View Projects
              </a>
              <button onClick={() => setViewImage('/renuka_Resume.pdf')} className="btn-outline">
                Resume
              </button>
              <a href={profileData.socials.github} target="_blank" rel="noreferrer" className="btn-icon" title="GitHub">
                <SiGithub style={{ width: 20, height: 20, color: '#111' }} />
              </a>
              <a href={profileData.socials.linkedin} target="_blank" rel="noreferrer" className="btn-icon" title="LinkedIn">
                <FaLinkedinIn style={{ width: 18, height: 18, color: '#0A66C2' }} />
              </a>
              <a href={profileData.socials.leetcode || 'https://leetcode.com/'} target="_blank" rel="noreferrer" className="btn-icon" title="LeetCode">
                <SiLeetcode style={{ width: 19, height: 19, color: '#FFA116' }} />
              </a>
              <a href={profileData.socials.gfg || 'https://geeksforgeeks.org/'} target="_blank" rel="noreferrer" className="btn-icon" title="GeeksforGeeks">
                <SiGeeksforgeeks style={{ width: 20, height: 20, color: '#2F8D46' }} />
              </a>
              <a href={`mailto:${profileData.socials.email}`} className="btn-icon" title="Email">
                <Mail style={{ width: 20, height: 20 }} />
              </a>
            </div>
          </div>

          {/* Right – photo */}
          <div className="shrink-0 flex flex-col items-center gap-4">
            <div className="photo-ring" style={{ width: 320, height: 320 }}>
              <div className="photo-ring-inner">
                <img
                  src={heroPhoto}
                  alt="Renuka Alwadkar"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#FFF1E0;font-size:72px">👩‍💻</div>`;
                  }}
                />
              </div>
            </div>
            <div className="inline-flex items-center gap-2" style={{ background: '#fff', border: '1.5px solid #E8DFD0', borderRadius: 999, padding: '6px 14px', fontSize: 12, fontWeight: 600, color: '#666' }}>
              <MapPin style={{ width: 13, height: 13, color: '#F07800' }} />
              Wardha, Maharashtra
            </div>
          </div>
        </div>

        {/* ── Achievement badges ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3" style={{ marginTop: 40, paddingTop: 24, borderTop: '1.5px solid #E8DFD0' }}>
          {[
            { icon: <FaTrophy />, label: "Smart India Hackathon 2025 Winner" },
            { icon: <FaMedal />, label: "Smart India Hackathon 2024 Finalist" },
            { icon: <FaGraduationCap />, label: "Aspen National Leardership Fellow" },
            { icon: <VscTerminal />, label: "Full Stack & DevOps" },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 card"
              style={{ padding: '12px 14px' }}
            >
              <span style={{ color: '#F07800', fontSize: 18 }}>{icon}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────── */}
      <section id="about" style={{ background: '#fff', borderTop: '1.5px solid #E8DFD0', borderBottom: '1.5px solid #E8DFD0' }}>
        <div className="max-w-6xl mx-auto px-6" style={{ paddingTop: 72, paddingBottom: 72 }}>
          <SectionHeading plain="About" accent="Me" />
          <p className="font-medium max-w-4xl" style={{ color: '#555', lineHeight: 1.8, fontSize: 15, marginBottom: 40 }}>
            I am a Computer Engineering student at Bajaj Institute of Technology, Wardha (DBATU), passionate about modern software development, distributed systems, and user-centric application architecture. From winning national hackathons to designing robust web applications and containerized deployment paths, I combine functional coding standards with visual design consistency.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <Code2 style={{ width: 22, height: 22 }} />, title: 'Full Stack Engineering', desc: 'Designing REST APIs, schema structures, and intuitive dynamic web interfaces using modern JS frameworks and databases.' },
              { icon: <VscTerminal style={{ fontSize: 22 }} />, title: 'DevOps & Tooling', desc: 'Utilizing Docker, Linux, Git workflows, and CI/CD concepts for reliable and repeatable software delivery.' },
              { icon: <Layers style={{ width: 22, height: 22 }} />, title: 'UI/UX & Product Design', desc: 'Creating clean design systems in Figma and translating interactive prototypes into scalable production code.' },
              { icon: <Terminal style={{ width: 22, height: 22 }} />, title: 'Data Structures & Algorithms', desc: 'Solving computational challenges with optimized data structures, participating in coding platforms, and writing efficient logic.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="card" style={{ padding: 24, background: '#FAF6EF' }}>
                <span style={{ color: '#F07800', display: 'inline-block', marginBottom: 14 }}>{icon}</span>
                <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, color: '#111' }}>{title}</h3>
                <p style={{ fontSize: 13, color: '#777', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ───────────────────────────────────────────────── */}
      <section id="skills" className="max-w-6xl mx-auto px-6" style={{ paddingTop: 72, paddingBottom: 72 }}>
        <SectionHeading plain="Technical" accent="Stack" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(skillsData).map(([category, list]) => (
            <div key={category} className="card" style={{ padding: 22 }}>
              <h3
                style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#F07800', paddingBottom: 10, borderBottom: '1.5px solid #E8DFD0', marginBottom: 14 }}
              >
                {category.replace(/([A-Z])/g, ' $1')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {list.map(skill => <SkillBadge key={skill} name={skill} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Experience ───────────────────────────────────────────── */}
      <section id="experience" style={{ background: '#fff', borderTop: '1.5px solid #E8DFD0', borderBottom: '1.5px solid #E8DFD0' }}>
        <div className="max-w-4xl mx-auto px-6" style={{ paddingTop: 72, paddingBottom: 72 }}>
          <SectionHeading plain="Experience" accent="Timeline" />
          {/* timeline: border-left on the wrapper, dots absolutely on left edge */}
          <div style={{ marginLeft: 16, borderLeft: '2px solid #F07800', paddingLeft: 32, display: 'flex', flexDirection: 'column', gap: 40, position: 'relative' }}>
            {experienceData.map((exp, idx) => (
              <div key={idx} style={{ position: 'relative' }}>
                {/* dot sits on the border line, to the LEFT of the text */}
                <span style={{
                  position: 'absolute',
                  left: -41,
                  top: 4,
                  width: 14,
                  height: 14,
                  background: '#F07800',
                  border: '3px solid #fff',
                  borderRadius: '50%',
                  display: 'inline-block',
                  flexShrink: 0,
                }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 6 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <h3 style={{ fontWeight: 800, fontSize: 17, color: '#111', margin: 0 }}>{exp.role}</h3>
                      {exp.certificate && exp.certificate !== '#' && (
                        <button onClick={() => setViewImage(exp.certificate)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#F07800', fontSize: 11, fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: 4, textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}>
                          <ExternalLink style={{ width: 12, height: 12 }} /> Certificate
                        </button>
                      )}
                      {exp.lor && exp.lor !== '#' && (
                        <button onClick={() => setViewImage(exp.lor)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#F07800', fontSize: 11, fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: 4, textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}>
                          <ExternalLink style={{ width: 12, height: 12 }} /> Letter of Recommendation
                        </button>
                      )}
                    </div>
                    <span style={{ background: '#FFF1E0', color: '#F07800', border: '1.5px solid #F07800', borderRadius: 999, padding: '4px 12px', fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0 }}>
                      {exp.period}
                    </span>
                  </div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
                    {exp.company} &nbsp;·&nbsp; {exp.location}
                  </p>
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: 0, padding: 0, listStyle: 'none' }}>
                  {exp.points.map((pt, pIdx) => (
                    <li key={pIdx} style={{ fontSize: 14, color: '#555', display: 'flex', alignItems: 'flex-start', gap: 10, lineHeight: 1.6 }}>
                      <span style={{ width: 6, height: 6, background: '#F07800', borderRadius: '50%', marginTop: 7, flexShrink: 0 }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ─────────────────────────────────────────────── */}
      <section id="projects" className="max-w-6xl mx-auto px-6" style={{ paddingTop: 72, paddingBottom: 72 }}>
        <SectionHeading plain="Featured" accent="Projects" />
        <p style={{ fontSize: 14, color: '#888', marginTop: -20, marginBottom: 36, fontWeight: 500 }}>
          Click any card to view the full case study.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projectsData.map(project => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="card"
              style={{ padding: 22, cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ background: '#FFF1E0', color: '#F07800', border: '1.5px solid #F07800', borderRadius: 999, padding: '3px 10px', fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {project.badge}
                  </span>
                  {project.demo && project.demo !== '#' && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{ background: '#F07800', color: '#FFF', borderRadius: 999, padding: '4px 10px', fontSize: 10, fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none', boxShadow: '0 2px 4px rgba(240, 120, 0, 0.2)' }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      <ExternalLink style={{ width: 12, height: 12 }} /> Live
                    </a>
                  )}
                </div>
                <h3 style={{ fontWeight: 800, fontSize: 16, color: '#111', marginTop: 14, marginBottom: 8, lineHeight: 1.35 }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: 13, color: '#777', lineHeight: 1.65, marginBottom: 16 }} className="line-clamp-3">
                  {project.shortDesc}
                </p>
              </div>
              <div>
                <div className="flex flex-wrap gap-1.5" style={{ marginBottom: 14 }}>
                  {project.tech.slice(0, 3).map((t, i) => {
                    const entry = SKILL_ICONS[t];
                    return (
                      <span key={i} style={{ background: '#FAF6EF', border: '1.5px solid #E8DFD0', borderRadius: 6, padding: '3px 9px', fontSize: 11, fontWeight: 600, color: '#555', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        {entry && <span style={{ color: entry.color, fontSize: 12 }}>{entry.icon}</span>}
                        {t}
                      </span>
                    );
                  })}
                  {project.tech.length > 3 && (
                    <span style={{ fontSize: 11, color: '#AAA', fontWeight: 500, alignSelf: 'center' }}>+{project.tech.length - 3}</span>
                  )}
                </div>
                <button style={{ background: 'none', border: 'none', padding: 0, color: '#F07800', fontWeight: 700, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                  Case Study <ArrowRight style={{ width: 13, height: 13 }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Achievements & Leadership ─────────────────────────────── */}
      <section id="achievements" style={{ background: '#fff', borderTop: '1.5px solid #E8DFD0', borderBottom: '1.5px solid #E8DFD0' }}>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-14" style={{ paddingTop: 72, paddingBottom: 72 }}>
          <div>
            <SectionHeading plain="Key" accent="Achievements" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { title: 'Smart India Hackathon 2025 Winner', desc: 'Secured 1st place nationally for developing Vrikshamitra, an eco-gamification platform.', icon: <FaTrophy /> },
                { title: 'Smart India Hackathon 2024 Finalist', desc: 'Shortlisted nationally for creating an automated faculty career advancement web portal.', icon: <FaMedal /> },
                { title: 'Aspen National Leadership Fellowship', desc: 'Selected for leadership development and values-based civic action mentorship.', icon: <FaGraduationCap /> },
              ].map(({ title, desc, icon }) => (
                <div key={title} className="card" style={{ padding: 18, borderLeft: '3px solid #F07800', borderRadius: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ color: '#F07800', fontSize: 14 }}>{icon}</span>
                    <h4 style={{ fontWeight: 800, fontSize: 13, color: '#111' }}>{title}</h4>
                  </div>
                  <p style={{ fontSize: 12, color: '#777', lineHeight: 1.65, paddingLeft: 22 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading plain="Leadership" accent="Roles" />
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: 'Editor-in-Chief', sub: 'College Magazine Board, BITW' },
                { title: 'UI/UX Lead', sub: 'Google Developer Groups BITW' },
                { title: 'Core Member', sub: "Readers' Club BITW" },
                { title: 'NSS Volunteer', sub: 'National Service Scheme' },
              ].map(({ title, sub }) => (
                <div key={title} className="card" style={{ padding: 16, background: '#FAF6EF' }}>
                  <h4 style={{ fontWeight: 700, fontSize: 13, color: '#111', marginBottom: 3 }}>{title}</h4>
                  <p style={{ fontSize: 11, color: '#888' }}>{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Education & Certs ────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6" style={{ paddingTop: 72, paddingBottom: 72 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Education */}
          <div className="card" style={{ padding: 26 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <FaGraduationCap style={{ fontSize: 20, color: '#F07800' }} />
              <h3 style={{ fontWeight: 800, fontSize: 16, color: '#111' }}>Education</h3>
            </div>
            <h4 style={{ fontWeight: 700, fontSize: 15, color: '#111' }}>B.Tech in Computer Engineering</h4>
            <p style={{ fontSize: 12, color: '#888', marginTop: 3, marginBottom: 10, fontWeight: 500 }}>
              {profileData.institution} (2023–2027)
            </p>
            <span style={{ background: '#FFF1E0', color: '#F07800', border: '1.5px solid #F07800', borderRadius: 6, padding: '4px 10px', fontSize: 12, fontWeight: 700, display: 'inline-block', marginBottom: 14 }}>
              CGPA: {profileData.cgpa}
            </span>
            <p style={{ fontSize: 12, color: '#777', lineHeight: 1.7 }}>
              Coursework: Data Structures, Operating Systems, DBMS, Computer Networks, Software Engineering.
            </p>
          </div>

          {/* Certifications */}
          <div className="card" style={{ padding: 26 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <FaTrophy style={{ fontSize: 18, color: '#F07800' }} />
              <h3 style={{ fontWeight: 800, fontSize: 16, color: '#111' }}>Certifications</h3>
            </div>
            <ul>
              {[

                { name: 'Programming in Java', issuer: 'NPTEL', cert: 'Programming in Java.pdf' },
                { name: 'Cyber Smart AI Prime', issuer: 'Cisco & NIIT Foundation', cert: '/cybersecurity internship certificate.pdf' },

                { name: 'Cybersecurity Essentials', issuer: 'Cisco Networking Academy', cert: '/cybersecurity.pdf' },
                { name: 'Career Essentials in Software Development', issuer: 'Microsoft and LinkedIn', cert: '/microsoft certi.pdf' },
                { name: 'Python Essentials', issuer: 'Cisco Networking Academy', cert: '#' }
              ].map(({ name, issuer, cert }) => (
                <li key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, paddingBottom: 10, marginBottom: 10, borderBottom: '1px solid #F0EBE0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontWeight: 700, color: '#111' }}>{name}</span>
                    {cert && cert !== '#' && (
                      <button onClick={() => setViewImage(cert)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#F07800', fontSize: 11, fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: 4, textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}>
                        <ExternalLink style={{ width: 12, height: 12 }} /> Certificate
                      </button>
                    )}
                  </div>
                  <span style={{ fontSize: 11, color: '#999', fontWeight: 500 }}>{issuer}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────────── */}
      <section id="contact" style={{ background: '#fff', borderTop: '1.5px solid #E8DFD0' }}>
        <div className="max-w-4xl mx-auto px-6" style={{ paddingTop: 72, paddingBottom: 72 }}>
          <SectionHeading plain="Get In" accent="Touch" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Info */}
            <div>
              <p style={{ fontSize: 14, color: '#666', lineHeight: 1.8, marginBottom: 28, fontWeight: 500 }}>
                Open for Software Engineering, Full Stack, and DevOps internships or full-time roles. Feel free to reach out.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { href: `mailto:${profileData.socials.email}`, icon: <Mail style={{ width: 16, height: 16 }} />, label: profileData.socials.email },
                  { href: profileData.socials.github, icon: <SiGithub style={{ width: 16, height: 16 }} />, label: 'GitHub Profile' },
                  { href: profileData.socials.linkedin, icon: <FaLinkedinIn style={{ width: 16, height: 16, color: '#0A66C2' }} />, label: 'LinkedIn Profile' },
                ].map(({ href, icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, fontWeight: 600, color: '#444', textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#F07800'}
                    onMouseLeave={e => e.currentTarget.style.color = '#444'}
                  >
                    <span style={{ color: '#F07800', display: 'flex', alignItems: 'center' }}>{icon}</span>
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input
                type="text" required placeholder="Your Name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
              />
              <input
                type="email" required placeholder="Your Email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="form-input"
              />
              <textarea
                rows={4} required placeholder="Your Message"
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="form-input" style={{ resize: 'none' }}
              />
              <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ width: '100%', justifyContent: 'center', opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
                <Send style={{ width: 15, height: 15 }} /> {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {formSubmitted && (
                <p style={{ textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#2D8B4E' }}>
                  ✓ Message sent successfully!
                </p>
              )}
              {submitError && (
                <p style={{ textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#D32F2F' }}>
                  {submitError}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer style={{ background: '#111111', color: '#666', textAlign: 'center', padding: '20px 24px', fontSize: 12, fontWeight: 600 }}>
        Crafted by <span style={{ color: '#F07800', fontWeight: 800 }}>Renuka Alwadkar</span> · {new Date().getFullYear()}
      </footer>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      {/* Document Modal (Image / PDF) */}
      {viewImage && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, background: 'rgba(17,17,17,0.85)', backdropFilter: 'blur(4px)' }}
          onClick={() => setViewImage(null)}
        >
          <div style={{ position: 'relative', width: viewImage.toLowerCase().endsWith('.pdf') ? '80vw' : 'auto', height: viewImage.toLowerCase().endsWith('.pdf') ? '85vh' : 'auto', maxWidth: '90vw', maxHeight: '90vh' }} onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setViewImage(null)}
              style={{ position: 'absolute', top: -35, right: -10, background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 4 }}
            >
              <X style={{ width: 26, height: 26 }} />
            </button>
            {viewImage.toLowerCase().endsWith('.pdf') ? (
              <iframe src={viewImage} style={{ width: '100%', height: '100%', border: 'none', borderRadius: 8, boxShadow: '0 10px 40px rgba(0,0,0,0.5)', background: '#fff' }} title="Document View" />
            ) : (
              <img src={viewImage} alt="Document View" style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain', borderRadius: 8, boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}