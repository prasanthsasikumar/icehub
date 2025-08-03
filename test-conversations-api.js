const fs = require('fs');
const path = require('path');

// Test script to verify the conversations API fix
// This simulates what the API should return

const messagesPath = path.join(__dirname, 'server/data/messages.json');
const usersPath = path.join(__dirname, 'server/data/users.json');

try {
  const messages = JSON.parse(fs.readFileSync(messagesPath, 'utf8'));
  const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
  
  // Test with first user
  const currentUser = users[0];
  console.log('Testing with user:', currentUser.name, 'ID:', currentUser.id);
  
  // Group messages by conversation
  const conversationMap = new Map();
  
  messages.forEach((message) => {
    const participants = [message.senderId, message.receiverId].sort();
    const conversationKey = participants.join('-');
    
    if (participants.includes(currentUser.id)) {
      if (!conversationMap.has(conversationKey)) {
        conversationMap.set(conversationKey, {
          id: conversationKey,
          type: 'direct',
          participants,
          messages: [],
          lastMessage: null,
          createdAt: message.timestamp,
          updatedAt: message.timestamp
        });
      }
      
      const conversation = conversationMap.get(conversationKey);
      conversation.messages.push(message);
      
      if (!conversation.lastMessage || new Date(message.timestamp) > new Date(conversation.lastMessage.timestamp)) {
        conversation.lastMessage = message;
        conversation.updatedAt = message.timestamp;
      }
    }
  });
  
  // Convert to expected format
  const directConversations = Array.from(conversationMap.values()).map((conversation) => {
    const otherUserId = conversation.participants.find((id) => id !== currentUser.id);
    const otherUser = users.find(u => u.id === otherUserId);
    
    return {
      userId: otherUserId,
      userName: otherUser?.name || 'Unknown User',
      userImage: otherUser?.image || '/uploads/default/user-avatar.svg',
      lastMessage: conversation.lastMessage?.content || '',
      lastMessageTime: conversation.lastMessage?.timestamp || conversation.createdAt,
      unreadCount: 0,
      type: 'direct'
    };
  });
  
  console.log('\nDirect Conversations Found:', directConversations.length);
  directConversations.forEach((conv, index) => {
    console.log(`${index + 1}. ${conv.userName} - Last: "${conv.lastMessage}" at ${conv.lastMessageTime}`);
  });
  
  console.log('\nAPI Response Format:');
  console.log(JSON.stringify({
    success: true,
    directConversations: directConversations.slice(0, 2), // Show first 2 for brevity
    groupConversations: []
  }, null, 2));
  
} catch (error) {
  console.error('Error:', error.message);
}
