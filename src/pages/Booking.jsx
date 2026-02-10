import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { MOVIES, HALLS, SHOWTIMES } from '../data/mockData';
import { FaCalendarAlt, FaClock, FaTicketAlt, FaCheckCircle, FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import './Booking.css';

const Booking = () => {
    const { movieId, hallId } = useParams();
    const navigate = useNavigate();

    const movie = MOVIES.find(m => m.id === parseInt(movieId));
    const hall = HALLS.find(h => h.id === parseInt(hallId));

    // Filter showtimes for this specific hall
    const availableShowtimes = (SHOWTIMES[movieId] || []).filter(s => s.hallId === parseInt(hallId));

    const [selectedTime, setSelectedTime] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedDate, setSelectedDate] = useState('');

    const handleBooking = () => {
        if (!selectedTime || !selectedDate || quantity === 0) return;

        const bookingDetails = {
            movie,
            hall,
            time: selectedTime.time,
            quantity: quantity,
            totalPrice: quantity * selectedTime.price,
            date: selectedDate
        };

        navigate('/confirmation', { state: bookingDetails });
    };

    if (!movie || !hall) return <div className="container" style={{ paddingTop: '5rem', textAlign: 'center' }}>Invalid URL</div>;

    return (
        <div className="booking-page">
            <div className="booking-container">
                {/* Left Sidebar: Movie Info */}
                <div className="movie-info-card">
                    <img src={movie.poster} alt={movie.title} className="movie-poster" />
                    <div className="movie-details">
                        <h2 className="movie-title">{movie.title}</h2>
                        <div className="movie-meta">
                            <span>{movie.genre}</span>
                            <span className="rating-badge"><FaStar /> {movie.rating}</span>
                        </div>
                        <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                            <FaMapMarkerAlt /> {hall.name}, {hall.location}
                        </p>
                    </div>
                </div>

                {/* Right Content: Booking Form */}
                <div className="booking-content">

                    {/* Step 1: Time */}
                    <div className="section-card">
                        <h3 className="section-header">
                            <span className="section-icon"><FaClock /></span>
                            Select Showtime
                        </h3>
                        <div className="time-grid">
                            {availableShowtimes.map((st, idx) => (
                                <button
                                    key={idx}
                                    className={`time-btn ${selectedTime === st ? 'selected' : ''}`}
                                    onClick={() => setSelectedTime(st)}
                                >
                                    <span className="time">{st.time}</span>
                                    <span className="price">₹{st.price}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Step 2: Date */}
                    <div className="section-card">
                        <h3 className="section-header">
                            <span className="section-icon"><FaCalendarAlt /></span>
                            Select Date
                        </h3>
                        <div className="date-picker-wrapper">
                            <input
                                type="date"
                                className="date-input"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                    </div>

                    {/* Step 3: Quantity */}
                    <div className="section-card">
                        <h3 className="section-header">
                            <span className="section-icon"><FaTicketAlt /></span>
                            Select Tickets
                        </h3>
                        <div className="quantity-control">
                            <button
                                className="qty-btn"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            >−</button>
                            <span className="qty-display">{quantity}</span>
                            <button
                                className="qty-btn"
                                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                            >+</button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Checkout Bar */}
            {selectedTime && selectedDate && (
                <div className="checkout-bar">
                    <div className="total-info">
                        <span className="total-label">Total Amount</span>
                        <span className="total-amount">₹{quantity * (selectedTime?.price || 0)}</span>
                    </div>
                    <button className="confirm-btn" onClick={handleBooking}>
                        Confirm Booking <FaCheckCircle />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Booking;
