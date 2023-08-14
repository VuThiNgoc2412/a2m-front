import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/_service/auth/authentication.service';
import { LoaderService } from 'app/_service/comm/loader.service';
import { ToastrService } from 'ngx-toastr';
import { DauSach } from 'app/_model/sys/book/book.model';
import { AuthConstant } from 'app/_constant/auth.constant';
import { Cookie } from 'ng2-cookies';
import { GenreBook } from 'app/_model/sys/book/genreBook.model';
import { Sys0202Service } from 'app/_service/sys/book/sys0202.service';
import { DataResponse } from 'app/_model/resp/data-response';
import { CommonConstant } from 'app/_constant/common.constants';
import Swal from 'sweetalert2'
import { DauSachService } from 'app/_service/services/dausach.service';
declare var window: any;

@Component({
  selector: 'add-book-title',
  templateUrl: './addbooktitle.component.html',
  styleUrls: ['./addbooktitle.component.css']
})
export class AddBookTitleComponent implements OnInit {
  genreList: GenreBook[] = [];
  formModalAdd: any;
  dausach: DauSach = {
    bookCode: '',
    title: '',
    publisher: '',
    price: 0,
    pages: 0,
    description: '',
    status: 1,
    author: '',
    createdYear: 0,
    category: 0,
    img: '',
    genres:[]
  };
  quantity: number = 0;
  selectedGenre: GenreBook[];
  constructor(
    private authService: AuthenticationService,
    private loading: LoaderService,
    private toastr: ToastrService,
    private dauSachService: DauSachService,
    private sys0202Service: Sys0202Service
  ) { }


  ngOnInit(): void {
    this.formModalAdd = new window.bootstrap.Modal(
      document.getElementById('modal-add-cat')
    );
  }

  addBookTitle() {
    // console.log(this.selectedGenre)
    this.dausach.genres = this.selectedGenre;
    this.dauSachService.postData(this.dausach, this.quantity).subscribe(
      (response) => {
        if (response.status === "NG") {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Thêm không thành công!',
            footer: '<a href="">Sách đã tồn tại trong hệ thống</a>'
          });
        }
        else {
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: 'Thêm thành công!',
          });
        }
      },
      (error) => {

        console.error('Error adding data:', error);
      }
    )
    // this.addDauSach.postGenre(this.selectedGenre);
    console.log(this.dausach);
    this.formModalAdd.hide();
    window.location.reload();
  }

  openModel() {
    this.sys0202Service.getListCateBook().subscribe({
      next: (resp: DataResponse) => {
        if (resp.status == CommonConstant.RESULT_OK) {
          this.genreList = resp.listResponseData;
        }
      },
      error: (err: any) => {
      }
    })
    this.formModalAdd.show();
  }

  closeModel() {
    this.formModalAdd.hide();
  }

}