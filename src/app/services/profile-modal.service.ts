import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileModalService {
  private modalOpenSource = new BehaviorSubject<boolean>(false);
  private modalOUTSIDEsource =  new BehaviorSubject<number | null>(null)
  modalOpen$ = this.modalOpenSource.asObservable();
  modalOUTSIDE$ = this.modalOUTSIDEsource.asObservable();

  private editModalOpenSource = new BehaviorSubject<boolean>(false);
  editModalOpen$ = this.editModalOpenSource.asObservable();

  openModal() {
    this.modalOpenSource.next(true);
  }

  openOUTModal(userId: number) {
    this.modalOUTSIDEsource.next(userId); 
 }

  closeModal() {
    this.modalOpenSource.next(false);
  }
  closeOUTModal() {
    this.modalOUTSIDEsource.next(null);
  }

  openEditModal() {
    this.editModalOpenSource.next(true);
  }

  closeEditModal() {
    this.editModalOpenSource.next(false);
  }
}
