import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges,inject } from '@angular/core';
import { Router } from '@angular/router';
import { JobDataService } from '../../../services/jobdata.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-cardblock',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cardblock.component.html',
  styleUrls: ['./cardblock.component.css']
})
export class CardblockComponent {
  role = "artisan";
  constructor(private router:Router){}
  private dataService = inject(JobDataService);
  @Input() job: any;
  @Output() deleteRequest = new EventEmitter<void>();
  @Output() editRequest = new EventEmitter<void>();
  @Output() statusChange = new EventEmitter<string>();

  selectedStatus: string = '';
  statuses: string[] = ['in-progress', 'completed', 'cancelled' , 'pending'];

  extractFileName(url: string): string {
    return url.split('/').pop() || 'Attachment';
  }

  onEditClick() {
    this.editRequest.emit();
  }

  onDeleteClick() {
    this.deleteRequest.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['job']) {
      this.job = changes['job'].currentValue;
    }
  }

  jobowner() {
    this.role = 'jobowner';
  }

  artisan() {
    this.role = 'artisan';
  }
  goToDetails() {
  this.router.navigate(['/jobdetails', this.job.jobpost_id]);
}

  openStatusModal(job: any) {
    this.selectedStatus = job.status;
    const modal = new bootstrap.Modal(document.getElementById('statusModal'));
    modal.show();
  }

  updateStatus() {
    this.statusChange.emit(this.selectedStatus);
    const modal = bootstrap.Modal.getInstance(document.getElementById('statusModal'));
    modal.hide();
  }
}
