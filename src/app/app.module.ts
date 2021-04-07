import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { DishComponent } from './dish/dish.component';
import { from } from 'rxjs';
import { CartComponent } from './cart/cart.component';
import { AuthorizationService } from './authorization.service';
import { AlldishComponent } from './alldish/alldish.component';
import { CreatedishComponent } from './createdish/createdish.component';
import { EditdishComponent } from './editdish/editdish.component';
import { EditComponent } from './edit/edit.component';
import { PortComponent } from './port/port.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    UserdashboardComponent,
    AdmindashboardComponent,
    DishComponent,
    CartComponent,
    AlldishComponent,
    CreatedishComponent,
    EditdishComponent,
    EditComponent,
    PortComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:1000,
      progressBar:true,
      progressAnimation:'increasing',
      preventDuplicates:true,
      positionClass:'toast-top-center'
    })
  
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthorizationService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
