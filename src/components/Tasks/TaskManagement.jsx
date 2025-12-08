import React, { useState } from 'react';
import {
    MagnifyingGlassIcon,
    PlusIcon,
    EllipsisVerticalIcon
} from '@heroicons/react/24/outline';
import { tasksData, statusOptions, templatesData } from '../../data/tasksData';
import CreateTask from './CreateTask';

export default function TaskManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [tasks, setTasks] = useState(tasksData);
    const [showCreateTask, setShowCreateTask] = useState(false);

    const getStatusBadge = (status) => {
        const styles = {
            'In Progress': 'bg-slate-900 text-white',
            'Completed': 'bg-slate-700 text-white',
            'Pending Review': 'bg-yellow-500 text-white',
            'Draft': 'bg-slate-300 text-slate-700',
            'Rejected': 'bg-red-600 text-white'
        };
        return styles[status] || 'bg-gray-500 text-white';
    };

    const handleToggle = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, isOpen: !task.isOpen } : task
        ));
    };

    const handleSaveTask = (taskData) => {
        // Add new task to the list
        const newTask = {
            id: tasks.length + 1,
            taskName: taskData.taskName,
            targetCount: 0, // Will be calculated after user selection
            template: templatesData.find(t => t.id === parseInt(taskData.voiceTemplate))?.name || 'Unknown',
            startType: taskData.startMethod === 'immediate' ? 'Immediate' : 'Scheduled',
            creator: 'Current User', // Would come from auth in real app
            createdAt: new Date().toISOString().split('T')[0],
            status: 'Draft',
            isOpen: true,
            startTime: taskData.startTime
        };
        setTasks([newTask, ...tasks]);
    };

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.taskName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.creator.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' ||
            task.status.toLowerCase().replace(' ', '_') === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="flex-1 flex flex-col bg-slate-50">
            {/* Header */}
            <div className="bg-white px-8 py-6 border-b border-slate-200">
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Task Management</h1>
                        <p className="text-sm text-slate-600 mt-1">Manage and monitor all outbound call tasks</p>
                    </div>
                    <button
                        onClick={() => setShowCreateTask(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium"
                    >
                        Create Task
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white px-8 py-4 border-b border-slate-200">
                <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search Task Name or Creator"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                    </div>

                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-w-[180px]"
                    >
                        {statusOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto bg-white m-8 rounded-lg border border-slate-200">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200 sticky top-0">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Task Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Target Count
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Template
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Start Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Creator
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Created At
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Open/Close
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {filteredTasks.map((task) => (
                            <tr key={task.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700 text-left">
                                        {task.taskName}
                                    </button>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-900">
                                    {task.targetCount.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">
                                    {task.template}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">
                                    {task.startType}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">
                                    {task.creator}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">
                                    {task.createdAt}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getStatusBadge(task.status)}`}>
                                        {task.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleToggle(task.id)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${task.isOpen ? 'bg-slate-900' : 'bg-slate-300'
                                            }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${task.isOpen ? 'translate-x-6' : 'translate-x-1'
                                                }`}
                                        />
                                    </button>
                                    <span className="ml-2 text-xs text-slate-500">
                                        {task.isOpen ? 'Open' : 'Closed'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-slate-400 hover:text-slate-600">
                                        <EllipsisVerticalIcon className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredTasks.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-slate-500">No tasks found matching your criteria</p>
                    </div>
                )}
            </div>

            {showCreateTask && (
                <div className="fixed inset-0 z-50 bg-white">
                    <CreateTask
                        onClose={() => setShowCreateTask(false)}
                        onSave={handleSaveTask}
                    />
                </div>
            )}
        </div>
    );
}
