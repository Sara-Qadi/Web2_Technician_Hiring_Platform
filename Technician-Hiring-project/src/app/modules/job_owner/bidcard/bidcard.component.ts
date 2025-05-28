import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-bidcard',
  imports: [],
  templateUrl: './bidcard.component.html',
  styleUrl: './bidcard.component.css'
})
export class BidcardComponent {
  @Input() bid: any;
}
