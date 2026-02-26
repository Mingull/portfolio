import { NextResponse } from "next/server";
import { ApiResponse, ErrorCodeKey, JsonApi, SuccessCodeKey } from "../core/types";

export const toNextResponse = <S extends SuccessCodeKey | ErrorCodeKey, T extends JsonApi = JsonApi>(res: ApiResponse<S, T>) => NextResponse.json(res, { status: res.status });

export const json = toNextResponse;
