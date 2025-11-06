import React, { useState } from 'react';
import '../../styles/Admin/UserManagement.css';

const UserManagement = () => {
  // Sample user data
  const [users, setUsers] = useState([
    { id: 1, name: 'Rajesh Kumar', email: 'rajesh@example.com', type: 'Farmer', phone: '9876543210', status: 'Active', joinDate: '2024-01-15' },
    { id: 2, name: 'Priya Sharma', email: 'priya@example.com', type: 'Consumer', phone: '9876543211', status: 'Active', joinDate: '2024-02-20' },
    { id: 3, name: 'Amit Patel', email: 'amit@example.com', type: 'Farmer', phone: '9876543212', status: 'Active', joinDate: '2024-01-28' },
    { id: 4, name: 'Sneha Reddy', email: 'sneha@example.com', type: 'Consumer', phone: '9876543213', status: 'Inactive', joinDate: '2024-03-10' },
    { id: 5, name: 'Vikram Singh', email: 'vikram@example.com', type: 'Farmer', phone: '9876543214', status: 'Active', joinDate: '2024-02-05' },
    { id: 6, name: 'Anjali Desai', email: 'anjali@example.com', type: 'Consumer', phone: '9876543215', status: 'Active', joinDate: '2024-03-15' },
    { id: 7, name: 'Suresh Babu', email: 'suresh@example.com', type: 'Farmer', phone: '9876543216', status: 'Active', joinDate: '2024-01-10' },
    { id: 8, name: 'Deepa Nair', email: 'deepa@example.com', type: 'Consumer', phone: '9876543217', status: 'Active', joinDate: '2024-02-28' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'view' or 'edit'

  // Filter and search users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All' || user.type === filterType;
    return matchesSearch && matchesFilter;
  });

  // Handle view user
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setModalMode('view');
    setShowModal(true);
  };

  // Handle edit user
  const handleEditUser = (user) => {
    setSelectedUser({ ...user });
    setModalMode('edit');
    setShowModal(true);
  };

  // Handle delete user
  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  // Handle save edited user
  const handleSaveUser = () => {
    setUsers(users.map(user => 
      user.id === selectedUser.id ? selectedUser : user
    ));
    setShowModal(false);
    setSelectedUser(null);
  };

  // Handle modal input change
  const handleInputChange = (e) => {
    setSelectedUser({
      ...selectedUser,
      [e.target.name]: e.target.value
    });
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="user-management">
      <div className="um-header">
        <h2 className="um-title">User Management</h2>
        <p className="um-subtitle">Manage all farmers and consumers</p>
      </div>

      {/* Filters and Search */}
      <div className="um-controls">
        <div className="um-search">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="um-filters">
          <button
            className={`filter-btn ${filterType === 'All' ? 'active' : ''}`}
            onClick={() => setFilterType('All')}
          >
            All Users ({users.length})
          </button>
          <button
            className={`filter-btn ${filterType === 'Farmer' ? 'active' : ''}`}
            onClick={() => setFilterType('Farmer')}
          >
            🌾 Farmers ({users.filter(u => u.type === 'Farmer').length})
          </button>
          <button
            className={`filter-btn ${filterType === 'Consumer' ? 'active' : ''}`}
            onClick={() => setFilterType('Consumer')}
          >
            🛒 Consumers ({users.filter(u => u.type === 'Consumer').length})
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="um-table-container">
        <table className="um-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Type</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    <div className="user-name-cell">
                      <span className="user-avatar">{user.name.charAt(0)}</span>
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <span className={`type-badge ${user.type.toLowerCase()}`}>
                      {user.type === 'Farmer' ? '🌾' : '🛒'} {user.type}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${user.status.toLowerCase()}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>{user.joinDate}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-btn view-btn"
                        onClick={() => handleViewUser(user)}
                        title="View Details"
                      >
                        👁️
                      </button>
                      <button
                        className="action-btn edit-btn"
                        onClick={() => handleEditUser(user)}
                        title="Edit User"
                      >
                        ✏️
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDeleteUser(user.id)}
                        title="Delete User"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-data">
                  No users found matching your search criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for View/Edit */}
      {showModal && selectedUser && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modalMode === 'view' ? 'User Details' : 'Edit User'}</h3>
              <button className="close-btn" onClick={closeModal}>✕</button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Name</label>
                {modalMode === 'view' ? (
                  <p className="form-value">{selectedUser.name}</p>
                ) : (
                  <input
                    type="text"
                    name="name"
                    value={selectedUser.name}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                )}
              </div>

              <div className="form-group">
                <label>Email</label>
                {modalMode === 'view' ? (
                  <p className="form-value">{selectedUser.email}</p>
                ) : (
                  <input
                    type="email"
                    name="email"
                    value={selectedUser.email}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                )}
              </div>

              <div className="form-group">
                <label>Phone</label>
                {modalMode === 'view' ? (
                  <p className="form-value">{selectedUser.phone}</p>
                ) : (
                  <input
                    type="tel"
                    name="phone"
                    value={selectedUser.phone}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                )}
              </div>

              <div className="form-group">
                <label>User Type</label>
                {modalMode === 'view' ? (
                  <p className="form-value">
                    <span className={`type-badge ${selectedUser.type.toLowerCase()}`}>
                      {selectedUser.type === 'Farmer' ? '🌾' : '🛒'} {selectedUser.type}
                    </span>
                  </p>
                ) : (
                  <select
                    name="type"
                    value={selectedUser.type}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="Farmer">Farmer</option>
                    <option value="Consumer">Consumer</option>
                  </select>
                )}
              </div>

              <div className="form-group">
                <label>Status</label>
                {modalMode === 'view' ? (
                  <p className="form-value">
                    <span className={`status-badge ${selectedUser.status.toLowerCase()}`}>
                      {selectedUser.status}
                    </span>
                  </p>
                ) : (
                  <select
                    name="status"
                    value={selectedUser.status}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                )}
              </div>

              <div className="form-group">
                <label>Join Date</label>
                <p className="form-value">{selectedUser.joinDate}</p>
              </div>
            </div>

            <div className="modal-footer">
              {modalMode === 'edit' && (
                <button className="save-btn" onClick={handleSaveUser}>
                  💾 Save Changes
                </button>
              )}
              <button className="cancel-btn" onClick={closeModal}>
                {modalMode === 'view' ? 'Close' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;