import { Network } from '@capacitor/network'; // Ensure correct import
import { BehaviorSubject } from 'rxjs';

export class NetworkService {
  private networkStatus: BehaviorSubject<boolean>;

  constructor() {
    this.networkStatus = new BehaviorSubject<boolean>(true); // Initial status
    this.initializeNetworkEvents();
  }

  private async initializeNetworkEvents() {
    try {
      const status = await Network.getStatus(); // Await the status
      this.networkStatus.next(status.connected);

      Network.addListener('networkStatusChange', (status) => {
        this.networkStatus.next(status.connected);
      });
    } catch (error) {
      console.error('Error getting network status:', error);
    }
  }

  public getNetworkStatus() {
    return this.networkStatus.asObservable();
  }
}

// Export an instance of NetworkService
const networkService = new NetworkService();
export default networkService;
