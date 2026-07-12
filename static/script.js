async function sendMessage() {

    let input = document.getElementById("message");
    let chatBox = document.getElementById("chat-box");

    let message = input.value.trim();

    if (message === "") {
        return;
    }

    // User Message
    chatBox.innerHTML += `<p class="user-message">🧑 You: ${message}</p>`;

    input.value = "";

    // Typing Animation
    chatBox.innerHTML += `<p class="bot-message" id="typing">🤖 Bot is typing...</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        let response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        let data = await response.json();

        // Remove Typing Message
        document.getElementById("typing").remove();

        // Show Bot Reply
        chatBox.innerHTML += `<p class="bot-message">🤖 Bot: ${data.reply}</p>`;

    } catch (error) {

        document.getElementById("typing").remove();

        chatBox.innerHTML += `<p class="bot-message">❌ Error: Unable to connect.</p>`;
    }

    setTimeout(() => {
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 100);
}
function newChat() {
    document.getElementById("chat-box").innerHTML = "";
    document.getElementById("nessage").value = "";
}
function deleteChat() {
    if (confirm("Are you sure you want to delete the chat?")) {

document.getElementById("chat-box").innerHTML = "";
    }
}