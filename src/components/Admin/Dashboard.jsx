import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import "./Admin.css";

const Dashboard = () => {
    const { logout, setShowAdmin } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('notes');

    // Projects State
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({ title: '', link: '', description: '' });

    // Notes State
    const [noteContent, setNoteContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Fetch Notes
            const notesRes = await axios.get('http://localhost:3001/api/notes');
            if (notesRes.data.length > 0) {
                setNoteContent(notesRes.data[0].content);
            }

            // Fetch Projects
            const projectsRes = await axios.get('http://localhost:3001/api/projects');
            setProjects(projectsRes.data);
        } catch (err) {
            console.error("Error fetching data", err);
        }
    };

    const handleUpdateNote = async () => {
        setLoading(true);
        try {
            await axios.put('http://localhost:3001/api/notes', { content: noteContent });
            setMsg('Notes updated successfully!');
            setTimeout(() => setMsg(''), 3000);
        } catch (err) {
            setMsg('Failed to update notes');
        }
        setLoading(false);
    };

    const handleAddProject = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Backend handles screenshot generation
            await axios.post('http://localhost:3001/api/projects', newProject);
            setMsg('Project added successfully!');
            setNewProject({ title: '', link: '', description: '' });
            fetchData(); // Refresh list
        } catch (err) {
            setMsg('Failed to add project');
        }
        setLoading(false);
    };

    const handleDeleteProject = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await axios.delete(`http://localhost:3001/api/projects/${id}`);
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="admin-dashboard-overlay">
            <div className="admin-dashboard">
                <div className="dashboard-header">
                    <h2>Admin Console</h2>
                    <button onClick={logout} className="logout-btn">Logout</button>
                    <button onClick={() => setShowAdmin(false)} className="close-dash-btn">Close</button>
                </div>

                <div className="dashboard-tabs">
                    <button className={activeTab === 'notes' ? 'active' : ''} onClick={() => setActiveTab('notes')}>Dev Notes</button>
                    <button className={activeTab === 'projects' ? 'active' : ''} onClick={() => setActiveTab('projects')}>Projects</button>
                </div>

                <div className="dashboard-content">
                    {msg && <div className="status-msg">{msg}</div>}

                    {activeTab === 'notes' && (
                        <div className="notes-editor">
                            <h3>Edit Dev Notes</h3>
                            <textarea
                                value={noteContent}
                                onChange={(e) => setNoteContent(e.target.value)}
                                rows={15}
                            />
                            <button onClick={handleUpdateNote} disabled={loading} className="save-btn">
                                {loading ? 'Saving...' : 'Save Notes'}
                            </button>
                        </div>
                    )}

                    {activeTab === 'projects' && (
                        <div className="projects-manager">
                            <div className="add-project-form">
                                <h3>Add New Project</h3>
                                <form onSubmit={handleAddProject}>
                                    <input type="text" placeholder="Title" value={newProject.title} onChange={e => setNewProject({ ...newProject, title: e.target.value })} required />
                                    <input type="url" placeholder="Link (https://...)" value={newProject.link} onChange={e => setNewProject({ ...newProject, link: e.target.value })} required />
                                    <textarea placeholder="Description" value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })} />
                                    <button type="submit" disabled={loading} className="add-btn">{loading ? 'Processing...' : 'Add Project'}</button>
                                </form>
                            </div>

                            <div className="projects-list">
                                <h3>Existing Projects</h3>
                                {projects.map(p => (
                                    <div key={p.id} className="project-item">
                                        <span>{p.title}</span>
                                        <button onClick={() => handleDeleteProject(p.id)} className="delete-btn">Delete</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
