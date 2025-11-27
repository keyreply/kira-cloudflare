import React from 'react';
import { CalendarIcon, VideoCameraIcon } from '@heroicons/react/24/outline';

export function ZoomLink({ eventTitle = 'Final Sprint Momentum Clinic', type = 'webinar' }) {
    // Generate meeting details
    const meetingId = Math.floor(Math.random() * 900000000) + 100000000;
    const password = Math.random().toString(36).substring(2, 8).toUpperCase();
    const zoomUrl = `https://zoom.us/j/${meetingId}?pwd=${password}`;

    // Event date configuration
    const eventDates = {
        'Final Sprint Momentum Clinic': '20251215T180000Z/20251215T193000Z',
        'Clarity Call': '20251216T140000Z/20251216T141500Z',
        'Strategy Session': '20251217T150000Z/20251217T160000Z',
    };

    const dateRange = eventDates[eventTitle] || eventDates['Final Sprint Momentum Clinic'];

    // Generate Google Calendar link
    const calendarParams = new URLSearchParams({
        action: 'TEMPLATE',
        text: eventTitle,
        dates: dateRange,
        details: `Join Zoom Meeting: ${zoomUrl}\n\nMeeting ID: ${meetingId}\nPasscode: ${password}\n\nThis is an exclusive invite for the ${eventTitle}. We look forward to seeing you there!`,
        location: zoomUrl,
        sf: 'true'
    });

    const calendarUrl = `https://calendar.google.com/calendar/render?${calendarParams.toString()}`;

    return (
        <div className="inline-flex flex-col gap-2 my-2">
            <a
                href={zoomUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium text-sm transition-all duration-150 hover:shadow-md no-underline"
            >
                <VideoCameraIcon className="w-5 h-5" />
                Join Zoom Meeting
            </a>
            <a
                href={calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg font-medium text-sm transition-all duration-150 hover:shadow-sm no-underline"
            >
                <CalendarIcon className="w-5 h-5" />
                Add to Calendar
            </a>
            <div className="text-xs text-slate-500 mt-1">
                Meeting ID: {meetingId} • Passcode: {password}
            </div>
        </div>
    );
}
