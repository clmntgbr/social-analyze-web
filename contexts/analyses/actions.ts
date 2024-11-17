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
}
