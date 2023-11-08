class Chatbox {
    constructor(){
        this.args = {
            openButton: document.querySelector(selectors: '.chatbox__button'),
            openBox: document.querySelector(selectors: '.chatbox__support'),
            sendButton: document.querySelector(selectors: '.send__button')
        }

        this.state = false;
        this.messages = [];
    }

    display(){
        const {openButton, Chatbox, sendButton} = this.args;

        openButton.addEventListener(type:'click', listener: () => this.toggleState(chatBox))

        sendButton.addEventListener(type:'click', listener: () => this.onSendButton(chatBox))

        const node = chatBox.querySelector(selectors: 'input');
        node.addEventListener(type: "keyup", listener: ({key: string}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox) {
        this.state = !this.state;

        if(this.state) {
            chatbox.classList.add("chatbox--active")
        }
        else {
            chatbox.classList.remove(tokens: "chatbox--active")
        }
    }
    

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        if (text1 === "") {
            return;
        }

        let meg1 = {name : "User", message: text1}
        this.messages.push(msg1);

        fetch(input: $SCRIPT_ROOT + '/predict', init: {
            method: 'POST',
            body: JSON.stringify(value: {message: text1}),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        .then(r => r.json())
        .then(r => {
            let msg2 = { name: "Sam", message: r.answer};
            this.messages.push(msg2);
            this.updateChatText(chatbox)
            textField.value = ''
        }).catch((error) => {
            console.error("Error:", error);
            this.updatechatText(chatbox)
            textField.value = ''
        });
    }

    updateChatText(chatbox) {
        var html ='';
        this.messages.slice().reverse().forEach(function(item, index:number){
            if (item.name==="Sam")
            {
                html += '<div class="messages__item message__item--visitor">' + item.message + '</div'
            }
            else
            {
                html += '<div class="messages__item message__item--operator">' + item.message + '</div'
            }
        });
    const chatmessage = chatbox.querySelector('.chatbox__messages');
    chatmessage.innerHTML = html;

    }
}    

const chatbox = new Chatbox();
chatbox.display();