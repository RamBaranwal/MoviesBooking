import { useLocation, Link } from 'react-router-dom';
import { FaTicketAlt, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaCheckCircle, FaDownload } from 'react-icons/fa';

const Confirmation = () => {
    const { state } = useLocation();

    if (!state) {
        return (
            <div style={styles.container}>
                <h2 style={{ color: 'var(--danger)' }}>No Booking Found</h2>
                <Link to="/" style={styles.homeBtn}>Go Home</Link>
            </div>
        );
    }

    const { movie, hall, time, quantity, totalPrice, date } = state;

    return (
        <div style={styles.container}>
            <div style={styles.successIcon}>
                <FaCheckCircle size={60} color="var(--success)" />
            </div>
            <h1 style={styles.title}>Booking Confirmed!</h1>
            <p style={styles.subtitle}>Your tickets have been sent to your email.</p>

            <div style={styles.ticket}>
                <div style={styles.ticketHeader}>
                    <img src={movie.poster} alt={movie.title} style={styles.poster} />
                    <div style={styles.movieInfo}>
                        <h2 style={styles.movieTitle}>{movie.title}</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>{movie.genre}</p>
                    </div>
                </div>

                <div style={styles.ticketBody}>
                    <div style={styles.row}>
                        <div style={styles.item}>
                            <FaMapMarkerAlt style={styles.icon} />
                            <div>
                                <span style={styles.label}>Cinema Hall</span>
                                <p style={styles.value}>{hall.name}</p>
                                <span style={styles.subValue}>{hall.location}</span>
                            </div>
                        </div>
                    </div>

                    <div style={styles.row}>
                        <div style={styles.item}>
                            <FaCalendarAlt style={styles.icon} />
                            <div>
                                <span style={styles.label}>Date</span>
                                <p style={styles.value}>{date}</p>
                            </div>
                        </div>
                        <div style={styles.item}>
                            <FaClock style={styles.icon} />
                            <div>
                                <span style={styles.label}>Time</span>
                                <p style={styles.value}>{time}</p>
                            </div>
                        </div>
                    </div>

                    <div style={styles.row}>
                        <div style={styles.item}>
                            <FaTicketAlt style={styles.icon} />
                            <div>
                                <span style={styles.label}>Number of Tickets</span>
                                <p style={styles.value}>{quantity}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={styles.ticketFooter}>
                    <div style={styles.totalInfo}>
                        <span style={styles.label}>Total Price</span>
                        <span style={styles.totalPrice}>₹{totalPrice.toFixed(2)}</span>
                    </div>
                    <div style={styles.barcode}>
                        ||||||||||||||||||||||||||
                    </div>
                </div>
            </div>

            <div style={styles.actions}>
                <button style={styles.downloadBtn} onClick={() => window.print()}>
                    <FaDownload /> Download Ticket
                </button>
                <Link to="/" style={styles.homeBtn}>Book Another Movie</Link>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '90vh',
        padding: '2rem',
        background: 'var(--bg-primary)'
    },
    successIcon: {
        marginBottom: '1rem',
        animation: 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    },
    title: {
        fontSize: '2.5rem',
        marginBottom: '0.5rem',
        color: 'var(--text-primary)'
    },
    subtitle: {
        color: 'var(--text-secondary)',
        marginBottom: '3rem'
    },
    ticket: {
        background: '#fff',
        color: '#333',
        borderRadius: '1rem',
        width: '100%',
        maxWidth: '450px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',
        position: 'relative'
    },
    ticketHeader: {
        background: 'var(--bg-secondary)',
        padding: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        borderBottom: '2px dashed #ddd',
        position: 'relative'
    },
    poster: {
        width: '60px',
        height: '80px',
        objectFit: 'cover',
        borderRadius: '4px'
    },
    movieInfo: {
        flex: 1
    },
    movieTitle: {
        color: 'var(--accent)',
        marginBottom: '0.2rem',
        fontSize: '1.2rem'
    },
    ticketBody: {
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    item: {
        display: 'flex',
        alignItems: 'start',
        gap: '0.8rem'
    },
    icon: {
        color: 'var(--accent)',
        marginTop: '0.2rem'
    },
    label: {
        fontSize: '0.8rem',
        textTransform: 'uppercase',
        color: '#888',
        fontWeight: '600',
        letterSpacing: '0.5px',
        display: 'block',
        marginBottom: '0.2rem'
    },
    value: {
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: '#111'
    },
    subValue: {
        fontSize: '0.9rem',
        color: '#666'
    },
    ticketFooter: {
        background: '#f8fafc',
        padding: '1.5rem',
        borderTop: '2px dashed #ddd',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    totalInfo: {
        display: 'flex',
        flexDirection: 'column'
    },
    totalPrice: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'var(--success)'
    },
    barcode: {
        fontFamily: "'Libre Barcode 39', cursive",
        fontSize: '2rem',
        letterSpacing: '-2px',
        opacity: 0.5
    },
    actions: {
        marginTop: '2rem',
        display: 'flex',
        gap: '1rem'
    },
    downloadBtn: {
        background: 'var(--bg-secondary)',
        color: '#fff',
        border: '1px solid rgba(255,255,255,0.1)',
        padding: '0.8rem 1.5rem',
        borderRadius: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontWeight: '600',
        transition: 'all 0.2s'
    },
    homeBtn: {
        background: 'var(--accent)',
        color: '#fff',
        padding: '0.8rem 1.5rem',
        borderRadius: '2rem',
        textDecoration: 'none',
        fontWeight: '600',
        boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.4)'
    }
};

export default Confirmation;
