import { HttpService } from "@lib/api";
import { AnyObject } from "@lib/models";

const httpService = new HttpService(() => {alert("Log out")}, "/cloud-basic")

export const login = (data: AnyObject) => httpService.postWithPrefix('/cloud/v2/auth/login', data, {formData: true})