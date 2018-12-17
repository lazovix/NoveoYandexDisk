import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DiskComponent} from './components/disk/disk.component';
import {AuthComponent} from './components/auth/auth.component';

const routes: Routes = [
    {path: 'auth', component: AuthComponent, pathMatch: 'full'},
    {
        path: 'disk', pathMatch: 'prefix', children: [
            {path: '**', component: DiskComponent, pathMatch: 'full'}
        ]
    },
    {path: '**', redirectTo: 'disk'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRouting {
}
