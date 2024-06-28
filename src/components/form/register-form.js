import { OmniElement, OmniStyleElement, css, html, nothing } from "omni-ui";
import { Router } from "@vaadin/router";
OmniElement.register();
OmniStyleElement.register();

export default class Register extends OmniElement {
  static properties = {
    username: { type: String },
    email: { type: String },
    password: { type: String },
    confirmPassword: { type: String },
    errors: { type: Object },
    isFormValid: { type: Boolean },
  };

  constructor() {
    super();
    this.username = "";
    this.email = "";
    this.password = "";
    this.confirmPassword = "";
    this.errors = {};
    this.isFormValid = false;
  }

  static get styles() {
    return [
      super.styles,
      css`
        .omni .input {
          width: 300px;
        }
        .input-container {
          display: flex;
          flex-direction: column;
          max-width: 300px;
        }
        .omni .input-container label {
          margin: 0 6px 8px 7px;
        }
        .label-container {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
        }
        .input-container p {
          text-align: left;
        }
        .error-border {
          border: 1px solid var(--color-melon) !important;
        }
        .error-icon {
          --color-icon-lines: #eb0465 !important;
          fill: var(--color-icon-lines) !important;
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
        .image {
          background-image: url(./../assets/register.svg);
          background-size: cover;
          background-position: center;
          overflow: hidden !important;
          min-height: 55.6vh;
          min-width: 70.6vh;
        }
       
        .omni .box {
          box-shadow: 0 10px 60px -5px #008dec;
          padding: 58px;
          border-radius: 21px;
        }
        .pt-8 {
          padding-top: 70px !important;
        }
        .font-size {
          font-size: 29px;
          text-shadow: #4196db 1px 0 10px;
        }
      `,
    ];
  }



