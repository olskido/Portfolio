import "./Experience.css";

const Experience = () => {
  const experiences = [
    { year: '2024', title: 'Senior Frontend Engineer', company: 'TechCorp', desc: 'Leading React and Web3 development' },
    { year: '2022', title: 'Full Stack Developer', company: 'StartupXYZ', desc: 'Built scalable Node.js backends' },
    { year: '2020', title: 'Junior Developer', company: 'AgencyABC', desc: 'Learned the fundamentals of shipping code' }
  ];

  return (
    <section className="experience">
      <h2 className="experience-heading">Experience</h2>
      <div className="timeline">
        {experiences.map((exp, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-year">{exp.year}</div>
            <div className="timeline-content">
              <h3 className="timeline-title">{exp.title}</h3>
              <p className="timeline-company">{exp.company}</p>
              <p className="timeline-desc">{exp.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
