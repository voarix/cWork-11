export interface User {
  _id: string;
  username: string;
  displayName: string;
  phoneNumber: string;
  token: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  phoneNumber: string;
}

export interface Item {
  _id: string;
  title: string;
  price: number;
  image: string;
  category: {
    _id: string;
    title: string;
  };
  seller: {
    _id: string;
    username: string;
  };
}

export interface ItemFull {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  seller: {
    _id: string;
    username: string;
    displayName: string;
    phoneNumber: string;
  };
  isSeller: boolean;
}

export interface ItemMutation {
  title: string;
  description: string;
  price: number | string;
  image: File | null;
  category: string;
}

export interface Category {
  _id: string;
  title: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}
