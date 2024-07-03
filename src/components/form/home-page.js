import { OmniElement, OmniStyleElement, css, html, nothing } from "omni-ui";
import { Router } from "@vaadin/router";
OmniElement.register();
OmniStyleElement.register();

export default class Home extends OmniElement {
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          /* Customizable CSS Variables and their defaults */
          --omni-app-layout-header-height: 50px;
          --omni-app-layout-drawer-width: 180px;
          --omni-app-layout-drawer-closed-width: 0px;
          --omni-app-layout-end-drawer-width: 300px;
          --omni-app-layout-bg: #f1f5fa;
          --omni-app-layout-header-bg: #fff;
          --omni-app-layout-drawer-bg: #fff;
          --omni-app-layout-end-drawer-bg: #fff;

          /* Variables useful for nesting layouts */
          --omni-app-layout-height: 100vh;
          --omni-app-layout-top: 0px;
          --omni-app-layout-left: 0px;
          --omni-app-layout-drawer-z-index: 32;
          --omni-app-layout-end-drawer-z-index: 34;
          --omni-app-layout-header-z-index: 36;
        }
      `,
    ];
  }

  handlelogout() {
    this.openOmniDialogElModal();
  }
  openOmniDialogElModal() {
    const modal = this.shadowRoot.querySelector("#modal");
    modal.openModal();
  }

  onSubmit() {
    const modal = this.shadowRoot.querySelector("#modal");
    modal.closeModal();
    Router.go("/login");
  }

  render() {
    return html`
      <omni-style>
        <omni-app-layout>
          <header slot="header" class="pt-1 pl-1">
            <omni-toolbar>
              <button class="button is-primary">Home</button>
              <button class="button is-primary">About</button>
              <div slot="center-end" class="pr-4">
                <button
                  slot="center-end"
                  class="button is-outlined is-danger "
                  @click="${() => this.handlelogout()}"
                >
                  <omni-icon icon-id="icon:interactive:unlock"></omni-icon>
                  <span>Logout</span>
                </button>
              </div>
            </omni-toolbar>
          </header>
          <div  class="pt-1 pl-1">
            <h1>bubu</h1>
          </div>
          <omni-dialog
            id="modal"
            modalType="modal"
            modalStyle="error"
            modalTitle=" User Confirmation"
          >
            >
            <p slot="content">
              Are you sure you want to log out of this account?
            </p>
            <button
              class="button is-outlined is-medium is-danger"
              slot="button"
              @click=${this.onSubmit}
            >
              Logout
            </button>
          </omni-dialog>
        </omni-app-layout>
      </omni-style>
    `;
  }
}
customElements.define("home-page", Home);
