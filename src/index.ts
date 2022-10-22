import { CallBack, renderSearchFormBlock, search } from "./search-form.js";
import { renderSearchStubBlock } from "./search-results.js";
import { renderUserBlock, getUserData, getFavoritesAmount } from "./user.js";
import { renderToast } from "./lib.js";

if (typeof window !== "undefined")
  window.addEventListener("DOMContentLoaded", () => {
    // Set localStorage for test
    localStorage.user = JSON.stringify({
      username: "Wade Warren",
      avatarUrl: "/img/avatar.png",
    });
    localStorage.favoritesAmount = 3;
    localStorage.favoriteItems = JSON.stringify([]);

    const user = getUserData("user");
    const username = user.username;
    const avatarUrl = user.avatarUrl;
    const favoritesAmount = getFavoritesAmount("favoritesAmount");

    renderUserBlock(username, avatarUrl, +favoritesAmount);
    renderSearchFormBlock({ startDate: "", endDate: "", maxPrice: 0 });
    search("search", CallBack);
    renderSearchStubBlock();
    renderToast(
      {
        text: "Это пример уведомления. Используйте его при необходимости",
        type: "success",
      },
      {
        name: "Понял",
        handler: () => {
          console.log("Уведомление закрыто");
        },
      }
    );
  });
