import { Component, OnInit } from '@angular/core';
import { environment } from "@environments/environment";


@Component({
  selector: 'app-clean-header',
  templateUrl: './clean-header.component.html',
  styleUrls: ['./clean-header.component.scss']
})
export class CleanHeaderComponent implements OnInit {

  logo = environment.logoLetraBranca;


  constructor() { }

  ngOnInit(): void {
  }

}
