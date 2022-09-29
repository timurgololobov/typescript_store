import { renderBlock } from "./lib.js";

export function renderUserBlock(
  userName: string,
  linktoAvatar: string,
  favoriteItemsAmount: number
) {
  const favoritesCaption: string = favoriteItemsAmount
    ? String(favoriteItemsAmount)
    : "ничего нет";

  renderBlock(
    "user-block",
    `
    <div class="header-container">
      <img class="avatar" src=${linktoAvatar} alt=${userName} />
      <div class="info">
          <p class="name">${userName}</p>
          <p class="fav">
            <i class="heart-icon
            ${!favoritesCaption ? " active" : ""}"></i>
            ${favoritesCaption}
          </p>
      </div>
    </div>
    `
  );
}
