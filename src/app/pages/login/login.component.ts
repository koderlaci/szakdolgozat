import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserHandlerService } from 'src/app/services/user-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })


  constructor(private userHandlerService: UserHandlerService) { }

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe(form => console.log(form));
    // this.getAllUsers();
  }

  login() {
    this.userHandlerService.login(this.loginForm.getRawValue()).subscribe(res => {
      console.log(res);
    })
  }

  /*getAllUsers() {
    this.userHandlerService.getAllUsers().subscribe(res => {
      console.log("Response: ");
      console.log(res);
    });
  }*/

}
