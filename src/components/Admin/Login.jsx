import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import "./Admin.css";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, setShowLogin } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(username, password);
        if (!success) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="admin-modal-overlay">
            <div className="admin-modal">
                <button className="close-btn" onClick={() => setShowLogin(false)}>×</button>
                <h2>Dev Access</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="error-msg">{error}</p>}
                    <button type="submit" className="login-btn">Unlock</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
