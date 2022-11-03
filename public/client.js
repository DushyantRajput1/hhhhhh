//const e = require("express");
// import { key, target } from "express";

console.log("hello")
const socket = io()

let name;

let textarea = document.querySelector('#textarea')

let messageArea = document.querySelector('.message_area')





do {
    name = prompt('Please  Enter Your Nmae')
}
while (!name)


textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})



function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }

    //Append




    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()


    ///send  to  Server

    socket.emit('message', msg)
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')


    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `


    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}



////Receive  messages



socket.on('message', (msg) => {
    appendMessage(msg, 'incomming')
    scrollToBottom()
})


function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}