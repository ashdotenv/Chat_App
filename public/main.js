const socket = io()
let messageForm = document.querySelector("form")
let messageInput = document.querySelector("#message-input")
let nameInput = document.querySelector("#name-input")
let messageContainer = document.querySelector("#message-container")

messageForm.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log("Default");
    sendMessage()
})

function sendMessage() {
    const data = {
        name: nameInput.value,
        message: messageInput.value,
        dateTime: new Date()
    }
    socket.emit("message", data)
    addMessageToUI(true, data)
    messageInput.value = ""
}

socket.on("clients-total", (data) => {
    let totalClients = document.querySelector("#total-clients")
    totalClients.innerText = data
})

socket.on("chat-message", (data) => {
    addMessageToUI(false, data)
})

function addMessageToUI(isOwnMessage, data) {
    const element = `
    <li class="mt-5 rounded-xl p-2 bg-black text-white ${isOwnMessage ? "mr-[50%]" : "mr-[50%]"}">
        <p>${data.message}</p>
        <span>${data.name}</span>
        <span>${data.dateTime}</span>
    </li>`
    messageContainer.innerHTML += element

}
