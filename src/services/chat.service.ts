import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'
import { MessageService } from './message.service'
import { SocketService } from './socket.service'
import { Group, Sender, Message } from './chat.interface'

@Injectable()
export class ChatService {
    private groupSource: Subject<Group> = new Subject<Group>()
    groupConfirmed$: Observable<Group> = this.groupSource.asObservable()
    group: Group
    groups: Group[] = []
    sender: Sender

    constructor(
        private messageService: MessageService,
        private socketService: SocketService
    ) {
        // Creates a socket using the default config
        this.socketService.createSocket(true)
        this.socketService.registerCallback({name: 'message', fn: this.messageCallback.bind(this)})

        // Call this without a parameter for the default port
        this.socketService.bindToPort()
    }

    messageCallback (message: string, remote: any) {
        let response = JSON.parse(message)
        console.log('Received message from: ' + remote.address + ':' + remote.port +' - ' + response)

        // When we receive the message, process the message according to the type
        switch(response.type) {
            // A sender is joining a group
            case 'join':
                console.log(this.groups)
                let jgroup: Group = this.groups.find((g) => { return g._id === response.target })

                // Test if we already have this group
                if (!jgroup) {
                    jgroup = {
                        _id: response.target,
                        senders: [response.sender]
                    }
                    this.groups.push(jgroup)
                } else {
                    // Add a member only if this group doesn't have it already
                    if (!jgroup.senders.find((u) => { return u._id === response.sender })) {
                        jgroup.senders.push(response.sender)
                    }
                }

                console.log('The group to join')
                console.log(jgroup)

                if (jgroup) {
                    // If the sender joining a group is me, change the current group
                    if (this.sender._id === response.sender) {
                        // If we are without a group at the moment
                        if (!this.group) {
                            this.group = jgroup
                            this.notify(jgroup)
                        } else {
                            // Only update if the group has changed
                            if (this.group._id !== response.target) {
                                this.group = jgroup
                                this.notify(jgroup)
                            }
                        }
                    // If the sender is not me i need to check if we are in the same group
                    } else {
                        // If we are in the same group
                        if (this.group._id === response.target) {
                            // The new sender doesn't know about members already in this group so notify the other
                            // groups about me as a member already being in this group
                            this.messageService.sendMessage({
                                type: 'update',
                                sender: this.sender._id,
                                target: response.target
                            })
                        }
                    }
                }
                break
            // In case we need to update the members with missing ones due to the order they join a group. This
            // is needed when a second member join an existing group and doesn't know about the first member who
            // joined
            case 'update':
                let ugroup: Group = this.groups.find((g) => { return g._id === response.target })

                if (ugroup) {
                    if (this.sender._id !== response.sender) {
                        // If we are in the same group
                        if (this.group._id === response.target) {
                            if (!ugroup.senders.find((u) => { return u._id === response.sender })) {
                                ugroup.senders.push(response.sender)
                            }
                        }
                    }
                }
                break
            // A member is sending a text message to the group
            case 'info':
                // If the message is for everyone in this group
                if (response.all) {
                    // If the person receiving is in the same group as the sender
                    if (this.group && this.group._id === response.target) {
                        this.messageService.notify(response)
                    }
                // If the message was meant for someone specific
                } else {
                    // If the message was sent directly to me
                    if (this.sender._id === response.target) {
                        //TODO
                        this.messageService.notify(response)
                    }
                }
                break
            case 'leave':
                console.log('Leaving group: ')
                console.log(response.target)
                let groupi: number = this.groups.findIndex((g) => { return g._id === response.target })
                console.log('Leaving group with index: ')
                console.log(groupi)

                // If we have a group to leave
                if (groupi !== -1) {
                    // Remove the member from the current group
                    this.groups[groupi].senders = this.groups[groupi].senders.filter((u) => { return u !== response.sender })

                    // If the group is now empty
                    if (!this.groups[groupi].senders.length) {
                        this.groups.splice(groupi, 1)
                    }

                    // Update the member without a group now
                    if (response.sender === this.sender._id) {
                        this.group = null
                        this.notify(null)
                    }
                }

                break
            default:
                alert('Invalid message type!')
        }
    }

    // Notify the subscriptions about the group change
    notify(group: Group) {
        this.groupSource.next(group)
    }

    // A method to join a group based on a name, the group id is the name passed in
    joinGroup(name: string) {
        let joinm: Message = {
            type: 'join',
            sender: this.sender._id,
            target: name
        }
        console.log(joinm)
        this.messageService.broadcastMessage(JSON.stringify(joinm))
    }

    // THe member leaves the current groups
    leaveGroup() {
        if (this.group && this.group._id) {
            let leavem: Message = {
                type: 'leave',
                sender: this.sender._id,
                target: this.group._id
            }
            this.messageService.broadcastMessage(JSON.stringify(leavem))
        }
    }

    getObservable() {
        return this.groupConfirmed$
    }

    createMessageSender() {
        return this.sender = {
            _id: this.guid()
        }
    }

    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                      .toString(16)
                      .substring(1)
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
    }
}

