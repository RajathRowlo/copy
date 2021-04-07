import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DishService } from '../dish.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {

  constructor(private dish: DishService, private router: Router, private ar: ActivatedRoute, private toastr: ToastrService) { }

  dishid: String
  Dish: any
  dishArray = []
  username: string
  ngOnInit(): void {

    this.username = localStorage.getItem("username")

    this.dish.getDish({ "username": this.username }).subscribe(
      res => {
        this.dishArray = res["message"]
      },
      err => {
        alert("error in dish")
        console.log(err)
      }
    )


  }

  edit(dishid) {
    this.username = localStorage.getItem("username")
    this.router.navigateByUrl(`admindashboard/editdish/${this.username}/${dishid}`)
    //this.router.navigateByUrl("/editdish")
  }

  delete(dishid, ind) {
    let dishObj = { username: this.username, dishid: dishid }
    console.log(dishObj)
    this.dish.deleteDishId(dishObj).subscribe(
      dish => {
        if (dish["message"] == "Deleted Succusfully") {
          this.toastr.success(dish["message"])
          this.dishArray.splice(ind, 1)
          console.log(this.Dish)
        }
        else {

        }
      }
    )
  }

}
