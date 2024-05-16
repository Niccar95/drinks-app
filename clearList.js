import { html } from "lit";

export const clearList = () => {
  const shadowRoot = document.querySelector("my-app").shadowRoot;
  const list = shadowRoot.getElementById("list");

  return html` <ul id="list"></ul> `;
};
