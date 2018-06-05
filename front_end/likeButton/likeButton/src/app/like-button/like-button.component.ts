import { Component, OnInit, Input } from '@angular/core';
import { LikesCountService } from '../likes-count.service';

@Component({
    selector: 'app-like-button',
    templateUrl: './like-button.component.html',
    styleUrls: ['./like-button.component.css']
})
export class LikeButtonComponent implements OnInit {

    @Input('isSelected') isSelected: boolean;
    @Input('likesCount') likesCount: number;

    constructor(service: LikesCountService) {
        const likeInfo = service.getInfo();
        this.isSelected = likeInfo.isSel;
        this.likesCount = likeInfo.likeNumb;
    }

    ngOnInit() {
    }

    onClick() {
        this.isSelected = !this.isSelected;
        this.likesCount += this.isSelected ?  1 : -1;
    }

}


