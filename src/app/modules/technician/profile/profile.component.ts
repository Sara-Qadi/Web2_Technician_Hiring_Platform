import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CommonModule } from '@angular/common';
import { ProfileModalService } from '../../../services/profile-modal.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,RouterModule ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit, OnDestroy {
  showProfileModal = false;
  private sub!: Subscription;

  constructor(private modalService: ProfileModalService) {}

  ngOnInit() {
    this.sub = this.modalService.modalOpen$.subscribe(isOpen => {
      this.showProfileModal = isOpen;
    });
  }
  openEditProfileModal() {
    this.modalService.closeModal();        // optional: close current modal
    this.modalService.openEditModal();     // open the edit modal
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  closeProfileModal() {
    this.modalService.closeModal();
  }
}
