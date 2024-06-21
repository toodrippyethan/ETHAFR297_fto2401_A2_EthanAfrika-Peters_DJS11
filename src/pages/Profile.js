import React from 'react';
import Header from '../components/common/Header';

function Profile() {
  return (
    <div style={{ padding: '20px' }}>
      <Header />
      <div style={{ maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '10px' }}>Profile Page</h1>
        <p style={{ marginBottom: '20px' }}>This is the profile page content.</p>
      </div>
    </div>
  );
}

export default Profile;
