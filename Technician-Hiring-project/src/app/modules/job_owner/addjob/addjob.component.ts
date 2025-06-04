/*import { Component,inject,Output,EventEmitter,Input,OnChanges, SimpleChanges,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JobDataService } from '../../../services/jobdata.service';
import { Router } from '@angular/router';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../../admin/admin/footer-admin/footer-admin.component';
import { Jobpost } from '../../../models/jobpost.model';
@Component({
  selector: 'app-addjob',
  imports: [ReactiveFormsModule,CommonModule,NavbarAdminComponent, FooterAdminComponent],
  templateUrl: './addjob.component.html',
  standalone: true,
  styleUrl: './addjob.component.css'
})
export class AddjobComponent {
  constructor(private jobpostservice: JobDataService, private router: Router) {}

 //بخلي الجوب اونر يدخل الداتا عشان اخزنها بالسيرفس باراي و بستخدمها بالكاردز

  //لو فيه وظيفة بدنا نعدل عليها، بنستقبلها هون
  @Input() job: any;
  //اذا الجوباونر عدل على الداتا تاعت الكارد بروح اعلمه
  @Output() jobUpdated = new EventEmitter<any>();
  //عشان ابني فورم
  //private fb = inject(FormBuilder);
  private dataService = inject(JobDataService);
  //بروبرتي للفورم او الانبوتس المزجودة بالفورم عندي و بعطيهم قيمة ابتدائية مع شروط
  addJobForm = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    minimum_budget: new FormControl(0, Validators.required),
    maximum_budget: new FormControl(100, Validators.required),
    location: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required, Validators.minLength(50)]),
    deadline: new FormControl(this.getDefaultDeadline(), Validators.required),
    attachments: new FormControl<File[]>([])//لازم ارجعلها
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
  onSubmit() {
  if (this.addJobForm.invalid) {
    this.addJobForm.markAllAsTouched();
    console.log(this.addJobForm.value);
    return;
  }

  const formData = new FormData();

  // إضافة الحقول النصية
  formData.append('title', this.addJobForm.get('title')?.value || '');
  formData.append('category', this.addJobForm.get('category')?.value || '');
  formData.append('minimum_budget', this.addJobForm.get('minimum_budget')?.value?.toString() || '0');
  formData.append('maximum_budget', this.addJobForm.get('maximum_budget')?.value?.toString() || '0');
  formData.append('location', this.addJobForm.get('location')?.value || '');
  formData.append('description', this.addJobForm.get('description')?.value || '');
  formData.append('deadline', this.addJobForm.get('deadline')?.value || '');
  formData.append('user_id', '1'); // عدّلي القيمة حسب تسجيل الدخول أو متغير مخزن

  // إضافة الملفات
  const files = this.addJobForm.get('attachments')?.value as File[];
  if (files && files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      formData.append('attachments[]', files[i]);
    }
  }

  this.jobpostservice.addjobpost(formData).subscribe({
    next: () => {
      console.log("Data added successfully");
      console.log('Job saved:', formData);
      this.addJobForm.reset();
    },
    error: (err) => {
      console.error('Error:', err);
      if (err.status === 422) {
        alert("هناك أخطاء في البيانات المُدخلة. يرجى مراجعتها.");
      }
    }
  });
}

  //اذا كبس على الكانسل الموجودة بالفورم رح يكنسل على الداتا المعدلة او فينا نحكي رح يعمل ريسيت للفورم ولا كانه صار سي
  cancelEdit()
  {
    this.addJobForm.reset(); // إلغاء التعديل
  }

  //بدي ارجعلها
  onFileChange(event: any) {
  const files: File[] = Array.from(event.target.files);
  this.addJobForm.patchValue({ attachments: files });
}
  tojobowner():void{
    this.router.navigate(['/jobowner']);
  }
}
*/
/*import { Component, inject, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JobDataService } from '../../../services/jobdata.service';
import { Router } from '@angular/router';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../../admin/admin/footer-admin/footer-admin.component';
import { Jobpost } from '../../../models/jobpost.model';

@Component({
  selector: 'app-addjob',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarAdminComponent, FooterAdminComponent],
  templateUrl: './addjob.component.html',
  styleUrl: './addjob.component.css'
})
export class AddjobComponent implements OnChanges {
  //bodydata:Jobpost;
  //bodydata:Jobpost = new Jobpost();
  constructor(private jobpostservice: JobDataService, private router: Router) {}

  @Input() job: any;
  @Output() jobUpdated = new EventEmitter<any>();

  //private dataService = inject(JobDataService);

  addJobForm = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    minimum_budget: new FormControl(0, [Validators.required, Validators.min(1)]),
    maximum_budget: new FormControl(100, [Validators.required, Validators.min(1)]),
    location: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required, Validators.minLength(50)]),
    deadline: new FormControl(this.getDefaultDeadline(), Validators.required),
    attachments: new FormControl<File[]>([])
  });

  private getDefaultDeadline(): string {
    const deadlineDate = new Date();
    return deadlineDate.toISOString().split('T')[0];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['job'] && this.job) {
      this.addJobForm.patchValue(this.job);
    }
  }

  /*onSubmit(){
    bodydata=new FormData();
    this.bodydata.title=this.addJobForm.get('title')?.value;
    this.bodydata.category=this.addJobForm.get('category')?.value;
    this.bodydata.minimum_budget=this.addJobForm.get('minimum_budget')?.value?.toString();
    this.bodydata.maximum_budget=this.addJobForm.get('maximum_budget')?.value?.toString();
    this.bodydata.location=this.addJobForm.get('location')?.value;
    this.bodydata.description=this.addJobForm.get('description')?.value;
    this.bodydata.deadline=this.addJobForm.get('deadline')?.value;
    const files = this.addJobForm.get('attachments')?.value as File[];

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.bodydata.append('attachments[]', files[i]); // أو 'attachments' حسب Laravel
      }
    }

    this.jobpostservice.addjobpost(this.bodydata).subscribe((resultdata:any)=>
    {
      console.log(resultdata);
      alert("jobpost added successfully");
      this.router.navigate(['/jobowner']);
    })
  }*

  updatepost(){

  }
  /*onSubmit() {
    if (this.addJobForm.invalid) {
      this.addJobForm.markAllAsTouched();
      console.log("Form Invalid:", this.addJobForm.value);
      return;
    }

    const formData = new FormData();
    formData.append('title', this.addJobForm.get('title')?.value || '');
    formData.append('category', this.addJobForm.get('category')?.value || '');
    formData.append('minimum_budget', this.addJobForm.get('minimum_budget')?.value?.toString() || '0');
    formData.append('maximum_budget', this.addJobForm.get('maximum_budget')?.value?.toString() || '0');
    formData.append('location', this.addJobForm.get('location')?.value || '');
    formData.append('description', this.addJobForm.get('description')?.value || '');
    formData.append('deadline', this.addJobForm.get('deadline')?.value || '');
    formData.append('user_id', '1'); // غيّريها بحسب المستخدم الحالي

    const files = this.addJobForm.get('attachments')?.value as File[];
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append('attachments[]', files[i]); // أو 'attachments' حسب Laravel
      }
    }

    this.jobpostservice.addjobpost(formData).subscribe({
      next: () => {
        console.log("Job posted successfully");
        this.addJobForm.reset();
        alert("تمت إضافة الوظيفة بنجاح");
        this.router.navigate(['/jobowner']);
      },
      error: (err) => {
        console.error('Error:', err);
        if (err.status === 422 && err.error?.errors) {
          const validationErrors = err.error.errors;
          let errorMsg = "يرجى تصحيح الأخطاء التالية:\n";
          for (const field in validationErrors) {
            errorMsg += `- ${validationErrors[field].join(', ')}\n`;
          }
          alert(errorMsg);
        } else {
          alert("حدث خطأ أثناء إرسال البيانات. يرجى المحاولة لاحقًا.");
        }
      }
    });
  }*
 onSubmit() {
  if (this.addJobForm.invalid) {
    this.addJobForm.markAllAsTouched();
    return;
  }

  const formData = new FormData();
  formData.append('title', this.addJobForm.get('title')?.value || '');
  formData.append('category', this.addJobForm.get('category')?.value || '');
  formData.append('minimum_budget', this.addJobForm.get('minimum_budget')?.value?.toString() || '0');
  formData.append('maximum_budget', this.addJobForm.get('maximum_budget')?.value?.toString() || '0');
  formData.append('location', this.addJobForm.get('location')?.value || '');
  formData.append('description', this.addJobForm.get('description')?.value || '');
  formData.append('deadline', this.addJobForm.get('deadline')?.value || '');
  formData.append('user_id', '1'); // غيّري حسب النظام

  const files = this.addJobForm.get('attachments')?.value as File[];
  if (files && files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      formData.append('attachments[]', files[i]);
    }
  }

  if (this.job && this.job.jobpost_id) {
    // تعديل
    this.jobpostservice.updatethisjobpost(this.job.jobpost_id, formData).subscribe({
      next: () => {
        alert("تم تعديل الوظيفة بنجاح");
        this.jobUpdated.emit(); // لإعلام الأب بحدوث تعديل
        this.router.navigate(['/jobowner']);
      },
      error: (err) => {
        console.error('Error updating job:', err);
        alert("حدث خطأ أثناء التعديل.");
      }
    });
  } else {
    // إضافة
    this.jobpostservice.addjobpost(formData).subscribe({
      next: () => {
        alert("تمت إضافة الوظيفة بنجاح");
        this.addJobForm.reset();
        this.router.navigate(['/jobowner']);
      },
      error: (err) => {
        console.error('Error adding job:', err);
        alert("حدث خطأ أثناء الإضافة.");
      }
    });
  }
}


  onFileChange(event: any) {
    const files: File[] = Array.from(event.target.files);
    this.addJobForm.patchValue({ attachments: files });
  }

  cancelEdit() {
    this.addJobForm.reset();
  }

  tojobowner(): void {
    this.router.navigate(['/jobowner']);
  }
}
*/
/*
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { JobDataService } from '../../../services/jobdata.service';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../../admin/admin/footer-admin/footer-admin.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addjob',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarAdminComponent, FooterAdminComponent],
  templateUrl: './addjob.component.html',
  styleUrl: './addjob.component.css'
})
export class AddjobComponent implements OnChanges {
  constructor(private jobpostservice: JobDataService, private router: Router,private actrouter:ActivatedRoute) {}

  @Input() job: any;
  @Output() jobUpdated = new EventEmitter<any>();

  addJobForm = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    minimum_budget: new FormControl(0, [Validators.required, Validators.min(1)]),
    maximum_budget: new FormControl(100, [Validators.required, Validators.min(1)]),
    location: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required, Validators.minLength(50)]),
    deadline: new FormControl(this.getDefaultDeadline(), Validators.required),
    attachments: new FormControl<File[]>([])
  });

  private getDefaultDeadline(): string {
    const deadlineDate = new Date();
    return deadlineDate.toISOString().split('T')[0];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['job'] && this.job) {
      this.addJobForm.patchValue(this.job);
    }
  }
 ngOnInit() {
  const id = history.state.id; // تأكدي أن `id` تم تمريره من الصفحة السابقة
  if (id) {
    this.jobpostservice.getthisjobpost(id).subscribe({
      next: (jobData) => {
        this.addJobForm.patchValue(jobData); // تعبئة النموذج
      },
      error: (err) => {
        console.error('Error loading job:', err);
      }
    });
  }
}
  loadJobData(id: number) {
    this.jobpostservice.getthisjobpost(id).subscribe({
      next: (data) => {
        this.job = data;
        this.addJobForm.patchValue(data); // تعبئة الفورم
      },
      error: (err) => {
        console.error('Error loading job:', err);
      }
    });
  }
getJobData(id: number) {
  this.jobpostservice.getthisjobpost(id).subscribe(
    (jobData) => {
      this.job = jobData;
      this.addJobForm.patchValue({
        title: jobData.title,
        category: jobData.category,
        minimum_budget: jobData.minimum_budget,
        maximum_budget: jobData.maximum_budget,
        location: jobData.location,
        description: jobData.description,
        deadline: jobData.deadline,
        // ملاحظة: الـ attachments لا يتم تعبئتها بهذه الطريقة لأنها ملفات
      });
    },
    (error) => {
      console.error('Error loading job', error);
    }
  );
}


  updateJob() {
    const formData = new FormData();
    const formValue = this.addJobForm.value;

    // تعبئة FormData من النموذج
    formData.append('title', formValue.title ?? '');
    formData.append('category', formValue.category ?? '');
    formData.append('minimum_budget', formValue.minimum_budget?.toString() ?? '');
    formData.append('maximum_budget', formValue.maximum_budget?.toString() ?? '');
    formData.append('location', formValue.location ?? '');
    formData.append('description', formValue.description ?? '');
    formData.append('deadline', formValue.deadline ?? '');

    // معالجة الملفات (إن وجدت)
    if (formValue.attachments && formValue.attachments.length > 0) {
      formValue.attachments.forEach((file: File) => {
        formData.append('attachments', file);
      });
    }

    // إرسال البيانات
    this.jobpostservice.updatethisjobpost(this.job.jobpost_id, formData).subscribe(() => {
      alert('تم التحديث بنجاح');
    });
  }
  onSubmit() {
  if (this.addJobForm.invalid) {
    this.addJobForm.markAllAsTouched();
    return;
  }

  const formData = new FormData();
  formData.append('title', this.addJobForm.get('title')?.value || '');
  formData.append('category', this.addJobForm.get('category')?.value || '');
  formData.append('minimum_budget', this.addJobForm.get('minimum_budget')?.value?.toString() || '0');
  formData.append('maximum_budget', this.addJobForm.get('maximum_budget')?.value?.toString() || '0');
  formData.append('location', this.addJobForm.get('location')?.value || '');
  formData.append('description', this.addJobForm.get('description')?.value || '');
  formData.append('deadline', this.addJobForm.get('deadline')?.value || '');
  formData.append('user_id', '1');

  const files = this.addJobForm.get('attachments')?.value as File[];
  if (files && files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      formData.append('attachments[]', files[i]);
    }
  }

  if (this.job?.jobpost_id) {
    // تعديل
    this.jobpostservice.updatethisjobpost(this.job.jobpost_id, formData).subscribe({
      next: () => {
        console.log("تم التحديث بنجاح");
        this.router.navigate(['/jobowner']); // أو أي صفحة ترجعين لها
      },
      error: err => console.error(err)
    });
  } else {
    // إضافة جديدة
    this.jobpostservice.addjobpost(formData).subscribe({
      next: () => {
        console.log("تمت الإضافة بنجاح");
        this.router.navigate(['/jobowner']);
      },
      error: err => console.error(err)
    });
  }
}

  onFileChange(event: any) {
    const files: File[] = Array.from(event.target.files);
    this.addJobForm.patchValue({ attachments: files });
  }

  cancelEdit() {
    this.addJobForm.reset();
    this.router.navigate(['/jobowner']);
  }

  tojobowner(): void {
    this.router.navigate(['/jobowner']);
  }
  selectedFile: File | null = null;

onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];
    console.log('Selected file:', this.selectedFile);
  }
}
}*/
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { JobDataService } from '../../../services/jobdata.service';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from '../../admin/admin/footer-admin/footer-admin.component';

