import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MessagingService {

  constructor(private http: HttpClient) {}

  storeMessage(data: any){
    return this.http.post(`http://127.0.0.1:8000/api/messages/store`, data);
  }

  getConversation(senderId: any, receiverId: any) {
    return this.http.get(`http://127.0.0.1:8000/api/messages/get-conversation/${senderId}/${receiverId}`);
  }

  getUserConversations(userId: any) {
   return this.http.get<any>(`http://127.0.0.1:8000/api/messages/get-user-conversations/${userId}`);
  }

}
