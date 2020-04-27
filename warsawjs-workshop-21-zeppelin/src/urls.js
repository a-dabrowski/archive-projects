export const ROOT = "/";
export const PROJECT_CREATE = "/projects/new";
export const LOGIN = "/login";
export const PROJECT_EDIT = "/projects/:id";
export const PROJECT_LIST = "/projects";
export const CREDITS = "/credits";

export function editProject(projectId) {
  return PROJECT_EDIT.replace(":id", projectId);
}
