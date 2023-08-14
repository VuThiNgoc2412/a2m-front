import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { Observable } from 'rxjs';
import { LoaderService } from 'app/_service/comm/loader.service';
import { ToastrService } from 'ngx-toastr';
import { DataResponse } from 'app/_model/resp/data-response';
import { CommonConstant } from 'app/_constant/common.constants';
import { AuthenticationService } from 'app/_service/auth/authentication.service';
import { AuthConstant } from 'app/_constant/auth.constant';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.css']
})
export class UserManageComponent implements OnInit {

  users:any;
  constructor(private authService: AuthenticationService ,
    private loading: LoaderService,
    private toastr: ToastrService,) { 
  }
  ngOnInit(): void {
    if(Cookie.check(AuthConstant.ACCESS_TOKEN_KEY)) {
      this.loading.change(true)
      this.authService.getListUser().subscribe(
        {
          next: (resp: DataResponse) => {
              this.users = resp;
              console.log(this.users)
          },
          error: (err : any) => {
            this.loading.change(false)
          }
        }
      )
    }
 

  }
  // users = [
  //   {
  //     name: 'Ngọc',
  //     email: 'ngocvt@gmail.com',
  //     sdt: '123456789',
  //     address: 'TB',
  //     qty: 10,
  //   },
  //   {
  //     name: 'Ngọc',
  //     email: 'ngocvt@gmail.com',
  //     sdt: '123456789',
  //     address: 'TB',
  //     qty: 10,
  //   },
  //   {
  //     name: 'Ngọc',
  //     email: 'ngocvt@gmail.com',
  //     sdt: '123456789',
  //     address: 'TB',
  //     qty: 10,
  //   }
  // ];

}
