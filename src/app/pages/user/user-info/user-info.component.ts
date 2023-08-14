import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstant } from 'app/_constant/auth.constant';
import { CommonConstant } from 'app/_constant/common.constants';
import { UserInfo } from 'app/_model/auth/user-info';
import { DataResponse } from 'app/_model/resp/data-response';
import { AuthenticationService } from 'app/_service/auth/authentication.service';
import { LoaderService } from 'app/_service/comm/loader.service';
import { Cookie } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(private authService: AuthenticationService,
    private loading: LoaderService,
    private toastr: ToastrService,
    private router: Router,
    ) {  }

    userInfo = new UserInfo();

  ngOnInit(): void {
    if (Cookie.check(AuthConstant.ACCESS_TOKEN_KEY)) {
      this.loading.change(true)
      this.authService.getUserInfo().subscribe({
        next: (resp: DataResponse) => {
          if (resp.status == CommonConstant.RESULT_OK) {
           this.userInfo = resp.responseData;
           console.log(this.userInfo.gender);
           
          } else {
           
          }
          this.loading.change(false)
        },
        error: (err: any) => {
          this.loading.change(false)
        }
      })
    }
  }

  update(){
    this.loading.change(true)
    this.authService.updateUserInfo(this.userInfo).subscribe({
      next: (resp: DataResponse) => {
        if (resp.status == CommonConstant.RESULT_OK) {
         this.toastr.success("Cập nhật thông tin thành công");
        } else {
          this.toastr.error("Cập nhật thông tin thất bại")
        }
        this.loading.change(false)
        this.router.navigateByUrl("/user/userInfo")
      },
      error: (err: any) => {
        this.loading.change(false)
        this.toastr.error("Cập nhật thông tin thất bại")
        this.router.navigateByUrl("/user/userInfo")
      }
    });
  }
}
