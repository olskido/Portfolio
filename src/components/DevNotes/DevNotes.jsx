import { useState } from 'react';
import './DevNotes.css';

const todos = [
  {
    id: 1,
    task: 'Phase 1: VaultScan Core Foundation',
    completed: false,
    date: '2026-01-18', // Target for Weekend 1
    priority: 'high',
    updates: [
      { date: '2026-01-16', note: 'Project initialized for live portfolio launch. Planning Next.js App Router structure.' },
      { date: '2026-01-16', note: 'Drafted Helius DAS API integration plan for fungible token fetching.' }
    ]
  },
  {
    id: 2,
    task: 'XanVision: Post-Launch Refinement',
    completed: false,
    date: '2026-01-20',
    priority: 'medium',
    updates: [
      { date: '2026-01-16', note: 'Refining WebGL shader transition speeds based on community feedback.' },
      { date: '2026-01-12', note: 'Updated AI Insight animation speed for better readability.' }
    ]
  },
  {
    id: 3,
    task: 'WaveProp X: Community Sync',
    completed: false,
    date: '2026-01-17',
    priority: 'high',
    updates: [
      { date: '2026-01-16', note: 'Preparing weekly summary of community feedback for the dev team.' }
    ]
  }
];

const projects = [
  {
    id: 1,
    name: 'VaultScan (Solana Portfolio Tracker)',
    status: 'planning',
    tech: ['Next.js', 'Helius', 'Birdeye', 'Shadcn/UI', 'TanStack Query'],
    description: 'A clean, glassmorphic dApp for real-time Solana asset tracking and valuation.',
    timeline: 'Q1 2026',
    fullDetails: {
      overview: 'Building a fresh, modern Solana portfolio tracker from scratch. Moving away from old designs to a 2026 glassmorphic aesthetic (blur + semi-transparent) with soft cyan/purple accents.',
      keyFeatures: [
        'One-click Wallet Connect (Phantom/Standard)',
        'Total portfolio value with 24h change tracking',
        'Token grid featuring real-time price feeds via Birdeye',
        'Client-side percentage threshold alerts and toast notifications'
      ],
      technicalChallenges: [
        'Optimizing Helius DAS API calls for fast asset retrieval',
        'Batch fetching prices for dozens of mints simultaneously',
        'Managing complex UI state with TanStack Query'
      ],
      currentPhase: 'Weekend 1: Project Setup & Helius DAS Integration'
    }
  },
  {
    id: 2,
    name: 'XanVision 3D',
    status: 'completed', // Marked as completed but with rolling updates
    tech: ['Rust', 'WebGL', 'Three.js', 'pRPC'],
    description: '3D command center for Xandeum network pNode health.',
    timeline: 'Dec 2025',
    fullDetails: {
      overview: 'A bounty-winning 3D visualization engine for the Xandeum network.',
      currentPhase: 'Rolling updates for performance and visual fidelity.'
    }
  }
];

const journeyLog = [
  { date: '2026-01-16', entry: 'Portfolio Live! Initiated VaultScan development plan. Fresh start with a 2026 modern UI focus.' },
  { date: '2026-01-14', entry: 'Deep dive into Solana Anchor serialization. Zero-copy deserialization is a game changer.' },
  { date: '2026-01-12', entry: 'Refactored backend API to use Axum. XanVision update: adjusted AI Insight animation speed.' },
  { date: '2026-01-07', entry: 'Transitioned to Dev Notes for technical journaling. Focus on 2026 milestones.' },
  { date: '2026-01-05', entry: 'Setup CI/CD pipeline using GitHub Actions for automated auditing.' },
  { date: '2025-12-29', entry: 'Portfolio reached 1.0 status. SolarDesk and XanVision finalized for showcase.' },
  { date: '2025-12-22', entry: 'XanVision core build completed for Xandeum bounty.' },
  { date: '2025-12-19', entry: 'SolarDesk infrastructure monitoring platform successfully deployed.' },
  { date: '2025-12-07', entry: 'CoinView: Finalized UI styles and multi-asset tracking state.' },
  { date: '2025-09-01', entry: 'Joined WaveProp X as Community Lead. Bridging the gap between devs and users.' }
];

