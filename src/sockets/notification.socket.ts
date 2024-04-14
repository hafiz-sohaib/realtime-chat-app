import { Socket } from 'socket.io';

export default function notificationSocket(io: any): any {
    const notificationIo: any = io;

    notificationIo.on('connection', (socket: Socket) => {
        console.log(`User Connected. User ID is ${socket.id}`);
        notificationIo.emmit("notifyKey", "Notification Arrived");
    })
}