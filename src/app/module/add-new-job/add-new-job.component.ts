import { Component, OnInit ,ViewChild, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { google } from "google-maps";
declare var $: any;
@Component({
  selector: 'app-add-new-job',
  templateUrl: './add-new-job.component.html',
  styleUrls: ['./add-new-job.component.scss','../../../assets/css/common.css']
})
export class AddNewJobComponent implements OnInit {
  myClearId: any;
  @Input() adressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext') addresstext: any;
  autocompleteInput: string;
  queryWait: boolean;
  createJobForm: FormGroup;
  submitted: boolean;
  isInvalidJob: boolean;
  createJobErrormsg: string;
  object: {};
  place: any;
  latitude: number;
  longitude: number;
  allCategoryJobList: any;
  google: any;
  urls = new Array<string>();
  isVisibleDefaultImage: boolean;
  fileName = new Array<string>();
  files: any;
  file: any;
  selectedFiles = new Array<string>();
  preview: any;
  data: FormData;
  formdata: any;
  dateRange: any;
  selectDate: any;
  selectDate2: any;
  selectedStartTime: any;
  selectedEndTime: any;
  timeValue: string;
  startTimeValue: string;
  minimumDate: Date;
  invalidDates: any[];
  @ViewChild('sd') sdate: ElementRef;
  @ViewChild('ed') edate: ElementRef;
  formatedStartDate: any;
  currentTime: string;
  selectedStartTimeOfMonth: any;
  userId: any;
  profilePic: any;
  allPastJobList: any;
  selectedFormData: any;
  selectedOldImagesArray: [];
  oldUrls= new Array<string>();startDateTimeUtc: string;
  endDateTimeUtc: string;
  allAddedJobs: any[];
;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {



  }

  ngOnInit(): void {
    this.selectedOldImagesArray=[];
    this.minimumDate = new Date();
    this.allAddedJobs=[];
    let today = new Date();
    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [invalidDate];
    this.initCreateJobForm();
    console.log(new Date(), "date")
    this.allCategoryJobList=[
 {_id: "Design", name: "Design"},
 {_id: "Transport", name: "Transport"},
{_id: "Tutoring", name: "Tutoring"},
 {_id: "Handyman", name: "Handyman"},
{_id: "Errands", name: "Errands"},
 {_id: "Freelance", name: "Freelance"},
 {_id: "Community", name: "Community"},
 {_id: "Professional", name: "Professional"}

    ]
    $(
      function () {
        $("#startDate").datepicker({ dateFormat: "yy-mm-dd", minDate: 0 });
        $("#endDate").datepicker({ dateFormat: "yy-mm-dd", minDate: 0 });
      }
    );

    $('.timepicker').timepicker({
      timeFormat: 'hh:mm p',
      interval: 30,
      // minTime: '10',
      maxTime: '11:30pm',
      //defaultTime: '00',
      startTime: '00:00',
      dynamic: false,
      dropdown: true,
      scrollbar: true
    });

this.initLocalStorage();

  }

   // init localstorage data
 initLocalStorage(){
this.allAddedJobs = JSON.parse(localStorage.getItem('addedJobs'))
  console.log(this.profilePic)

}
  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

 
 
  initCreateJobForm() {
    this.createJobForm = new FormGroup({
      job_title: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      job_category: new FormControl('', [Validators.required]),
      Start_date: new FormControl(''),
      Start_time: new FormControl(''),
      end_date: new FormControl(''),
      end_time: new FormControl('')
    });
    console.log(this.createJobForm, "==================")
  }

  private getPlaceAutocomplete() {

    const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
      {
        types: [this.adressType]  // 'establishment' / 'address' / 'geocode'
      });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      this.place = autocomplete.getPlace();
      //set latitude, longitude and zoom
      this.latitude = this.place.geometry.location.lat();
      this.longitude = this.place.geometry.location.lng();
      this.invokeEvent(this.place);
    });
  }

  invokeEvent(place: Object) {
    this.setAddress.emit(place);
  }



  // Validation function

  get f() { return this.createJobForm.controls; }


  // create job api

  onAddedNewJob() {
    console.log(this.createJobForm.controls.job_category.value)
    this.currentTime = moment().format('hh:mm A');
    if ((new Date().getMonth() + 1) < 10) {
      var currentDate = new Date().getFullYear() + "-" + 0 + (new Date().getMonth() + 1) + "-" + new Date().getDate();
    } else {
      var currentDate = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
    }

    this.isInvalidJob = false;
    var dateObject = $("#startDate").datepicker('getDate');
    this.formatedStartDate = $.datepicker.formatDate('yy-mm-dd', dateObject);
    var startTime = $('#startTime').val();
    const event = new Date(this.formatedStartDate +" "+ startTime);
    this.startDateTimeUtc=event.toISOString();
    console.log(this.startDateTimeUtc,"event is called")
   
    // console.log(startTime,"start time")
    var splitStartTime = startTime.split(" ");
    var splitCurrentTime = this.currentTime.split(" ")
   
    console.log(splitCurrentTime ,"saaaaaaafNKJDSN")
   
    var startDateAndTime = this.formatedStartDate + " " + startTime;
    var endDateObject = $("#endDate").datepicker('getDate');
    var formatedEndDate = $.datepicker.formatDate('yy-mm-dd', endDateObject);
    var endTime = $('#endTime').val();
    const event2 = new Date(formatedEndDate +" "+ endTime);
    this.endDateTimeUtc=event2.toISOString();
    console.log(this.endDateTimeUtc,"end date time utc");
    console.log()
    var endCurrentTime = endTime.split(" ")
    var endDateAndTime = formatedEndDate + " " + endTime;
    console.log(endDateAndTime, "kasndknksand")
    this.submitted = true;

    
    // console.log( this.currentTime)
    console.log(endCurrentTime[1],splitCurrentTime[1])
    if ( currentDate == formatedEndDate && endCurrentTime[1]<splitCurrentTime[1]) {
      this.isInvalidJob = true;
      this.createJobErrormsg = "End time cannot be less than the current time"
      return;
    }

    if (!this.createJobForm.controls.job_title.value) {
      this.isInvalidJob = true;
      this.createJobErrormsg = "Job title is required"
      return;
    }
    if (!this.latitude && !this.selectedFormData.location.coordinates[0]) {
      this.isInvalidJob = true;
      this.createJobErrormsg = "Location is required"
      return;
    }
    if (!this.createJobForm.controls.amount.value) {
      this.isInvalidJob = true;
      this.createJobErrormsg = "Amount is required"
      return;
    }
    if (!this.createJobForm.controls.job_category.value) {
      this.isInvalidJob = true;
      this.createJobErrormsg = "Job category is required"
      return;
    }
    if (!this.formatedStartDate ) {
      this.isInvalidJob = true;
      this.createJobErrormsg = "Start Date is required"
      return;
    }
    if (!formatedEndDate ) {
      this.isInvalidJob = true;
      this.createJobErrormsg = "End Date is required"
      return;
    }

  
    if (formatedEndDate < this.formatedStartDate) {
      this.isInvalidJob = true;
      this.createJobErrormsg = "End date should always be greater or equal to start date."
      return;
    }
    if ((currentDate == this.formatedStartDate && (startTime < this.currentTime || splitStartTime[1]<splitCurrentTime[1])) ) {
      this.isInvalidJob = true;
      this.createJobErrormsg = "Start time cannot be less than the current time"
      return;
    }
  
    if (((currentDate == formatedEndDate && endTime <= startTime && endCurrentTime[1]<splitCurrentTime[1])) || ((this.formatedStartDate == formatedEndDate && endTime <= startTime && endCurrentTime[1]<splitCurrentTime[1]))) {
      this.isInvalidJob = true;
      this.createJobErrormsg = "End time should always be greater than start time."
      return;
    }
 
    if (formatedEndDate < this.formatedStartDate) {
      this.isInvalidJob = true;
      this.createJobErrormsg = "End date always greater than start date"
      return;
    }

    if (!this.createJobForm.controls.description.value) {
      this.isInvalidJob = true;
      this.createJobErrormsg = "Description of job is required"
      return;
    }
    if (this.selectedFiles.length < 1 && this.oldUrls.length<1) {
      this.isInvalidJob = true;
      this.createJobErrormsg = "Cover photo is required"
      return;
    }
    this.object={
      'title':this.createJobForm.controls.job_title.value?this.createJobForm.controls.job_title.value:this.selectedFormData.title,
      'amount':this.createJobForm.controls.amount.value?this.createJobForm.controls.amount.value:this.selectedFormData.amount,
      'job_location':this.latitude?this.place.formatted_address:this.selectedFormData.job_location,
      'location':  [this.latitude, this.longitude] ,
      'categoryId':this.createJobForm.controls.job_category.value?this.createJobForm.controls.job_category.value:this.selectedFormData.categoryId._id,
      'userId':JSON.parse(localStorage.getItem('userData')).id,
      'startAt':this.startDateTimeUtc,
      'endAt':this.endDateTimeUtc,
      'images':this.urls
    }
    $("#success_modal").modal('show');
    this.allAddedJobs= this.allAddedJobs || [];

    this.allAddedJobs.push(this.object);
    localStorage.setItem('addedJobs',JSON.stringify(this.allAddedJobs))
    

  }


 

 

  // on image select
  onUpload(event,isOldArray?) {
    console.log(isOldArray,"lsdfmldsfldslfldsfldsflmlf")
    if (event.target) {
      this.files = event.target.files;
      if( 5 <= this.selectedFiles.length ){
        this.isInvalidJob = true;
        this.createJobErrormsg = "Maximum 5 photos are allowed."
        return;
      }
      this.formdata = new FormData();
console.log(event.target.files[0],"formdata file")
      this.selectedFiles.push(event.target.files[0])
      console.log(this.selectedFiles, "selected Files")

      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.formdata.append('file', this.selectedFiles[i]);
      }

      if (this.files) {
        for (let file of this.files) {
          let reader = new FileReader();
          reader.onload = (e: any) => {

            console.log(event.target.files[0].name, "diadfusd")
            this.urls.push(e.target.result);
            if (this.urls.length > 0) {
              this.isVisibleDefaultImage = true;
            }
            console.log(this.urls, "csadcbasdhbn")
          }
          reader.readAsDataURL(file);
        }
      }
    } else {
        this.urls.splice(event, 1);
        this.selectedFiles.splice(event, 1);
        for (let i = 0; i < this.selectedFiles.length; i++) {
          this.formdata.append('file', this.selectedFiles[i]);
        }
      
    
    }


  }









}
