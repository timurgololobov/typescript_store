export interface FlatBasic {
  id: string;
  name: string;
  description: string;
  image: string;
  remoteness: number;
  bookedDates: number[];
  price: number;
}

export interface FlatSecond {
  id: string;
  title: string;
  details: string;
  photos: string[];
  coordinates: number[];
  bookedDates: Date[];
  totalPrice: number;
}

export interface IUser {
  userName: string;
  userIcon: string;
  userFavorite: number;
}

export interface iSearchFormData {
  startDate: string;
  endDate: string;
  maxPrice?: number;
  flatRent?: boolean;
  homy?: boolean;
}

export interface iPlace {
  provider: string;
  originalId: string;
  image: string;
  name: string;
  description: string;
  remoteness: number;
  price: number;
  bookedDates: Date[] | number[];
  coordinates?: number[];
}

export interface iSortParams {
  key: string;
  by: number;
  value: string;
}

export interface iLocalStorage {
  favoritesAmount: number;
  favoriteItems: [
    {
      id: string;
      image: string;
      name: string;
    }
  ];
  user: {
    username: string;
    avatarUrl: string;
  };
  "flat-rent-db": iPlace[];
}

export interface IPlace {
  id: number | string;
  image: string;
  name: string;
  description: string;
  remoteness: number;
  bookedDates: number[];
  price: number;

  coordinates?: number[];
  details?: string;
  photos?: string[];
  title?: string;
  totalPrice?: number;
}
