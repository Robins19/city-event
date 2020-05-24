import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
// import { CustomMessageService } from '../../service/custom-message.service';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss','../../../assets/css/common.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  forgotForm:FormGroup;
  submitted: boolean;
  object:{};
  isInvalidUser: boolean;
  loginErrormsg: string;
  isVisibleBack: boolean;
  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    // private apiService:ApiService,
    private spinner: NgxSpinnerService,
    // private customMessage: CustomMessageService
    ) {
   
  }

  ngOnInit(): void {
    this.spinner.hide();
    this.initLoginForm();

  }

  initLoginForm(){
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required])
    });
    console.log(this.loginForm,"==================")
  }



    // Validation function

    get f() { return this.loginForm.controls; }
    
  
 


    onSubmitLoginForm(){
      this.submitted = true;
      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }
      this.spinner.show();
     this.object={
       "email":this.loginForm.controls.email.value,
       "password":this.loginForm.controls.password.value
     }
     this.router.navigate(['/dashboard']);
     localStorage.setItem('userData',JSON.stringify(this.object))
    }


}
