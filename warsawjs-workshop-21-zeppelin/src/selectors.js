export function isLoggedIn(state) {
  return !!state.auth.username;
}

export function getUserName(state) {
  return state.auth.username;
}

export function getProjectList(state) {
  return state.projects.items;
}

export function getProject(state, projectId) {
  return (state.projects.items || []).find(({ id }) => id === projectId);
}