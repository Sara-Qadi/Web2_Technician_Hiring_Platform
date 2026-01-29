import { Component, Input } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent {
  @Input() type: 'success' | 'danger' | 'warning' = 'success';
  @Input() message: string = '';
  visible = false;

  constructor(private toastService: ToastService) {
    this.toastService.toast$.subscribe(data => {
      this.message = data.message;
      this.type = data.type;
      this.visible = true;

      setTimeout(() => this.visible = false, data.duration);
    });
  }

  hide() {
    this.visible = false;
  }

  // هذه الدالة تعطي الكلاس المناسب مباشرة
  getToastClass(): string {
    switch (this.type) {
      case 'success':
        return 'bg-success';
      case 'danger':
        return 'bg-danger';
      case 'warning':
        return 'bg-warning';
      default:
        return 'bg-success';
    }
  }
}
