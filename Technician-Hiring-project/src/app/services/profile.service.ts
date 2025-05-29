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



}
