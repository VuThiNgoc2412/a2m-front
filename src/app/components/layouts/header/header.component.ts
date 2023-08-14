import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CartService } from 'app/_service/services/cart.service';
import { CartModelServer } from 'app/_model/models/cart.model';
import { AuthenticationService } from 'app/_service/auth/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'app/_service/comm/loader.service';
import { AuthConstant } from 'app/_constant/auth.constant';
import { Cookie } from 'ng2-cookies';
import { DataResponse } from 'app/_model/resp/data-response';
import { CommonConstant } from 'app/_constant/common.constants';
import { UserInfo } from 'app/_model/auth/user-info';
import { User0101Service } from 'app/_service/user/user0101.service';
import { DauSachService } from 'app/_service/services/dausach.service';
import { Book } from 'app/_model/user/book.model';
import { User0102Service } from 'app/_service/user/user0102.service';
import { SearchService } from 'app/_service/user/serach.service';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // cartData: CartModelServer;
  cartTotal: number;
  waitListTotal: number;
  isAuthenticate: boolean = false;

  

  
  constructor(public user0101Service: User0101Service,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private loading: LoaderService,
    private user0102Service: User0102Service,
   private searchService: SearchService,
    ) {
  }

  ngOnInit() {
    this.cartTotal = 0;
    if (Cookie.check(AuthConstant.ACCESS_TOKEN_KEY)) {
      this.loading.change(true)
      this.authService.getUserInfo().subscribe({
        next: (resp: DataResponse) => {
          if (resp.status == CommonConstant.RESULT_OK) {
            let userInfo: UserInfo = resp.responseData;
            this.isAuthenticate = true;
          } else {
          }
          this.loading.change(false)
        },
        error: (err: any) => {
          this.loading.change(false)
        }
      })

      this.user0101Service.getListBookInCart().subscribe(data => {
        // this.bookInCart = data.listResponseData;
      });
      this.user0101Service.getBooks().subscribe(books => {
        this.cartTotal = books.length;
      });

      this.user0102Service.getListBookInWaitList().subscribe(data => {
        // this.bookInCart = data.listResponseData;
      });
      this.user0102Service.getBooks().subscribe(books => {
        this.waitListTotal = books.length;
      });


    }

  }
  
  login() {
    this.authService.logIn();
  }
  
  logout(){
    this.authService.logOut();
}

enteredText: string = "";
// @ViewChild('searchInput', { static: false })
// searchInput!: ElementRef<HTMLInputElement>;

onSearchTextChanged(){
  console.log(this.enteredText)
  // this.enteredText = this.searchInput.nativeElement.value;
  // console.log(this.enteredText)
  this.searchService.raiseDataEmitterEvent(this.enteredText);
}

searchBook(){
  // goi ham search box
  // this.dauSach.
}
}
