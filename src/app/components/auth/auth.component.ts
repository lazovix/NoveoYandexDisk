import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

const ID = '89710758403d40ce8113145be31450fc';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private authService: AuthService) {
    }

    public error: string;
    public error_description: string;

    ngOnInit() {
        this.init();
    }

    private async init(): Promise<void> {
        const fragment = this.activatedRoute.snapshot.fragment;
        if (fragment) {
            const urlTree = this.router.parseUrl('?' + fragment);
            const {error, error_description, access_token} = urlTree.queryParams;
            this.error = error;
            this.error_description = error_description;
            this.authService.token = access_token;
            if (!this.authService.token) {
                if (!this.error) {
                    this.authorize();
                }
            } else {
                await this.router.navigate(['/disk']);
            }
        } else {
            this.authorize();
        }
    }

    public authorize() {
        window.location.href = `https://oauth.yandex.ru/authorize?response_type=token&client_id=${ID}`;
    }

}
