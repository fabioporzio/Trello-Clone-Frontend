export interface CreateUserRequest {
    email: string,
    username: string,
    password: string
}

export interface CreateUserResponse {
    email: string,
    username: string
}