import { Provider } from "../../domain/provider.js";
import { SearchFilter } from "../../domain/search-filter.js";
import { FlatSecond as Flat } from "../../../interfaces.js";
import { Place } from "../../domain/place.js";
import { FlatRentSdk } from "../../../flat-rent-sdk.js";

export class FlatrentProvider implements Provider {
  public static provider = "flatrent";
  private static apiUrl = "http://localhost/3030";
  private static sdk = new FlatRentSdk();

  public search(query: SearchFilter): Promise<Place[]> {
    return new Promise((resolve, reject) => {
      FlatrentProvider.sdk
        .search(query)
        .then((response: Flat[] | null) => {
          resolve(this.convertFlatListResponse(response));
        })
        .catch((err) => {
          throw new Error(err);
        });
    });
  }

  private convertFlatListResponse(response: Flat[] | null): Place[] {
    if (response) {
      return response.map((item) => {
        return this.convertFlatResponse(item);
      });
    } else {
      throw new Error();
    }
  }

  private convertFlatResponse(item: Flat): Place {
    return new Place(
      FlatrentProvider.provider,
      item.id,
      item.photos[0],
      item.title,
      item.details,
      0,
      item.totalPrice,
      item.bookedDates,
      item.coordinates
    );
  }
}
