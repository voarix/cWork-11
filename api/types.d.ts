export interface UserFields {
    username: string;
    password: string;
    displayName: string;
    phoneNumber: string;
    token: string;
}

export interface ItemWithoutId {
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    seller: string;
}