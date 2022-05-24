export interface User {
  email: string;
  name: string;
  surname: string;
  age: number;
}


export interface DecodedUser {

sub: number;
email: string;
exp: number;
iat: number;

}