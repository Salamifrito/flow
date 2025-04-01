async function sendMessage() {
  const input = document.getElementById('user-input');
  const text = input.value.trim();
  if (!text) return;

  const chatBox = document.getElementById('chat-box');

  const userMessage = document.createElement('div');
  userMessage.className = 'message user';
  userMessage.innerHTML = `<p>${text}</p>`;
  chatBox.appendChild(userMessage);

  input.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const res = await fetch('https://flow-so3g.vercel.app/api/message', {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();

    const botMessage = document.createElement('div');
    botMessage.className = 'message bot';
    botMessage.innerHTML = `<strong>AI:</strong><p>${data.message}</p>`;
    chatBox.appendChild(botMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
    console.error('Error:', err);
    const botMessage = document.createElement('div');
    botMessage.className = 'message bot';
    botMessage.innerHTML = `<strong>AI:</strong><p>Sorry, I’m having trouble responding.</p>`;
    chatBox.appendChild(botMessage);
  }
}
