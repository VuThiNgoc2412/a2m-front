import { Book } from 'app/_model/user/book.model';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { CartService } from 'app/_service/services/cart.service';
import { CartModelServer } from 'app/_model/models/cart.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProductModelServer } from 'app/_model/models/product.model';
import { style } from '@angular/animations';
import { User0101Service } from 'app/_service/user/user0101.service';
import { DataResponse } from 'app/_model/resp/data-response';
import { CommonConstant } from 'app/_constant/common.constants';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { User0102Service } from 'app/_service/user/user0102.service';

@Component({
  selector: 'mg-waitlist',
  templateUrl: './waitlist.component.html',
  styleUrls: ['./waitlist.component.scss'], 
  host: {
    'class': 'xyz' // Đặt tên class bạn muốn sử dụng
  },
  styles: [`
  .xyz {
    width: 100%;
  }
`]
})
export class WaitListComponent implements OnInit, OnDestroy {
//   cartData: CartModelServer;
  waitListTotal: number;
  selectedBook: Book[] = [];
  bookInWaitList: Book[] = [];
  bookInWaitListActive: Book[] = [];
  bookInWaitListDisable: Book[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private user0102Service: User0102Service,
    private toastr: ToastrService,
    private router: Router,
    private activatedRout: ActivatedRoute
    ) {
  }
  ngOnDestroy(): void {
      }

  ngOnInit() {

    this.subscriptions.push(
      this.user0102Service.getListBookInWaitList().subscribe(data => {
        // Xử lý dữ liệu
      })
    )
    this.subscriptions.push(
      this.user0102Service.getBooks().subscribe(books => {
        this.bookInWaitList = [];
        this.bookInWaitListActive = [];
       this.bookInWaitListDisable = [];
        this.bookInWaitList = books;
        for(let b of this.bookInWaitList){
          if(b.status == '0'){
             this.bookInWaitListDisable.push(b)
          }
          else{
            this.bookInWaitListActive.push(b)
          }
        }
            
      })
    )
    this.selectedBook = [];
    //  this.cartService.cartDataObs$.subscribe(data => this.cartData = data);
    //  this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
  }

//   ChangeQuantity(id: number, increaseQuantity: Boolean) {
//     this.cartService.UpdateCartData(id, increaseQuantity);
//   }


  updateSelectedBook(book: Book){
    if(book.checked){
      this.selectedBook.push(book)
    }
    else {
      const index = this.selectedBook.indexOf(book);
      if (index > -1) {
        this.selectedBook.splice(index, 1);
      }
    }
    // console.log(this.selectedBook)
  }

  deleteFromWaitList(book: Book){


    this.user0102Service.delete(book).subscribe(resp => {
      if(resp.status == CommonConstant.RESULT_OK){
              this.toastr.success(resp.message)
            }
            else{
              this.toastr.error(resp.message) 
            }
    });
  }
}