@Component({
  selector: 'app-addjob',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarAdminComponent, FooterAdminComponent],
  templateUrl: './addjob.component.html',
  styleUrl: './addjob.component.css'
})
export class AddjobComponent implements OnInit {
  jobId?: number;
  userId: number = 0;

  addJobForm = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    minimum_budget: new FormControl(0, [Validators.required, Validators.min(1)]),
    maximum_budget: new FormControl(100, [Validators.required, Validators.min(1)]),
    location: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required, Validators.minLength(50)]),
    deadline: new FormControl(this.getDefaultDeadline(), Validators.required),
    //attachments: new FormControl<File[]>([])
  });

  constructor(
    private router: Router,
    private jobService: JobDataService,
    private route: ActivatedRoute
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.userId = state?.['userId'] || 0;
    const jobData = state?.['data'];
    if (jobData) {
      this.jobId = jobData.jobpost_id;
      this.addJobForm.patchValue({
        title: jobData.title,
        category: jobData.category,
        minimum_budget: jobData.minimum_budget,
        maximum_budget: jobData.maximum_budget,
        location: jobData.location,
        description: jobData.description,
        deadline: jobData.deadline
      });
    }
  }

  ngOnInit(): void {
    if (this.jobId) {
      this.jobService.getthisjobpost(this.jobId).subscribe({
        next: (job) => {
          this.addJobForm.patchValue({
            title: job.title,
            category: job.category,
            minimum_budget: job.minimum_budget,
            maximum_budget: job.maximum_budget,
            location: job.location,
            description: job.description,
            deadline: job.deadline
          });
        },
        error: () => alert('❌ فشل تحميل بيانات الوظيفة')
      });
    }
  }

  onSubmit() {
    if (this.addJobForm.invalid) {
      this.addJobForm.markAllAsTouched();
      return;
    }

    const formData = this.buildFormData();

    if (this.jobId) {
      this.jobService.updatethisjobpost(this.jobId, formData).subscribe({
        next: () => {
          alert("✅ تم تعديل الوظيفة بنجاح");
          this.router.navigate(['/jobowner', this.userId]);
        },
        error: (err) => {
          console.error(err);
          alert("❌ فشل تعديل الوظيفة");
        }
      });
    } else {
      this.jobService.addjobpost(formData).subscribe({
        next: () => {
          alert("✅ تمت إضافة الوظيفة بنجاح");
          this.router.navigate(['/jobowner', this.userId]);
        },
        error: (err) => {
          console.error(err);
          alert("❌ فشل إضافة الوظيفة");
        }
      });
    }
  }

  buildFormData(): FormData {
    const formData = new FormData();
    const form = this.addJobForm.value;

    formData.append('title', form.title ?? '');
    formData.append('category', form.category ?? '');
    formData.append('minimum_budget', String(form.minimum_budget ?? 0));
    formData.append('maximum_budget', String(form.maximum_budget ?? 0));
    formData.append('location', form.location ?? '');
    formData.append('description', form.description ?? '');
    formData.append('deadline', form.deadline ?? '');
    formData.append('user_id', String(this.userId));

    /*const files = form.attachments || [];
    for (let i = 0; i < files.length; i++) {
      formData.append(`attachments[${i}]`, files[i]);
    }*/

    return formData;
  }

  /*onFileChange(event: any) {
    const files: File[] = Array.from(event.target.files);
    this.addJobForm.patchValue({ attachments: files });
  }*/

  cancelEdit() {
    this.router.navigate(['/jobowner', this.userId]);
  }

  private getDefaultDeadline(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
}



