// AI response generator for free-form inputs
export const generateAIResponse = (userInput) => {
    const input = userInput.toLowerCase();

    if (input.includes('price') || input.includes('cost') || input.includes('how much')) {
        return {
            content: "This session is fully complimentary (free) for my alumni network. Just need your time and focus. Interested?",
            options: [
                { text: "Yes, I'm interested", type: "positive" },
                { text: "Tell me more first", type: "neutral" }
            ]
        };
    }

    if (input.includes('record') || input.includes('replay') || input.includes('watch later')) {
        return {
            content: "We prioritize live interaction for the best results. But register anyway — if we do release a recap, you'll be on the list. Shall I send the registration link?",
            options: [
                { text: "Yes, send the link", type: "positive" },
                { text: "No thanks", type: "negative" }
            ]
        };
    }

    if (input.includes('busy') || input.includes('not available') || input.includes('no time')) {
        return {
            content: "No worries at all. Shall I text you the details so you can check it later when you have time?",
            options: [
                { text: "Yes please", type: "positive" },
                { text: "Not interested", type: "negative" }
            ]
        };
    }

    if (input.includes('help') || input.includes('what') || input.includes('?')) {
        return {
            content: "I'm here to help you with the Final Sprint 2025 Momentum Clinic. What specific information would be most helpful for you?",
            options: [
                { text: "Tell me about pricing", type: "neutral" },
                { text: "Can I watch the recording?", type: "neutral" },
                { text: "How long is the session?", type: "neutral" }
            ]
        };
    }

    if (input.includes('yes') || input.includes('sure') || input.includes('okay') || input.includes('ok')) {
        return {
            content: "Great! Let me get you set up. What would be most valuable for you right now?",
            options: [
                { text: "Join the webinar", type: "positive" },
                { text: "Schedule a 1-on-1 call", type: "positive" },
                { text: "Get the checklist", type: "neutral" }
            ]
        };
    }

    if (input.includes('no') || input.includes('not interested') || input.includes('stop')) {
        return {
            content: "I understand. Thanks for your time. If anything changes, feel free to reach out.",
            options: null
        };
    }

    return {
        content: "I want to make sure I understand you correctly. Could you tell me more about what you're looking for? Or feel free to select one of these common questions:",
        options: [
            { text: "Tell me about pricing", type: "neutral" },
            { text: "Can I watch the recording?", type: "neutral" },
            { text: "I'm too busy right now", type: "neutral" },
            { text: "What's included in the program?", type: "neutral" }
        ]
    };
};
