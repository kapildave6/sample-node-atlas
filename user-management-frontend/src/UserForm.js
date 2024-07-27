import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Paper, Container } from '@mui/material';

const UserForm = ({ selectedUser, onSave }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (selectedUser) {
            setName(selectedUser.name);
            setEmail(selectedUser.email);
            setPassword('');
        } else {
            setName('');
            setEmail('');
            setPassword('');
        }
    }, [selectedUser]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = { name, email, password };
        try {
            if (selectedUser) {
                await axios.put(`${window.location.origin}/api/users/${selectedUser._id}`, userData);
            } else {
                await axios.post(`${window.location.origin}/api/users`, userData);
            }
            onSave(); // Call the onSave prop to refresh the user list
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    return (
        <Container component={Paper} style={{ padding: '20px', marginBottom: '20px' }}>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Name"
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {!selectedUser && (
                    <TextField
                        fullWidth
                        label="Password"
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                )}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '20px' }}
                >
                    {selectedUser ? 'Update User' : 'Add User'}
                </Button>
            </form>
        </Container>
    );
};

export default UserForm;
