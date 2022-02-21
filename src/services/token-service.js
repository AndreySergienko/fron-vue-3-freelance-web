export default class TokenService {
  static #accessToken = ''
  static #csrfToken = ''

  static get isAccessToken() {
    return !!this.#accessToken
  }

  static get accessToken() {
    return this.#accessToken
  }

  static get csrfToken() {
    return this.#csrfToken
  }

  static set accessToken(value) {
    this.#accessToken = value
  }

  static set csrfToken(value) {
    this.#csrfToken = value
  }
}
