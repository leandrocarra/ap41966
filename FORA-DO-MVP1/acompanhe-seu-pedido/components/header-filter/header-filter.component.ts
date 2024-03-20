import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'app/core/services/user/user.service';

@Component({
  selector: 'app-header-filter',
  templateUrl: './header-filter.component.html',
  styleUrls: ['./header-filter.component.scss']
})
export class HeaderFilterComponent implements OnInit {

  constructor(
    public user: UserService
  ) { }
  
  
  @Input() labelTitle: any;
  @Input() itens: any;
  @Input() pageSize: any;
  @Input() tipoFiltro: any;

  @Output() eventOutput = new EventEmitter<any[]>();
  @Output() eventClear = new EventEmitter();
  @Output() eventSelectAll = new EventEmitter();

  ngOnInit(): void {
  }

  eventFilter(event: any) {
    this.eventOutput.emit(event);
  }

  eventClearTO(event: any) {
    this.eventClear.emit(event);
  }

}
