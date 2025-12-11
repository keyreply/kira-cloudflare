import type { Task, Template, CallResult, StatusOption, UserTagCategory } from '../types/index.ts';

// Mock data for Task Management module
export const tasksData: Task[] = [
    {
        id: 1,
        taskName: 'Pre-operative Confirmation Campaign',
        targetCount: 1200,
        template: 'Pre-operative Confirmation',
        startType: 'Scheduled',
        creator: 'Zhang Wei',
        createdAt: '2025-01-15',
        status: 'In Progress',
        isOpen: true,
        startTime: '2025-01-16 09:00'
    },
    {
        id: 2,
        taskName: 'Post-operative Follow-up',
        targetCount: 850,
        template: 'Post-operative Follow-up',
        startType: 'Immediate',
        creator: 'Li Na',
        createdAt: '2025-01-14',
        status: 'Completed',
        isOpen: false
    },
    {
        id: 3,
        taskName: 'Sales Lead Activation Q1',
        targetCount: 2600,
        template: 'Sales/Potential Customers',
        startType: 'Scheduled',
        creator: 'Wang Fang',
        createdAt: '2025-01-13',
        status: 'Pending Review',
        isOpen: true,
        startTime: '2025-01-20 10:00'
    },
    {
        id: 4,
        taskName: 'Appointment Scheduling - Cardiology',
        targetCount: 600,
        template: 'Appointment Scheduling',
        startType: 'Immediate',
        creator: 'Liu Yang',
        createdAt: '2025-01-12',
        status: 'Draft',
        isOpen: true
    },
    {
        id: 5,
        taskName: 'B2B Survey - Healthcare Providers',
        targetCount: 300,
        template: 'B2B Live Survey',
        startType: 'Scheduled',
        creator: 'Chen Ming',
        createdAt: '2025-01-11',
        status: 'Rejected',
        isOpen: false,
        startTime: '2025-01-18 14:00',
        rejectionReason: 'Template content needs revision for compliance'
    }
];

export const templatesData: Template[] = [
    { id: 1, name: 'Supportive Recovery Bot', disc: 'S' },
    { id: 2, name: 'Pre-operative Confirmation', disc: 'C' },
    { id: 3, name: 'Post-operative Follow-up', disc: 'S' },
    { id: 4, name: 'Appointment Scheduling', disc: 'D' },
    { id: 5, name: 'B2B Live Survey', disc: 'I' },
    { id: 6, name: 'Sales/Potential Customers', disc: 'D' }
];

export const userTagsData: Record<string, UserTagCategory> = {
    activeUser: {
        label: 'Active User',
        children: [
            { label: 'Hyperglycemia', count: 234 },
            { label: 'Hypertension', count: 567 },
            { label: 'Hyperuricemia', count: 123 }
        ]
    },
    longTimeNoExam: {
        label: 'Long time no exam',
        count: 89
    }
};

export const statusOptions: StatusOption[] = [
    { value: 'all', label: 'All Statuses' },
    { value: 'draft', label: 'Draft' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'rejected', label: 'Rejected' }
];

export const callResultsData: CallResult[] = [
    {
        id: 1,
        userName: 'John Smith',
        phone: '138****5678',
        userTags: ['Hyperglycemia', 'Active User'],
        voiceFile: 'call_001.mp3',
        transcript: 'Patient confirmed appointment for Jan 20',
        duration: '2:34',
        result: 'Confirmed'
    },
    {
        id: 2,
        userName: 'Mary Johnson',
        phone: '139****2345',
        userTags: ['Hypertension'],
        voiceFile: 'call_002.mp3',
        transcript: 'No answer',
        duration: '0:15',
        result: 'No Answer'
    }
];
