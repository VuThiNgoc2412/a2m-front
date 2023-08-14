import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonConstant } from 'app/_constant/common.constants';
import { DataResponse } from 'app/_model/resp/data-response';
import { GenreBook } from 'app/_model/sys/book/genreBook.model';
import { Sys0202Service } from 'app/_service/sys/book/sys0202.service';
import { ToastrService } from 'ngx-toastr';
declare var window: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  formModalAdd: any;
  formModalUpdate: any;

  showModal = false;

  listGenereBook: GenreBook[];
  groupGenreBook: GenreBook[][] = [];
  selectedStatus: string;
  selectedGenreBook = new GenreBook();
  numbersArray: Number[] = [];
  pageCurrent: Number = 1;

  isModalVisible: boolean = true;

  @ViewChild('genreInput') genreInput: ElementRef; // Biến tham chiếu
  @ViewChild('genreChangeInput') genreChangeInput: ElementRef; // Biến tham chiếu

  constructor(private sys0202Service: Sys0202Service,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) { }


  ngOnInit(): void {
    for (let i = 1; i <= 5; i++) {
      this.numbersArray.push(i);
    }
    this.activatedRoute.queryParamMap.subscribe((param) => {
      this.pageCurrent = Number(param.get("page"))
      if(this.pageCurrent == 0){
        this.pageCurrent = 1
      }

      this.listGenereBook = []
      this.groupGenreBook = []
      console.log("hell")
      console.log(this.pageCurrent)
    
      this.sys0202Service.getListCateBookLimit(this.pageCurrent).subscribe(data => {
        // Xử lý dữ liệu
        
      })
    
    })

     

 
      this.sys0202Service.getGenreBooks().subscribe(genreBook => {
        this.listGenereBook = []
        this.listGenereBook = genreBook
        for (let i = 0; i < this.listGenereBook.length; i += 6) {
          const group = this.listGenereBook.slice(i, i + 6);
          this.groupGenreBook.push(group);
  
        }
      })
    


    this.formModalAdd = new window.bootstrap.Modal(
      document.getElementById('modal-add-cat')
    );

    this.formModalUpdate = new window.bootstrap.Modal(
      document.getElementById('modal-update-cat')
    );

    
  }

  openModal() {
    this.formModalAdd.show();
  }

  closeModal() {
    this.formModalAdd.hide();
  }

  openModalUpdate(genreBook: GenreBook) {
    this.selectedGenreBook = genreBook;
    console.log(this.selectedGenreBook.status)
    this.formModalUpdate.show();
  }

  // openModalUpdate() {
  //   // this.selectedGenreBook = genreBook;
  //   this.formModalUpdate.show();
  // }

  closeModalUpdate() {
    this.formModalUpdate.hide();
  }

  onStatusChange(value: string) {
    this.selectedStatus = value;
  }

  addGenreBook(){
    const inputValue: string = this.genreInput.nativeElement.value;
      const genreBook: GenreBook = {
        status: this.selectedStatus,
        genre_name: inputValue
      };
    this.sys0202Service.addGenreBook(genreBook).subscribe(resp => {
      if (resp.status == CommonConstant.RESULT_OK) {
        this.toastr.success("Thêm loại sách thành công!")
        this.closeModal()
      }
      else {
        this.toastr.error("Loại sách đã tồn tại!")
        this.closeModal()
      }
  });
  }

  updateGenreBook(genreBook: GenreBook){

    const inputValue: string = this.genreChangeInput.nativeElement.value;
    genreBook.genre_name = inputValue;
    genreBook.status = this.selectedStatus
    this.sys0202Service.updateGenreBook(genreBook).subscribe(resp => {
      if (resp.status == CommonConstant.RESULT_OK) {
                this.toastr.success("Cập nhật loại sách thành công!")
                this.closeModalUpdate()
      
              }
              else {
                this.toastr.error("Cập nhật loại sách thâtt bại!")
              }
  });
  }

  appendQueryParam(page: Number){
    if(page != 0){
      this.router.navigate(['/sys/list-categories'], {queryParams: {page: page}})
    }
  }
}
