import { Component, Input,Output,EventEmitter,OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-jobblock',
  standalone:true,
  imports:[CommonModule,RouterLink],
  templateUrl: './jobblock.component.html',
  styleUrls: ['./jobblock.component.css']
})
export class JobblockComponent {
  constructor(private router:Router){}
  //عملت متغير مؤقتا عشان اشوف شكل الكارد للجوب اونر و للارتيزن
  role="jobowner";
  //عشان استقبل الداتا من الكارد ليست
  @Input() job: any;
  //لما اليوزر او الجوب اونر يكبس على الايكونز الموجودة عالكارد عشان توصل للكارد ليست
  @Output() deleteRequest = new EventEmitter<void>();
  @Output() editRequest = new EventEmitter<void>(); // أضف حدث التعديل

  //للفايل(بدي اشتغل عليه مرة ثانية)
  extractFileName(url: string): string {
    return url.split('/').pop() || 'Attachment';
  }

  //ارسل الايفنت اللي صار للكارد ليست
  onEditClick()
  {
  this.editRequest.emit();  
  }

  onDeleteClick() 
  {
    this.deleteRequest.emit();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['job']) {
      // سيتم تحديث البيانات المعروضة على الكارد عندما تتغير
      this.job = changes['job'].currentValue;
    }
  }
  
  //شكل الكارد للجوباونر
  jobowner()
  {
    this.role='jobowner';
  }
  //شكل الكارد للارتيزن
  artisan()
  {
    this.role='artisan';
  }

  toreview(){
    this.router.navigate(['/reviewbids']);
  }
  toupdate(){
    this.router.navigate(['/updatejob']);
  }
}
