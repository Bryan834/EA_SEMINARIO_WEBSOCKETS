import SocketIO from "socket.io";
import * as http from "http";
import { IMessage } from "../models/message";

const createSocketServer = (server: http.Server) => {
    return new SocketIO.Server(server, {
        cors: {
            origin: "*"
        }
    });
};

const initializeSocket = (server: http.Server) => {
    const io = createSocketServer(server);
    io.on('connection', (socket: SocketIO.Socket) => {
      console.log('Connected client', socket.id);

      socket.on("message", (m: IMessage) => {
        const messageWithMetadata: IMessage = {
            ...m,
            date: new Date().toISOString(),
            author: m.from
        };

        console.log("[server](message): %s", messageWithMetadata.content);
        socket.emit("message", messageWithMetadata);
    });
  
      socket.on('disconnect', () => {
          console.log("Client disconnected", socket.id);
          socket.disconnect();
      });
    });
};

export default initializeSocket;