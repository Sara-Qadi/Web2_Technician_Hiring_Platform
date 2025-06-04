import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proposal } from '../models/proposal.model';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  constructor(private http:HttpClient) {}

  acceptproposal(id:number):Observable<Proposal>{
    return this.http.put<Proposal>(`http://localhost/BackEnd-Technician-Hiring-Platform/public/api/submission/accept/${id}`,{})
  }
  rejectproposal(id:number):Observable<Proposal>{
    return this.http.put<Proposal>(`http://localhost/BackEnd-Technician-Hiring-Platform/public/api/submission/reject/${id}`,{})
  }

  /*rejectproposal(id:number):Observable<Proposal>{
    return this.http.put<Proposal>();
  }*/
}
