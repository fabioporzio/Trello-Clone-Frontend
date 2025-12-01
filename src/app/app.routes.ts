import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Registration } from './components/registration/registration';
import { Home } from './components/home/home';

export const routes: Routes = [
    {
        path: "login",
        component: Login,
        title: "Login Page"
    },
    {
        path: "register",
        component: Registration,
        title: "Registration Page"
    },
    {
        path: "home",
        component: Home,
        title: "Home"
    }
];
