import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DishService } from '../dish.service';
import { UserService } from '../user.service';
@Component({
  selector: 'app-alldish',
  templateUrl: './alldish.component.html',
  styleUrls: ['./alldish.component.css']
})
export class AlldishComponent implements OnInit {

  adishArray=[]
  restaurantArray=[]
  constructor( private dish:DishService, private router:Router, private us:UserService) { }

   username:string
  ngOnInit(): void {

    this.username= localStorage.getItem("username")

    this.dish.getAllDish().subscribe(
      res =>{
        
        this.adishArray= res["message"]
        console.log(this.adishArray)
      },
      err =>{
        alert("error in dish")
        console.log(err)
      }
    )

    
  }


  //add to cart
  add(adish) {

    this.username = localStorage.getItem("username")

    let productObj = { "username": this.username, "dishid": adish.dishid, "dishname": adish.dishname, "dishprice": adish.dishprice, "dishtype": adish.dishtype, "restaurantname": adish.restaurantname, "dishdescription": adish.dishdescription,"quantity":adish.quantity, "photo": adish.photo   }
    // console.log(productObj)
    //add product to cart
    this.us.addProducttoCart(productObj).subscribe(
      res => {
        if (res["message"] == "failed") {
          alert(res["reason"])
          //navigate to login
          localStorage.clear()
          this.router.navigateByUrl("/login")
          
        }
        else {
          if (res['message'] == "product added to cart") {
            alert(res['message'])
           // this.us.setCartSize(res["cartsize"])
          }
          else if (res['message'] == "Quantity updated") {
            alert(res['message'])
          }
           else {
             alert(res['message'])
             this.router.navigateByUrl("/login")
            }

            this.us.getCount(adish.username).subscribe((res) => {
                this.us.setNum(res['message'] + 1);
               });
        }
      },
      err => {
        console.log(err)
        alert("something went wrong")
      }
      
    )
     
  }

  

}



