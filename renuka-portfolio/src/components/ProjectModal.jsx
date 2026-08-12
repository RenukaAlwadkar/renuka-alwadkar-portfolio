import React from 'react';
import { X, ExternalLink, CheckCircle2 } from 'lucide-react';
import {
  SiJavascript, SiPython, SiReact, SiNextdotjs, SiNodedotjs,
  SiExpress, SiMongodb, SiMysql, SiDocker, SiGit, SiGithub,
  SiLinux, SiFigma, SiHtml5, SiCss, SiCisco, SiNeon
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { VscCode } from 'react-icons/vsc';

const SKILL_ICONS = {
  'Java':                { icon: <FaJava />,       color: '#E76F00' },
  'Python':              { icon: <SiPython />,      color: '#3776AB' },
  'JavaScript':          { icon: <SiJavascript />,  color: '#D4A800' },
  'HTML':                { icon: <SiHtml5 />,       color: '#E34F26' },
  'CSS':                 { icon: <SiCss />,         color: '#1572B6' },
  'React':               { icon: <SiReact />,       color: '#22B5CC' },
  'React Native':        { icon: <SiReact />,       color: '#22B5CC' },
  'Next.js':             { icon: <SiNextdotjs />,   color: '#111111' },
  'Node.js':             { icon: <SiNodedotjs />,   color: '#339933' },
  'Express.js':          { icon: <SiExpress />,     color: '#444444' },
  'MongoDB':             { icon: <SiMongodb />,     color: '#47A248' },
  'MySQL':               { icon: <SiMysql />,       color: '#4479A1' },
  'NeonDB':              { icon: <SiNeon />,        color: '#00B377' },
  'Git':                 { icon: <SiGit />,         color: '#F05032' },
  'GitHub':              { icon: <SiGithub />,      color: '#111111' },
  'Linux':               { icon: <SiLinux />,       color: '#B8960C' },
  'Docker':              { icon: <SiDocker />,      color: '#2496ED' },
  'CI/CD':               { icon: <VscCode />,       color: '#007ACC' },
  'VS Code':             { icon: <VscCode />,       color: '#007ACC' },
  'Figma':               { icon: <SiFigma />,       color: '#F24E1E' },
  'Cisco Packet Tracer': { icon: <SiCisco />,       color: '#1BA0D7' },
};

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, background: 'rgba(17,17,17,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{ background: '#fff', border: '1.5px solid #E8DFD0', borderRadius: 16, width: '100%', maxWidth: 720, maxHeight: '90vh', overflowY: 'auto', padding: 32, position: 'relative' }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 18, right: 18, background: '#FAF6EF', border: '1.5px solid #E8DFD0', borderRadius: '50%', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#666' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#F07800'}
          onMouseLeave={e => e.currentTarget.style.borderColor = '#E8DFD0'}
        >
          <X style={{ width: 16, height: 16 }} />
        </button>

        {/* Badge */}
        <span style={{ background: '#FFF1E0', color: '#F07800', border: '1.5px solid #F07800', borderRadius: 999, padding: '3px 12px', fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {project.badge}
        </span>

        {/* Title */}
        <h2 style={{ fontWeight: 800, fontSize: 24, color: '#111', marginTop: 14, marginBottom: 4, lineHeight: 1.25 }}>
          {project.title}
        </h2>
        <p style={{ fontSize: 11, color: '#999', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 20 }}>
          {project.date}
        </p>

        {/* Actions */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, paddingBottom: 22, marginBottom: 22, borderBottom: '1.5px solid #F0EBE0' }}>
          <a
            href={project.github} target="_blank" rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#111', color: '#fff', borderRadius: 8, padding: '10px 18px', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <SiGithub style={{ width: 15, height: 15 }} /> GitHub
          </a>
          {project.demo && project.demo !== '#' && (
            <a
              href={project.demo} target="_blank" rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#F07800', color: '#fff', borderRadius: 8, padding: '10px 18px', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <ExternalLink style={{ width: 14, height: 14 }} /> Live Demo
            </a>
          )}
        </div>

        {/* Content sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {[
            { label: 'Problem Statement',       body: <p style={{ fontSize: 14, color: '#555', lineHeight: 1.75, fontWeight: 500 }}>{project.problem}</p> },
            { label: 'Architecture & Solution', body: <p style={{ fontSize: 14, color: '#555', lineHeight: 1.75, fontWeight: 500 }}>{project.architecture}</p> },
            {
              label: 'Key Contributions',
              body: (
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {project.contributions.map((pt, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#555', lineHeight: 1.65 }}>
                      <CheckCircle2 style={{ width: 15, height: 15, color: '#F07800', flexShrink: 0, marginTop: 2 }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              )
            },
            {
              label: 'Technologies Used',
              body: (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {project.tech.map((t, i) => {
                    const entry = SKILL_ICONS[t];
                    return (
                      <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: '#FAF6EF', border: '1.5px solid #E8DFD0', borderRadius: 7, padding: '5px 11px', fontSize: 12, fontWeight: 600, color: '#444' }}>
                        {entry && <span style={{ color: entry.color, fontSize: 13 }}>{entry.icon}</span>}
                        {t}
                      </span>
                    );
                  })}
                </div>
              )
            },
          ].map(({ label, body }) => (
            <div key={label}>
              <h4 style={{ fontSize: 10, fontWeight: 800, color: '#F07800', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>
                {label}
              </h4>
              {body}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}