export interface AuthResponseModel {
    token: string;
    auth: boolean;
    email: string;
    username: string;
    fname: string;
    lname: string;
    photoUrl: string;
    userId: number;
    type: string;
    role: number;
}