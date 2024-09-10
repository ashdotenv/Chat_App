import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
dotenv.config()
import { Server } from 'socket.io'
const app = express()
const PORT = process.env.PORT || 6000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")))
const server = app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`);
})
let totalClients = new Set()

const io = new Server(server)
io.on("connection", onConnected)
function onConnected(socket) {
    totalClients.add(socket.id)
    io.emit("clients-total", totalClients.size)
    socket.on("disconnect", () => {
        totalClients.delete(socket.id)
        io.emit("clients-total", totalClients.size)
    })
    socket.on("message", (data) => {
        socket.broadcast.emit("chat-message", data)
    })
}