const DevNotes = () => {
  const [expandedSections, setExpandedSections] = useState({
    todos: true,
    projects: true,
    journey: true
  });

  const [expandedItems, setExpandedItems] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleItem = (itemId, type) => {
    const key = `${type}-${itemId}`;
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isExpanded = (itemId, type) => !!expandedItems[`${type}-${itemId}`];

  return (
    <div className="notes-container">
      <div className="notebook">
        <div className="notebook-spiral"></div>
        <div className="notebook-page">

          <div className="notebook-header">
            <h2 className="notebook-title">{'<DevNotes />'}</h2>
            <span className="notebook-date">Last Updated: 2026-01-16</span>
          </div>

          {/* SECTION 1: TODAY'S FOCUS (TODOS) */}
          <div className="note-section">
            <div className="section-header" onClick={() => toggleSection('todos')}>
              <div className="section-title-wrapper">
                <span className="expand-icon" style={{ transform: expandedSections.todos ? 'rotate(90deg)' : 'rotate(0deg)' }}>▶</span>
                <h3 className="section-title">current_focus</h3>
                <span className="badge">{todos.filter(t => !t.completed).length} active</span>
              </div>
            </div>

            <div className={`collapsible-content ${expandedSections.todos ? 'expanded' : 'collapsed'}`}>
              <ul className="todo-list">
                {todos.map(todo => (
                  <li key={todo.id} className="todo-item">
                    <div className="todo-main" onClick={() => toggleItem(todo.id, 'todo')}>
                      <div className="todo-checkbox">
                        <input type="checkbox" checked={todo.completed} readOnly />
                      </div>
                      <div className="todo-content">
                        <span className={`task-text ${todo.completed ? 'completed' : ''}`}>
                          {todo.task}
                        </span>
                        <div className="todo-meta">
                          <span className={`priority-badge priority-${todo.priority}`}>
                            {todo.priority}
                          </span>
                          <span className="todo-date">Target: {todo.date}</span>
                          {todo.updates && todo.updates.length > 0 && (
                            <span className="updates-badge">{todo.updates.length} updates</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Todo Updates Expansion */}
                    {todo.updates && (
                      <div className={`collapsible-content ${isExpanded(todo.id, 'todo') ? 'expanded' : 'collapsed'}`}>
                        <div className="updates-container">
                          <div className="updates-timeline">
                            {todo.updates.map((update, i) => (
                              <div key={i} className="update-entry">
                                <div className="update-dot"></div>
                                <div className="update-content">
                                  <span className="update-date">{update.date}</span>
                                  <p className="update-note">{update.note}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* SECTION 2: ACTIVE PROJECTS */}
          <div className="note-section">
            <div className="section-header" onClick={() => toggleSection('projects')}>
              <div className="section-title-wrapper">
                <span className="expand-icon" style={{ transform: expandedSections.projects ? 'rotate(90deg)' : 'rotate(0deg)' }}>▶</span>
                <h3 className="section-title section-title-projects">active_projects</h3>
                <span className="badge badge-projects">{projects.length} tracking</span>
              </div>
            </div>

            <div className={`collapsible-content ${expandedSections.projects ? 'expanded' : 'collapsed'}`}>
              <div className="projects-grid">
                {projects.map(project => (
                  <div key={project.id} className="project-card">
                    <div className="project-header" onClick={() => toggleItem(project.id, 'project')}>
                      <div className="project-title-area">
                        <h4 className="project-name">{project.name}</h4>
                        <span className={`status-badge status-${project.status.replace(' ', '-')}`}>
                          {project.status}
                        </span>
                      </div>
                    </div>

                    <p className="project-description">{project.description}</p>

                    <div className="project-meta">
                      <div className="tech-stack">
                        {project.tech.map((t, i) => (
                          <span key={i} className="tech-badge">{t}</span>
                        ))}
                      </div>
                      <div className="timeline">
                        <span className="timeline-text">Timeline: {project.timeline}</span>
                      </div>
                    </div>

                    {/* Project Details Expansion */}
                    <div className={`collapsible-content ${isExpanded(project.id, 'project') ? 'expanded' : 'collapsed'}`}>
                      <div className="project-details">
                        {project.fullDetails && (
                          <>
                            <div className="detail-section">
                              <h5 className="detail-heading">Overview</h5>
                              <p className="detail-text">{project.fullDetails.overview}</p>
                            </div>

                            {project.fullDetails.keyFeatures && (
                              <div className="detail-section">
                                <h5 className="detail-heading">Key Features</h5>
                                <ul className="detail-list">
                                  {project.fullDetails.keyFeatures.map((feature, i) => (
                                    <li key={i} className="detail-list-item">• {feature}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {project.fullDetails.currentPhase && (
                              <div className="detail-section">
                                <h5 className="detail-heading">Current Phase</h5>
                                <p className="current-phase">root@dev:~/ {project.fullDetails.currentPhase}</p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 3: JOURNEY LOG */}
          <div className="note-section">
            <div className="section-header" onClick={() => toggleSection('journey')}>
              <div className="section-title-wrapper">
                <span className="expand-icon" style={{ transform: expandedSections.journey ? 'rotate(90deg)' : 'rotate(0deg)' }}>▶</span>
                <h3 className="section-title section-title-journey">dev_journey_log</h3>
                <span className="badge" style={{ backgroundColor: '#a371f722', color: '#a371f7' }}>{journeyLog.length} entries</span>
              </div>
            </div>

            <div className={`collapsible-content ${expandedSections.journey ? 'expanded' : 'collapsed'}`}>
              <div className="journey-entries">
                {journeyLog.map((log, index) => (
                  <div key={index} className="log-entry">
                    <div className="log-timeline">
                      <div className="log-dot"></div>
                      {index !== journeyLog.length - 1 && <div className="log-line"></div>}
                    </div>
                    <div className="log-content">
                      <span className="log-date">{log.date}</span>
                      <p className="log-text">{log.entry}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="notebook-footer">
            // End of Notebook
          </div>

        </div>
      </div>
    </div>
  );
};

export default DevNotes;