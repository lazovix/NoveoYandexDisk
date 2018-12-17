import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRouting} from './app.routing';
import {DiskComponent} from './components/disk/disk.component';
import {AuthComponent} from './components/auth/auth.component';

@NgModule({
    declarations: [
        AppComponent,
        DiskComponent,
        AuthComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRouting,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
