import { renderBlock } from "./lib.js";

export function renderUserBlock(
  userName: string,
  linktoAvatar: string,
  favoriteItemsAmount: number
) {
  const favoritesCaption: string =
    favoriteItemsAmount < 1 ? "ничего нет" : String(favoriteItemsAmount);
  const hasFavoriteItems = favoriteItemsAmount ? true : false;

  renderBlock(
    "user-block",
    `
    <div class="header-container">
      <img class="avatar" src=${linktoAvatar} alt=${userName} />
      <div class="info">
          <p class="name">${userName}</p>
          <p class="fav">
            <i class="heart-icon
            ${hasFavoriteItems ? " active" : ""}"></i>
            ${favoritesCaption}
          </p>
      </div>
    </div>
    `
  );
}
