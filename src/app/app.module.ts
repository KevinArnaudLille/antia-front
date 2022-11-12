import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RxStompService } from '@stomp/ng2-stompjs';
import { WebsocketanimationService } from './services/websocketanimation.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path:'', component: HomeComponent}
    ])
  ],
  providers: [
    RxStompService,
    WebsocketanimationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
