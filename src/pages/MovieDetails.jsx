import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { MOVIES, HALLS, SHOWTIMES, LOCATIONS } from '../data/mockData';
import { FaMapMarkerAlt, FaVideo, FaClock } from 'react-icons/fa';

const MovieDetails = () => {
    const { id } = useParams();
    const [locationOpen, setLocationOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const movie = MOVIES.find(m => m.id === parseInt(id));

    // Get showtimes for this movie
    const showtimes = SHOWTIMES[id] || [];

    // Get unique halls that are showing this movie
    const hallIds = [...new Set(showtimes.map(s => s.hallId))];
    const availableHalls = HALLS.filter(hall => hallIds.includes(hall.id));

    // If a location is selected, filter available halls to those in the location
    const filteredHalls = selectedLocation
        ? availableHalls.filter(h => selectedLocation.hallIds.includes(h.id))
        : availableHalls;

    if (!movie) return <div style={{ color: 'white', textAlign: 'center', marginTop: '5rem' }}>Movie not found</div>;

    return (
        <div style={styles.container}>
            {/* Hero Section */}
            <div style={styles.hero} className="hero-section">
                <div style={styles.heroContent} className="container">
                    <img src={movie.poster} alt={movie.title} style={styles.poster} />
                    <div style={styles.info}>
                        <h1 style={styles.title}>{movie.title}</h1>
                        <p style={styles.meta}>{movie.genre} • {movie.rating} ★</p>
                        <p style={styles.description}>{movie.description}</p>
                    </div>
                </div>
                <div style={styles.overlay}></div>
                <img src={movie.poster} alt="" style={styles.bgImage} />
            </div>

            {/* Halls List */}
            <div className="container" style={styles.hallsContainer}>
                <h2 style={styles.sectionTitle}>Select a Cinema</h2>

                <div style={styles.locationBar}>
                    <button style={styles.locationBtn} onClick={() => setLocationOpen(!locationOpen)}>
                        {selectedLocation ? `Location: ${selectedLocation.name}` : 'Choose Location'}
                    </button>
                    {selectedLocation && (
                        <button style={styles.resetBtn} onClick={() => { setSelectedLocation(null); setLocationOpen(false); }}>
                            Reset
                        </button>
                    )}
                </div>

                {locationOpen && (
                    <div style={styles.locationList}>
                        {LOCATIONS.map(loc => (
                            <div key={loc.id} style={styles.locationItem} onClick={() => { setSelectedLocation(loc); setLocationOpen(false); }}>
                                <div style={{ fontWeight: 700 }}>{loc.name}</div>
                                <div style={{ color: 'var(--text-secondary)' }}>{loc.hallIds.length} cinemas</div>
                            </div>
                        ))}
                    </div>
                )}

                <div style={styles.grid}>
                    {filteredHalls.length > 0 ? (
                        filteredHalls.map(hall => (
                            <Link to={`/booking/${movie.id}/${hall.id}`} key={hall.id} style={styles.hallCard}>
                                <div style={styles.hallHeader}>
                                    <h3 style={styles.hallName}>{hall.name}</h3>
                                    <p style={styles.hallLocation}><FaMapMarkerAlt /> {hall.location}</p>
                                </div>
                                <div style={styles.hallFooter}>
                                    <span style={styles.btnText}>View Showtimes</span>
                                    <FaVideo />
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p style={styles.noHalls}>No screenings available for this movie at the selected location.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        color: 'var(--text-primary)',
        paddingBottom: '4rem'
    },
    hero: {
        position: 'relative',
        height: '60vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'end',
        paddingBottom: '4rem'
    },
    bgImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -2,
        opacity: 0.4,
        filter: 'blur(10px)'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to top, var(--bg-primary) 10%, transparent)',
        zIndex: -1
    },
    heroContent: {
        zIndex: 1,
        display: 'flex',
        gap: '2rem',
        alignItems: 'flex-end',
        position: 'relative',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem'
    },
    poster: {
        width: '220px',
        borderRadius: '1rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
        border: '4px solid rgba(255, 255, 255, 0.1)'
    },
    info: {
        marginBottom: '1rem'
    },
    title: {
        fontSize: '3.5rem',
        fontWeight: '800',
        lineHeight: 1.1,
        marginBottom: '0.5rem',
        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
    },
    meta: {
        fontSize: '1.2rem',
        color: 'var(--accent)',
        fontWeight: '600',
        marginBottom: '1rem'
    },
    description: {
        fontSize: '1.1rem',
        color: 'var(--text-secondary)',
        maxWidth: '600px',
        lineHeight: 1.6
    },
    hallsContainer: {
        marginTop: '2rem',
        padding: '0 2rem',
        maxWidth: '1200px',
        margin: '0 auto'
    },
    sectionTitle: {
        fontSize: '1.8rem',
        marginBottom: '1.5rem',
        borderLeft: '4px solid var(--accent)',
        paddingLeft: '1rem'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem'
    },
    locationBar: {
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        marginBottom: '1rem'
    },
    locationBtn: {
        background: 'var(--bg-secondary)',
        color: 'var(--text-primary)',
        padding: '0.6rem 1rem',
        borderRadius: '0.6rem',
        border: '1px solid rgba(255,255,255,0.06)',
        cursor: 'pointer'
    },
    resetBtn: {
        background: 'transparent',
        color: 'var(--accent)',
        padding: '0.4rem 0.8rem',
        borderRadius: '0.6rem',
        border: '1px solid rgba(255,255,255,0.04)',
        cursor: 'pointer'
    },
    locationList: {
        display: 'flex',
        gap: '1rem',
        marginBottom: '1.5rem',
        flexWrap: 'wrap'
    },
    locationItem: {
        minWidth: '160px',
        background: 'var(--bg-secondary)',
        padding: '0.8rem 1rem',
        borderRadius: '0.6rem',
        cursor: 'pointer',
        border: '1px solid rgba(255,255,255,0.04)'
    },
    hallCard: {
        background: 'var(--bg-secondary)',
        padding: '1.5rem',
        borderRadius: '1rem',
        textDecoration: 'none',
        color: 'inherit',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '160px'
    },
    hallHeader: {},
    hallName: {
        fontSize: '1.4rem',
        marginBottom: '0.5rem',
        color: 'var(--text-primary)'
    },
    hallLocation: {
        color: 'var(--text-secondary)',
        fontSize: '0.9rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem'
    },
    hallFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'var(--accent)',
        fontWeight: '600'
    },
    noHalls: {
        color: 'var(--text-secondary)',
        fontSize: '1.1rem'
    }
};

export default MovieDetails;
