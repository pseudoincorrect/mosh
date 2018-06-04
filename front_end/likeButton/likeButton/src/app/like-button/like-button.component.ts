import { Component, OnInit, Input } from '@angular/core';
import { LikesCountService } from '../likes-count.service';

@Component({
    selector: 'app-like-button',
    templateUrl: './like-button.component.html',
    styleUrls: ['./like-button.component.css']
})
export class LikeButtonComponent implements OnInit {

    isSelected: boolean;
    likeNumber: number;
    displayNumber: number;

    constructor(service: LikesCountService) {
        const likeInfo = service.getInfo();
        this.isSelected = likeInfo.isSel;
        this.likeNumber = likeInfo.likeNumb;
    }

    ngOnInit() {
    }

    onClick() {
        this.isSelected = !this.isSelected;
        this.displayNumber = this.isSelected ? this.likeNumber + 1 : this.likeNumber;
        console.log('isSelected = ', this.isSelected);
    }

}


