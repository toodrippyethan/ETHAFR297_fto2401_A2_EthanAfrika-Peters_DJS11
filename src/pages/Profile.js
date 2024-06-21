import React, { useState } from 'react';
import Header from '../components/common/Header';
import { FaUserEdit, FaEnvelope } from 'react-icons/fa'; 
import styled from 'styled-components'; 


const ProfileContainer = styled.div`
  color: #fff;
  min-height: 100vh;
  padding: 30px;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: auto;
  text-align: center;
`;

const ProfileHeader = styled.h1`
  margin-bottom: 20px;
`;

const ProfileInfo = styled.div`
  background-color: #463a4f;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const FieldWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const FieldLabel = styled.strong`
  font-size: 1.1rem;
`;

const FieldValue = styled.div`
  flex: 1;
  font-size: 1.1rem;
`;

const EditButton = styled.button`
  background-color: var(--blue);
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5bc0de;
  }
`;

const EditableInput = styled.input`
  font-size: 1.1rem;
  padding: 8px;
  border: 1px solid var(--purple-grey);
  border-radius: 4px;
  background-color: var(--theme);
  color: #fff;
`;

function Profile() {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');

  const handleNameEdit = () => {
    setIsEditingName(true);
  };

  const handleEmailEdit = () => {
    setIsEditingEmail(true);
  };

  const handleNameSave = () => {
    setIsEditingName(false);
  };

  const handleEmailSave = () => {
    setIsEditingEmail(false);
  };

  return (
    <ProfileContainer>
      <Header />
      <ContentWrapper>
        <ProfileHeader>Profile Page</ProfileHeader>
        <ProfileInfo>
          <div>
            <FieldWrapper>
              <FieldLabel>Name:</FieldLabel>
              <FieldValue>
                {isEditingName ? (
                  <EditableInput type="text" value={name} onChange={(e) => setName(e.target.value)} />
                ) : (
                  <span>{name}</span>
                )}
              </FieldValue>
              {isEditingName ? (
                <EditButton onClick={handleNameSave}>Save</EditButton>
              ) : (
                <EditButton onClick={handleNameEdit}><FaUserEdit /> Edit</EditButton>
              )}
            </FieldWrapper>
            <FieldWrapper>
              <FieldLabel>Email:</FieldLabel>
              <FieldValue>
                {isEditingEmail ? (
                  <EditableInput type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                ) : (
                  <span>{email}</span>
                )}
              </FieldValue>
              {isEditingEmail ? (
                <EditButton onClick={handleEmailSave}>Save</EditButton>
              ) : (
                <EditButton onClick={handleEmailEdit}><FaEnvelope /> Edit</EditButton>
              )}
            </FieldWrapper>
            <p><strong>Joined:</strong> January 1, 2023</p>
          </div>
        </ProfileInfo>
      </ContentWrapper>
    </ProfileContainer>
  );
}

export default Profile;
