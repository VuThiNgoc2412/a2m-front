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

@Component({
  selector: 'mg-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'], 
  // providers: [User0101Service],
  host: {
    'class': 'xyz' // Đặt tên class bạn muốn sử dụng
  },
  styles: [`
  .xyz {
    width: 100%;
  }
`]
})
export class CartComponent implements OnInit, OnDestroy {

  selectedBook: Book[] = [];
  bookInCart: Book[] = [];
  bookInCartActive: Book[] = [];
  bookInCartDisable: Book[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private user0101Service: User0101Service,
    private toastr: ToastrService,
    private router: Router,
    private activatedRout: ActivatedRoute) {
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });  }

  ngOnInit() {

    // this.getListBookInCart()
    this.subscriptions.push(
      this.user0101Service.getListBookInCart().subscribe(data => {
        // Xử lý dữ liệu
      })
    )

    this.subscriptions.push(
      this.user0101Service.getBooks().subscribe(books => {
        this.bookInCart = [];
        this.bookInCartActive = [];
       this. bookInCartDisable = [];
        this.bookInCart = books;
        for(let b of this.bookInCart){
          if(b.status == '0'){
             this.bookInCartDisable.push(b)
          }
          else{
            this.bookInCartActive.push(b)
          }
        }
            
        console.log(this.bookInCart);
      })
    )
    this.selectedBook = [];
  }
  


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
  
  deleteFromCart(book: Book) {
    
    this.user0101Service.delete(book).subscribe(resp => {
      if(resp.status == CommonConstant.RESULT_OK){
        this.toastr.success("Xóa sản phẩm khỏi giỏ hàng thành công")
      }
      else{
        this.toastr.error("Xóa sản phẩm khỏi giỏ hàng thất bại")
      }
    });
  }

  showBookDetail(book: Book){
    this.router.navigate(['/home/book', book.bookCode]).then((navigationResult) => {
      if (navigationResult) {
        console.log('Điều hướng thành công');
      } else {
        console.log('Điều hướng thất bại');
      }
    });

  }
}
