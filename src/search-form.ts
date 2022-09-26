import { renderBlock } from "./lib.js";

export function renderSearchFormBlock() {
  const date: Date = new Date();
  const maxDate: Date = new Date(date.getFullYear(), date.getMonth() + 2, 0);
  const minDate: Date = new Date();
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
            value= ${checkin.toISOString().split("T")[0]} 
            min= ${minDate.toISOString().split("T")[0]}
            max= ${maxDate.toISOString().split("T")[0]}
            name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" 
            value=${checkout.toISOString().split("T")[0]} 
            min= ${minDate.toISOString().split("T")[0]}
            max= ${maxDate.toISOString().split("T")[0]}
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
}