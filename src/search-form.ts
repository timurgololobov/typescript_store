import { renderBlock } from "./lib.js";
import { ISearchFormData, IPlace } from "./interfaces";
import { searchPlace } from "./api.js";
import {
  renderSearchResultsBlock,
  toggleFavoriteItem,
} from "./search-results.js";
import { FlatRentSdk } from "./geekbrains-flat-rent-sdk.js";

const sdk = new FlatRentSdk();

export function renderSearchFormBlock() {
  const date: Date = new Date();
  const maxDateT: Date = new Date(date.getFullYear(), date.getMonth() + 2, 0);
  const minDateT: Date = new Date();
  const checkin: Date = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 2
  );
  const checkout: Date = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 4
  );
  const checkInDate = checkin.toISOString().split("T")[0];
  const checkOutDate = checkout.toISOString().split("T")[0];
  const minDate = minDateT.toISOString().split("T")[0];
  const maxDate = maxDateT.toISOString().split("T")[0];

  renderBlock(
    "search-form-block",
    `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" 
            value= ${checkInDate} 
            min= ${minDate}
            max= ${maxDate}
            name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" 
            value=${checkOutDate} 
            min= ${minDate}
            max= ${maxDate}
            name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  );
  const frmSearch = document.getElementById("frmSearch");
  frmSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    const inpCity = frmSearch.querySelector("#city") as HTMLInputElement;
    const inpCheckInDate = frmSearch.querySelector(
      "#check-in-date"
    ) as HTMLInputElement;
    const inpCheckOutDate = frmSearch.querySelector(
      "#check-out-date"
    ) as HTMLInputElement;
    const inpMaxPrice = frmSearch.querySelector(
      "#max-price"
    ) as HTMLInputElement;

    const searchFormData: ISearchFormData = {
      city: inpCity.value,
      checkInDate: new Date(inpCheckInDate.value),
      chekOutDate: new Date(inpCheckOutDate.value),
      maxPrice: inpMaxPrice.value === "" ? null : +inpMaxPrice.value,
    };
    search(searchFormData, searchCallback);
  });
}

interface ISearchCallBack {
  (DataI): void;
}
type DataI = {
  data: IPlace | null;
  error: Error | null;
};
const searchCallback: ISearchCallBack = (data: DataI) => {
  if (data.error) {
    console.error(data.error);
  }
  console.log("searchCallback", data.data);
};
export function search(data: ISearchFormData, searchCallback: ISearchCallBack) {
  console.log("funntion search searchFormData =", data);
  const a = Boolean(Math.random() < 0.5);
  if (a) searchCallback({ error: new Error("error"), data: [] });
  else {
    const places: IPlace[] = [];
    searchCallback({ error: null, data: [] });
  }
}

export function findData(data: ISearchFormData): void {
  new Promise(function (resolve, reject) {
    if (data["flatRent"]) {
      resolve(
        new Promise((resolve, reject) => {
          // (*)
          sdk
            .search({
              city: "Санкт-Петербург",
              checkInDate: new Date(data["checkInDate"]),
              checkOutDate: new Date(data["chekOutDate"]),
              priceLimit: data["maxPrice"],
            })
            .then((flatResult: object | null) => {
              resolve(flatResult);
            });
        })
      );
    }
    resolve({});
  })
    .then((flatResult: {}) => {
      if (data["homy"]) {
        return new Promise((resolve, reject) => {
          searchPlace(
            new Date(data["startDate"]),
            new Date(data["endDate"]),
            data["maxPrice"]
          ).then((homyResults: object | null) => {
            if (Object.keys(flatResult).length != 0) {
              resolve({ flatResult, homyResults });
            }
            resolve({ homyResults });
          });
        });
      }
      if (Object.keys(flatResult).length != 0) {
        return { flatResult };
      }
      return {};
    })
    .then((allResult: {}) => {
      renderSearchResultsBlock(allResult);
      toggleFavoriteItem;
    });
}
