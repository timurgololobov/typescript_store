import { renderSearchFormBlock } from "./search-form.js";
import { renderSearchStubBlock } from "./search-results.js";
import {
  renderUserBlock,
  getFavoritesAmount,
  getUserData,
  setLocalStorage,
} from "./user.js";
import { renderToast } from "./lib.js";

window.addEventListener("DOMContentLoaded", () => {
  setLocalStorage;
  const user = getUserData();
  // console.log("user = ", user);
  const amount = getFavoritesAmount();
  // console.log("amoun = ", amount);
  renderUserBlock(user.userName, user.avatarUrl, amount);
  renderSearchFormBlock();
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
