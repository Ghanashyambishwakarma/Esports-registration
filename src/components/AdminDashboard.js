import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { toast } from 'react-toastify';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      toast.error('Unauthorized access. Please login first.');
      navigate('/admin-login');
      return;
    }

    fetchRegistrations();
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    toast.info('Logged out successfully');
    navigate('/admin-login');
  };

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'registrations'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRegistrations(data);
    } catch (error) {
      console.error('Error fetching registrations:', error);
      toast.error('Failed to load registrations');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this registration?')) {
      try {
        await deleteDoc(doc(db, 'registrations', id));
        setRegistrations(prev => prev.filter(reg => reg.id !== id));
        toast.success('Registration deleted successfully');
      } catch (error) {
        console.error('Error deleting registration:', error);
        toast.error('Failed to delete registration');
      }
    }
  };

  const startEdit = (registration) => {
    setEditingId(registration.id);
    setEditData(registration);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const saveEdit = async () => {
    try {
      const docRef = doc(db, 'registrations', editingId);
      await updateDoc(docRef, {
        playerName: editData.playerName,
        teamName: editData.teamName,
        gameTitle: editData.gameTitle,
        inGameId: editData.inGameId,
        email: editData.email,
        phone: editData.phone,
        region: editData.region,
        teamSize: editData.teamSize,
        status: editData.status
      });
      
      setRegistrations(prev => 
        prev.map(reg => reg.id === editingId ? { ...reg, ...editData } : reg)
      );
      
      toast.success('Registration updated successfully');
      cancelEdit();
    } catch (error) {
      console.error('Error updating registration:', error);
      toast.error('Failed to update registration');
    }
  };

  const exportToCSV = () => {
    const headers = ['Player Name', 'Team Name', 'Game', 'In-Game ID', 'Email', 'Phone', 'Region', 'Team Size', 'Status', 'Created At'];
    const csvData = filteredRegistrations.map(reg => [
      reg.playerName,
      reg.teamName,
      reg.gameTitle,
      reg.inGameId,
      reg.email,
      reg.phone,
      reg.region,
      reg.teamSize,
      reg.status,
      reg.createdAt?.toDate().toLocaleString() || 'N/A'
    ]);

    const csv = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `registrations_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('CSV exported successfully');
  };

  const filteredRegistrations = registrations.filter(reg => {
    const matchesFilter = filter === 'all' || reg.status === filter;
    const matchesSearch = 
      reg.playerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.teamName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.gameTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading registrations...</p>
      </div>
    );
  }

  return (
    <div className="admin-section">
      <div className="admin-container">
        <div className="admin-header">
          <div className="admin-title-section">
            <h2 className="admin-title">
              <span className="admin-icon">⚙️</span>
              Admin Dashboard
            </h2>
            <p className="admin-subtitle">Manage Tournament Registrations</p>
          </div>
          
          <div className="admin-header-right">
            <div className="admin-stats">
              <div className="stat-card">
                <div className="stat-number">{registrations.length}</div>
                <div className="stat-label">Total</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">
                  {registrations.filter(r => r.status === 'pending').length}
                </div>
                <div className="stat-label">Pending</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">
                  {registrations.filter(r => r.status === 'approved').length}
                </div>
                <div className="stat-label">Approved</div>
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </div>

        <div className="admin-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by name, team, game, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending
            </button>
            <button
              className={`filter-btn ${filter === 'approved' ? 'active' : ''}`}
              onClick={() => setFilter('approved')}
            >
              Approved
            </button>
            <button
              className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`}
              onClick={() => setFilter('rejected')}
            >
              Rejected
            </button>
          </div>

          <button className="export-btn" onClick={exportToCSV}>
            📥 Export CSV
          </button>
        </div>

        <div className="registrations-table-container">
          {filteredRegistrations.length === 0 ? (
            <div className="no-data">
              <p>No registrations found</p>
            </div>
          ) : (
            <table className="registrations-table">
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Team</th>
                  <th>Game</th>
                  <th>In-Game ID</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Region</th>
                  <th>Size</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((reg) => (
                  <tr key={reg.id} className="table-row">
                    {editingId === reg.id ? (
                      <>
                        <td>
                          <input
                            type="text"
                            value={editData.playerName}
                            onChange={(e) => setEditData({...editData, playerName: e.target.value})}
                            className="edit-input"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={editData.teamName}
                            onChange={(e) => setEditData({...editData, teamName: e.target.value})}
                            className="edit-input"
                          />
                        </td>
                        <td>{reg.gameTitle}</td>
                        <td>
                          <input
                            type="text"
                            value={editData.inGameId}
                            onChange={(e) => setEditData({...editData, inGameId: e.target.value})}
                            className="edit-input"
                          />
                        </td>
                        <td>
                          <input
                            type="email"
                            value={editData.email}
                            onChange={(e) => setEditData({...editData, email: e.target.value})}
                            className="edit-input"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={editData.phone}
                            onChange={(e) => setEditData({...editData, phone: e.target.value})}
                            className="edit-input"
                          />
                        </td>
                        <td>{reg.region}</td>
                        <td>
                          <input
                            type="number"
                            value={editData.teamSize}
                            onChange={(e) => setEditData({...editData, teamSize: e.target.value})}
                            className="edit-input"
                          />
                        </td>
                        <td>
                          <select
                            value={editData.status}
                            onChange={(e) => setEditData({...editData, status: e.target.value})}
                            className="edit-select"
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="save-btn" onClick={saveEdit}>✓</button>
                            <button className="cancel-btn" onClick={cancelEdit}>✕</button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{reg.playerName}</td>
                        <td>{reg.teamName}</td>
                        <td>{reg.gameTitle}</td>
                        <td>{reg.inGameId}</td>
                        <td>{reg.email}</td>
                        <td>{reg.phone}</td>
                        <td>{reg.region}</td>
                        <td>{reg.teamSize}</td>
                        <td>
                          <span className={`status-badge status-${reg.status}`}>
                            {reg.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="edit-btn" 
                              onClick={() => startEdit(reg)}
                              title="Edit"
                            >
                              ✏️
                            </button>
                            <button 
                              className="delete-btn" 
                              onClick={() => handleDelete(reg.id)}
                              title="Delete"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;