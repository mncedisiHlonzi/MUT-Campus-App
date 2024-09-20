import { Network } from '@capacitor/network';
import { BehaviorSubject } from 'rxjs';

class NetworkService {
  constructor() {
    this.networkStatus = new BehaviorSubject(true); // true means online
    this.initializeNetworkEvents();
  }

  async initializeNetworkEvents() {
    const status = await Network.getStatus();
    this.networkStatus.next(status.connected);

    Network.addListener('networkStatusChange', (status) => {
      this.networkStatus.next(status.connected);
    });
  }

  getNetworkStatus() {
    return this.networkStatus.asObservable();
  }
}

export default new NetworkService();