/*import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobDataService } from '../../../services/jobdata.service';
import { FooterAdminComponent } from '../../admin/admin/footer-admin/footer-admin.component';
import { NavbarAdminComponent } from '../../admin/admin/navbar-admin/navbar-admin.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-addjob',
  imports: [ReactiveFormsModule,CommonModule,NavbarAdminComponent, FooterAdminComponent],
  templateUrl: './addjob.component.html',
  standalone: true,
  styleUrl: './addjob.component.css'
})
export class AddjobComponent implements OnInit {
  addJobForm!: FormGroup;
  jobId: number | null = null;
  job: any = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobdataservice: JobDataService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.jobId = idParam ? +idParam : null;

    this.addJobForm = new FormGroup({
      title: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      minimum_budget: new FormControl(0, [Validators.required, Validators.min(1)]),
      maximum_budget: new FormControl(100, [Validators.required, Validators.min(1)]),
      location: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required, Validators.minLength(50)]),
      deadline: new FormControl(this.getDefaultDeadline(), Validators.required),
      attachments: new FormControl<File | null>(null),
      user_id: new FormControl('', Validators.required),
    });

    if (this.jobId) {
      this.jobdataservice.getthisjobpost(this.jobId).subscribe({
        next: (data) => {
          this.job = data;
          this.addJobForm.patchValue(data);
        },
        error: () => alert('Job not found'),
      });
    }
  }

  getDefaultDeadline(): string {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().substring(0, 10);
  }

  onFileChange(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      this.addJobForm.patchValue({ attachments: file });
    }
  }

  onSubmit(): void {
    if (this.addJobForm.invalid) return;

    const formData = new FormData();
    const values = this.addJobForm.value;

    for (const key in values) {
      if (key === 'attachments' && values.attachments instanceof File) {
        formData.append(key, values.attachments);
      } else {
        formData.append(key, values[key]);
      }
    }

    if (this.jobId) {
      this.jobdataservice.updatethisjobpost(this.jobId, formData).subscribe({
        next: () => {
          alert('Job updated successfully');
          this.router.navigate(['/jobs']);
        },
        error: () => alert('Error updating job'),
      });
    } else {
      this.jobdataservice.addjobpost(formData).subscribe({
        next: () => {
          alert('Job added successfully');
          this.router.navigate(['/jobs']);
        },
        error: () => alert('Error adding job'),
      });
    }
  }
  cancelEdit() {
    this.addJobForm.reset();
  }
}

*/
