import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import FloatingButton from './FloatingButton';
import AgentPanel from './AgentPanel';

const GlobalAIAgent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentView, setCurrentView] = useState('chat'); // 'chat' | 'knowledge'

    // Context awareness mock
    const [context, setContext] = useState({
        page: 'Unknown',
        data: null
    });

    useEffect(() => {
        // Simple mock to detect page changes
        const updateContext = () => {
            const path = window.location.pathname;
            let pageName = 'Dashboard';
            if (path.includes('inbox')) pageName = 'Inbox';
            else if (path.includes('reports')) pageName = 'Financial Reports';

            setContext({
                page: pageName,
                url: window.location.href,
                timestamp: new Date().toISOString()
            });
        };

        updateContext();
        window.addEventListener('popstate', updateContext);
        return () => window.removeEventListener('popstate', updateContext);
    }, []);

    const toggleOpen = () => setIsOpen(!isOpen);

    return createPortal(
        <div className="global-ai-agent-root">
            <FloatingButton onClick={toggleOpen} isOpen={isOpen} />

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/20 z-40 transition-opacity duration-300"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Panel */}
                    <AgentPanel
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        currentView={currentView}
                        setCurrentView={setCurrentView}
                        context={context}
                    />
                </>
            )}
        </div>,
        document.body
    );
};

export default GlobalAIAgent;
