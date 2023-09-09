import { Component, OnInit } from '@angular/core';
import { UserHandlerService } from 'src/app/services/user-handler.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public userHandlerService: UserHandlerService) { }

  ngOnInit(): void {
  }
}
