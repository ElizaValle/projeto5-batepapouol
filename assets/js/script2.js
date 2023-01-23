let message = [];

let userName;

function sendMessage() {

    const messageSend = document.querySelector('message-input');
    document.querySelector('.message-input').value = '';
    if(messageSend === '') {
        return messageSend;
    }

    const newMessage = {
        from: userName.name,
        to: 'Todos',
        text: messageSend.value,
        type: 'message'
    };

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', newMessage);
    promise.then(loadMessages);
    promise.catch(window.location.reload());
    console.log(promise);
}

loadMessages();

window.onload = enterRoom();

sendButton.addEventListener("click", () => {
    sendMessage(messageInput.value, "Todos", false);
});

function loadMessages() {
    axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    .then((response) => {
        const messages = response.userName;

        messageContainer.innerHTML = '';

        for(let i = 0; i < messages.length; i++) {
            if(messages[i].type === 'status') {
                messageContainer.innerHTML += `
                    <div class='status-message' data-test="message">
                        <p>
                            <span class='time' data-test="message"(${messages[i].time})</span>
                            <strong class='name' data-test="message">${messages[i].from}</strong>
                            <span class='text' data-test="message">${messages[i].text}</span>
                        </p>
                    </div>
                `;
            }
            else if(messages[i].type === 'message') {
                messageContainer.innerHTML += `
                    <div class='normal-message' data-test="message">
                        <p>
                            <span class='time' data-test="message">(${message[i].time})</span>
                            <strong class='name' data-test="message">${message[i].from}</strong>
                            <span class='text' data-test="message">para</span>
                            <strong class='name' data-test="message">${message[i].to}</strong>
                            <span class='text' data-test="message">${message[i].text}</span>
                        </p>
                    </div>
                `;
            }
            else {
                messageContainer.innerHTML += `
                    <div class='private-message' data-test="message">
                        <p>
                            <span class='time' data-test="message">(${message[i].time})</span>
                            <strong class='name' data-test="message">${message[i].from}</strong>
                            <span class='text' data-test="message">reservadamente para</span>
                            <strong class='name' data-test="message">${message[i].to}</strong>
                            <span class='text' data-test="message">${message[i].text}</span>
                        </p>
                    </div>
                `;
            }
        }
        let chat = document.querySelector('messages');
        chat.scrollIntoView(false);
    })
    .catch((error) => {
        if(error.response.status === 400) {
            console.log("Erro: " + error.response.userName.message);
        }
        else {
            console.log("Erro ao conectar com o servidor: " + error);
        }
    });
}

function enterRoom() {

    userName = {name: prompt(`Digite seu nome:`)};

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', userName);
    promise.then((response) => {
        if(response.status === 200) {
            console.log("Entrou na sala com sucesso!");
            setInterval(loadMessages, 3000);
            setInterval(sendPresence, 5000);
        }
        else if(response.status === 400) {
            console.log("Nome já em uso, tente outro.");
            enterRoom();
        }
        else {
            console.log("Erro ao entrar na sala." + response.userName.message);
        }
    })
    .catch((error) => {
        if(error.response.status === 400) {
            console.log("Erro: " + error.response.userName.message);
        }
        else {
            console.log("Erro ao conectar com o servidor: " + error);
        }
    });
}

document.querySelector('keypress', function(e) {
    if(e.key === 'Enter') {
        let btn = document.querySelector('#submit');
        btn.click();
        document.querySelector('.message-input').value = '';
        if(btn === '') {
            return document.querySelector('.message-input').value = '';
        }
    }
}); 