  handleUsernameChange(e) {
    this.username = e.target.value;
    const alphanumericRegex = /^[a-zA-Z0-9#@!$]+$/;
    const hasAlphabet = /[a-zA-Z]/.test(this.username);
    const hasNumber = /\d/.test(this.username);

    if (!this.username){
        this.errors.username = "Username is required";
    }
    else if (this.username.length < 7) {
      this.errors.username = 'Username should be at least 7 characters long';
    } else if (!alphanumericRegex.test(this.username)) {
      this.errors.username = 'The username should only contain alphanumeric characters or #@!$';
    } else if (!hasAlphabet || !hasNumber) {
      this.errors.username = 'The username should have the combination of alphabets and numbers';
    } else {
      this.errors.username = '';
    }
    this.checkFormValidity();
    this.requestUpdate();
  }

  handleEmailChange(e) {
    this.email = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     
    if(!this.email){
        this.errors.email = "Email is required"
    }
    else if (!emailRegex.test(this.email)) {
      this.errors.email = 'Please enter a valid email address';
    } else {
      this.errors.email = '';

      // Check if email already exists in local storage
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
      if (registeredUsers.some(user => user.email === this.email)) {
        this.errors.email = 'This email is already registered';
      }
    }
    this.checkFormValidity();
    this.requestUpdate();
  }

  handlePasswordChange(e) {
    this.password = e.target.value;
    const alphanumericSpecialRegex = /^[a-zA-Z0-9!@#$]+$/;
    const hasUppercase = /[A-Z]/.test(this.password);
    const hasSpecial = /[!@#$]/.test(this.password);

    this.errors.password = [];

    if (!this.password) {
        this.errors.password.push('Password is required');
      }
     else{
      
    if (this.password.length < 8) {
      this.errors.password.push('The minimum length for the password is 8 characters.');
    }
    if (!hasUppercase) {
      this.errors.password.push('The password should contain at least 1 uppercase character.');
    }
    if (!hasSpecial) {
      this.errors.password.push('The password should contain at least 1 special character with only !@#$.');
    }
    if (!alphanumericSpecialRegex.test(this.password)) {
      this.errors.password.push('The password should only contain alphanumeric characters or !@#$.');
    }}

    if (this.errors.password.length === 0) {
      this.errors.password = '';
    }
    if (this.confirmPassword) {
        this.validateConfirmPassword();
    }
    this.checkFormValidity();
    this.requestUpdate();
  }

  handleConfirmPasswordChange(e) {
    this.confirmPassword = e.target.value;
    this.validateConfirmPassword();
    this.checkFormValidity();
    this.requestUpdate();
  }
  validateConfirmPassword() {
    if (!this.confirmPassword) {
        this.errors.confirmPassword = 'Confirm password is required';
      } else if (this.password && this.confirmPassword && this.password !== this.confirmPassword) {
      this.errors.confirmPassword = 'Passwords do not match';
    } else {
      this.errors.confirmPassword = '';
    }
  }

  checkFormValidity() {
    this.isFormValid =
      !this.errors.username &&
      !this.errors.email &&
      !this.errors.password &&
      !this.errors.confirmPassword &&
      this.username &&
      this.email &&
      this.password &&
      this.confirmPassword;
  }

  handleRegister() {
    if (this.isFormValid) {
        // Store user data in local storage
        const newUser = {
          username: this.username,
          email: this.email,
          password: this.password,
        };
  
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        registeredUsers.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        Router.go('/login-form'); 
      }
  }

  render() {
    return html`
      <omni-style>
        <div class="columns is-centered is-vcentered hg">
          <div class="column is-narrow pt-8">
           
            <div
              class="box has-text-centered is-flex is-justify-content-space-between is-flex-direction-column pd-7"
            >
              <header class="title ">
                <p class="font-size white">Create an Account</p>
              </header>
  
               <div class="is-flex">


                <div class="image">
                <!-- <h1>bubu</h1> -->
                </div>

                <div class="pl-5 ml-5">

              
              <div class="input-container pt-2">
                <!-- <div class="label-container">
                  <label slot="invoker">USERNAME</label>
                </div> -->
                <input
                  class="${this.errors.username
                    ? "input error-border"
                    : "input"}"
                  placeholder="Username"
                  value="${this.username}"
                  @input="${(e) => this.handleUsernameChange(e)}"
                />

                <div class=" is-flex">
                  ${this.errors.username
                    ? html`<omni-icon
                          class="mt-2 ml-2 error-icon "
                          icon-id="omni:informative:error"
                          aria-label="icon"
                          role="img"
                        ></omni-icon>
                        <span class="pt-2 pl-1 has-text-grey is-size-6"
                          >${this.errors.username}</span
                        >`
                    : ""}
                </div>
              </div>

              <div class="input-container pt-5">
                <!-- <div class="label-container">
                  <label slot="invoker">E-MAIL</label>
                </div> -->
                <input 
                  class="${this.errors.email ? "input error-border" : "input"}"
                  placeholder="Email"
                  value="${this.email}"
                  @input="${(e) => this.handleEmailChange(e)}" />
                <div class="is-flex">
                  ${this.errors.email
                    ? html`
                        <omni-icon
                          class="mt-2 ml-2 error-icon"
                          icon-id="omni:informative:error"
                          aria-label="icon"
                          role="img"
                        ></omni-icon>
                        <span class="pt-2 pl-1 has-text-grey is-size-6"
                          >${this.errors.email}</span
                        >
                      `
                    : nothing}
                </div>
              </div>

              <div class="input-container pt-5">
                <!-- <div class="label-container">
                  <label slot="invoker">PASSWORD</label>
                </div> -->
                <input
                  placeholder="Password"
                  class="${this.errors.password
                    ? "input error-border"
                    : "input"}"
                  value="${this.password}"
                  @input="${(e) => this.handlePasswordChange(e)}"
                />
                <div class="is-flex">
                  ${this.errors.password && Array.isArray(this.errors.password)
                    ? html`
                        <omni-icon
                          class="mt-2 ml-2 error-icon"
                          icon-id="omni:informative:error"
                          aria-label="icon"
                          role="img"
                        ></omni-icon>
                        <div class="pt-2 pl-1 has-text-grey is-size-6">
                          ${this.errors.password.map(error => html`<p>${error}</p>`)}
                        </div>
                      `
                    : ""}
                </div>
              </div>
              <div class="input-container pt-5">
                <!-- <div class="label-container">
                  <label slot="invoker">CONFIRM PASSWORD</label>
                </div> -->
                <input 
                  class="${this.errors.confirmPassword ? "input error-border" : "input"}"
                  placeholder="Confirm password"
                  value="${this.confirmPassword}"
                  @input="${(e) => this.handleConfirmPasswordChange(e)}" />
                <div class="is-flex">
                  ${this.errors.confirmPassword
                    ? html`
                        <omni-icon
                          class="mt-2 ml-2 error-icon"
                          icon-id="omni:informative:error"
                          aria-label="icon"
                          role="img"
                        ></omni-icon>
                        <span class="pt-2 pl-1 has-text-grey is-size-6"
                          >${this.errors.confirmPassword}</span
                        >
                      `
                    : nothing}
                </div>
              </div>

              <div class =" pt-5">
                <button class="button is-link" ?disabled="${!this.isFormValid}" @click="${() => this.handleRegister()}" >Register</button>
              </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </omni-style>
    `;
  }
}
customElements.define("register-form", Register);