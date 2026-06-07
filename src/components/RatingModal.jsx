import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import './RatingModal.css';
import Swal from 'sweetalert2';

const RatingModal = ({ isOpen, onClose, astrologerId, callId, astrologerName }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (rating === 0) {
      Swal.fire({ icon: 'warning', title: 'Oops', text: 'Please select a rating first!' });
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`${API_URL}/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ astrologerId, callId, rating, comment })
      });

      const data = await res.json();
      if (data.success) {
        Swal.fire({ icon: 'success', title: 'Thank You!', text: 'Your review has been submitted.', confirmButtonColor: '#c49b63' });
        onClose(); // Close modal and navigate
      } else {
        Swal.fire({ icon: 'error', title: 'Error', text: data.message });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to submit review' });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rating-modal-overlay">
      <div className="rating-modal-content">
        <button className="rating-close-btn" onClick={onClose}><X size={24} /></button>
        <h2 className="rating-title">Rate Your Consultation</h2>
        <p className="rating-subtitle">How was your experience with <b>{astrologerName}</b>?</p>

        <div className="star-container">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={index <= (hover || rating) ? "star on" : "star off"}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              >
                <Star size={40} fill={index <= (hover || rating) ? "#f59e0b" : "transparent"} stroke={index <= (hover || rating) ? "#f59e0b" : "#64748b"} />
              </button>
            );
          })}
        </div>

        <textarea
          className="rating-textarea"
          placeholder="Leave a comment (optional)..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={500}
        />

        <div className="rating-actions">
          <button className="rating-skip-btn" onClick={onClose} disabled={isSubmitting}>Skip</button>
          <button className="rating-submit-btn" onClick={handleSubmit} disabled={isSubmitting || rating === 0}>
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
