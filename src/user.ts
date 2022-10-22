import { IUser, iLocalStorage } from "./interfaces.js";
import { renderBlock } from "./lib.js";

export function getUserData(key: unknown) {
  if (
    typeof key == "string" &&
    typeof JSON.parse(localStorage[key]) == "object"
  ) {
    return JSON.parse(localStorage[key]);
  }
}

export function getFavoritesAmount<T extends keyof iLocalStorage>(
  key: T
): iLocalStorage[T] | string {
  if (typeof key == "string" && typeof +localStorage[key] == "number") {
    return JSON.parse(localStorage[key]) as iLocalStorage[T];
  } else {
    return "not found";
  }
}

export class User implements IUser {
  userName: string;
  userIcon: string;
  userFavorite: number;
  constructor(userName: string, userIcon: string, userFavorite: number) {
    this.userName = userName;
    this.userIcon = userIcon;
    this.userFavorite = userFavorite;
  }
}

export function renderUserBlock(
  userName: string,
  userIcon: string,
  userFavorite?: number | string
) {
  const favoritesCaption = userFavorite ? userFavorite : "ничего нет";

  renderBlock(
    "user-block",
    `
    <div class="header-container">
      <img class="avatar" src="${userIcon}" alt="Wade Warren" />
      <div class="info">
          <p class="name">${userName}</p>
          <p class="fav">
            <i class="heart-icon
            ${userFavorite ? " active" : ""}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  );
}

export function toggleFavoriteItem() {
  const allItems = document.querySelector(".js-results-list");
  allItems?.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("js-favorite")) {
      if (target.classList.contains("active")) {
        const newFavoriteData = getFavoritesAmount("favoriteItems");
        if (typeof newFavoriteData !== "string") {
          const index = newFavoriteData.findIndex(
            (item) => item.id == target.dataset.id
          );
          if (index != -1) {
            newFavoriteData.slice(index, 1);
            localStorage.favoriteItems = JSON.stringify(newFavoriteData);
          }
          target.classList.remove("active");
        }
      } else {
        target.classList.add("active");
        localStorage.favoriteItems = JSON.stringify([
          ...getFavoritesAmount("favoriteItems"),
          {
            id: target.dataset.id,
            name: target.dataset.name,
            image: target.dataset.image,
          },
        ]);
      }
    }
  });
}
