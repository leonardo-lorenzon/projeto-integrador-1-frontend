import {NotificationError} from "@/domain/contracts/errors/NotificationError";
import {ApiErrorParser} from "@/api/error/ApiErrorParser";
import {LoginCredential} from "@/domain/contracts/LoginCredential";
import {Token} from "@/domain/contracts/Token";
import {ResponseParser} from "@/api/responses/ResponseParser";
import {TokenApiResponse} from "@/api/responses/TokenApiResponse";
import {FetchWrapper} from "@/api/wrapper/FetchWrapper";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function loginApi(
  userRegister: LoginCredential,
  notificationError: NotificationError,
  appRouter: AppRouterInstance
): Promise<Token> {
  const bodyRequest = {
    "email": userRegister.email,
    "password": userRegister.password
  };

  const response = await new FetchWrapper(appRouter).standardFetch(
    "http://127.0.0.1:5000/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyRequest)
    }
  );

  if (response.status !== 200) {
    const error =  await new ApiErrorParser(response).toApplicationErrorCode();
    notificationError.add(error);
    return Token.Empty();
  }

  const tokenResponse = await new ResponseParser(response).parse<TokenApiResponse>()

  return new Token(tokenResponse.token, tokenResponse.refreshToken);
}
