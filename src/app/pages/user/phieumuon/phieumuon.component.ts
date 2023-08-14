import { DatePipe } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { AuthConstant } from 'app/_constant/auth.constant';
import { CommonConstant } from 'app/_constant/common.constants';
import { UserInfo } from 'app/_model/auth/user-info';
import { DataResponse } from 'app/_model/resp/data-response';
import { AuthenticationService } from 'app/_service/auth/authentication.service';
import { LoaderService } from 'app/_service/comm/loader.service';
import { DauSachService } from 'app/_service/services/dausach.service';
import { Cookie } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { DauSach } from 'app/_model/sys/book/book.model';
import { Input } from '@angular/core';
import Swal from 'sweetalert2'
import { Book } from 'app/_model/user/book.model';
import { phieumuonDto } from 'app/_model/sys/book/phieumuon/phieumuonDto.model';
import { BorrowService } from 'app/_service/user/borrow.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'phieumuon',
    templateUrl: './phieumuon.component.html',
    styleUrls: ['./phieumuon.component.css']
})
export class PhieuMuonComponent implements OnInit {
    // @Input() 
    bookCodeList: string[] = ["ATMD"];
    // bookCodeList = this.activatedRoute.snapshot.queryParams.bookCodeList;
    // @Input() 
    userUid: number = 20230807042359842;
    bookList: DauSach[] = [];
    bookListUnavailable: DauSach[] = [];
    agreed: boolean = false;
    borrowedDate: Date;
    phieumuon: phieumuonDto;
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private loading: LoaderService,
    private toastr: ToastrService,
    private dauSachService: DauSachService,
    private borrowService: BorrowService
    // private datepipe: DatePipe
  ) {  }
    

  ngOnInit(): void {
    if (Cookie.check(AuthConstant.ACCESS_TOKEN_KEY)) {
        this.loading.change(true)
        error: (err: any) => {
          this.loading.change(false)
        }
        for (let i = 0; i < this.bookCodeList.length; i++){
            this.dauSachService.getBookData(this.bookCodeList[i]).subscribe(
                (response) => {
                    console.log("Checking book available")
                    if (response.responseData) {
                        this.dauSachService.getBookDetail(this.bookCodeList[i]).subscribe(
                            (response) => {
                                this.bookList[i] = response.responseData;
                                this.bookList[i].bookCode = this.bookCodeList[i];
                            },
                            (error) => {
                                console.log("Error fetching book detail");
                            }
                        );
                    }
                    else{
                        this.dauSachService.getBookDetail(this.bookCodeList[i]).subscribe(
                            (response) => {
                                this.bookListUnavailable[i] = response.responseData;
                                this.bookListUnavailable[i].bookCode = this.bookCodeList[i];
                            },
                            (error) => {
                                console.log("Error fetching unavailable book detail");
                            }
                        );
                    }
                },
                (error) => {
                    console.log("Error checking book available");
                }
            )
        }
    }
  }
    onSubmit(){
        if(this.agreed === true){
            this.phieumuon = {
                userUid: this.userUid,
                createdDate: new Date(),
                borrowDate: new Date(),
                status: 0,
                extended_times: 0,
                book: this.bookList
            };
            console.log("Submitting");
            if (this.borrowedDate) this.phieumuon.borrowDate = this.borrowedDate;
            else this.phieumuon.borrowDate?.setDate(this.phieumuon.borrowDate.getDate() + 3);
            console.log(this.phieumuon);   
            console.log(this.borrowedDate);
            this.borrowService.addPhieuMuon(this.bookList, this.phieumuon).subscribe(
                (response) => {
                    console.log('Response:', response);
                },
                (error) => {
                    console.error('Error:', error);
                }
            );

        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Bạn cần đồng ý với điều khoản!',
            });
        }
    }
}