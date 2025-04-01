const chatBox = document.getElementById('chat-box');
const input = document.getElementById('user-input');
const sendButton = document.querySelector('button');

function appendMessage(sender, message) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender === 'You' ? 'user' : 'bot'}`;
  messageDiv.innerHTML = `<p><strong>${sender}:</strong> ${message}</p>`;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  appendMessage('You', text);
  input.value = '';

  const response = await fetch('https://flow-so3g.vercel.app/api/message', {

    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: text })
  });

  const data = await response.json();
  appendMessage('AI', data.reply);
}

// Allow pressing Enter to send
input.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendMessage();
  }
});

// Also support the Send button
sendButton.addEventListener('click', sendMessage);
