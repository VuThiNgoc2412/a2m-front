import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-gived',
  templateUrl: './user-gived.component.html',
  styleUrls: ['./user-gived.component.css']
})
export class UserGivedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  bookWaits = [
    {
      img: 'https://newshop.vn/public/uploads/news/nhung-cuon-sach-van-hoc-thieu-nhi-min.jpg',
      createdDate: '2023-08-08',
      givedDate: '2023-20-8',
      qty: 3,
      name: 'Tuổi thơ dữ dội',
      author: 'Không biết'
    },
    {
      img: 'https://newshop.vn/public/uploads/news/nhung-cuon-sach-van-hoc-thieu-nhi-min.jpg',
      createdDate: '2023-08-08',
      givedDate: '2023-20-8',
      qty: 3,
      name: 'Tuổi thơ dữ dội',
      author: 'Không biết'
    }, 
    {
      img: 'https://newshop.vn/public/uploads/news/nhung-cuon-sach-van-hoc-thieu-nhi-min.jpg',
      createdDate: '2023-08-08',
      givedDate: '2023-20-8',
      qty: 3,
      name: 'Tuổi thơ dữ dội',
      author: 'Không biết'
    }
  ]
}
