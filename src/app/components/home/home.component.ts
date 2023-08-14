import {Component, Input, OnInit} from '@angular/core';
import { ProductService } from 'app/_service/services/product.service';
import { ProductModelServer, serverResponse } from 'app/_model/models/product.model';
import { CartService } from 'app/_service/services/cart.service';
import {ActivatedRoute, Router} from "@angular/router";
import { Book } from 'app/_model/user/book.model';
import { DauSachService } from 'app/_service/services/dausach.service';
import { DataResponse } from 'app/_model/resp/data-response';
import { User0101Service } from 'app/_service/user/user0101.service';
import { CommonConstant } from 'app/_constant/common.constants';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'app/_service/auth/authentication.service';
import { SearchService } from 'app/_service/user/serach.service';

@Component({
  selector: 'mg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  products: ProductModelServer[] = [];

  @Input()
  searchText: string | undefined;
  inputText: string = '';

  listBookTitle: Book[];
  groupBookTitle: Book[][] = [];
  listBookTitleSerach: Book[];

  numbersArray: Number[] = [];
  pageCurrent: Number = 1;

  constructor(private authen: AuthenticationService,
              private toast: ToastrService,
              private router:Router,
              private dauSach: DauSachService,
              private user0101Service: User0101Service,
              private activatedRoute: ActivatedRoute,
              private searchService: SearchService
              ) {
  }

  ngOnInit() {
    this.searchService.dataEmitter.subscribe((value) =>{
      this.inputText = value;
      console.log("hello HomeComponet I'm here")
      console.log(this.inputText)
      this.filterBooksByTitle()
    })

    for (let i = 1; i <= 5; i++) {
      this.numbersArray.push(i);
    }

    this.activatedRoute.queryParamMap.subscribe((param) => {
      this.pageCurrent = Number(param.get("page"))
      if(this.pageCurrent == 0){
        this.pageCurrent = 1
      }
      console.log("hell")
      console.log(this.pageCurrent)
      this.listBookTitle = []
      this.groupBookTitle = []
    
      this.getBookTitle()
    })

    // this.getBookTitle();
    
  }

  filterBooksByTitle() {
    if (this.inputText) {
       this.listBookTitleSerach = this.listBookTitle.filter((book) => {
        if (book && book.title) {
          return book.title.toLowerCase().includes(this.inputText.toLowerCase());
        }
        return false;
      });
    } else {
      this.listBookTitleSerach = [...this.listBookTitle]; // Khôi phục danh sách ban đầu
    }

    this.groupBookTitle = []
    // console.log(this.listBookTitleSerach)
    for(let i = 0; i < this.listBookTitleSerach.length; i += 4){
      const group = this.listBookTitleSerach.slice(i, i + 4);
      this.groupBookTitle.push(group);
    }
  }

  getBookTitle(){
    this.dauSach.getBookTitle(this.pageCurrent).subscribe({
      next: (resp: DataResponse) => {
        this.listBookTitle = resp.listResponseData;
        for(let i = 0; i < this.listBookTitle.length; i += 4){
          const group = this.listBookTitle.slice(i, i + 4);
          this.groupBookTitle.push(group);
        }
      }
    })
  }

  addBookToCart(book: Book){
    this.user0101Service.insert(book).subscribe(resp => {
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
  
  showBookDetail(book: Book){
    this.router.navigate(['/home/book', book.bookCode]).then(() => {
    });

  }

  appendQueryParam(page: Number){
    if(page != 0){
      this.router.navigate(['/home'], {queryParams: {page: page}})

    }
  }


}
