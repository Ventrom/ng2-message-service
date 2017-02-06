import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'
import { SocketService } from './socket.service'
import { Message } from './chat.interface'

@Injectable()
export class MessageService {
    private messageSource: Subject<Message> = new Subject<Message>()
    messageConfirmed$ = this.messageSource.asObservable()

    constructor(
        private socketService: SocketService
    ) {
        // Creates a socket using the default config
        this.socketService.createSocket(true)
    }

    // Notify the subscriptions about the message change
    notify(message: Message) {
        this.messageSource.next(message)
    }

    sendMessage(message: Message) {
        console.log('Sending a message to a group:')
        console.log(message)
        this.broadcastMessage(JSON.stringify(message))
    }

    broadcastMessage(jsonm: string) {
        let socket = this.socketService.getSocket()
        let config = this.socketService.getConfig()
        socket.send(jsonm, 0, jsonm.length, config.MULTICAST_PORT, config.HOST, function(err: any, bytes: any) {
            if (err) {
                console.log('An error happened while sending the message:')
                console.log(err)
                socket.close()
            }
        })
    }

    getObservable() {
        return this.messageConfirmed$
    }
}
