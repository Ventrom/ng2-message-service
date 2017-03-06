import { Injectable } from '@angular/core'
import { SocketConfig, SocketCallback } from './message.interface'
import { Socket } from 'dgram'
import { Observable } from 'rxjs/observable'

var dgram = require('dgram')
var udpFinder = require('udp-finder')

@Injectable()
export class SocketService {
    private socket: any
    private defaultConfig: SocketConfig = {
        HOST: '239.255.22.79',
        PORT: 8000,
        MULTICAST_PORTS: [5554],
        broadcast: true,
        multicastTTL: 128
    }
    private config: SocketConfig
    debug: boolean = false

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

    setSocket(socket: any) {
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
                let self = this
                // Start using the default port for this socket, then search for the first free
                // port that we can use
                udpFinder.getPort(this.config.MULTICAST_PORTS[0], function(err, port){
                    // The first available port is 'port'
                    if (port !== self.config.MULTICAST_PORTS[0])
                    // Keeps the port used in the binding as the first number in the array
                    self.config.MULTICAST_PORTS.unshift(port)
                    self.socket.bind({port: port, address: '0.0.0.0', exclusive: false})
                })
            }
        }
    }

    // A default callback method to be used as a socket listen callback
    listeningCallback() {
        let address = this.socket.address()
        if (this.debug) console.log('UDP Client listening on ' + address.address + ':' + address.port)
        this.socket.setBroadcast(true)
        this.socket.setMulticastTTL(128)
        this.socket.addMembership(this.config.HOST)
    }
}
