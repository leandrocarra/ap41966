import { Component, Input, OnInit } from '@angular/core';
import { CardDestaques } from 'app/core/models/pagina-inicial/pagina-inicial';

@Component({
  selector: 'app-card-destaques',
  templateUrl: './card-destaques.component.html',
  styleUrls: ['./card-destaques.component.scss']
})
export class CardDestaquesComponent implements OnInit {  
  @Input() card!: CardDestaques;
  constructor() { 
   

  }
  ngOnInit(): void {
  }

}
