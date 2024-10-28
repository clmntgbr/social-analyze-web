export enum WorkspacesAction {
  WORKSPACES_LOADING_START = "WORKSPACES_LOADING_START",
  WORKSPACES_LOADING_END = "WORKSPACES_LOADING_END",

  GET_WORKSPACES_SUCCESS = "GET_WORKSPACES_SUCCESS",
  GET_WORKSPACES_NOT_FOUND = "GET_WORKSPACES_NOT_FOUND",
  GET_WORKSPACES_HTTP_INTERNAL_ERROR = "GET_WORKSPACES_HTTP_INTERNAL_ERROR",
  GET_WORKSPACES_ERROR = "GET_WORKSPACES_ERROR",

  POST_WORKSPACES_SUCCESS = "POST_WORKSPACES_SUCCESS",
  POST_WORKSPACES_NOT_FOUND = "POST_WORKSPACES_NOT_FOUND",
  POST_WORKSPACES_HTTP_INTERNAL_ERROR = "POST_WORKSPACES_HTTP_INTERNAL_ERROR",
  POST_WORKSPACES_ERROR = "POST_WORKSPACES_ERROR",

  GET_WORKSPACE_SUCCESS = "GET_WORKSPACE_SUCCESS",
  GET_WORKSPACE_NOT_FOUND = "GET_WORKSPACE_NOT_FOUND",
  GET_WORKSPACE_HTTP_INTERNAL_ERROR = "GET_WORKSPACE_HTTP_INTERNAL_ERROR",
  GET_WORKSPACE_ERROR = "GET_WORKSPACE_ERROR",
}