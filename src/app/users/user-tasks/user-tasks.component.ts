import { Component, inject, input } from '@angular/core';
import { UsersService } from '../users.service';
import { ResolveFn, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent {
  userName = input.required<string>();
  message = input.required<string>();
}

export const resolveUserName: ResolveFn<string> = activatedRoute => {
  const usersService = inject(UsersService);
  return (
    usersService.users.find(u => u.id === activatedRoute.paramMap.get('userId'))
      ?.name || ''
  );
};

export const resolveTitle: ResolveFn<string> = (
  activatedRoute,
  routerState
) => {
  return resolveUserName(activatedRoute, routerState) + "'s Tasks";
};
