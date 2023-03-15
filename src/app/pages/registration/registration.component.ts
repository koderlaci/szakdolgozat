import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserHandlerService } from 'src/app/services/user-handler.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm = new FormGroup({
    name: new FormControl(''),
    neptun: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private userHandlerService: UserHandlerService) { }

  ngOnInit(): void {
    this.registrationForm.valueChanges.subscribe(form => console.log(form));
  }

  registrate() {
    this.userHandlerService.registrate(this.registrationForm.getRawValue()).subscribe(res => {
      console.log(res);
    })
  }

}
