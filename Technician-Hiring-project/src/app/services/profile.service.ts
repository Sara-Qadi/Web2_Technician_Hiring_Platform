import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:8000/api/profile';
    private selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

getUser(): Observable<any> {
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

 return this.http.get<{ id: number; name: string; email: string; role_id: number }>(
    this.apiUrl,
    { headers }
  );
}
  getProfile(): Observable<any> {

    return this.http.get('http://localhost:8000/api/profile');
  }

 createProfile(data: any, profilePictureFile: File | null): Observable<any> {
  const formData = new FormData();
  if (data.specialty) formData.append('specialty', data.specialty);
  if (data.description) formData.append('description', data.description);
  if (this.selectedFile) formData.append('cv', this.selectedFile, this.selectedFile.name);
  if (profilePictureFile) formData.append('photo', profilePictureFile, profilePictureFile.name);

  return this.http.post(this.apiUrl, formData);
}


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
  getSelectedFile(): File | null {
  return this.selectedFile;
}


getUserById(userId: number) {
  const token = localStorage.getItem('token') || '';
  return this.http.get<any>(`http://localhost:8000/api/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}


updateProfile(data: any, photoFile?: File | null, cvFile?: File | null): Observable<any> {
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  const formData = new FormData();
  if (data.name) formData.append('name', data.name);
  if (data.specialty) formData.append('specialty', data.specialty);
  if (data.description) formData.append('description', data.description);
  if (cvFile) formData.append('cv', cvFile, cvFile.name);
  if (photoFile) formData.append('photo', photoFile, photoFile.name);

  return this.http.post('http://localhost:8000/api/profile/update', formData, { headers });
}



updateJO(id: number, data: any): Observable<any> {
  return this.http.put(`http://localhost/BackEnd-Technician-Hiring-Platform/public/api/updatejo/${id}`, data);
}
getroleid(user_id:number): Observable<number> {
  return this.http.get<number>(`http://localhost:8000/api/user/role/${user_id}`);
}
getAverageRating(userId: number): Observable<any> {
  return this.http.get<any>(`http://127.0.0.1:8000/api/users/${userId}/average-rating`);
}

getProfileByUserId(userId: number): Observable<any> {
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });
  return this.http.get(`http://localhost:8000/api/profile/${userId}`, { headers });
}


}
