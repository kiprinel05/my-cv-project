document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.getElementById("chat-messages");
    const inputField = document.getElementById("chat-input");
    const sendButton = document.getElementById("send-button");

    sendButton.addEventListener("click", sendMessage);
    inputField.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    function addInitialMessage() {
        addMessage("Ask me a question!", "bot");
    }

    function sendMessage() {
        const message = inputField.value.trim();
        if (message === "") return;

        addMessage(message, "user");

        fetch(`http://localhost:8080/api/chatbot?question=${encodeURIComponent(message)}`)
            .then(response => response.text())
            .then(answer => addMessage(answer, "bot"));

        inputField.value = "";
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");

        const avatar = document.createElement("img");
        avatar.src = sender === "user" ? "assets/user.png" : "assets/bot.png";
        avatar.classList.add("avatar");

        const textDiv = document.createElement("div");
        textDiv.classList.add("message-text");
        textDiv.textContent = text;

        if (sender === "user") {
            messageDiv.appendChild(textDiv);
            messageDiv.appendChild(avatar);
        } else {
            messageDiv.appendChild(avatar);
            messageDiv.appendChild(textDiv);
        }

        chatContainer.appendChild(messageDiv);

        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    addInitialMessage();
});
