import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Notification {
  notification_id: number;
  user_id: number;
  type: string;
  message: string;
  read_status: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = 'http://localhost:8000/api/notifications';

  constructor(private http: HttpClient) {}

getNotifications(userId: number): Observable<Notification[]> {
  return this.http.get<Notification[]>(`http://localhost:8000/api/notifications/${userId}`);
}


  sendNotification(notification: Partial<Notification>): Observable<Notification> {
    return this.http.post<Notification>(`${this.baseUrl}`, notification);
  }

  markAsRead(notificationId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/mark-as-read/${notificationId}`, {});
  }

  deleteNotification(notificationId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${notificationId}`);
  }
  getUnreadNotifications(userId: number): Observable<Notification[]> {
  return this.http.get<Notification[]>(`${this.baseUrl}/${userId}/unread`);
}

}
