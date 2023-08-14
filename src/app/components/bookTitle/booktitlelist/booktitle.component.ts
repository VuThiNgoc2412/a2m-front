import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthConstant } from 'app/_constant/auth.constant';
import { CommonConstant } from 'app/_constant/common.constants';
import { UserInfo } from 'app/_model/auth/user-info';
import { DataResponse } from 'app/_model/resp/data-response';
import { AuthenticationService } from 'app/_service/auth/authentication.service';
import { LoaderService } from 'app/_service/comm/loader.service';
import { DauSachService } from 'app/_service/services/dausach.service';
import { Cookie } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { DauSach, Sach } from 'app/_model/sys/book/book.model';
import { GenreBook } from 'app/_model/sys/book/genreBook.model';
import Swal from 'sweetalert2'
declare var window: any;

@Component({
  selector: 'book-title',
  templateUrl: './booktitle.component.html',
  styleUrls: ['./booktitle.component.css']
})
export class BookTitleComponent implements OnInit {
    public data: DauSach [];
    public bookdata: Sach [];
    formModalDetail: any;
    formModalDisable: any;
    formModalEnable: any;
    disableBookCode: string;
    enableBookCode: string;
    genre_list: string;
    dausachDetail: DauSach = {
      bookCode: '',
      title: '',
      publisher: '',
      price: 0,
      pages: 0,
      description: '',
      status: 0,
      author: '',
      createdYear: 0,
      category: 0,
      img: '',
      genres: []
    };
    quantity: 0;
  constructor(private authService: AuthenticationService,
    private loading: LoaderService,
    private toastr: ToastrService,
    private dauSachService: DauSachService,
    ) {  }

    userInfo = new UserInfo();

  ngOnInit(): void {
    if (Cookie.check(AuthConstant.ACCESS_TOKEN_KEY)) {
      this.loading.change(true);
      this.fetchData();
      this.formModalDetail = new window.bootstrap.Modal(
        document.getElementById('modal-detail-cat')
      );
      this.formModalDisable = new window.bootstrap.Modal(
        document.getElementById('modal-disable-cat')
      );
      this.formModalEnable = new window.bootstrap.Modal(
        document.getElementById('modal-enable-cat')
      );
    }
  }
  
  fetchData(){
    this.dauSachService.getData().subscribe(
        (response) => {
          this.data = response.responseData;
          console.log(response);
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
    )
  }

  openModel(item: DauSach) {
    this.dauSachService.getBookDetail(item.bookCode).subscribe(
      (response) => {
        this.dausachDetail = response.responseData;
        console.log(response);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    )
    this.genre_list = this.dausachDetail.genres.map(item => item.genre_name).join(', ');
    // this.dausachDetail = item;
    this.dauSachService.getBookData(item.bookCode).subscribe(
      (response) => {
        this.bookdata = response.responseData;
        console.log(response);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
  )
    this.formModalDetail.show();
  }

  closeModel(){
    this.formModalDetail.hide();
  }

  openModelDisable(bookCode: string) {
    this.disableBookCode = bookCode;
    this.formModalDisable.show();
  }

  closeModelDisable(){
    this.disableBookCode = '';
    this.formModalDisable.hide();
  }
  disable(){
    this.dauSachService.changeStatus(0, this.disableBookCode).subscribe();
    this.formModalDisable.hide();
    window.location.reload();
  }

  openModelEnable(bookCode: string) {
    this.enableBookCode = bookCode;
    this.formModalEnable.show();
  }

  closeModelEnable(){
    this.enableBookCode = '';
    this.formModalEnable.hide();
  }

  enable(){
    this.dauSachService.changeStatus(1, this.enableBookCode).subscribe();
    this.formModalEnable.hide();
    window.location.reload();
  }

  updateBookTitle(){
    this.dauSachService.updateBookTitle(this.dausachDetail).subscribe(
      (response) => {
        if(response.status === "NG"){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Sửa không thành công!',
            footer: '<a href="">Sách đã tồn tại trong hệ thống</a>'
          });
        }
        else {
          this.dauSachService.addBook(this.dausachDetail.bookCode, this.quantity).subscribe();
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: 'Sửa thành công!',
          });
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
    this.formModalDetail.hide();
  }

  addQuantity(){
    this.quantity++;
  }
}