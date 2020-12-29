const socket = io();
const msgText = document.querySelector('#msg')
const btnSend = document.querySelector('#btn-send')
const chatBox = document.querySelector('.chat-content')
const displayMsg = document.querySelector('.message')

let name;
do{
    uname = prompt('What is your name?')
}while(!uname)

document.querySelector('#your-name').textContent = uname
msgText.focus()

btnSend.addEventListener('click', (e)=>{
    e.preventDefault()
    sendMsg(msgText.value)
    msgText.value = '';
    msgText.focus();
    chatBox.scrollTop = chatBox.scrollHeight;
})

const sendMsg = message =>{
    let msg = {
        user: uname,
        message: message.trim()
    }

    display(msg, 'you-message')

    socket.emit('sendMessage', msg)
}

socket.on('sendToAll', msg=>{
    display(msg, 'other-message')
    chatBox.scrollTop = chatBox.scrollHeight;
})

const display = (msg, type) =>{
    const msgDiv = document.createElement('div')
    let className = type
    msgDiv.classList.add(className, 'message-row')
    let times = new Date().toLocaleTimeString()

    let innerText = `
    <div class="message-title">
        🐵 <span>${msg.user}</span>
    </div>
    <div class="message-text">
        ${msg.message}
    </div>
    <div class="message-time">
        ${times}
    </div>
    `;
    msgDiv.innerHTML = innerText;
    displayMsg.appendChild(msgDiv)
}