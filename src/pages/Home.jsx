import { Link } from 'react-router-dom';
import { MOVIES } from '../data/mockData';
import { FaStar } from 'react-icons/fa';

const Home = () => {
    return (
        <div className="container" style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>Now Showing</h1>
                <p style={styles.subtitle}>Discover the latest blockbusters near you.</p>
            </header>

            <div style={styles.grid}>
                {MOVIES.map(movie => (
                    <Link to={`/movie/${movie.id}`} key={movie.id} style={styles.card}>
                        <div style={styles.posterContainer}>
                            <img src={movie.poster} alt={movie.title} style={styles.poster} />
                            <div style={styles.ratingBadge}>
                                <FaStar color="#FFD700" size={14} />
                                <span style={{ marginLeft: '4px' }}>{movie.rating}</span>
                            </div>
                        </div>
                        <div style={styles.info}>
                            <h3 style={styles.movieTitle}>{movie.title}</h3>
                            <p style={styles.tagline}>{movie.genre} • 2h 30m</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        paddingTop: '3rem',
        paddingBottom: '5rem',
        minHeight: '100vh',
        background: 'var(--bg-primary)'
    },
    header: {
        textAlign: 'center',
        marginBottom: '3rem'
    },
    title: {
        fontSize: '3rem',
        fontWeight: '800',
        marginBottom: '0.5rem',
        background: 'linear-gradient(to right, var(--text-primary), var(--accent))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
    },
    subtitle: {
        color: 'var(--text-secondary)',
        fontSize: '1.2rem'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '2.5rem',
        padding: '0 1rem'
    },
    card: {
        background: 'var(--bg-secondary)',
        borderRadius: '1rem',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column'
    },
    cardHover: {
        transform: 'translateY(-5px)',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    },
    posterContainer: {
        position: 'relative',
        height: '340px',
        overflow: 'hidden'
    },
    poster: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.5s ease'
    },
    ratingBadge: {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px)',
        padding: '0.4rem 0.8rem',
        borderRadius: '2rem',
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        color: '#fff',
        border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    info: {
        padding: '1.5rem',
    },
    movieTitle: {
        fontSize: '1.2rem',
        fontWeight: '600',
        color: 'var(--text-primary)',
        marginBottom: '0.5rem',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    tagline: {
        color: 'var(--text-secondary)',
        fontSize: '0.9rem'
    }
};

export default Home;
