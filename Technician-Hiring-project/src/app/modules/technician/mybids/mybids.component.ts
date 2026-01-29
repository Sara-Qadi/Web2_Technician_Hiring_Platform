import { Component, OnInit } from '@angular/core';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../../admin/admin/footer-admin/footer-admin.component';
import { ProposalService } from '../../../services/proposal.service';
import { ProfileService } from '../../../services/profile.service';
import { CommonModule } from '@angular/common';
import { JobsummaryComponent } from '../../job_owner/jobsummary/jobsummary.component';
import { catchError, finalize, of, switchMap } from 'rxjs';
@Component({
  selector: 'app-mybids',
  standalone: true,
  imports: [NavbarAdminComponent, FooterAdminComponent, CommonModule, JobsummaryComponent],
  templateUrl: './mybids.component.html',
  styleUrl: './mybids.component.css'
})
export class MybidsComponent implements OnInit {
  constructor(
    private proposalService: ProposalService,
    private profileService: ProfileService
  ) {}

  technicianID: number | null = null;
  proposals: any[] | null = null;
  selectedTab: 'all' | 'pending' | 'accepted' | 'rejected' = 'all';

  loading = false;

  ngOnInit(): void {
    this.loading = true;

    this.profileService.getUser().pipe(
      catchError((err) => {
        console.log(err);
        return of(null);
      }),
      switchMap((res: any) => {
        if (!res?.user_id) {
          return of([]);
        }

        this.technicianID = res.user_id;

        return this.proposalService.getAllProposalsForTech(this.technicianID).pipe(
          catchError((err) => {
            console.log(err);
            return of([]);
          })
        );
      }),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe((res: any[]) => {
      this.proposals = res;
      console.log('koko', res);
    });
  }

  get rejectedBids() {
  return this.proposals?.filter(b => b.status_agreed === 'rejected');
}

get pendingBids() {
  return this.proposals?.filter(b => b.status_agreed === 'pending');
}

get acceptedBids() {
  return this.proposals?.filter(b => b.status_agreed === 'accepted');
}

}
