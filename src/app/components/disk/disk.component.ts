import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {UrlSegment} from '@angular/router/src/url_tree';
import {AuthService} from '../../services/auth.service';

interface IItem {
    size: number;
    name: string;
    type: string;
    path: string;
}

interface IResource {
    _embedded: {
        items: IItem[];
        limit: number;
        offset: number;
        total: number;
    };
    path: string;
}

@Component({
    selector: 'app-disk',
    templateUrl: './disk.component.html',
    styleUrls: ['./disk.component.css']
})
export class DiskComponent implements OnInit {

    constructor(private http: HttpClient,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private authService: AuthService) {
    }

    public path: string[] = [];

    public items: IItem[] = [];

    ngOnInit() {
        this.init();
    }

    private async init(): Promise<void> {
        if (!this.authService.token) {
            await this.router.navigate(['/auth']);
        } else {
            this.activatedRoute.url.subscribe(urls => this.goUrl(urls));
        }
    }

    private async goUrl(url: UrlSegment[]) {
        this.path = url.map(us => us.path);
        let total = 0;
        this.items = [];
        do {
            try {
                const resource = await this.getResource('/' + this.path.join('/'), this.items.length, 3);
                if (resource.path.slice(6) !== this.path.join('/')) {
                    break;
                }
                total = resource._embedded.total - 1;
                this.items.push(...resource._embedded.items);
            } catch (e) {
                await this.router.navigate(['/auth']);
            }

        } while (this.items.length < total );
    }

    private async getResource(path: string, offset: number = 0, limit: number = 20): Promise<IResource> {
        const options = {
            headers: {
                'Authorization': `OAuth ${this.authService.token}`,
            },
            params: {
                path: path,
                limit: String(limit),
                offset: String(offset),
            },
        };
        return await this.http.get<IResource>('https://cloud-api.yandex.net/v1/disk/resources', options).toPromise();
    }

}
