// dialogwindow.js

function sendMessage() {
    var userMessage = document.getElementById("user-message").value;
    var chatHistory = document.getElementById("chat-history");

    // Append user message
    var userDiv = document.createElement("div");
    userDiv.className = "user-message";
    userDiv.textContent = userMessage;
    chatHistory.appendChild(userDiv);

    // Append bot message
    var botMessage = getBotResponse(userMessage); // You need to implement this function
    var botDiv = document.createElement("div");
    botDiv.className = "bot-message";
    botDiv.textContent = botMessage;
    chatHistory.appendChild(botDiv);
}

function resetChat() {
    document.getElementById("chat-history").innerHTML = "";
}

function appendMessage(sender, message, className) {
    var chatHistory = document.getElementById("chat-history");
    var messageContainer = document.createElement("div");
    messageContainer.className = className;
    messageContainer.innerHTML = "<strong>" + sender + ":</strong> " + message;
    chatHistory.appendChild(messageContainer);
}

function closeChatPopup() {
    var chatWindow = document.querySelector(".chat-window");
    chatWindow.style.display = "none";
}
