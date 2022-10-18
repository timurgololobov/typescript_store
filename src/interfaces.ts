export interface IUser {
  userName: string;
  avatarUrl: string;
}
export interface ISearchFormData {
  city: string;
  checkInDate: Date;
  chekOutDate: Date;
  maxPrice: number | null;
}

export interface IPlace {}
