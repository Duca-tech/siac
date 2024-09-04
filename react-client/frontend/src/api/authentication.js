export const login = async (email, password) => {
    try {
        const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token); // Armazena o token no localStorage
            return data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
