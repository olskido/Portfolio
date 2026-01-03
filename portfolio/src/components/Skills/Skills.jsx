import "./Skills.css";

const Skills = () => {
  const skillGroups = {
    'Languages': ['JavaScript', 'TypeScript', 'Rust'],
    'Frameworks & Tools': ['React', 'Next.js', 'Node.js', 'Anchor', 'Solana', 'Web3.js']
  };

  return (
    <section className="skills">
      <h2 className="skills-heading">Skills</h2>
      {Object.entries(skillGroups).map(([category, skills]) => (
        <div key={category} className="skill-group">
          <h3 className="skill-category">{category}</h3>
          <div className="skill-tags">
            {skills.map(skill => (
              <span key={skill} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Skills;
