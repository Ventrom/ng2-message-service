import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelloWorld } from './helloWorld.component';
import { ChatService } from './services/chat.service';
import { MessageService } from './services/message.service';
import { SocketService } from './services/socket.service';

@NgModule({
  declarations: [
    HelloWorld
  ],
  imports: [CommonModule],
  providers: [
      ChatService,
      MessageService,
      SocketService,
  ],
  exports: [HelloWorld]
})
export class ServicesModule {}