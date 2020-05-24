import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-expired-job',
  templateUrl: './expired-job.component.html',
  styleUrls: ['./expired-job.component.scss','../../../assets/css/common.css']
})
export class ExpiredJobComponent implements OnInit {
  allJobListData: any;
  isJobFound: boolean;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {

 
  }

  ngOnInit(): void {
    this.initLocalStorage();
  }

   // init localstorage data

   initLocalStorage(){
    this.allJobListData=JSON.parse(localStorage.getItem('expiredJobs'));
    if(this.allJobListData>0){
      this.isJobFound=true;
    }
    this.spinner.hide();

  }

}
