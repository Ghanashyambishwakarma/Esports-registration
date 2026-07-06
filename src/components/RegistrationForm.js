import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { toast } from 'react-toastify';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    playerName: '',
    teamName: '',
    gameTitle: '',
    inGameId: '',
    email: '',
    phone: '',
    region: '',
    teamSize: ''
  });

  const [loading, setLoading] = useState(false);

  const games = [
    'BGMI (Battlegrounds Mobile India)',
    'Valorant',
    'CS2 (Counter-Strike 2)',
    'Free Fire',
    'League of Legends',
    'Dota 2',
    'Call of Duty',
    'Apex Legends',
    'Fortnite',
    'Rainbow Six Siege'
  ];

  const regions = [
    'Asia Pacific',
    'North America',
    'Europe',
    'South America',
    'Middle East',
    'Africa'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;

    if (!formData.playerName.trim()) {
      toast.error('Player name is required');
      return false;
    }
    if (!formData.teamName.trim()) {
      toast.error('Team name is required');
      return false;
    }
    if (!formData.gameTitle) {
      toast.error('Please select a game');
      return false;
    }
    if (!formData.inGameId.trim()) {
      toast.error('In-game ID is required');
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!phoneRegex.test(formData.phone.replace(/[^0-9]/g, ''))) {
      toast.error('Please enter a valid phone number (10-15 digits)');
      return false;
    }
    if (!formData.region) {
      toast.error('Please select a region');
      return false;
    }
    if (!formData.teamSize || formData.teamSize < 1) {
      toast.error('Please enter a valid team size');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, 'registrations'), {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'pending'
      });

      toast.success('Registration submitted successfully! 🎮');
      
      // Reset form
      setFormData({
        playerName: '',
        teamName: '',
        gameTitle: '',
        inGameId: '',
        email: '',
        phone: '',
        region: '',
        teamSize: ''
      });
    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error('Failed to submit registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-section">
      <div className="form-container">
        <div className="form-header">
          <h2 className="form-title">
            <span className="title-icon">⚡</span>
            Tournament Registration
            <span className="title-icon">⚡</span>
          </h2>
          <p className="form-subtitle">Join the battle. Register your team now.</p>
        </div>

        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-grid">
            {/* Player Name */}
            <div className="form-group">
              <label htmlFor="playerName" className="form-label">
                Player Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="playerName"
                name="playerName"
                value={formData.playerName}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Team Name */}
            <div className="form-group">
              <label htmlFor="teamName" className="form-label">
                Team Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="teamName"
                name="teamName"
                value={formData.teamName}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter team name"
                required
              />
            </div>

            {/* Game Title */}
            <div className="form-group">
              <label htmlFor="gameTitle" className="form-label">
                Game Title <span className="required">*</span>
              </label>
              <select
                id="gameTitle"
                name="gameTitle"
                value={formData.gameTitle}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select a game</option>
                {games.map((game) => (
                  <option key={game} value={game}>
                    {game}
                  </option>
                ))}
              </select>
            </div>

            {/* In-Game ID */}
            <div className="form-group">
              <label htmlFor="inGameId" className="form-label">
                In-Game ID / Username <span className="required">*</span>
              </label>
              <input
                type="text"
                id="inGameId"
                name="inGameId"
                value={formData.inGameId}
                onChange={handleChange}
                className="form-input"
                placeholder="Your in-game ID"
                required
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="your.email@example.com"
                required
              />
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone Number <span className="required">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="+977 9800000000"
                required
              />
            </div>

            {/* Region */}
            <div className="form-group">
              <label htmlFor="region" className="form-label">
                Region / Server <span className="required">*</span>
              </label>
              <select
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select region</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            {/* Team Size */}
            <div className="form-group">
              <label htmlFor="teamSize" className="form-label">
                Team Size <span className="required">*</span>
              </label>
              <input
                type="number"
                id="teamSize"
                name="teamSize"
                value={formData.teamSize}
                onChange={handleChange}
                className="form-input"
                placeholder="Number of players"
                min="1"
                max="20"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Submitting...
              </>
            ) : (
              <>
                <span className="btn-icon">🎮</span>
                Register Now
                <span className="btn-arrow">→</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
