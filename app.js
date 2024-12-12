const express = require('express');
const axios = require('axios');

const app = express();
const port = 8085;

app.use(express.json());

// Services
const livresService = 'http://node_app:3000/v1';
const utilisateursService = 'http://api-utilisateurs:5000';
const empruntsService = 'http://api:3333/v1';

// --- Services Livres ---
app.get('/books', async (req, res) => {
    try {
        const response = await axios.get(`${livresService}/books`, {
            validateStatus: function (status) {
                return (status >= 200 && status < 300) || status === 404;
            }
        });
        if (response.status === 404) {
            res.status(404).send('Books not found');
        } else {
            res.json(response.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error fetching books');
    }
});

app.post('/books', async (req, res) => {
    try {
        const response = await axios.post(`${livresService}/books`, req.body, {
            validateStatus: function (status) {
                return (status >= 200 && status < 300) || status === 404;
            }
        });
        res.status(201).json(response.data);
    } catch (error) {
        res.status(500).send('Error adding book');
    }
});

app.put('/books/:id', async (req, res) => {
    try {
        const response = await axios.put(`${livresService}/books/${req.params.id}`, req.body, {
            validateStatus: function (status) {
                return (status >= 200 && status < 300) || status === 404;
            }
        });
        if (response.status === 404) {
            res.status(404).send('Book not found');
        } else {
            res.json(response.data);
        }
    } catch (error) {
        res.status(500).send('Error updating book');
    }
});

app.delete('/books/:id', async (req, res) => {
    try {
        const response = await axios.delete(`${livresService}/books/${req.params.id}`, {
            validateStatus: function (status) {
                return (status >= 200 && status < 300) || status === 404;
            }
        });
        if (response.status === 404) {
            res.status(404).send('Book not found');
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).send('Error deleting book');
    }
});

app.get('/books/:id/availability', async (req, res) => {
    try {
        const response = await axios.get(`${livresService}/books/${req.params.id}/availability`, {
            validateStatus: function (status) {
                return (status >= 200 && status < 300) || status === 404;
            }
        });
        if (response.status === 404) {
            res.status(404).send('Book availability not found');
        } else {
            res.json(response.data);
        }
    } catch (error) {
        res.status(500).send('Error checking book availability');
    }
});

// --- Services Utilisateurs ---
app.post('/users', async (req, res) => {
    try {
        const response = await axios.post(`${utilisateursService}/utilisateurs`, req.body, {
            validateStatus: function (status) {
                return (status >= 200 && status < 300) || status === 404;
            }
        });
        res.status(201).json(response.data);
    } catch (error) {
        res.status(500).send('Error adding user');
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const response = await axios.get(`${utilisateursService}/utilisateurs/${req.params.id}`, {
            validateStatus: function (status) {
                return (status >= 200 && status < 300) || status === 404;
            }
        });
        if (response.status === 404) {
            res.status(404).send('User not found');
        } else {
            res.json(response.data);
        }
    } catch (error) {
        res.status(500).send('Error fetching user');
    }
});

app.post('/penalites', async (req, res) => {
    try {
        const response = await axios.post(`${utilisateursService}/penalites`, req.body, {
            validateStatus: function (status) {
                return (status >= 200 && status < 300) || status === 404;
            }
        });
        res.status(201).json(response.data);
    } catch (error) {
        res.status(500).send('Error adding penalty');
    }
});

app.get('/verifier_retards', async (req, res) => {
    try {
        const response = await axios.get(`${utilisateursService}/verifier_retards`, {
            validateStatus: function (status) {
                return (status >= 200 && status < 300) || status === 404;
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error checking late borrowings');
    }
});

app.post('/penalite/pay', async (req, res) => {
    try {
        const response = await axios.post(`${utilisateursService}/penalite/pay`, req.body, {
            validateStatus: function (status) {
                return (status >= 200 && status < 300) || status === 404;
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error paying penalty');
    }
});

app.get('/valid-user/:id', async (req, res) => {
    try {
        const response = await axios.get(`${utilisateursService}/valid-user/${req.params.id}`, {
            validateStatus: function (status) {
                return (status >= 200 && status < 300) || status === 404;
            }
        });
        if (response.status === 404) {
            res.status(404).send('User not valid');
        } else {
            res.json(response.data);
        }
    } catch (error) {
        res.status(500).send('Error checking user validity');
    }
});

// --- Services Emprunts ---
app.post('/loans', async (req, res) => {
    try {
        const response = await axios.post(`${empruntsService}/emprunt`, req.body, {
            validateStatus: function (status) {
                return (status >= 200 && status < 300) || status === 404;
            }
        });
        res.status(201).json(response.data);
    } catch (error) {
        res.status(500).send('Error creating borrowing');
    }
});

app.put('/loans', async (req, res) => {
    try {
        const response = await axios.put(`${empruntsService}`, req.body, {
            validateStatus: function (status) {
                return (status >= 200 && status < 300) || status === 404;
            }
        });
        if (response.status === 404) {
            res.status(404).send('Borrowing not found');
        } else {
            res.json(response.data);
        }
    } catch (error) {
        res.status(500).send('Error updating borrowing');
    }
});

// Lancer le serveur
app.listen(port, () => {
    console.log(`API Gateway is running on http://localhost:${port}`);
});
