import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import { ProductService } from 'app/_service/services/product.service';
import { ProductModelServer } from 'app/_model/models/product.model';
import {map} from "rxjs/operators";
import { CartService } from 'app/_service/services/cart.service';
import { Book } from 'app/_model/user/book.model';
import { DauSachService } from 'app/_service/services/dausach.service';
import { DataResponse } from 'app/_model/resp/data-response';
import { CommonConstant } from 'app/_constant/common.constants';
import { BookTitleComponent } from '../bookTitle/booktitlelist/booktitle.component';
import { User0101Service } from 'app/_service/user/user0101.service';
import { AuthenticationService } from 'app/_service/auth/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { User0102Service } from 'app/_service/user/user0102.service';
import { SseService } from 'app/_service/user/sse.service';

declare let $: any;

@Component({
  selector: 'mg-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements AfterViewInit, OnInit{

  // id: number;
  product;
  bookTitle: Book
  thumbimages: any[] = [];
  id: string = '' 

  @ViewChild('quantity') quantityInput;

  constructor(private activatedRoute: ActivatedRoute,
              private authen: AuthenticationService,  
              private dauSach: DauSachService,
              private user0101Service: User0101Service,
              private user0102Service: User0102Service,
              private toast: ToastrService,
              private sse: SseService,
              ) {
  }

  ngOnInit(): void {

     this.id = '' + this.activatedRoute.snapshot.paramMap.get('id');

    this.dauSach.getBookTitleDetail(this.id).subscribe({
      next: (resp: DataResponse) => {
        if(resp.status == CommonConstant.RESULT_OK)
        this.bookTitle = resp.responseData;
        this.bookTitle.bookCode = this.id;
        // this.bookTitle.quantity = 0;
      },
      error: (err: any) => {

      }
    })
  }

  addBookToCart(){
    this.user0101Service.insert(this.bookTitle).subscribe(resp => {
      if(resp.status == CommonConstant.RESULT_WN){
                this.authen.logIn();
              }
              else if(resp.status == CommonConstant.RESULT_OK){
                this.toast.success(resp.message)
              }
              else if(resp.status == CommonConstant.RESULT_NG){
                this.toast.error(resp.message)
              }
    });
  }

  addBookToWaitList(){
    this.user0102Service.insert(this.bookTitle).subscribe({
      next: (resp: DataResponse) => {
        if(resp.status == CommonConstant.RESULT_WN){
          this.authen.logIn();
        }
        else if(resp.status == CommonConstant.RESULT_OK){
          this.toast.success(resp.message)
        }
        else if(resp.status == CommonConstant.RESULT_NG){
          this.toast.error(resp.message)
        }
        // else if()
      }
    });

    this.sse.connect()
    
  }

  ngAfterViewInit(): void {

    // Product Main img Slick
    $('#product-main-img').slick({
      infinite: true,
      speed: 300,
      dots: false,
      arrows: true,
      fade: true,
      asNavFor: '#product-imgs',
    });

    // Product imgs Slick
    $('#product-imgs').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      centerMode: true,
      focusOnSelect: true,
      centerPadding: 0,
      vertical: true,
      asNavFor: '#product-main-img',
      responsive: [{
        breakpoint: 991,
        settings: {
          vertical: false,
          arrows: false,
          dots: true,
        }
      },
      ]
    });

    // Product img zoom
    var zoomMainProduct = document.getElementById('product-main-img');
    if (zoomMainProduct) {
      $('#product-main-img .product-preview').zoom();
    }
  }

}
