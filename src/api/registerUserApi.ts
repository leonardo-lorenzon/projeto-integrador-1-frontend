import {UserRegister} from "@/contracts/UserRegister";
import {NotificationError} from "@/contracts/errors/NotificationError";
import {ApiErrorParser} from "@/api/error/ApiErrorParser";

export async function registerUserApi(userRegister: UserRegister, notificationError: NotificationError) {
  const bodyRequest = {
    "name": userRegister.name,
    "surname": userRegister.surname,
    "email": userRegister.email,
    "password": userRegister.password
  };

  const response = await fetch(
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
