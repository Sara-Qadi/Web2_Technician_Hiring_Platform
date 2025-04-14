import { Component,inject,Output,EventEmitter,Input,OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JobDataService } from '../../../services/jobdata.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addjob',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './addjob.component.html',
  standalone: true,
  styleUrl: './addjob.component.css'
})
export class AddjobComponent {
  constructor(private router:Router){}
 //بخلي الجوب اونر يدخل الداتا عشان اخزنها بالسيرفس باراي و بستخدمها بالكاردز

  //لو فيه وظيفة بدنا نعدل عليها، بنستقبلها هون 
  @Input() job: any;
  //اذا الجوباونر عدل على الداتا تاعت الكارد بروح اعلمه
  @Output() jobUpdated = new EventEmitter<any>(); 
  //عشان ابني فورم 
  private fb = inject(FormBuilder);
  private dataService = inject(JobDataService);
  //بروبرتي للفورم او الانبوتس المزجودة بالفورم عندي و بعطيهم قيمة ابتدائية مع شروط
  addJobForm = new FormGroup({
    jobTitle: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    minBudget: new FormControl(0, Validators.required),
    maxBudget: new FormControl(100, Validators.required),
    location: new FormControl('', Validators.required),
    jobDescription: new FormControl('', [Validators.required, Validators.minLength(20)]),
    deadline: new FormControl(this.getDefaultDeadline(), Validators.required),
    attachments: new FormControl(<string[]>[])//لازم ارجعلها
  })
  //انيشيال فاليو للديد لاين
  private getDefaultDeadline(): string {
    const deadlineDate = new Date();
    return deadlineDate.toISOString().split('T')[0];//الانيشيال فاليو بتكون تاريخ اليوم
  }
  //لما الجوباونر كبس على ايكون الابديت او القلم بفتح الفورم و بحمل الداتا تاعت الكارد اللي كبس عليها
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['job'] && this.job) 
      {
        this.addJobForm.patchValue(this.job); 
      }
  }

  //
  onSubmit() 
  {
    //اذا الفورم فيه اخطاء زي نسى يعبي خانة او اللي دله ما بوافق الشرط بتظهرله جمل لونها احمر بتحكيله شو السبب
    if (this.addJobForm.invalid) 
      {
        this.addJobForm.markAllAsTouched();
        return;
      }
      //جبنا متغير و خزنا فيه كل الداتا اللي جاية من الفورم
      const newJob = this.addJobForm.value;
      //اذا كان في جوب يعني بدنا بعمل ابديت و اذا لا معناه بدنا نضيف 
      if (this.job) 
        {
          // إذا كانت هناك وظيفة للتعديل
          this.dataService.updateJob(this.job, newJob);
          this.jobUpdated.emit(newJob); // تمرير البيانات المعدلة للكارد
        } else 
        {
          // إذا كانت وظيفة جديدة
          this.dataService.addJob(newJob);
        }

    this.addJobForm.reset();
  }
  //اذا كبس على الكانسل الموجودة بالفورم رح يكنسل على الداتا المعدلة او فينا نحكي رح يعمل ريسيت للفورم ولا كانه صار سي
  cancelEdit() 
  {
    this.addJobForm.reset(); // إلغاء التعديل
  }

  //بدي ارجعلها
  onFileChange(event: any) 
  {
    const files = event.target.files;
    const fileUrls: string[] = [];
    for (let i = 0; i < files.length; i++) 
      {
        const file = files[i];
        const fileUrl = URL.createObjectURL(file); // Creates a temporary local URL
        fileUrls.push(fileUrl);
     }
  
    this.addJobForm.patchValue({ attachments: fileUrls });
  }
  tojobowner():void{
    this.router.navigate(['/jobowner']);
  }
}
