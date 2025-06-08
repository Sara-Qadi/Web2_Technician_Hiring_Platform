import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.token); //  تخزين التوكن
        })
      );
  }

  register(data: any) {
    return this.http.post<any>('http://localhost:8000/api/register', data).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token); // تخزين التوكن
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }
}
