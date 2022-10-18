import { renderBlock } from "./lib.js";
import { IUser } from "./interfaces.js";
import { APIlocal } from "./api.js";

export function renderUserBlock(
  userName: string,
  avatar: string,
  favoriteItemsAmount?: number
): void {
  const favoritesCaption: number | string = favoriteItemsAmount
    ? String(favoriteItemsAmount)
    : "ничего нет";

  renderBlock(
    "user-block",
    `
    <div class="header-container">
      <img class="avatar" src="/img/${avatar}" alt=${userName} />
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

export function getUserData(): IUser | null {
  const lsItem: string = APIlocal.get("user");
  if (lsItem)
    try {
      const user: unknown = JSON.parse(lsItem);
      if (typeof user === "object" && "userName" in user && "avatarUrl" in user)
        return { userName: user["userName"], avatarUrl: user["avatarUrl"] };
    } catch (e) {
      throw new Error(e);
    }
  return null;
}

export function getFavoritesAmount(): number {
  const amount: unknown = APIlocal.get("favoritesAmount");
  if (amount && !isNaN(Number(amount))) return +amount;
  else return 0;
}
//тесты
export function setLocalStorage(): void {
  APIlocal.set("user", "{'userName': 'Petr', avatarUrl: 'cat.png' }");
  APIlocal.set("favoritesAmount", "5");
}
