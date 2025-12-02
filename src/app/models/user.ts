export interface CreateUserRequest {
    email: string,
    username: string,
    password: string
}

export interface CreateUserResponse {
    email: string,
    username: string
}

export interface User {
    email: string,
    username: string
}

export interface LoginRequest {
    email: string,
    password: string
}

export interface LoginResponse {
    accessToken: string,
    refreshToken: string
}

export interface AccessTokenResponse {
    accessToken: string
}

export interface UpdateUserEmailRequest {
    currentEmail: string,
    newEmail: string,
    password: string
}