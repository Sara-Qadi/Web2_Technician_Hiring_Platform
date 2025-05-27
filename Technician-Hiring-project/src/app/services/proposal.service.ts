import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  constructor(private http: HttpClient) { }

  addProposal(proposal : any) {
    return this.http.post('http://127.0.0.1:8000/api/proposal/addproposal', proposal);
  }

}
