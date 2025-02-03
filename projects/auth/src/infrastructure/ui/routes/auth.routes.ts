import { Routes } from "@angular/router";
import { MainLayoutComponent } from "shared";
import { HomeComponent } from "../components/home/home.component";
import { CreateUsersComponent } from "../containers/create-users/create-users.component";
import { AuthComponent } from "../containers/auth-users/auth.component";
import { authGuard } from "./auth.guard";

export const authRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: "login", component:AuthComponent},
    {
        path: 'dashboard',
        component: MainLayoutComponent, canActivate: [authGuard],
        children: [
            { path: 'register', component: CreateUsersComponent }
        ]
      },

      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home' }

      
  ];