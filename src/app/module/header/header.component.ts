import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss','../../../assets/css/common.css']
})
export class HeaderComponent implements OnInit {
  isVisibleSidebar: boolean;
  profilePic:any;
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {

 
  }

  ngOnInit(): void {
  }
  open() {
    this.isVisibleSidebar=true;
    document.getElementById("sidebar1").style.width = "250px";
  }
  close() {
    this.isVisibleSidebar = false;
    document.getElementById("sidebar1").style.width = "0";
  }
  openNav() {
    document.getElementById("filtersidebar").style.width = "320px";
  }
  
  logOut(){
    this.spinner.show();
    localStorage.removeItem('userData')
    localStorage.removeItem('userToken')
    localStorage.removeItem("selectedJobId")
    this.router.navigate(['']);
  }

  onClickSettings(){
    this.router.navigate(['/settings']);
  }
  onClickExpired(){
    this.router.navigate(['/expired-job']);
  }

}
