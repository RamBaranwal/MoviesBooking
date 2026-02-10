import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

const Auth = ({ setUser }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock Auth Logic
        if (isLogin) {
            // Simulate Login
            const storedUser = JSON.parse(localStorage.getItem('registeredUser'));
            if (storedUser && storedUser.email === formData.email && storedUser.password === formData.password) {
                localStorage.setItem('movieUser', JSON.stringify(storedUser));
                setUser(storedUser);
                navigate('/');
            } else {
                alert('Invalid credentials!');
            }
        } else {
            // Simulate Register
            const newUser = { name: formData.name, email: formData.email, password: formData.password };
            localStorage.setItem('registeredUser', JSON.stringify(newUser));
            localStorage.setItem('movieUser', JSON.stringify(newUser));
            setUser(newUser);
            navigate('/');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    {!isLogin && (
                        <div style={styles.inputGroup}>
                            <FaUser style={styles.icon} />
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                style={styles.input}
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <div style={styles.inputGroup}>
                        <FaEnvelope style={styles.icon} />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            style={styles.input}
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <FaLock style={styles.icon} />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            style={styles.input}
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" style={styles.button}>
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>
                <p style={styles.switchText}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <span onClick={() => setIsLogin(!isLogin)} style={styles.link}>
                        {isLogin ? 'Register' : 'Login'}
                    </span>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
    },
    card: {
        background: 'var(--bg-secondary)',
        padding: '2rem',
        borderRadius: '1rem',
        width: '100%',
        maxWidth: '400px',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid rgba(255, 255, 255, 0.05)'
    },
    title: {
        textAlign: 'center',
        marginBottom: '2rem',
        color: 'var(--text-primary)',
        fontSize: '1.8rem'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    inputGroup: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '0.5rem',
        padding: '0.8rem 1rem'
    },
    icon: {
        color: 'var(--text-secondary)',
        marginRight: '0.8rem'
    },
    input: {
        background: 'transparent',
        border: 'none',
        color: 'var(--text-primary)',
        width: '100%',
        outline: 'none',
        fontSize: '1rem'
    },
    button: {
        marginTop: '1rem',
        background: 'var(--accent)',
        color: '#fff',
        padding: '0.8rem',
        borderRadius: '0.5rem',
        fontWeight: 'bold',
        fontSize: '1rem',
        transition: 'var(--transition)',
        boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.4)'
    },
    switchText: {
        marginTop: '1.5rem',
        textAlign: 'center',
        color: 'var(--text-secondary)'
    },
    link: {
        color: 'var(--accent)',
        cursor: 'pointer',
        fontWeight: '600'
    }
};

export default Auth;
