import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
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
