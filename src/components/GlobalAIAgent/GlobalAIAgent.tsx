import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import FloatingButton from './FloatingButton';
import AgentPanel from './AgentPanel';
import { usePageContext, formatContextForAI } from '../../contexts/PageContext';

const GlobalAIAgent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentView, setCurrentView] = useState<'chat' | 'knowledge'>('chat');

    // Get page context from the PageContextProvider
    const { pageInfo } = usePageContext();

    // Format context for the agent panel
    const context = {
        page: pageInfo.page,
        view: pageInfo.view,
        description: pageInfo.description,
        features: pageInfo.features,
        url: window.location.href,
        timestamp: new Date().toISOString(),
        // Include any page-specific data
        data: pageInfo.data,
        // Pre-formatted context string for the AI
        formattedContext: formatContextForAI(pageInfo)
    };

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
