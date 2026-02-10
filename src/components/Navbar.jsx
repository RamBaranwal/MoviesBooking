import { Link, useNavigate } from 'react-router-dom';
import { FaTicketAlt, FaUserCircle } from 'react-icons/fa';

const Navbar = ({ user, setUser }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('movieUser');
        setUser(null);
        navigate('/auth');
    };

    return (
        <nav style={styles.nav}>
            <div className="container" style={styles.container}>
                <Link to="/" style={styles.logo}>
                    <FaTicketAlt style={{ marginRight: '8px', color: 'var(--accent)' }} />
                    PopCorn<span style={{ color: 'var(--accent)' }}>Tickets</span>
                </Link>
                <div style={styles.links}>
                    {user ? (
                        <div style={styles.userSection}>
                            <span style={styles.username}>Hello, {user.name}</span>
                            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
                        </div>
                    ) : (
                        <Link to="/auth" style={styles.loginBtn}>
                            <FaUserCircle style={{ marginRight: '5px' }} /> Login / Register
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        background: 'rgba(30, 41, 59, 0.8)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        padding: '1rem 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: 'var(--shadow-lg)'
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        letterSpacing: '-0.5px'
    },
    links: {
        display: 'flex',
        gap: '1.5rem',
        alignItems: 'center'
    },
    loginBtn: {
        background: 'var(--accent)',
        color: '#fff',
        padding: '0.6rem 1.2rem',
        borderRadius: '2rem',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        transition: 'var(--transition)',
        boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.4)'
    },
    userSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    },
    username: {
        color: 'var(--text-secondary)'
    },
    logoutBtn: {
        background: 'transparent',
        border: '1px solid var(--danger)',
        color: 'var(--danger)',
        padding: '0.4rem 1rem',
        borderRadius: '0.5rem',
        fontWeight: '600',
        transition: 'var(--transition)'
    }
};

export default Navbar;
