import { useState, useRef, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ConversationsPanel } from './components/ConversationsPanel';
import { ChatArea } from './components/ChatArea';
import { RightPanel } from './components/RightPanel';
import { Dashboard } from './components/Dashboard';
import { Preview } from './components/Preview';
import GlobalAIAgent from './components/GlobalAIAgent/GlobalAIAgent';
import ManageBrands from './components/ManageBrands/ManageBrands';
import EditBrand from './components/ManageBrands/EditBrand';
import Channels from './components/Channels/Channels';
import { allConversationData } from './data/conversations';
import { generateAIResponse } from './utils/ai';

function App() {
  const [currentView, setCurrentView] = useState('conversations');
  const [interactionMode, setInteractionMode] = useState('interactive');
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const [userInput, setUserInput] = useState('');
  const [editingBrand, setEditingBrand] = useState(null);
  const [brands, setBrands] = useState([
    {
      id: 'lr0gyz71',
      name: 'key',
      agent: 'Kira',
      defaultAddress: 'support@key.com',
      status: 'Default brand',
      iconColor: 'text-white bg-blue-600'
    }
  ]);

  const handleSaveBrand = (updatedBrand) => {
    if (brands.find(b => b.id === updatedBrand.id)) {
      setBrands(brands.map(b => b.id === updatedBrand.id ? updatedBrand : b));
    } else {
      setBrands([...brands, { ...updatedBrand, iconColor: 'text-white bg-blue-600' }]);
    }
    setEditingBrand(null);
  };

  const handleNewBrand = () => {
    setEditingBrand({
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      agent: 'Kira',
      defaultAddress: '',
      status: 'Active',
      isNew: true
    });
  };
  const [activePanel, setActivePanel] = useState('profile');
  const [conversationLogs, setConversationLogs] = useState([]);

  // Live Preview states
  const [previewMessages, setPreviewMessages] = useState([]);
  const [kiraInput, setKiraInput] = useState('');
  const [userReply, setUserReply] = useState('');
  const [previewMode, setPreviewMode] = useState('kira');

  const messagesEndRef = useRef(null);

  const scenario = allConversationData[selectedScenario];

  // Initialize conversation when scenario or mode changes
  useEffect(() => {
    if (interactionMode === 'interactive') {
      setConversationHistory([scenario.steps[0]]);
      setCurrentStep(0);
      setConversationLogs([]);
      addLog("Conversation Started", `Initialized ${scenario.name} 's journey - ${scenario.title}`);
    } else {
      setConversationHistory([]);
      setConversationLogs(scenario.logs || []);
    }
  }, [selectedScenario, interactionMode]);

  const addLog = (title, detail, code = null) => {
    const newLog = {
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title,
      detail,
      ...(code && { code })
    };
    setConversationLogs(prev => [...prev, newLog]);
  };

  const handleOptionClick = (optionText) => {
    const userMessage = {
      type: "user",
      content: optionText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversationHistory(prev => [...prev, userMessage]);
    addLog("User Response", `User selected: "${optionText}"`);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      let nextSteps = [];
      let foundTrigger = false;

      for (let i = currentStep + 1; i < scenario.steps.length; i++) {
        const step = scenario.steps[i];
        if (step.trigger === optionText || !step.trigger) {
          nextSteps.push({
            ...step,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          });
          foundTrigger = true;
          if (!scenario.steps[i + 1] || scenario.steps[i + 1].trigger !== optionText) {
            setCurrentStep(i);
            break;
          }
        } else if (foundTrigger) {
          break;
        }
      }

      if (nextSteps.length > 0) {
        setConversationHistory(prev => [...prev, ...nextSteps]);
        addLog("AI Response", `Generated ${nextSteps.length} response(s) based on user intent`);
      } else {
        addLog("Conversation Flow", "Transitioned to free-form conversation mode");
      }
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const userMessage = {
      type: "user",
      content: userInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversationHistory(prev => [...prev, userMessage]);
    addLog("Free-form Input", `User typed: "${userInput}"`);

    const input = userInput;
    setUserInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const aiResponse = generateAIResponse(input);

      const kiraMessage = {
        type: "kira",
        content: aiResponse.content,
        options: aiResponse.options,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setConversationHistory(prev => [...prev, kiraMessage]);
      addLog("AI Generated Response", "Response generated using keyword detection and intent classification");
    }, 1200);
  };

  const handleReset = () => {
    setConversationHistory([scenario.steps[0]]);
    setCurrentStep(0);
    setConversationLogs([]);
    addLog("Conversation Reset", "Conversation restarted from beginning");
  };

  // Preview mode handlers
  const handleKiraSend = () => {
    if (!kiraInput.trim()) return;
    setPreviewMessages(prev => [...prev, { sender: 'kira', content: kiraInput }]);
    setKiraInput('');
  };

  const handleUserSend = () => {
    if (!userReply.trim()) return;
    setPreviewMessages(prev => [...prev, { sender: 'user', content: userReply }]);
    setUserReply('');
  };

  const messagesToShow = interactionMode === 'interactive'
    ? conversationHistory
    : scenario.messages;

  const showInputBox = interactionMode === 'interactive' &&
    conversationHistory.length > 0 &&
    !isTyping &&
    (!conversationHistory[conversationHistory.length - 1].options ||
      conversationHistory[conversationHistory.length - 1].options.length === 0);

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

      {currentView === 'conversations' && (
        <>
          <ConversationsPanel
            allConversationData={allConversationData}
            selectedScenario={selectedScenario}
            setSelectedScenario={setSelectedScenario}
            interactionMode={interactionMode}
            setInteractionMode={setInteractionMode}
          />
          <ChatArea
            scenario={scenario}
            interactionMode={interactionMode}
            handleReset={handleReset}
            messagesToShow={messagesToShow}
            isTyping={isTyping}
            handleOptionClick={handleOptionClick}
            showInputBox={showInputBox}
            userInput={userInput}
            setUserInput={setUserInput}
            handleSendMessage={handleSendMessage}
          />
          <RightPanel
            activePanel={activePanel}
            setActivePanel={setActivePanel}
            interactionMode={interactionMode}
            scenario={scenario}
            messagesToShow={messagesToShow}
            currentStep={currentStep}
            conversationLogs={conversationLogs}
          />
        </>
      )}

      {currentView === 'dashboard' && <Dashboard />}

      {currentView === 'preview' && (
        <Preview
          previewMessages={previewMessages}
          previewMode={previewMode}
          setPreviewMode={setPreviewMode}
          kiraInput={kiraInput}
          setKiraInput={setKiraInput}
          userReply={userReply}
          setUserReply={setUserReply}
          handleKiraSend={handleKiraSend}
          handleUserSend={handleUserSend}
        />

      )}

      {currentView === 'brands' && !editingBrand && (
        <ManageBrands
          brands={brands}
          onEditBrand={setEditingBrand}
          onNewBrand={handleNewBrand}
        />
      )}

      {currentView === 'brands' && editingBrand && (
        <EditBrand
          brand={editingBrand}
          onCancel={() => setEditingBrand(null)}
          onSave={handleSaveBrand}
        />
      )}

      {currentView === 'channels' && (
        <Channels />
      )}

      {/* Global AI Agent */}
      <GlobalAIAgent />
    </div>
  );
}

export default App;
