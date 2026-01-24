import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}


  private getAuth(): HttpHeaders {
    const token = localStorage.getItem('token') || '';

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'accept': 'application/json'
    });
  }

  getAllUsers(search: string = ''): Observable<any[]> {
    const params = search ? new HttpParams().set('search', search) : undefined;
    return this.http.get<any[]>(`${this.apiUrl}/admin/allUsers`, {
      headers: this.getAuth(),
      params });
  }
  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/admin/users/${id}`, {
      headers: this.getAuth(),
    });
  }

  updateUser(userId: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/updateUsers/${userId}`, data, {
      headers: this.getAuth(),
    });
  }


  getPendingTechnicians(search: string = ''): Observable<any> {
    const params = search ? new HttpParams().set('search', search) : undefined;
    return this.http.get<any>(`${this.apiUrl}/admin/pendingTechnician`, {
      headers: this.getAuth(),
      params
    });
  }

  acceptTechnician(user_id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/acceptTechnician/${user_id}`, {}, {
      headers: this.getAuth(),
    });
  }

  rejectTechnician(user_id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/rejectTechnician/${user_id}`, {
      headers: this.getAuth(),
    });
  }

  getAllJobPosts(search: string = ''): Observable<{ success: boolean, data: any[] }> {
    const params = search ? new HttpParams().set('search', search) : undefined;
    return this.http.get<{ success: boolean, data: any[] }>(`${this.apiUrl}/admin/getAllJobPosts`, {
      headers: this.getAuth(),
      params
    });
  }


  deleteJobPost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/deleteJobPost/${id}`, {
      headers: this.getAuth()
    });
  }

  
//sara
  getNotifications(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/admin/notifications`, {
    headers: this.getAuth(),
  });
}
markNotificationAsRead(notificationId: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/admin/notifications/${notificationId}/read`, {}, {
      headers: this.getAuth(),
    });
}
}
