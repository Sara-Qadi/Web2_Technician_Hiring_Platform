import { Component,Input } from '@angular/core';
import { Proposal } from '../../../models/proposal.model';
import { SubmissionService } from '../../../services/submission.service';
import { ProposalService } from '../../../services/proposal.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bidcard',
  imports: [],
  templateUrl: './bidcard.component.html',
  styleUrl: './bidcard.component.css'
})
export class BidcardComponent {
  constructor(private subservice:SubmissionService,private proposalservice:ProposalService,private route:ActivatedRoute){}
  @Input() bid!: Proposal;
  jobid!:number;
  
  acceptProposal(id: number) {
  this.subservice.acceptproposal(id).subscribe({
    next: () => alert('تم قبول العرض بنجاح ✅'),
    error: err => console.error('خطأ أثناء قبول العرض:', err)
  });
  }
  rejectProposal(id: number) {
  this.subservice.rejectproposal(id).subscribe({
    next: (response) => {
      alert('تم رفض العرض ❌');

      // إذا status_agreed = false، نحذفه باستخدام دالة الحذف
      if (!response.status_agreed) {
        this.proposalservice.deleteproposal(id).subscribe({
          next: () => {
//مدري
          },
          error: err => console.error('خطأ أثناء حذف العرض:', err)
        });
      }
    },
    error: err => console.error('خطأ أثناء رفض العرض:', err)
  });
}



}
