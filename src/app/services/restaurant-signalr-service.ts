import { inject, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { StoreService } from './store-service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class RestaurantSignalRService {
  private hubConnection!: signalR.HubConnection;
  private storeService = inject(StoreService);
  public cookNotifications$ = new Subject<any>();
  public waiterNotifications$ = new Subject<any>();
  private envs = environment;
  private url = `${this.envs.baseURL}/notificationHub`;

  public startConnection(): Promise<void> {
    if (this.hubConnection?.state === signalR.HubConnectionState.Connected) {
      return Promise.resolve();
    }
    const token = this.storeService.getToken();
    const user = this.storeService.decoded();

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.url}`)
      .withAutomaticReconnect()
      .build();

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.url, {
        accessTokenFactory: () => token,
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
      .build();

    return this.hubConnection.start()
      .then(() => {
        this.setupListeners();
        return this.joinAppropriateGroup();
      })
      .catch(err => {
        console.error('SignalR connection error:', err);
        throw err;
      });
  }

  private joinAppropriateGroup(): Promise<void> {
    const role = this.storeService.decoded()?.role;
    if (role === 'cook') {
      return this.hubConnection.invoke('JoinCookGroup');
    } else if (role === 'waiter') {
      return this.hubConnection.invoke('JoinWaiterGroup');
    }
    return Promise.resolve();
  }

  private setupListeners(): void {
    this.hubConnection.on('NewOrder', (data) => {
      this.cookNotifications$.next(data);
    });

    this.hubConnection.on('OrderReady', (data) => {
      this.waiterNotifications$.next(data);
    });

    this.hubConnection.on('JoinedGroup', (groupName: string) => {
      console.log(`Successfully joined group: ${groupName}`);
    });

    this.hubConnection.onreconnecting(() => {
      console.log('SignalR reconectando...');
    });

    this.hubConnection.onreconnected(() => {
      console.log('SignalR reconectado');
      this.joinAppropriateGroup().catch(console.error);
    });
  }


    public stopConnection(): Promise<void> {
    if (this.hubConnection) {
      return this.hubConnection.stop();
    }
    return Promise.resolve();
  }

}
