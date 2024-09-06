// backend URL:
const apiUrl = 'http://localhost:5000';

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Erro no processo de autenticação.');
        }

        const data = await response.json();
        // Store JWT token on localStorage:
        localStorage.setItem('authToken', data.token);

        return data;
    } catch (error) {
        console.error('Falha no login:', error);
        throw error;
    }
};
