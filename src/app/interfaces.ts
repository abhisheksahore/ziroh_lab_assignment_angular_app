export interface loginInterface {
    status: string
    data: {
        email: string,
        name: string
    }
}


export interface loginBody {
    email: string,
    password: string
}

export interface signUpBody {
    email: string,
    name: string,
    password: string
}

export interface photoInterface {
    id: number,
    albumId: number,
    title: string,
    url: string,
    thumbnailUrl: string
}