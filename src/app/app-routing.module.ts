import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {AuthGuard} from './auth-guard.service';
import {CanDeactivateGuard} from './servers/edit-server/can-deactivate-guard.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent, children: [
    { path: ':id/:name', component: UserComponent}, //the colon indicates that the path is dynamic
  ]},
  { path: 'servers', 
    // canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: ServersComponent, 
    children: [
    { path: ':id', component: ServerComponent},
    { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard]},
  ]},
  // { path: 'servers/:id', component: ServerComponent},
  // { path: 'servers/:id/edit', component: EditServerComponent},
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/not-found' } //** is the wildcard catchall for any non-specified path
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes),
        ],
        exports: [RouterModule]
})
export class AppRoutingModule {

}