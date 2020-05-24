import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss','../../../assets/css/common.css']
})
export class SettingComponent implements OnInit {
  editForm:FormGroup;
  isInvalidUser: boolean;
  editErrormsg: string;
  object: {};
  submitted: boolean;
  formdata: FormData;
  files: any;
  urls: any;
  userId: any;
  profilePic: any;
  selectedUserImage: any;
  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private spinner: NgxSpinnerService,
    private activeRoute: ActivatedRoute
    ) {
   
  }

  ngOnInit(): void {
    
  this.initEditProfileForm();
  this.initLocalStorage();
  $(document).ready(function(){
    this.readURL = function(input) {}
 });
  }

   // init localstorage data
   initLocalStorage(){
    this.userId = JSON.parse(localStorage.getItem('userData')).id;
    this.profilePic = JSON.parse(localStorage.getItem('userData')).profile_pic;
    console.log(this.profilePic)
  }

  // set initialvalue of formcontrol
  setData(){
    debugger;
    this.editForm.controls.full_name.setValue(JSON.parse(localStorage.getItem('userData')).email.split("@")[0]);
    this.editForm.controls.password.setValue(JSON.parse(localStorage.getItem('userData')).password)
    this.editForm.controls.email.setValue(JSON.parse(localStorage.getItem('userData')).email)
    this.editForm.controls.phone.setValue(JSON.parse(localStorage.getItem('userData')).phone)
    console.log(this.editForm,"dasmflm")
  }

  initEditProfileForm(){
    this.editForm = new FormGroup({
      full_name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.email]),
      phone: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });
    this.setData();
    console.log(this.editForm,"==================")
  }


     // Validation function

     get f() { return this.editForm.controls; }
 


     onSubmitEditForm(){
       this.submitted = true;
       // stop here if form is invalid
       if (this.editForm.invalid) {
           return;
       }
       $("#success_modal").modal('show');
       this.object={
         'profilePic':this.selectedUserImage?this.selectedUserImage:this.profilePic,
         'full_name':this.editForm.controls.full_name.value,
         'phone':this.editForm.controls.phone.value,
         'email':this.editForm.controls.email.value,
         'password':this.editForm.controls.password.value,
       }
       localStorage.setItem('userData',JSON.stringify(this.object))

     }


   // on image select
   onUpload(event) {
      this.files = event.target.files;
      // this.formdata = new FormData();
      this.selectedUserImage = event.target.files[0];
      // this.formdata.append('file', event.target.files[0]);
  }

  onBack(){
    this.router.navigate(['/dashboard']);
  }

  onModalClosed(){
    this.router.navigate(['/dashboard']);
  }

 
}
