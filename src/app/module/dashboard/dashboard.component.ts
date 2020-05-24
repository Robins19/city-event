import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss','../../../assets/css/common.css']
})
export class DashboardComponent implements OnInit {

  lat: number;
  lng: number;
  val1:number;
  val2:number;
  isVisibleSidebar: boolean;
  allCategoryJobList: any;
  isInvalidJob: boolean;
  createJobErrormsg: string;
  userId: any;
  object: {};
  latitude: any;
  longitude: any;
  allJobListData: any[];
  rooms: any;
  selectedAllLatLong: any;
  isJobFound: boolean;
  notJobfound: any;
  selectDate: Date; 
  selectDate2: Date;
  minimumDate: Date;
  invalidDates: Date[];
  startTimeValue: string;
  timeValue: string;
  profilePic: any;
  filterJobForm:FormGroup;
  formatedStartDate: any;
  userTz: any;
  mapControls: boolean;
  startDateTimeUtc: string;
  allExpiredJobs: any[];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {

 
  }

  ngOnInit(): void {
    this.allJobListData=[]
    this.latitude =28.7041;
    this.longitude = 77.1025;
    this.mapControls=false;
    this.initLocalStorage();
    this.spinner.hide();
  }




 

  // init localstorage data

  initLocalStorage(){
    this.allJobListData=[]
    this.allJobListData=JSON.parse(localStorage.getItem('addedJobs'));
    console.log(this.allJobListData,"sajdbcjbsdj")
    if( this.allJobListData){
      this.isJobFound=true;
    }
    this.sortData();
    this.onJobExpired();
    console.log(this.allJobListData,"job list data")
    this.spinner.hide();
    this.getAllLatLong()
  }

 
 


  
  // finding all lat and long according to their job and show ping on that particular location on map
  
getAllLatLong(){
  this.selectedAllLatLong=[];
if(this.allJobListData){
  this.allJobListData.forEach((item)=>{
    if(item.location){
      this.selectedAllLatLong.push({
        location:item.location
      }
        )
    }
   
  })
}
console.log(this.selectedAllLatLong,"kadsckfsdvnkn");
}

// sort function
sortData() {
  if(this.allJobListData){
  return this.allJobListData.sort((a, b) => {
    return <any>new Date(a.startAt) - <any>new Date(b.startAt);
  });
}

  console.log(this.allJobListData,"all job list after sorting")
}



// Expired job getting function
onJobExpired(){
  const  today = new Date()
  this.startDateTimeUtc= today.toISOString();
  if(this.allJobListData){
    this.allJobListData.forEach((item,index)=>{
      if(item.startAt <  this.startDateTimeUtc){
        this.allExpiredJobs =   this.allExpiredJobs || [];
        this.allExpiredJobs.push(item);
        localStorage.setItem('expiredJobs',JSON.stringify( this.allExpiredJobs))
        this.allJobListData.splice(index, 1);

          
      }
     
    })
  }
  console.log(this.startDateTimeUtc,"sadfjsdnjjfnkdks")
}

 
}
