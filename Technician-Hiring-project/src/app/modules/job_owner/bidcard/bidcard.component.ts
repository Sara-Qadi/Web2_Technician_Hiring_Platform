import { Component, Input } from '@angular/core';
import { Proposal } from '../../../models/proposal.model';
import { SubmissionService } from '../../../services/submission.service';
import { ProposalService } from '../../../services/proposal.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bidcard',
  templateUrl: './bidcard.component.html',
  imports: [CommonModule],
  styleUrls: ['./bidcard.component.css']
})
export class BidcardComponent {
  @Input() bid!: Proposal;
  jobid!: number;

  constructor(
    private subservice: SubmissionService,
    private proposalService: ProposalService,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  acceptProposal(id: number): void {
    this.subservice.acceptproposal(id).subscribe({
      next: () => {
        alert('تم قبول العرض بنجاح ✅');

        this.proposalService.getProposalById(id).subscribe({
          next: (proposal) => {
            const notification = {
              user_id: proposal.tech_id,
              type: 'proposal-response',
              message: 'Your offer has been accepted by job owner',
              read_status: 'unread'
            };

            this.notificationService.sendNotification(notification).subscribe({
              next: () => console.log('🔔 Notification sent for acceptance'),
              error: (err) => console.error('❌ Failed to send notification:', err)
            });
          },
          error: (err) => console.error('❌ Failed to fetch proposal:', err)
        });
      },
      error: (err) => console.error('خطأ أثناء قبول العرض:', err)
    });
  }

  rejectProposal(id: number): void {
    this.subservice.rejectproposal(id).subscribe({
      next: (response) => {
        alert('تم رفض العرض ❌');

        this.proposalService.getProposalById(id).subscribe({
          next: (proposal) => {
            const notification = {
              user_id: proposal.tech_id,
              type: 'proposal-response',
              message: 'Your offer has been rejected by job owner',
              read_status: 'unread'
            };

            this.notificationService.sendNotification(notification).subscribe({
              next: () => console.log('🔔 Notification sent for rejection'),
              error: (err) => console.error('❌ Failed to send notification:', err)
            });
          },
          error: (err) => console.error('❌ Failed to fetch proposal:', err)
        });

        if (!response.status_agreed) {
          this.proposalService.deleteproposal(id).subscribe({
            next: () => console.log('✅ Proposal deleted after rejection'),
            error: (err) => console.error('خطأ أثناء حذف العرض:', err)
          });
        }
      },
      error: (err) => console.error('خطأ أثناء رفض العرض:', err)
    });
  }
}
