import {Token} from "@/domain/contracts/Token";
import Cookies from "js-cookie";

export class AuthenticationHandler {
  public setToken(token: Token) {
    Cookies.set("token", token.token, {expires: 7});
  }

  public getToken() {
    return Cookies.get("token");
  }
}
