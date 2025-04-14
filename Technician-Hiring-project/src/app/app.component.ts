import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SearchComponent } from './modules/technician/search/search.component';  
import { SubmitBidesComponent } from './modules/technician/submit-bides/submit.bides.component';
@Component({
  selector: 'app-root',
  imports: [ CommonModule , SearchComponent , SubmitBidesComponent , RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Technician-Hiring-project';
}
