const socket = io()

function formatDate(date) {
  date = new Date(date)

  const hours = date.getHours()
  const minutes = date.getMinutes()

  return `[${hours}:${String(minutes).split('').length === 2 ? minutes : '0' + minutes}]`
}

function renderMessage(message) {
  const messages = document.getElementById('messages')
<<<<<<< HEAD
  
//added minor styles for cleaner effect
  messages.innerHTML += (`
    <div class="message">
        <span class="date">${formatDate(message.date)}</span> <b>${message.author}</b>: ${message.content}
=======

  messages.innerHTML += (`
    <div class="message">
        ${formatDate(message.date)} ${message.author} diz: ${message.content}
>>>>>>> 1eac2fbf7171e8a504fb9107e7d4ef2bb6986902
    </div>
  `)

  messages.scrollTop = messages.scrollHeight
}

socket.on('recivedMessage', message => {
  renderMessage(message)
})

document.forms['chat'].addEventListener('submit', event => {
  event.preventDefault()

  const message = new Object

  message.author = document.getElementById('username').value
  message.content = document.getElementById('message_content').value
  message.date = new Date

  if (message.author.length && message.content.length) {
    document.getElementById('message_content').value = ''

    renderMessage(message)

    socket.emit('sendMessage', message)
  }
})
