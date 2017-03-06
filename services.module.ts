import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from './src/chat.service';
import { MessageService } from './src/message.service';
import { SocketService } from './src/socket.service';

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