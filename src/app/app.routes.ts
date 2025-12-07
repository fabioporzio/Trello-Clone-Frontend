import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Registration } from './components/registration/registration';
import { Home } from './components/home/home';
import { Project } from './components/project/project';
import { Task } from './components/task/task';
import { ChangeEmail } from './components/change-email/change-email';
import { ChangeUsername } from './components/change-username/change-username';
import { ChangePassword } from './components/change-password/change-password';

export const routes: Routes = [
    {
        path: "",
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
    },
    {
        path: "change-email",
        component: ChangeEmail,
        title: "Change Email Page"
    },
    {
        path: "change-username",
        component: ChangeUsername,
        title: "Change Username Page"
    },
    {
        path: "change-email",
        component: ChangePassword,
        title: "Change Password Page"
    }
];
