import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileModalService {
  private modalOpenSource = new BehaviorSubject<boolean>(false);
  modalOpen$ = this.modalOpenSource.asObservable();

  private editModalOpenSource = new BehaviorSubject<boolean>(false);
  editModalOpen$ = this.editModalOpenSource.asObservable();

  openModal() {
    this.modalOpenSource.next(true);
  }

  closeModal() {
    this.modalOpenSource.next(false);
  }

  openEditModal() {
    this.editModalOpenSource.next(true);
  }

  closeEditModal() {
    this.editModalOpenSource.next(false);
  }
}
