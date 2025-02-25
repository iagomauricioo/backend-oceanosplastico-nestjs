export class SignInDto {
  username: string;
  password: string;

  getUsername(): string {
    return this.username;
  }

  getPassword(): string {
    return this.password;
  }
}
