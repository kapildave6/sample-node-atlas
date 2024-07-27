import React, { useState } from 'react';
import UserList from './UserList';
import UserForm from './UserForm';
import { Container, Typography } from '@mui/material';

const App = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const handleEdit = (user) => {
        setSelectedUser(user);
    };

    const handleSave = () => {
        setSelectedUser(null);
        setRefreshTrigger(!refreshTrigger);
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                User Management System
            </Typography>
            <UserForm selectedUser={selectedUser} onSave={handleSave} />
            <UserList onEdit={handleEdit} refreshTrigger={refreshTrigger} />
        </Container>
    );
};

export default App;
