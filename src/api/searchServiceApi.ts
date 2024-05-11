import {NotificationError} from "@/domain/contracts/errors/NotificationError";
import {ApiErrorParser} from "@/api/error/ApiErrorParser";
import {FetchWrapper} from "@/api/wrapper/FetchWrapper";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {SearchService} from "@/domain/contracts/SearchService";
import {Service} from "@/domain/contracts/Service";
import {ResponseParser} from "@/api/responses/ResponseParser";
import {SearchServiceApiResponse} from "@/api/responses/SearchServiceApiResponse";

export async function searchServiceApi(
  searchService: SearchService,
  notificationError: NotificationError,
  appRouter: AppRouterInstance
): Promise<Service[]> {

  const response = await new FetchWrapper(appRouter).fetchProtectedResource(
    `http://127.0.0.1:5000/taker/service/${searchService.type}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }
  );

  if (response.status !== 200) {
    const error =  await new ApiErrorParser(response).toApplicationErrorCode();
    notificationError.add(error);
    return [];
  }

  const servicesResponse = await new ResponseParser(response).parse<SearchServiceApiResponse[]>();

  return servicesResponse.map(item => new Service(
    item.id,
    item.accountId,
    item.type,
    item.description,
    item.city,
    item.state,
    item.country
  )
  );
}
