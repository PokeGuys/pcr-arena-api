export type BaseError = {
  server_error: {
    status: any;
    result_code: any;
    message: string;
  };
};

export type BaseApiResponse<T = any> = {
  data: BaseError | T;
  data_headers: {
    result_code: number;
    servertime: number;
    short_udid: number;
    sid: string;
    viewer_id?: string | null;
    required_res_ver?: string | null;
  };
};
