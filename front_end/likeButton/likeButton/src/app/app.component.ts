import { Component } from '@angular/core';
import { LikeButtonComponent } from '../app/like-button/like-button.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
    likes = {
        body: '...',
        isSelected: true,
        likesCount: 666
    };
}
