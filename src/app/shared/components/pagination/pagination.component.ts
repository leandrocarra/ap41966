import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { configureMenuByWindowSize } from 'app/appLN/core/services/utils/neo-utils.service';
import { UserService } from 'app/core/services/user/user.service';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PaginationComponent implements OnInit {

    @Input() ativarDados!: any[];
    @Input() pageSize!: number;
    @Input() collections!: any[];
    @Input() grupo: any;

    @Output() eventPagination = new EventEmitter<any[]>();
    pageIndex: number = 1;
    mobile!: boolean;

    constructor(
        public user: UserService
    ) {
    }

  ngOnInit(): void {
    this.mobile = configureMenuByWindowSize(window.screen.width);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.mobile = configureMenuByWindowSize(event.target.innerWidth);
  }

    numberPagination(collections: any) {
        this.collections = collections;
    }

    onPageChanged(event: any) {
        window.scrollTo(0, 0);
        let firstCut;
        let secondCut;

        firstCut = (event - 1) * this.pageSize;
        secondCut = firstCut + this.pageSize;

        this.ativarDados = this.collections.slice(firstCut, secondCut);
        this.eventPagination.emit(this.ativarDados);
    }

}
