import "./Experience.css";

const Experience = () => {
  const experiences = [
    {
      title: 'Community Lead',
      company: 'WaveProp X',
      period: 'Sept 2025 - Present',
      desc: 'Responsible for bridging the gap between the WaveProp X development team and the community. I facilitate clear communication, manage user feedback, and ensure the community stays informed about ecosystem updates.',
      impact: [
        'Acting as the primary point of contact for community inquiries and feedback.',
        'Moderating community channels to maintain a helpful and productive environment.',
        'Relaying critical user insights back to the team to help guide project direction.'
      ],
      tags: ['Community Management', 'Moderation', 'Communication']
    },
    {
      title: 'Lead Engineer (Bounty Project)',
      company: 'Xandeum Network / XanVision',
      period: '2025',
      desc: 'Developed a 3D network visualizer for Xandeum using Rust and WebGL. The project focuses on rendering pNode health and network topology to provide a clear view of decentralization.',
      impact: [
        'Built a 2D-to-3D projection engine to visualize pNode gossip data.',
        'Implemented pRPC calls to retrieve and display real-time node information.',
        'Delivered a functional command center that tracks network-wide performance metrics.'
      ],
      tags: ['Rust', 'WebGL', 'pRPC', 'Anchor']
    },
    {
      title: 'Founding Developer',
      company: 'Solana Ecosystem / SolarDesk',
      period: '2025',
      desc: 'Created an infrastructure dashboard for Solana node operators. It provides real-time monitoring of node status and performance metrics to help maintain uptime.',
      impact: [
        'Built a monitoring system for validator performance, skip rates, and slot health.',
        'Developed a real-time dashboard using React and Node.js for network health indicators.',
        'Optimized data streams to provide sub-second visibility into validator status.'
      ],
      tags: ['React', 'Node.js', 'Solana Web3.js']
    },
    {
      title: 'Full-Stack Developer (Personal Project)',
      company: 'CoinView',
      period: '2024 - 2025',
      desc: 'Developed a cryptocurrency portfolio management app that integrates market data into an interactive dashboard.',
      impact: [
        'Implemented interactive price charts and multi-asset watchlists.',
        'Integrated live market data APIs for accurate portfolio tracking.',
        'Designed a user-friendly interface for managing diverse crypto holdings.'
      ],
      tags: ['TypeScript', 'Vite', 'REST APIs']
    }
  ];

  return (
    <section className="experience">
      <div className="container">
        <h2 className="experience-heading">Experience</h2>
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-left">
                <span className="timeline-period">{exp.period}</span>
                <h3 className="timeline-title">{exp.title}</h3>
                <p className="timeline-company">{exp.company}</p>
              </div>
              <div className="timeline-right">
                <p className="timeline-desc">{exp.desc}</p>
                <ul className="impact-list">
                  {exp.impact.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <div className="tech-tags">
                  {exp.tags.map((tag, i) => (
                    <span key={i} className="tech-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;