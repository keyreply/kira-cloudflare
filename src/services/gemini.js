// API endpoint for the Cloudflare Worker backend
const API_URL = import.meta.env.VITE_API_URL || 'https://ppp-academy-api.keyreply.workers.dev';

export const generateGeminiResponse = async (prompt, context = '') => {
    try {
        const response = await fetch(`${API_URL}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt, context }),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("API error:", error);
            return null;
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error("Error calling API:", error);
        return "I'm having trouble connecting to my brain right now. Please try again later.";
    }
};
