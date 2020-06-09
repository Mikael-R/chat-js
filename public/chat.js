const socket = io()

function formatDate(date) {
  date = new Date(date)

  const hours = date.getHours()
  const minutes = date.getMinutes()

  return `[${hours}:${String(minutes).split('').length === 2 ? minutes : '0' + minutes}]`
}

function renderMessage(message) {
  $('.messages').append(`
    <div class="message">
        <strong>
          ${formatDate(message.date)} ${message.author} diz: ${message.content}
        </strong>
    </div>
  `)
}

socket.on('recivedMessage', message => {
  renderMessage(message)
})

$('#chat').submit(event => {
  event.preventDefault()

  const message = new Object

  message.author = $('input[name=username').val()
  message.content = $('input[name=content]').val()
  message.date = new Date

  if (message.author.length && message.content.length) {
    renderMessage(message)

    socket.emit('sendMessage', message)
  }
})
