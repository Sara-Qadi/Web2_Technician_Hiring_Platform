import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proposal } from '../models/proposal.model';
import { Jobpost } from '../models/jobpost.model';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  addProposal(proposal: any, id: number) {
    return this.http.post(`${this.baseUrl}/proposal/addproposal/${id}`, proposal);
  }

  showjobproposals(id: number): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(`${this.baseUrl}/proposals/jobpost/${id}`);
  }

  countjobproposals(id: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/proposals/jobpost/count/${id}`);
  }

  deleteproposal(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/proposal/deleteproposal/${id}`);
  }

  getProposalById(id: number): Observable<Proposal> {
    return this.http.get<Proposal>(`${this.baseUrl}/proposals/${id}`);
  }

  countProposalsforJO(id: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/proposals/jobpost/countforjo/${id}`);
  }

  getProposalsforJO(id: number): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(`${this.baseUrl}/proposals/jobpost/proposalsforjo/${id}`);
  }

  countJobswithProposals(id: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/proposals/countjobpostwithprop/${id}`);
  }

  getJobswithProposals(id: number): Observable<Jobpost[]> {
    return this.http.get<Jobpost[]>(`${this.baseUrl}/proposals/jobpostwithprop/${id}`);
  }

  getPendingProposalsfirJO(id: number): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(`${this.baseUrl}/proposals/jobpost/pending/${id}`);
  }

  getAcceptedProposalsfirJO(id: number): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(`${this.baseUrl}/proposals/jobpost/accepted/${id}`);
  }

  checkIfUserValidateToSubmitBids(user_id: any, jobpostid: any) {
    return this.http.get(`${this.baseUrl}/proposals/checkIfUserValidateToSubmitBids/${user_id}/${jobpostid}`);
  }

  getTechNameById(id: any) {
    return this.http.get(`${this.baseUrl}/proposals/getTechNameById/${id}`);
  }

  getAllProposalsForTech(id: any) {
    return this.http.get<any[]>(`${this.baseUrl}/proposals/getAllProposalsForTech/${id}`);
  }
}
