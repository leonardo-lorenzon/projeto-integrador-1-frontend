import isNil from "lodash/isNil";
import {PageNames} from "@/domain/contracts/PageNames";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {AuthenticationHandler} from "@/domain/login/AuthenticationHandler";
import {set} from "lodash";

export class FetchWrapper {
  private appRouter: AppRouterInstance;
  private authenticationHandler: AuthenticationHandler;

  constructor(appRouter: AppRouterInstance) {
    this.appRouter = appRouter;
    this.authenticationHandler = new AuthenticationHandler();
  }

  public async standardFetch(input: RequestInfo | URL, init?: RequestInit) {
    return fetch(input, init);
  }

  public async fetchProtectedResource(input: RequestInfo | URL, init: RequestInit) {
    const token = this.authenticationHandler.getToken();

    if (isNil(token)) {
      this.appRouter.replace(PageNames.login)
      return Response.error();
    }

    set(init, "headers.Authorization", `Bearer ${token}`);
    const response = await fetch(input, init);

    if (response.status === 403) {
      this.appRouter.replace(PageNames.login)
      return Response.error();
    }

    return response;
  }
}
