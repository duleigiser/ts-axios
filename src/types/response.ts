import { AxiosRequestConfig } from "./index";
export interface AxiosResponse {
  data: any,
  status: number,
  statusText: string,
  Headers: any,
  config: AxiosRequestConfig
  request: any
}

expect interface AxiosPromise extends Promise<AxiosResponse> {

}