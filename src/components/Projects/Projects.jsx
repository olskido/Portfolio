import { useState, useEffect, useRef } from 'react';
import "./Projects.css";
import xandeumPreview from '../../assets/xandeumpreview.png';
import coinviewPreview from '../../assets/coinviewpreview.png';
import portfolioPreview from '../../assets/portfolio.png';
import solardeskPreview from '../../assets/solardesk.png';
import edgezonePreview from '../../assets/edgezone.png';

// Helper for icons (using Devicon)
const iconMap = {
  'JavaScript': 'javascript/javascript-original',
  'TypeScript': 'typescript/typescript-original',
  'Rust': 'rust/rust-original',
  'React': 'react/react-original',
  'Next.js': 'nextjs/nextjs-original',
  'Anchor': 'solana',
  'Tailwind Css': 'tailwindcss/tailwindcss-original',
  'Web3.js': 'javascript/javascript-original',
  'Axum': 'rust/rust-original',
  'Three.js': 'threejs/threejs-original',
  'PostgreSQL': 'postgresql/postgresql-original',
  'AWS': 'amazonwebservices/amazonwebservices-original-wordmark',
  'Python': 'python/python-original',
  'TensorFlow': 'tensorflow/tensorflow-original',
  'Shadcn/UI': 'react/react-original', // Fallback
  'Vanilla CSS': 'vanilla-css/vanilla-css-original',
  'Render': 'render/render-original',
  'Upstash': 'upstash/upstash-original',
  'Vercel': 'vercel/vercel-original',
};

const getIconUrl = (skill) => {
  const mapped = iconMap[skill];
  if (mapped === 'solana') return 'https://cdn.simpleicons.org/solana/ffffff';
  if (mapped) return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${mapped}.svg`;
  const slug = skill.toLowerCase().replace('/', '');
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-original.svg`;
};

const ProjectCard = ({ project }) => {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 100;

  const toggleExpand = (e) => {
    e.preventDefault();
    setExpanded(!expanded);
  };

  const shouldTruncate = project.desc.length > maxLength;
  const displayDesc = expanded || !shouldTruncate
    ? project.desc
    : project.desc.substring(0, maxLength) + '...';

  return (
    <div className={`project-card ${project.status === 'upcoming' ? 'card-upcoming' : ''}`}>
      <div
        className="project-preview"
        style={{
          backgroundColor: project.image ? 'transparent' : project.color,
          backgroundImage: project.image ? `url(${project.image})` : 'none',
        }}
      >
        {project.status === 'upcoming' && <div className="status-overlay">Coming Soon</div>}
      </div>
      <h3 className="project-name">{project.name}</h3>

      <p className="project-desc">
        {displayDesc}
        {shouldTruncate && (
          <span className="view-more-btn" onClick={toggleExpand}>
            {expanded ? ' Show Less' : ' View More'}
          </span>
        )}
      </p>

      <div className="project-meta">
        <div className="tech-stack">
          {project.tech && project.tech.map((tech, i) => (
            <span key={i} className="tech-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <img
                src={getIconUrl(tech)}
                alt=""
                width="12"
                height="12"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              {tech}
            </span>
          ))}
        </div>
      </div>

      <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
        {project.status === 'upcoming' ? 'View Plan' : 'View Project'}
      </a>
    </div>
  );
};

const Projects = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(0);
  const isDragging = useRef(false);
  const animationRef = useRef(null);

  const projects = [

    {
      id: 1,
      name: 'XanVision 3D visualization',
      desc: 'Real-time 3D visualization for Xandeum pNodes. Developed as a bounty project, it uses Rust and WebGL to project network topology and node health in a spatial environment.',
      link: 'https://xanvision.vercel.app',
      image: xandeumPreview,
      color: '#26a641',
      tech: ['Rust', 'WebGL', 'Three.js']
    },
    {
      id: 2,
      name: 'SolarDesk',
      desc: 'Infrastructure monitoring dashboard for the Solana ecosystem. Aggregates streams from 100+ validators to provide sub-second visibility into skip rates and slot performance.',
      link: 'https://solardesk-official-adqd.vercel.app/',
      image: solardeskPreview,
      color: '#0ea5e9',
      tech: ['React', 'Node.js', 'Web3.js']
    },
    {
      id: 3,
      name: 'CoinView - Crypto Price Tracker',
      desc: 'Comprehensive portfolio management application with interactive charts. Simplifies complex market data into actionable insights using advanced state management.',
      link: 'https://coinview-nu.vercel.app/',
      image: coinviewPreview,
      color: '#8b5cf6',
      tech: ['React', 'TypeScript', 'Vite']
    },
    {
      id: 4,
      name: 'Portfolio Website',
      desc: 'Custom developer portfolio and technical journal. Features a live "Dev Notes" notebook tracking engineering progress and real-time project updates.',
      link: 'https://portfolio-olskido.vercel.app/',
      image: portfolioPreview,
      color: '#161b22',
      tech: ['React', 'Tailwind Css', 'Vite']
    },
    {
      id: 5,
      name: 'Edge-zone Website',
      desc: 'EdgeZone is a fast real-time Solana memecoin scanner that shows price market cap liquidity volume age and holder data then gives a clear four-color risk rating: green for safe blue for low yellow for caution and red for avoid. It tracks KOL wallets and side wallet clusters to help traders spot rugs and manipulation before they get rekt.',
      link: 'https://edge-zone-xi1o.vercel.app/',
      image: edgezonePreview,
      color: '#161b22',
      tech: ['React', 'Vanilla css', 'Vite', 'Vercel', 'Upstash', 'Render', 'Solana', 'Web3.js']
    }
  ];

  // Triplicate projects for seamless loop + enough width to drag
  const marqueeProjects = [...projects, ...projects, ...projects];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Start in the middle set for smoother infinite feeling
    const startScroll = container.scrollWidth / 3;
    container.scrollLeft = startScroll;
    scrollRef.current = startScroll;

    const animate = () => {
      if (!isDragging.current) {
        scrollRef.current += 0.5; // Auto-scroll speed

        // Loop logic
        const oneThird = container.scrollWidth / 3;
        if (scrollRef.current >= oneThird * 2) {
          scrollRef.current = oneThird;
        } else if (scrollRef.current <= 0) {
          scrollRef.current = oneThird;
        }

        container.scrollLeft = scrollRef.current;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  const handleMouseDown = () => { isDragging.current = true; if (containerRef.current) containerRef.current.style.scrollBehavior = 'auto'; };
  const handleMouseUp = () => {
    isDragging.current = false;
    if (containerRef.current) scrollRef.current = containerRef.current.scrollLeft;
  };
  const handleScroll = () => {
    if (isDragging.current && containerRef.current) {
      scrollRef.current = containerRef.current.scrollLeft;
    }
  };

  return (
    <section className="projects" id="projects">
      <h2 className="projects-heading">Featured Work</h2>

      <div
        className="projects-marquee-container"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onScroll={handleScroll}
      >
        <div className="projects-track-marquee">
          {marqueeProjects.map((project, index) => (
            <ProjectCard key={`${project.id}-${index}`} project={project} />
          ))}
        </div>
      </div>

      <div className="mobile-scroll-indicator" style={{ textAlign: 'center', marginTop: '10px', fontSize: '12px', color: '#8b949e' }}>
        ← Swipable Marquee →
      </div>
    </section>
  );
};

export default Projects;