import { Network } from '@capacitor/network';
import { BehaviorSubject } from 'rxjs';

class NetworkService {
  private networkStatus: BehaviorSubject<boolean>; // Make this a private property

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

const networkService = new NetworkService();
export default networkService;
