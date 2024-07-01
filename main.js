import { Router } from "@vaadin/router";

import "./src/components/form/login-form.js"
import "./src/components/form/register-form.js"
import "./src/components/form/home-page.js"

import { OmniElement, html } from "omni-ui";
export default class Main extends OmniElement {
  connectedCallback() {
    super.connectedCallback();
  }
  firstUpdated() {
    super.firstUpdated();

    const routes = [
      {
        path: "/",
        redirect: "/register-form",
      },
      {
        path: "/register",
        component: "register-form",
      },
      {
        path: "/login",
        component: "login-form",
      },
      {
        path: "/home",
        component: "home-page",
      },
     
    ];

    const outlet = this.shadowRoot.getElementById("outlet");
    const router = new Router(outlet);
    router.setRoutes(routes);
  }

  render() {
    return html`
      <omni-style>
        <!-- Main router outlet -->
        <div id="outlet"></div>
      </omni-style>
    `;
  }
}
OmniElement.register("main-app", Main);
