import { AnalysisAction } from "@/contexts/analyses/actions";
import { AnalysisActionTypes } from "@/contexts/analyses/types";
import { Dispatch } from "react";
import ApiClient from "../client/ApiClient";
import { PostAnalysisToFavorites } from "../client/interface/body/PostAnalysisToFavorites";
import { GetAnalysis } from "../client/interface/GetAnalysis";
import { HttpStatus } from "../enums/HttpStatus";
import { HttpInternalServerError, HttpNotFoundError } from "../HttpErrors";

interface PromiseResponse {
  status: boolean;
  message: string | null;
  data: GetAnalysis | null;
}

export async function postAnalysisToFavorites(
  token: string,
  requestBody: PostAnalysisToFavorites,
  dispatch: Dispatch<AnalysisActionTypes>
): Promise<PromiseResponse> {
  try {
    dispatch({ type: AnalysisAction.ANALYSIS_LOADING_START });

    const client = new ApiClient(token);
    const response = await client.postAnalysisToFavorites(requestBody);

    if (response === null) {
      dispatch({
        type: AnalysisAction.POST_ANALYSIS_TO_FAVORITES_ERROR,
        payload: new HttpInternalServerError(AnalysisAction.POST_ANALYSIS_TO_FAVORITES_ERROR),
      });
      return Promise.reject({ status: false, message: null, data: null });
    }

    switch (response.status) {
      case HttpStatus.CREATED:
        dispatch({
          type: AnalysisAction.POST_ANALYSIS_TO_FAVORITES_SUCCESS,
          payload: response.data,
        });
        return Promise.resolve({ status: true, message: null, data: response.data });

      case HttpStatus.NOT_FOUND:
        dispatch({
          type: AnalysisAction.POST_ANALYSIS_TO_FAVORITES_NOT_FOUND,
          payload: new HttpNotFoundError(AnalysisAction.POST_ANALYSES_NOT_FOUND),
        });
        return Promise.reject({ status: false, message: response.data.message ?? null, data: null });

      default:
        dispatch({
          type: AnalysisAction.POST_ANALYSIS_TO_FAVORITES_HTTP_INTERNAL_ERROR,
          payload: new HttpInternalServerError(AnalysisAction.POST_ANALYSIS_TO_FAVORITES_HTTP_INTERNAL_ERROR),
        });
        return Promise.reject({ status: false, message: response.data.message ?? null, data: null });
    }
  } catch (error) {
    dispatch({
      type: AnalysisAction.POST_ANALYSIS_TO_FAVORITES_ERROR,
      payload: error instanceof Error ? error : new Error(AnalysisAction.POST_ANALYSIS_TO_FAVORITES_ERROR),
    });
    return Promise.reject({ status: false, message: null, data: null });
  } finally {
    dispatch({ type: AnalysisAction.ANALYSIS_LOADING_END });
  }
}
