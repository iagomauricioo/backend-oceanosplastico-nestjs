/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: process.env.USERNAME_ADM,
      password: process.env.PASSWORD_ADM,
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
