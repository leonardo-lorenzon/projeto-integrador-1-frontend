import {UserRegister} from "@/domain/contracts/UserRegister";
import {NotificationError} from "@/domain/contracts/errors/NotificationError";
import {ApiErrorParser} from "@/api/error/ApiErrorParser";
import {FetchWrapper} from "@/api/wrapper/FetchWrapper";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {Service} from "@/domain/contracts/Service";

export async function addServiceApi(
  service: Service,
  notificationError: NotificationError,
  appRouter: AppRouterInstance
) {
  const bodyRequest = {
    "type": service.type,
    "description": service.description,
    "city": service.city,
    "state": service.state,
    "country": service.country
  };

  const response = await new FetchWrapper(appRouter).fetchProtectedResource(
    `http://127.0.0.1:5000/provider/service/${service.accountId}`,
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
