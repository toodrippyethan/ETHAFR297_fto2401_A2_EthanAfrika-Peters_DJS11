import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../firebase';

function Profile() {
  const user = useSelector((state) => state.user.user);

  // Loading state while user is fetched
  if (!user) {
    return <p>Loading...</p>; // You can replace this with a loading spinner or animation
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("User Logged Out!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Header />
      <div style={{ maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '10px' }}>Welcome, {user.name}</h1>
        <p style={{ marginBottom: '10px' }}>Email: {user.email}</p>
        <p style={{ marginBottom: '20px' }}>UID: {user.uid}</p>
        <Button text="Logout" onClick={handleLogout} />
      </div>
    </div>
  );
}

export default Profile;
