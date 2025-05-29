export class Jobpost{
  jobpost_id!: number;
  title: string='';
  category: string='';
  location: string='';
  minimum_budget: number=0;
  maximum_budget: number=0;
  description: string='';
  //attachments: null|File[]= [];
  deadline: string= '';
  status: string = 'pending'; // أو 'accepted' أو 'rejected'
  user_id: number=0;
  user_name: string= '';
}