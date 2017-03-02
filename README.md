# Angular2 Message Service
[![Build Status](https://travis-ci.org/Ventrom/Ventrom/ng2-message-service.svg?branch=master)](https://travis-ci.org/Ventrom/Ventrom/ng2-message-service)
[![npm version](https://badge.fury.io/js/ng2-message-service.svg)](http://badge.fury.io/js/ng2-message-service)
[![devDependency Status](https://david-dm.org/Ventrom/Ventrom/ng2-message-service/dev-status.svg)](https://david-dm.org/Ventrom/Ventrom/ng2-message-service#info=devDependencies)
[![GitHub issues](https://img.shields.io/github/issues/Ventrom/Ventrom/ng2-message-service.svg)](https://github.com/Ventrom/Ventrom/ng2-message-service/issues)
[![GitHub stars](https://img.shields.io/github/stars/Ventrom/Ventrom/ng2-message-service.svg)](https://github.com/Ventrom/Ventrom/ng2-message-service/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/Ventrom/Ventrom/ng2-message-service/master/LICENSE)

## Demo
https://Ventrom.github.io/Ventrom/ng2-message-service/demo/

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Documentation](#documentation)
- [Development](#development)
- [License](#licence)

## About

An Electron project to exchange messages in a local network environment using udp.

## Installation

Install through npm:
```
npm install --save ng2-message-service
```

To use the services module, first import it in your app:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServicesModule } from 'ng2-message-service';

@NgModule({
    imports: [
        BrowserModule,
        ServicesModule
    ],
    declarations: [],
    bootstrap:    [ AppComponent ]
})
export class AppModule {}
```

Then you can call individual services inside a component, for example:

```typescript
import { Component, OnInit } from '@angular/core';
import { ChatService, MessageService, Group, Sender } from '@zaknarfen/ng2-message-service'
import { Subscription } from 'rxjs'

export class DashboardComponent implements OnInit {
    sender: Sender
    group: Group
    messageSub: Subscription
    groupSub: Subscription

    constructor(
        private chatService: ChatService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        let self = this

        this.sender = this.chatService.createMessageSender()
        this.messageSub = this.messageService.messageConfirmed$.subscribe(message => {
            // Do something with the message. The message can be added to an array of
            // string and displayed on a textarea to represent a chat, for instance
        })

        this.groupSub = this.chatService.groupConfirmed$.subscribe(group => {
            // Do something with the group. The group can be saved on a variable and used
            // to represent joining or leaving a chat room, for instance
        })
    }

    // An example method to send a text message assuming the sender has a group already and
    // that the value (text) is always the same. A common way to use this would be to get
    // the value from an input text and bind this method to a button click
    sendMessage(target?: string, all?: boolean) {
        // If this component was using only the message service, the send message could be called directly
        this.messageService.sendMessage({
            type: 'info',
            // This value could be used from an input text element in your template
            value: 'Hello world!',
            sender: this.sender._id,
            // Send to the current group by default if not specified
            target: (target) ? target : this.group._id,
            // Mark all as receivers by default if not specified
            all: (all) ? all : true
        })
    }

    joinGroup() {
        this.chatService.joinGroup('A GROUP NAME')
    }

    leaveGroup() {
        this.chatService.leaveGroup()
    }
}
```

## Documentation
All documentation is auto-generated from the source via typedoc and can be viewed here:
https://Ventrom.github.io/Ventrom/ng2-message-service/docs/

## Development

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM (should come with)
* Install local dev dependencies: `npm install` while current directory is this repo

## License

MIT
