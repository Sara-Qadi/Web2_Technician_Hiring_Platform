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
   private baseUrl = 'http://localhost/BackEnd-Technician-Hiring-Platform/public/notifications/{userId}';
  //private baseUrl = 'http://localhost:3000';


  constructor(private http: HttpClient) {}

  getNotifications(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/notifications/${userId}`);
  }
//   getNotifications(): Observable<Notification[]> {
//   return this.http.get<Notification[]>(`${this.baseUrl}/notifications`);
// }


  markAsRead(notificationId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/notifications/mark-as-read/${notificationId}`, {});
  }

  deleteNotification(notificationId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/notifications/${notificationId}`);
  }
}
