const socket = io()
let name1;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message_area')
do{
 name1 = prompt("Please Enter Your name :");
}while(!name1)

textarea.addEventListener('keyup',(e)=>{  //! Callback func only triggered  when user Press "enter" key 
    if(e.key === "Enter"){
    sendMessage(e.target.value)
    }
})

function sendMessage(message){ // Creating function to receive  and send msg 
    let msg = {         // Object to store user info
        user: name1,
        message: message.trim()
    }

// Append
appendMessage(msg,'outgoing')
textarea.value = ''
scrollToBottom();

//send to server using socket
socket.emit('message',msg)


}
   
function appendMessage(msg, type){
    let mainDiv = document.createElement('div')  // we are creating  div so that we can dynamically pass incoming and outgoing message
    let className = type
    mainDiv.classList.add(className, 'message', )

    let markup = `
     <h4> ${msg.user}</h4>
     <p>${msg.message}</p>

    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieved Message

socket.on('message',(msg) =>{
    appendMessage(msg,'incoming')
    scrollToBottom();
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}