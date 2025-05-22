import { useState, useRef, useEffect } from 'react';
import { Send, Phone, Video, Info, Search, MoreHorizontal, Smile, Image } from 'lucide-react';

const DashboardText = () => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);

  // Mock data for conversations
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: 'Dr Leah',
      username: '@leah_c',
      avatar: '/images/dr-leah.jpg',
      lastMessage: 'What time are you free for the check-up?',
      timestamp: '2m',
      unread: 2,
      online: true,
      messages: [
        { id: 1, text: 'Hey there! 👋', sender: 'them', timestamp: '10:30 AM', type: 'text' },
        { id: 2, text: 'How are you doing today?', sender: 'them', timestamp: '10:31 AM', type: 'text' },
        { id: 3, text: 'I\'m doing great! Thanks for asking 😊', sender: 'me', timestamp: '10:35 AM', type: 'text' },
        { id: 4, text: 'That\'s awesome to hear!', sender: 'them', timestamp: '10:36 AM', type: 'text' },
        { id: 5, text: 'What time are you free for the check-up?', sender: 'them', timestamp: '2m ago', type: 'text' }
      ]
    },
    {
      id: 2,
      name: 'Dr Vanne',
      username: '@Kevana_d',
      avatar: '/images/dr-vanne.jpg',
      lastMessage: 'Medical Booklets!',
      timestamp: '1h',
      unread: 0,
      online: false,
      messages: [
        { id: 1, text: 'Could you Come Along with past report?', sender: 'them', timestamp: '2:00 PM', type: 'text' },
        { id: 2, text: 'Of course! Doc What do you need?', sender: 'me', timestamp: '2:05 PM', type: 'text' },
        { id: 3, text: 'Medical Booklets!', sender: 'them', timestamp: '1h ago', type: 'text' },
        { id: 4, text: '👌', sender: 'me', timestamp: '1h ago', type: 'reaction' }
      ]
    },
    {
      id: 3,
      name: 'Dr Neba',
      username: '@Neba_w',
      avatar: '/images/dr-neba.jpg',
      lastMessage: 'See you tomorrow!',
      timestamp: '3h',
      unread: 0,
      online: true,
      messages: [
        { id: 1, text: 'Are we still on for tomorrow?', sender: 'them', timestamp: '4:00 PM', type: 'text' },
        { id: 2, text: 'Yes! Looking forward to it', sender: 'me', timestamp: '4:05 PM', type: 'text' },
        { id: 3, text: 'See you tomorrow!', sender: 'them', timestamp: '3h ago', type: 'text' }
      ]
    },
    {
      id: 4,
      name: 'Dr Henry',
      username: '@Henry_n',
      avatar: '/images/doc-hen.jpg',
      lastMessage: 'Photo',
      timestamp: '1d',
      unread: 1,
      online: false,
      messages: [
        { id: 1, text: 'Your condition is getting better!', sender: 'them', timestamp: '1d ago', type: 'text' },
        { id: 2, text: '/images/rash-con.jpg', sender: 'them', timestamp: '1d ago', type: 'image' }
      ]
    }
  ]);

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentConversation = conversations[selectedChat];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const updatedConversations = [...conversations];
      const newMsg = {
        id: Date.now(),
        text: newMessage,
        sender: 'me',
        timestamp: 'now',
        type: 'text'
      };
      
      updatedConversations[selectedChat].messages.push(newMsg);
      updatedConversations[selectedChat].lastMessage = newMessage;
      updatedConversations[selectedChat].timestamp = 'now';
      
      setConversations(updatedConversations);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const sendReaction = (reaction) => {
    const updatedConversations = [...conversations];
    const newMsg = {
      id: Date.now(),
      text: reaction,
      sender: 'me',
      timestamp: 'now',
      type: 'reaction'
    };
    
    updatedConversations[selectedChat].messages.push(newMsg);
    setConversations(updatedConversations);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversation.messages]);

  const styles = {
     dashboardContainer: {
      backgroundColor: '#ffffff',
      minHeight: '100vh',
      color: '#1f2937',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    },
    textTitle: {
      padding: '20px',
      borderBottom: '1px solid #e5e7eb',
      textAlign: 'center'
    },
    title: {
      fontSize: '28px',
      fontWeight: '600',
      margin: '0',
      color: '#1f2937'
    },
    messagingContainer: {
      display: 'flex',
      height: 'calc(100vh - 80px)',
      backgroundColor: '#ffffff'
    },
    sidebar: {
      width: '350px',
      borderRight: '1px solid #e5e7eb',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#ffffff'
    },
    sidebarHeader: {
      padding: '16px 20px',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    sidebarTitle: {
      fontWeight: '600',
      fontSize: '16px',
      color: '#1f2937'
    },
    searchContainer: {
      padding: '16px 20px',
      borderBottom: '1px solid #e5e7eb'
    },
    searchInput: {
      width: '100%',
      padding: '8px 12px',
      backgroundColor: '#f3f4f6',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      color: '#1f2937',
      fontSize: '14px',
      outline: 'none'
    },
    conversationsList: {
      flex: 1,
      overflowY: 'auto'
    },
    conversationItem: {
      padding: '12px 20px',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      borderBottom: '1px solid #f3f4f6'
    },
    conversationItemActive: {
      backgroundColor: '#f3f4f6'
    },
    avatarContainer: {
      position: 'relative',
      marginRight: '12px'
    },
    avatar: {
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      objectFit: 'cover'
    },
    onlineIndicator: {
      position: 'absolute',
      bottom: '2px',
      right: '2px',
      width: '14px',
      height: '14px',
      backgroundColor: '#00d61a',
      border: '2px solid #ffffff',
      borderRadius: '50%'
    },
    conversationInfo: {
      flex: 1,
      minWidth: 0
    },
    conversationHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '4px'
    },
    conversationName: {
      fontWeight: '600',
      fontSize: '14px',
      color: '#1f2937'
    },
    conversationTime: {
      fontSize: '12px',
      color: '#6b7280'
    },
    conversationPreview: {
      fontSize: '14px',
      color: '#6b7280',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    unreadBadge: {
      minWidth: '20px',
      height: '20px',
      backgroundColor: '#ff3040',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: '600',
      marginLeft: '8px',
      color: '#ffffff'
    },
    chatArea: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#ffffff'
    },
    chatHeader: {
      padding: '16px 20px',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    chatHeaderLeft: {
      display: 'flex',
      alignItems: 'center'
    },
    chatHeaderRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    chatHeaderAvatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      objectFit: 'cover'
    },
    chatHeaderInfo: {
      marginLeft: '12px'
    },
    chatHeaderName: {
      fontWeight: '600',
      fontSize: '16px',
      color: '#1f2937'
    },
    chatHeaderStatus: {
      fontSize: '12px',
      color: '#6b7280',
      marginTop: '2px'
    },
    iconButton: {
      background: 'none',
      border: 'none',
      color: '#6b7280',
      cursor: 'pointer',
      padding: '8px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color 0.2s'
    },
    messagesContainer: {
      flex: 1,
      overflowY: 'auto',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      backgroundColor: '#f9fafb'
    },
    messageGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    },
    messageGroupMe: {
      alignItems: 'flex-end'
    },
    messageGroupThem: {
      alignItems: 'flex-start'
    },
    message: {
      maxWidth: '70%',
      padding: '12px 16px',
      borderRadius: '18px',
      fontSize: '14px',
      lineHeight: '1.4',
      wordWrap: 'break-word'
    },
    messageMe: {
      backgroundColor: '#0084ff',
      color: '#ffffff'
    },
    messageThem: {
      backgroundColor: '#ffffff',
      color: '#1f2937',
      border: '1px solid #e5e7eb'
    },
    messageImage: {
      maxWidth: '300px',
      borderRadius: '12px',
      cursor: 'pointer'
    },
    messageReaction: {
      fontSize: '24px',
      backgroundColor: 'transparent',
      padding: '8px'
    },
    messageTime: {
      fontSize: '11px',
      color: '#6b7280',
      marginTop: '4px',
      textAlign: 'center'
    },
    inputContainer: {
      padding: '16px 20px',
      borderTop: '1px solid #e5e7eb',
      display: 'flex',
      alignItems: 'flex-end',
      gap: '12px',
      backgroundColor: '#ffffff'
    },
    messageInput: {
      flex: 1,
      padding: '12px 16px',
      backgroundColor: '#f3f4f6',
      border: '1px solid #d1d5db',
      borderRadius: '20px',
      color: '#1f2937',
      fontSize: '14px',
      outline: 'none',
      resize: 'none',
      minHeight: '20px',
      maxHeight: '100px'
    },
    sendButton: {
      background: 'none',
      border: 'none',
      color: '#0084ff',
      cursor: 'pointer',
      padding: '8px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    quickReactions: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center'
    },
    reactionButton: {
      background: 'none',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      padding: '4px',
      borderRadius: '50%',
      transition: 'transform 0.2s'
    },
    noChat: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      color: '#6b7280'
    }
  };

  const renderMessage = (message) => {
    const isMe = message.sender === 'me';
    const isImage = message.type === 'image';
    const isReaction = message.type === 'reaction';

    return (
      <div key={message.id} style={{
        ...styles.messageGroup,
        ...(isMe ? styles.messageGroupMe : styles.messageGroupThem)
      }}>
        <div style={{
          ...styles.message,
          ...(isMe ? styles.messageMe : styles.messageThem),
          ...(isReaction ? styles.messageReaction : {}),
          ...(isImage ? { padding: '4px', backgroundColor: 'transparent' } : {})
        }}>
          {isImage ? (
            <img 
              src={message.text} 
              alt="Shared image" 
              style={styles.messageImage}
            />
          ) : (
            message.text
          )}
        </div>
        <div style={styles.messageTime}>
          {message.timestamp}
        </div>
      </div>
    );
  };

  return (
    <div id="DashboardText-container" style={styles.dashboardContainer}>
      <div className="text-title" style={styles.textTitle}>
        <h1 style={styles.title}>Messaging Area</h1>
      </div>

      <div style={styles.messagingContainer}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <div style={styles.sidebarHeader}>
            <h2 style={styles.sidebarTitle}>Conversations</h2>
            <button style={styles.iconButton}>
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div style={styles.searchContainer}>
            <div style={{ position: 'relative' }}>
              <Search 
                size={16} 
                style={{ 
                  position: 'absolute', 
                  left: '12px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: '#8e8e8e' 
                }} 
              />
              <input
                type="text"
                placeholder="Search conversations"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  ...styles.searchInput,
                  paddingLeft: '36px'
                }}
              />
            </div>
          </div>

          <div style={styles.conversationsList}>
            {filteredConversations.map((conversation, index) => (
              <div
                key={conversation.id}
                style={{
                  ...styles.conversationItem,
                  ...(selectedChat === index ? styles.conversationItemActive : {})
                }}
                onClick={() => setSelectedChat(index)}
                onMouseEnter={(e) => {
                  if (selectedChat !== index) {
                    e.target.style.backgroundColor = '#1a1a1a';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedChat !== index) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div style={styles.avatarContainer}>
                  <img src={conversation.avatar} alt={conversation.name} style={styles.avatar} />
                  {conversation.online && <div style={styles.onlineIndicator}></div>}
                </div>
                
                <div style={styles.conversationInfo}>
                  <div style={styles.conversationHeader}>
                    <span style={styles.conversationName}>{conversation.name}</span>
                    <span style={styles.conversationTime}>{conversation.timestamp}</span>
                  </div>
                  <div style={styles.conversationPreview}>
                    {conversation.lastMessage}
                  </div>
                </div>
                
                {conversation.unread > 0 && (
                  <div style={styles.unreadBadge}>
                    {conversation.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div style={styles.chatArea}>
          {currentConversation ? (
            <>
              <div style={styles.chatHeader}>
                <div style={styles.chatHeaderLeft}>
                  <img src={currentConversation.avatar} alt={currentConversation.name} style={styles.chatHeaderAvatar} />
                  <div style={styles.chatHeaderInfo}>
                    <div style={styles.chatHeaderName}>{currentConversation.name}</div>
                    <div style={styles.chatHeaderStatus}>
                      {currentConversation.online ? 'Active now' : 'Active 2h ago'}
                    </div>
                  </div>
                </div>
                
                <div style={styles.chatHeaderRight}>
                  <button style={styles.iconButton}>
                    <Phone size={20} />
                  </button>
                  <button style={styles.iconButton}>
                    <Video size={20} />
                  </button>
                  <button style={styles.iconButton}>
                    <Info size={20} />
                  </button>
                </div>
              </div>

              <div style={styles.messagesContainer}>
                {currentConversation.messages.map((message) => renderMessage(message))}
                <div ref={messagesEndRef} />
              </div>

              <div style={styles.inputContainer}>
                <div style={styles.quickReactions}>
                  <button 
                    style={styles.reactionButton}
                    onClick={() => sendReaction('❤️')}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    ❤️
                  </button>
                  <button 
                    style={styles.reactionButton}
                    onClick={() => sendReaction('👍')}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    👍
                  </button>
                </div>
                
                <button style={styles.iconButton}>
                  <Image size={20} />
                </button>
                
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  style={styles.messageInput}
                  rows={1}
                />
                
                <button style={styles.iconButton}>
                  <Smile size={20} />
                </button>
                
                <button 
                  style={styles.sendButton}
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send size={20} />
                </button>
              </div>
            </>
          ) : (
            <div style={styles.noChat}>
              <h3>Select a conversation to start messaging</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardText;