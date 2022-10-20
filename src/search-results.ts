import { IPlace } from "./interfaces.js";
import { renderBlock } from "./lib.js";

export function renderSearchStubBlock() {
  renderBlock(
    "search-results-block",
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  );
}

export function renderEmptyOrErrorSearchBlock(reasonMessage) {
  renderBlock(
    "search-results-block",
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  );
}

export const toggleFavoriteItem = (event) => {
  const target = event.target as HTMLElement;
  const id: string = target.dataset.id;
  const favoritesItem: string[] = getFavoritesList();
  const isFindItem = favoritesItem.find((itemId) => itemId === id);
  if (isFindItem) {
    const newFavoritesItems = favoritesItem.filter((itemId) => itemId !== id);
    localStorage.setItem("favoriteItem", newFavoritesItems.join());
    target.classList.remove("active");
  } else {
    localStorage.setItem("favoriteItem", [...favoritesItem, id].join());
    target.classList.add("active");
  }
};

const getFavoritesList = () => {
  return localStorage.getItem("favoriteItem").split(",");
};
const favoriteButton = document.querySelector(".favorites");
favoriteButton.addEventListener("click", toggleFavoriteItem);

export function renderSearchResultsBlock(results: object) {
  const placeItems = [];

  if (Object.keys(results).length != 0) {
    for (const key in results) {
      results[key].forEach((place: IPlace) => {
        placeItems.push(
          `
          <li class="result">
          <div class="result-container">
            <div class="result-img-container">
              <div data-id=${place.id} data-name=${
            JSON.stringify(place.name) || JSON.stringify(place.title)
          } data-image=${
            place.image || place.photos[0]
          } class="favorites js-favorite"></div>
              <img class="result-img" src="${
                place.image || place.photos[0]
              }" alt="">
            </div>	
            <div class="result-info">
              <div class="result-info--header">
                <p>${place.name || place.title}</p>
                <p class="price">${place.price || place.totalPrice}&#8381;</p>
              </div>
              <div class="result-info--map"><i class="map-icon"></i> ${
                place.remoteness || ""
              } км от вас</div>
              <div class="result-info--descr">${
                place.description || place.details
              }</div>
              <div class="result-info--footer">
                <div>
                  <button>Забронировать</button>
                </div>
              </div>
            </div>
          </div>
        </li>
        `
        );
      });
    }
  } else {
    placeItems.push('<li class="result">Данные отсутсвуют</li>');
  }

  renderBlock(
    "search-results-block",
    `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select>
                <option selected="">Сначала дешёвые</option>
                <option selected="">Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list">
      <li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div class="favorites active"></div>
            <img class="result-img" src="./img/result-1.png" alt="">
          </div>	
          <div class="result-info">
            <div class="result-info--header">
              <p>YARD Residence Apart-hotel</p>
              <p class="price">13000&#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> 2.5км от вас</div>
            <div class="result-info--descr">Комфортный апарт-отель в самом сердце Санкт-Петербрга. К услугам гостей номера с видом на город и бесплатный Wi-Fi.</div>
            <div class="result-info--footer">
              <div>
                <button>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div class="favorites"></div>
            <img class="result-img" src="./img/result-2.png" alt="">
          </div>	
          <div class="result-info">
            <div class="result-info--header">
              <p>Akyan St.Petersburg</p>
              <p class="price">13000&#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> 1.1км от вас</div>
            <div class="result-info--descr">Отель Akyan St-Petersburg с бесплатным Wi-Fi на всей территории расположен в историческом здании Санкт-Петербурга.</div>
            <div class="result-info--footer">
              <div>
                <button>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    `
  );
}
