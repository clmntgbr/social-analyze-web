export enum AnalysisAction {
  ANALYSIS_LOADING_START = "ANALYSIS_LOADING_START",
  ANALYSIS_LOADING_END = "ANALYSIS_LOADING_END",

  GET_ANALYSES_RECENTS_SUCCESS = "GET_ANALYSES_RECENTS_SUCCESS",
  GET_ANALYSES_RECENTS_NOT_FOUND = "GET_ANALYSES_RECENTS_NOT_FOUND",
  GET_ANALYSES_RECENTS_HTTP_INTERNAL_ERROR = "GET_ANALYSES_RECENTS_HTTP_INTERNAL_ERROR",
  GET_ANALYSES_RECENTS_ERROR = "GET_ANALYSES_RECENTS_ERROR",

  GET_ANALYSES_FAVORITES_SUCCESS = "GET_ANALYSES_FAVORITES_SUCCESS",
  GET_ANALYSES_FAVORITES_NOT_FOUND = "GET_ANALYSES_FAVORITES_NOT_FOUND",
  GET_ANALYSES_FAVORITES_HTTP_INTERNAL_ERROR = "GET_ANALYSES_FAVORITES_HTTP_INTERNAL_ERROR",
  GET_ANALYSES_FAVORITES_ERROR = "GET_ANALYSES_FAVORITES_ERROR",

  GET_ANALYSIS_SUCCESS = "GET_ANALYSIS_SUCCESS",
  GET_ANALYSIS_NOT_FOUND = "GET_ANALYSIS_NOT_FOUND",
  GET_ANALYSIS_HTTP_INTERNAL_ERROR = "GET_ANALYSIS_HTTP_INTERNAL_ERROR",
  GET_ANALYSIS_ERROR = "GET_ANALYSIS_ERROR",

  POST_ANALYSES_SUCCESS = "POST_ANALYSES_SUCCESS",
  POST_ANALYSES_NOT_FOUND = "POST_ANALYSES_NOT_FOUND",
  POST_ANALYSES_HTTP_INTERNAL_ERROR = "POST_ANALYSES_HTTP_INTERNAL_ERROR",
  POST_ANALYSES_ERROR = "POST_ANALYSES_ERROR",
}