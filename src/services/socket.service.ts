import { Injectable } from '@angular/core'
import { SocketConfig, SocketCallback } from './chat.interface'
//import { Socket } from 'dgram'
import { Observable } from 'rxjs/observable'

//const dgram = require('dgram')
import * as dgram from 'dgram'

@Injectable()
export class SocketService {
    private socket: dgram.Socket
    private defaultConfig: SocketConfig = {
        HOST: '239.255.22.79',
        PORT: 8000,
        MULTICAST_PORT: 5554,
        broadcast: true,
        multicastTTL: 128
    }
    private config: SocketConfig

    constructor() {}

    // Chat and message services are able to create sockets on their own
    createSocket(loadDefault?: boolean) {
        if (loadDefault) {
            this.config = this.defaultConfig
        }

        // Only create a socket if we don't have one
        if (!this.socket) {
            this.socket = dgram.createSocket('udp4')

            // Add a default listener callback
            this.registerCallback({name: 'listening', fn: this.listeningCallback.bind(this)})
        }

        return this.socket
    }

    setSocket(socket: dgram.Socket) {
        this.socket = socket
    }

    getSocket() {
        return this.socket
    }

    setConfig(config: SocketConfig) {
        this.config = config
    }

    getConfig() {
        return this.config
    }

    registerCallback(cb: SocketCallback) {
        this.socket.on(cb.name, cb.fn)
    }

    registerCallbacks(...cbs: SocketCallback[]) {
        cbs.forEach((cb) => {
            this.registerCallback(cb)
        })
    }

    // A method to bind the socket to a specific port. Use this after registering the callbacks
    bindToPort(port?: number) {
        if (this.socket) {
            if (port) {
                this.socket.bind(port)
            } else {
                this.socket.bind(this.config.MULTICAST_PORT)
            }
        }
    }

    // A default callback method to be used as a socket listen callback
    listeningCallback() {
        let address = this.socket.address()
        console.log('UDP Client listening on ' + address.address + ':' + address.port)
        this.socket.setBroadcast(true)
        this.socket.setMulticastTTL(128)
        this.socket.addMembership(this.config.HOST)
    }
}
