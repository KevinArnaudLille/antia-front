import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Population } from '../animation/models/population/Population';

@Injectable({
  providedIn: 'root'
})
export class WebsocketanimationService {
  private stompClient: any;
  public mapEndpointSubscription: Map<string, any> = new Map();

  private frames : any[];

  private callback = (message: any) => {
    console.log(JSON.parse(message.body).frames);
    console.log(Object.keys(JSON.parse(message.body).frames).length);
    this.frames = JSON.parse(message.body).frames;
  };

  public async subscribe(name: string) {
    const subscription = this.stompClient.subscribe(`/${name}`, this.callback);
    this.mapEndpointSubscription.set(name, subscription);
  }

  public async initWebSocket() {
    return new Promise<void>((resolve) => {

      if (!this.stompClient) {
        const ws = new SockJS('http://localhost:8081/websocket');
        this.stompClient = Stomp.over(ws);
        this.stompClient.connect({}, resolve);
      } else {
        resolve();
      }
    });
  }

  public send(name: string, population: Population) {
    this.stompClient.send(`/app/${name}`, {}, JSON.stringify(population));
  }

  public getFrames(): any[]{
    return this.frames;
  }
}
