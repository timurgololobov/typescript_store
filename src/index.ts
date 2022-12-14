import { renderSearchFormBlock } from "./search-form.js";
import { renderSearchStubBlock } from "./search-results.js";
import { renderUserBlock, getFavoritesAmount, getUserData } from "./user.js";
// import { renderToast } from "./lib.js";

window.addEventListener("DOMContentLoaded", () => {
  const user = getUserData();
  console.log("user = ", user);
  const amount = getFavoritesAmount();
  console.log("amoun = ", amount);
  renderUserBlock("Wade Warren", "avatar.png", 0);
  renderSearchFormBlock();
  renderSearchStubBlock();
  // renderToast(
  //   {
  //     text: "Это пример уведомления. Используйте его при необходимости",
  //     type: "success",
  //   },
  //   {
  //     name: "Понял",
  //     handler: () => {
  //       console.log("Уведомление закрыто");
  //     },
  //   }
  // );
});
