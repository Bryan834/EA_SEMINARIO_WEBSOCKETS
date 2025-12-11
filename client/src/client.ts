import { io, Socket } from "socket.io-client";
import { IMessage } from "./models/message";

const SERVER_URL = "http://localhost:3000";

// Function to define socket events
const initializeSocketEvents = (socket: Socket): void => {
    socket.on("connect", () => {
        console.info(`Connected to the server with id: ${socket.id}`);
    });

    socket.on("disconnect", () => {
        console.info("Disconnected from the server.");
    });

    socket.on("message", (msg: IMessage) => {
        console.info(`[client](message) Received message: ${msg.content}`);
        console.info(`- Content: ${msg.content}`);
        console.info(`- Author: ${msg.author}`);
        console.info(`- Date: ${msg.date}`);
    });
};

// Function to send a message to the server
const sendMessage = (socket: Socket, message: IMessage): void => {
    socket.emit("message", message);
};

// Initialize connection
const socket = io(SERVER_URL);
initializeSocketEvents(socket);

// Example usage: Send a message to the server
const helloMessage: IMessage = {
    from: "Client",
    content: "Hello from the client!",
    date: new Date().toISOString(), 
    author: "Client"
};

setTimeout(() => {
    sendMessage(socket, helloMessage);
}, 3000);
