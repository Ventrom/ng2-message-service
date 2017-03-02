import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from './services/chat.service';
import { MessageService } from './services/message.service';
import { SocketService } from './services/socket.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
      ChatService,
      MessageService,
      SocketService,
  ],
  exports: []
})
export class ServicesModule {}