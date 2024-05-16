import { html } from "lit";

export const loaderHtml = (feedback) => {
  return html` <div id="loader">${feedback}</div> `;
};

export const showIngredients = (drink) => {
  const ingredientList = [];

  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];
    if (ingredient) {
      ingredientList.push(html`<li>${ingredient}</li>`);
    }
  }
  return html` <h2>Ingredients</h2>
    <ul id="list">
      ${ingredientList}
    </ul>`;
};
