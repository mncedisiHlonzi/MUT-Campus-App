import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private apiUrl = 'http://172.16.21.22:3000';

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any[]>(`${this.apiUrl}/notifications`, { headers });
  }

  markAsRead(notificationId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(`${this.apiUrl}/notifications/${notificationId}/read`, {}, { headers });
  }

  getUnreadCount(): Observable<{ count: number }> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<{ count: number }>(`${this.apiUrl}/notifications/unread-count`, { headers });
  }
}
