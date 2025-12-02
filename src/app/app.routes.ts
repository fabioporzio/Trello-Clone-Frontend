import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Registration } from './components/registration/registration';
import { Home } from './components/home/home';
import { Project } from './components/project/project';
import { Task } from './components/task/task';

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
    },
    {
        path: "project/:id",
        component: Project,
        title: "Project" //Fix this to match project's name, if possible
    },
    {
        path: "task/:id",
        component: Task,
        title: "Task" //Fix this to match project's name, if possible
    }
];
