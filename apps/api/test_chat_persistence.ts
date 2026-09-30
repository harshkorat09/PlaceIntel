import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_dev';

async function testChatPersistence() {
  // 1. Generate a valid token for a dummy user
  const token = jwt.sign({ userId: 1, role: 'STUDENT' }, JWT_SECRET, { expiresIn: '1d' });

  console.log('Testing Chat Persistence API...');

  // 2. Ask a question (simulates initial message)
  const res1 = await fetch('http://127.0.0.1:4000/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ question: 'Hi' })
  });

  const data1 = await res1.json();
  console.log('Message 1 response:', data1);

  if (!data1.data.session_id) {
    throw new Error('session_id not returned in first response!');
  }

  const sessionId = data1.data.session_id;

  // 3. Ask another question using the SAME session_id
  const res2 = await fetch('http://127.0.0.1:4000/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ question: 'What is the package for TCS?', session_id: sessionId })
  });

  const data2 = await res2.json();
  console.log('Message 2 response:', data2);

  if (data2.data.session_id !== sessionId) {
    throw new Error(`session_id changed! Expected ${sessionId}, got ${data2.data.session_id}`);
  }

  // 4. Fetch History
  const histRes = await fetch(`http://127.0.0.1:4000/api/chat/history?session_id=${sessionId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const histData = await histRes.json();
  console.log('History response:', histData);

  if (histData.data.messages.length !== 4) { // User, AI, User, AI
    throw new Error(`Expected 4 messages in history, got ${histData.data.messages.length}`);
  }

  console.log('✅ ALL TESTS PASSED!');
}

testChatPersistence().catch(console.error);
