import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://127.0.0.1:8011/api';

  constructor(private http: HttpClient) {}

  getAllUsers(search: string = ''): Observable<any[]> {
    const params = search ? new HttpParams().set('search', search) : undefined;
    return this.http.get<any[]>(`${this.apiUrl}/admin/allUsers`, { params });
  }
  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/admin/users/${id}`);
  }

  updateUser(userId: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/updateUsers/${userId}`, data);
  }


  getPendingTechnicians(search: string = ''): Observable<any> {
    const params = search ? { params: { search } } : {};
    return this.http.get<any>(`${this.apiUrl}/admin/pendingTechnician`, params);
  }

  acceptTechnician(user_id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/acceptTechnician/${user_id}`, {});
  }

  rejectTechnician(user_id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/rejectTechnician/${user_id}`);
  }

  getAllJobPosts(search: string = ''): Observable<{ success: boolean, data: any[] }> {
    const params = search ? { params: { search } } : {};
    return this.http.get<{ success: boolean, data: any[] }>(`${this.apiUrl}/admin/getAllJobPosts`, params);
  }


  deleteJobPost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/deleteJobPost/${id}`);
  }

}
