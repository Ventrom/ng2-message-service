import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ServicesModule} from '../src';
import {Demo} from './demo.component';

@NgModule({
  declarations: [Demo],
  imports: [BrowserModule, ServicesModule],
  bootstrap: [Demo],
  providers: []
})
export class DemoModule {}