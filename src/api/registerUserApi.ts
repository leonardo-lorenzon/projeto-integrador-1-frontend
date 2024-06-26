import {UserRegister} from "@/domain/contracts/UserRegister";
import {NotificationError} from "@/domain/contracts/errors/NotificationError";
import {ApiErrorParser} from "@/api/error/ApiErrorParser";
import {FetchWrapper} from "@/api/wrapper/FetchWrapper";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function registerUserApi(
  userRegister: UserRegister,
  notificationError: NotificationError,
  appRouter: AppRouterInstance
) {
  const bodyRequest = {
    "name": userRegister.name,
    "surname": userRegister.surname,
    "email": userRegister.email,
    "password": userRegister.password
  };

  const response = await new FetchWrapper(appRouter).standardFetch(
    "http://127.0.0.1:5000/user",
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
    return;
  }

  return;
}
