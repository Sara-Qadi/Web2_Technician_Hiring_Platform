export class Jobpost{
  jobpost_id!: number;
  title: string='';
  category: string='';
  location: string='';
  minimum_budget: number=0;
  maximum_budget: number=0;
  description: string='';
  attachments: string[] | undefined;
  deadline: string= '';
  status: string = 'pending'; 
  user_id: number=0;
  user_name: string= '';
}