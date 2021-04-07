import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DishService } from '../dish.service';

@Component({
  selector: 'app-createdish',
  templateUrl: './createdish.component.html',
  styleUrls: ['./createdish.component.css']
})
export class CreatedishComponent implements OnInit {

  username:string
  constructor(private dish: DishService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    //get username from local storage
    this.username=localStorage.getItem("username")
  }

  file:File;
  formData= new FormData();
  incomingfile(event){
    this.file=event.target.files[0];

  }

  form = new FormGroup({
    restaurantname : new FormControl ('',[]),
    dishid : new FormControl ('',[]),
    dishname : new FormControl ('',[]),
    dishtype : new FormControl ('',[]),
    dishprice : new FormControl ('',[]),
    dishdescription : new FormControl ('',[]),
    photo : new FormControl ('',[]),
  })

  onSubmit(form) {
    let dishObj= form.value
    dishObj["username"]=localStorage.getItem("username")
   
    //adding image and other data to FormData object
    this.formData.append('photo',this.file,this.file.name);
    this.formData.append("dishObj",JSON.stringify(dishObj))

    // console.log(dishObj)
    this.dish.createDish(this.formData).subscribe(
      res => {
        
        if(res["message"]=="dish created"){
          this.toastr.success("dish created sucussfully")
        }

          //this.router.navigateByUrl("/admindashboard")
      },
      err => {
        this.toastr.error("dish creation error")
        console.log(err)
      }
    )
  }


  get restaurantname (){
    return this.form.get("restaurantname")
  };
  get dishid (){
    return this.form.get("dishid")
  };
  get dishname (){
    return this.form.get("dishname")
  };
  get dishtype (){
    return this.form.get("dishtype")
  };
  get dishprice (){
    return this.form.get("dishprice")
  };
  get dishdescription (){
    return this.form.get("dishprice")
  };
  get photo (){
    return this.form.get("photo")
  };

}
