import "./Skills.css";

const Skills = () => {
  const skillGroups = {
    'Languages': ['JavaScript', 'TypeScript', 'Rust'],
    'Frameworks & Tools': ['React', 'Next.js', 'Anchor', 'Tailwind Css', 'Web3.js', 'Axum', 'Three.js', 'PostgreSQL', 'AWS', 'webGL', 'pRPC', 'Node.js', 'vercel', 'Vite']
  };
  // Mapping for devicon slugs
  const iconMap = {
    'JavaScript': 'javascript/javascript-original',
    'TypeScript': 'typescript/typescript-original',
    'Rust': 'rust/rust-original', // Check availability, sometimes plain
    'React': 'react/react-original',
    'Next.js': 'nextjs/nextjs-original',
    'Anchor': 'salesforce/salesforce-original', // Fallback as Anchor fits Solana, or use generic
    'Tailwind Css': 'tailwindcss/tailwindcss-original',
    'Web3.js': 'javascript/javascript-original', // Fallback
    'Axum': 'rust/rust-original',
    'Three.js': 'threejs/threejs-original',
    'PostgreSQL': 'postgresql/postgresql-original',
    'AWS': 'amazonwebservices/amazonwebservices-original-wordmark',
    'webGL': 'webgl/webgl-original',
    'pRPC': 'grpc/grpc-original',
    'Node.js': 'nodejs/nodejs-original',
    'vercel': 'vercel/vercel-original',
    'Vite': 'vite/vite-original',


  };

  const getIconUrl = (skill) => {
    // Default strategy: lowercase name/name-original.svg
    const mapped = iconMap[skill];
    if (mapped) return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${mapped}.svg`;

    const slug = skill.toLowerCase();
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-original.svg`;
  };

  return (
    <section className="skills" >
      <h2 className="skills-heading">Skills</h2>
      {Object.entries(skillGroups).map(([category, skills]) => (
        <div key={category} className="skill-group">
          <h3 className="skill-category">{category}</h3>
          <div className="skill-tags">
            {skills.map(skill => (
              <span key={skill} className="skill-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <img
                  src={getIconUrl(skill)}
                  alt=""
                  width="16"
                  height="16"
                  onError={(e) => { e.target.style.display = 'none'; }} // Hide if not found
                />
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))
      }
    </section >
  );
};

export default Skills;
