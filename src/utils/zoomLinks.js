// Zoom calendar invite link generator
export const createZoomInviteLink = (eventTitle, startTime, duration = 90) => {
    const meetingId = Math.floor(Math.random() * 900000000) + 100000000; // Generate random 9-digit meeting ID
    const password = Math.random().toString(36).substring(2, 8).toUpperCase(); // Generate random password

    // Zoom meeting URL
    const zoomUrl = `https://zoom.us/j/${meetingId}?pwd=${password}`;

    // Calendar invite parameters
    const calendarParams = new URLSearchParams({
        text: eventTitle,
        dates: startTime,
        details: `Join Zoom Meeting: ${zoomUrl}\\n\\nMeeting ID: ${meetingId}\\nPasscode: ${password}`,
        location: zoomUrl,
        sf: 'true',
        output: 'xml'
    });

    return {
        zoomUrl,
        meetingId,
        password,
        calendarUrl: `https://calendar.google.com/calendar/render?action=TEMPLATE&${calendarParams.toString()}`,
        displayText: `🔗 Zoom Meeting Link`
    };
};

// Example event dates
export const eventDates = {
    'Final Sprint Momentum Clinic': '20251215T180000Z/20251215T193000Z', // Dec 15, 2025, 6:00 PM - 7:30 PM UTC
    'Clarity Call': '20251216T140000Z/20251216T141500Z', // Dec 16, 2025, 2:00 PM - 2:15 PM UTC
    'Strategy Session': '20251217T150000Z/20251217T160000Z', // Dec 17, 2025, 3:00 PM - 4:00 PM UTC
};
