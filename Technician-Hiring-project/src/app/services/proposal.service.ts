import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proposal } from '../models/proposal.model';

import { Jobpost } from '../models/jobpost.model';


@Injectable({
  providedIn: 'root'
})
export class ProposalService {
  constructor(private http: HttpClient) { }

  addProposal(proposal :any , id:number) {
    return this.http.post(`http://localhost:8000/api/proposal/addproposal/${id}`, proposal);

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
  countProposalsforJO(id: number): Observable<number> {
    return this.http.get<number>(`http://localhost/BackEnd-Technician-Hiring-Platform/public/api/proposals/jobpost/countforjo/${id}`);
  }
  getProposalsforJO(id:number): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(`http://localhost/BackEnd-Technician-Hiring-Platform/public/api/proposals/jobpost/proposalsforjo/${id}`);
  }
  countJobswithProposals(id:number): Observable<number> {
    return this.http.get<number>(`http://localhost/BackEnd-Technician-Hiring-Platform/public/api/proposals/countjobpostwithprop/${id}`);
  }
  getJobswithProposals(id:number): Observable<Jobpost[]> {
    return this.http.get<Jobpost[]>(`http://localhost/BackEnd-Technician-Hiring-Platform/public/api/proposals/jobpostwithprop/${id}`);
  }
  getPendingProposalsfirJO(id: number): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(`http://localhost/BackEnd-Technician-Hiring-Platform/public/api/proposals/jobpost/pending/${id}`);
  }
  getAcceptedProposalsfirJO(id: number): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(`http://localhost/BackEnd-Technician-Hiring-Platform/public/api/proposals/jobpost/accepted/${id}`);
  }

  checkIfUserValidateToSubmitBids(user_id: any, jobpostid: any){
    return this.http.get(`http://127.0.0.1:8000/api/proposals/checkIfUserValidateToSubmitBids/${user_id}/${jobpostid}`);
  }

  getTechNameById(id: any){
    return this.http.get(`http://127.0.0.1:8000/api/proposals/getTechNameById/${id}`);
  }

  getAllProposalsForTech(id: any){
    return this.http.get<any[]>(`http://127.0.0.1:8000/api/proposals/getAllProposalsForTech/${id}`);
  }
  
}






