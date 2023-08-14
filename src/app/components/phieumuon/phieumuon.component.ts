import { Component, OnInit } from '@angular/core';
import { CommonConstant } from 'app/_constant/common.constants';
import { UserInfo } from 'app/_model/auth/user-info';
import { DataResponse } from 'app/_model/resp/data-response';
import { phieumuonDto } from 'app/_model/sys/book/phieumuon/phieumuonDto.model';
import { Sys0301Service } from 'app/_service/sys/book/phieumuon/sys0301.service';

@Component({
  selector: 'app-phieumuon',
  templateUrl: './phieumuon.component.html',
  styleUrls: ['./phieumuon.component.css']
})
export class PhieumuonComponent implements OnInit {
  list: phieumuonDto[];
  status: number = 0;

  constructor(private sys0301service: Sys0301Service) { }

  ngOnInit(): void {
    this.getData()
  }

  getStatus(value: number) {
    this.status = value;
    this.getData();
  }


  getData() {
    this.sys0301service.getPhieuByStatus(this.status).subscribe({
      next: (resp: DataResponse) => {
        if (resp.status == CommonConstant.RESULT_OK) {
          if (resp && resp.listResponseData && Array.isArray(resp.listResponseData)) {
            this.list = resp.listResponseData.map((item: any) => {
              const phieumuonItem: phieumuonDto = {
                idPhieuMuon: item.idPhieuMuon,
                userUid: item.userUid,
                createdDate: item.createdDate,
                borrowDate: item.borrowDate,
                returnDateEstimate: item.returnDateEstimate,
                returnUpdateReal: item.returnUpdateReal,
                status: item.status,
                extended_times: item.extended_times,
                countBook: item.countBook,
                UserInfo: item.userInfo as UserInfo,
              };
              return phieumuonItem;
            });
          }
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

}
