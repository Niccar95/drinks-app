import { html, css, render } from "lit";

import { loaderHtml, showIngredients } from "./htmlFunctions";
import { clearList } from "./clearList";

import { component, useCallback, useEffect } from "haunted";

const MyApp = () => {
  const style = css`
    @import url("https://fonts.googleapis.com/css2?family=Lemon+Tuesday&display=swap");

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: "Lemon Tuesday", cursive;
    }

    h1 {
      font-size: 3.2em;
      line-height: 1.1;
    }

    form {
      display: flex;
      justify-content: center;
      width: 100%;
      padding: 0.5em;
    }

    input {
      width: 250px;
      padding: 0.6em;
      border: none;
      border-radius: 15px 0 0 15px;
      padding: 0.5em;

      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: border-color 0.3s, box-shadow 0.3s;
    }

    input:focus {
      border-color: #007bff;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
      outline: none;
    }

    button {
      border: none;
      border-radius: 0 15px 15px 0;
      padding: 0.5em 1.2em;
      font-size: 1em;
      font-weight: 500;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      background-color: crimson;
      color: white;
      cursor: pointer;
      transition: border-color 0.25s, background-color 0.25s;
    }
    button:hover {
      background-color: #fa7070;
    }

    #drinkList {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1em;
      text-align: center;
      width: 420px;
      height: 600px;
      padding: 1em;
      overflow-y: auto;
      box-shadow: inset 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    ::-webkit-scrollbar {
      width: 10px;
    }

    ::-webkit-scrollbar-track {
      background: white;
    }

    ::-webkit-scrollbar-thumb {
      background: lightgrey;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    h2 {
      border-bottom: solid #fa7070 4px;
      padding: 0.5em;
    }

    .drinkImg {
      width: 300px;
      cursor: pointer;
      transition: width 0.25s;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .drinkImg:hover {
      width: 310px;
    }

    #mainSection {
      display: flex;
      justify-content: space-between;
    }

    #ingredients {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5em;
      width: 400px;
      height: 600px;
      padding: 1em;
      box-shadow: inset 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    ul {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      border: solid lightgrey 2px;
      width: 100%;
      min-height: 40%;
      max-height: 70%;
      overflow-y: auto;
      list-style: none;
      padding: 1em 0 0 0;
      margin: 0;
    }

    li {
      margin: 0 0 2em 2em;
    }

    #loaderContainer {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: solid lightgrey 2px;
      width: 100%;
      height: 100px;
    }

    #loader {
      display: none;
      font-size: 1.2em;
      transition: opacity 0.5s ease-in-out;
      opacity: 0;
    }
  `;

  let drinksList = [];
  let searchValue = "";
  let feedback = "";

  const shadowRoot = document.querySelector("my-app").shadowRoot;
  let loader = shadowRoot.getElementById("loader");

  useEffect(() => {
    const shadowRoot = document.querySelector("my-app").shadowRoot;
    render(loaderHtml(feedback), shadowRoot.getElementById("loaderContainer"));
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" +
          searchValue
      );

      if (response === null) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      drinksList = data.drinks;

      const shadowRoot = document.querySelector("my-app").shadowRoot;
      const drinkListContainer = shadowRoot.getElementById("drinkList");

      render(createHTML(drinksList), drinkListContainer);
    } catch {
      const shadowRoot = document.querySelector("my-app").shadowRoot;
      const loaderContainer = shadowRoot.getElementById("loaderContainer");
      loader = shadowRoot.getElementById("loader");

      if (loader) {
        loader.style.display = "block";

        setTimeout(() => {
          loader.style.opacity = "1";
        }, 0);

        feedback = "No results found";

        clearList();

        render(
          loaderHtml(feedback),
          shadowRoot.getElementById("loaderContainer")
        );
      }

      render(loaderHtml(feedback), loaderContainer);
    }
  };

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();

    const form = e.target;
    searchValue = form.querySelector("#searchInput").value;

    await fetchData();
    console.log(drinksList);

    form.querySelector("#searchInput").value = "";
  }, []);

  const onClick = useCallback((drink) => {
    const shadowRoot = document.querySelector("my-app").shadowRoot;
    loader = shadowRoot.getElementById("loader");

    if (loader) {
      loader.style.display = "block";

      setTimeout(() => {
        loader.style.opacity = "1";
      }, 0);

      feedback = "Searching...";

      render(
        loaderHtml(feedback),
        shadowRoot.getElementById("loaderContainer")
      );
    }

    setTimeout(() => {
      showIngredients(drink);
      const shadowRoot = document.querySelector("my-app").shadowRoot;
      render(showIngredients(drink), shadowRoot.getElementById("ingredients"));

      loader.style.opacity = "0";

      if (loader) {
        setTimeout(() => {
          loader.style.display = "none";
        }, 500);
      }
    }, 2000);
  }, []);

  const createHTML = (drinksList) => {
    return html`
      ${drinksList.map(
        (drink) => html`
          <div>
            <h2>${drink.strDrink}</h2>
            <img
              class="drinkImg"
              @click=${() => onClick(drink)}
              src="${drink.strDrinkThumb}"
              alt="${drink.strDrink}"
            />
          </div>
        `
      )}
    `;
  };

  return html`
    <style>
      ${style}
    </style>
    <div>
      <form @submit=${onSubmit}>
      <input id="searchInput"></input>
        <button part="button">Search</button>
      </form>
    </div>

    <section id="mainSection">
    
    <div id="drinkList">
      ${createHTML(drinksList)}
        </div>
    
        <div id="ingredients">
        <div id="loaderContainer"></div>
        </div>
    
    </section>
  `;
};

customElements.define("my-app", component(MyApp));

const appRoot = document.getElementById("app");

render(html`<my-app></my-app>`, appRoot);
