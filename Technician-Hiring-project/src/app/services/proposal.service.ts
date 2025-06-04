import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proposal } from '../models/proposal.model';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  constructor(private http: HttpClient) { }

  addProposal(proposal : any) {
    return this.http.post('http://127.0.0.1:8000/api/proposal/addproposal', proposal);
  }
  showjobproposals(id:number):Observable<Proposal[]>{
    return this.http.get<Proposal[]>(`http://localhost/BackEnd-Technician-Hiring-Platform/public/api/proposals/jobpost/${id}`);
  }
  countjobproposals(id:number):Observable<number>{
    return this.http.get<number>(`http://localhost/BackEnd-Technician-Hiring-Platform/public/api/proposals/jobpost/count/${id}`);
  }
  deleteproposal(id:number):Observable<any>{
    return this.http.delete(`http://localhost/BackEnd-Technician-Hiring-Platform/public/api/proposal/deleteproposal/${id}`);
  }
  getProposalById(id: number): Observable<Proposal> {
  return this.http.get<Proposal>(`/api/proposals/${id}`);
}



}
