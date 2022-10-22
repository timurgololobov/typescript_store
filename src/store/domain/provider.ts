import { Place } from "./place.js";
import { SearchFilter } from "./search-filter.js";

export interface Provider {
  search(filter: SearchFilter): Promise<Place[]>;
}
