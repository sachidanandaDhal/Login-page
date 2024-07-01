import { OmniElement, OmniStyleElement, css, html, nothing } from "omni-ui";
import { Router } from "@vaadin/router";
OmniElement.register();
OmniStyleElement.register();

export default class LogIn extends OmniElement {
  static properties = {
    username: { type: String },
    password: { type: String },
    email: { type: String },
    authError: { type: String }
  };

  constructor() {
    super();
    this.username = '';
    this.password = '';
    this.email = '';
    this.authError = '';
  }


  static get styles() {
    return [
      super.styles,
      css`
        .omni .input {
          width: 300px;
        }
        .error-border {
          border: 1px solid var(--color-melon) !important;
        }
        .error-icon {
          --color-icon-lines: #eb0465 !important;
          fill: var(--color-icon-lines) !important;
        }
        .input-container {
          display: flex;
          flex-direction: column;
          max-width: 300px;
        }
        .image {
          background-image: url(./../assets/log.svg);
          background-size: cover;
          background-position: center;
          overflow: hidden !important;
          min-height: 52.6vh;
          min-width: 75.6vh;
        }
        .hg::after {
          content: "";
          border-top-left-radius: 50% 100%;
          border-top-right-radius: 50% 100%;
          position: absolute;
          bottom: 0;
          z-index: -1;
          width: 100%;
          background-color: #0578f4;
          height: 85%;
        }
        .omni .box {
          box-shadow: 0 10px 60px -5px #008dec;
          padding: 58px;
          border-radius: 21px;
        }
        .pt-8 {
          padding-top: 70px !important;
        }
        .loginform{
          padding-top: 90px;
        }
        .font-size {
          font-size: 29px;
          text-shadow: #4196db 1px 0 10px;
        }
      `,
    ];
  }


handleUsernameInput(e) {
  this.username = e.target.value.trim();
  this.authError = '';
  
  const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
  const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9#@!$]+$/;


  switch (true) {
      case !this.username:
          this.usernameError = "Enter email or username";
          break;
      case !emailRegex.test(this.username) && !alphanumericRegex.test(this.username):
          this.usernameError = "Enter a valid username";
          break;
      default:
          this.usernameError = '';
          break;
  }
  
  this.requestUpdate();
}

  handlePasswordInput(e) {
    this.password = e.target.value.trim();
    this.authError = '';
    
    switch (true) {
        case !this.password:
            this.passwordError = "Enter password";
            break;
        case !/^([a-zA-Z0-9]*[!@#$]+[a-zA-Z0-9]*)$/.test(this.password):
            this.passwordError = "Enter a valid password";
            break;
        default:
            this.passwordError = '';
            break;
    }
    
    this.requestUpdate();
}


    render() {
        return html`
    <omni-style>
        <div class="columns is-centered is-vcentered hg">
          <div class="column is-narrow pt-8">
            <div class="box has-text-centered is-flex is-justify-content-space-between is-flex-direction-column pd-7">
              <header class="title ">
                <p class="font-size white">LOG IN </p>
              </header>
              <div class="is-flex">
              
            <div class= "loginform">
              <div class="input-container">
                <p class="control has-icons-left ">
                
                  <input
                    id="signin-username"
                   class="${this.usernameError || this.authError ? "input error-border" : "input"}"
                    name="signin-username"
                    type="text"
                    placeholder="Email or Username" @input=${(e) =>this.handleUsernameInput(e)}
                  />
                  <span class="icon is-small is-left">
                    <omni-icon
                      class="is-size-1"
                      style="fill:var(--color-shark)"
                      icon-id="omni:informative:user"
                    ></omni-icon>
                  </span>
                </p>
                ${this.usernameError
                  ? html` <div class="is-flex">
                      <omni-icon
                        class="mt-2 ml-2  error-icon "
                        icon-id="omni:informative:error"
                        aria-label="icon"
                        role="img"
                      ></omni-icon>
                       <span class="pt-2 pl-1  has-text-grey is-size-6"
                        >${this.usernameError}</span
                      >
                    </div>`
                  : ""}
              </div>
              <div class="input-container pt-5">
                <p class="control has-icons-left">
                  <input
                    id="signin-password"
                     class="${this.passwordError || this.authError ? "input error-border" : "input"}"
                    name="signin-password"
                    type="password"
                    placeholder="Password"
                    @input="${(e) => this.handlePasswordInput(e)}"
                  />
                  <span class="icon is-small is-left">
                    <omni-icon
                      class="is-size-1"
                      style="fill:var(--color-shark)"
                      icon-id="omni:interactive:lock"
                    ></omni-icon>
                  </span>
                </p>
                ${this.passwordError
                  ? html` <div class="is-flex">
                      <omni-icon
                        class="mt-2 ml-2  error-icon "
                        icon-id="omni:informative:error"
                        aria-label="icon"
                        role="img"
                      ></omni-icon>
                       <span class="pt-2 pl-1  has-text-grey is-size-6"
                        >${this.passwordError}</span
                      >
                    </div>`
                  : ""}
                  ${this.authError
                ? html` <div class="is-flex">
                      <omni-icon
                        class="mt-2 ml-2  error-icon "
                        icon-id="omni:informative:error"
                        aria-label="icon"
                        role="img"
                      ></omni-icon>
                       <span class="pt-2 pl-1  has-text-grey is-size-6"
                        >${this.authError}</span
                      >
                    </div>`
                : ""}
              </div>
              
              <div class="pt-5">
                <button
                  id="signin-submit"
                  class="button is-link width"
                  @click=${this.doSignIn}
                >
                  LogIn
                </button>
              </div>
             
              </div>
              <div class="image"></div> 
            </div>
            <p class="is-flex size-1">Not registered? <a href="/register"> Create an account</a></p>
            </div>
          </div>
          
        </div>
      </omni-style>
        `;
      }


      doSignIn() {
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        const user = registeredUsers.find(u => (u.username === this.username || u.email === this.username) && u.password === this.password);
        if (user) {
          Router.go("/home");
          this.authError = '';
        } else {
          this.authError = "Either the username or password is invalid.";
        }
      }

}
customElements.define("login-form", LogIn);