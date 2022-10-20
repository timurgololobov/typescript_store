export interface IUser {
  userName: string;
  avatarUrl: string;
}
export interface ISearchFormData {
  city: string;
  checkInDate: Date;
  chekOutDate: Date;
  maxPrice: number | null;
  flatRent?: boolean;
  homy?: boolean;
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
