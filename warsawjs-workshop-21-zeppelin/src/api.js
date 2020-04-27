const API_ADDRESS = 'https://warsawjs-21-api.herokuapp.com';

export function login ({username, password}) {
    return fetch(`${API_ADDRESS}/auth`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({username, password})
    }).then(transformJsonResponse);
}

export function readPostList () {
    return fetch(`${API_ADDRESS}/posts`).then(transformJsonResponse);
}

export function createPost ({username, title, image}){
  const body = new FormData();
  body.append('username', username);
  body.append('title', title);
  body.append('image', image);

  return fetch(`${API_ADDRESS}/posts`, {
    method: 'POST',
    body,
  }).then(transformJsonResponse);

}
export function readPost(postId){
    fetch(`${API_ADDRESS}/posts/${postId}`).then(transformJsonResponse);
}
export function createComment({postId, username, body, position:{x,y}}){
    fetch(`${API_ADDRESS}/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({postId, username, body, position:{x, y}})
    }).then(transformJsonResponse);
}

export function transformJsonResponse(response){
    if(!response.ok){
        return Promise.reject(response);
    } else return response.json();
}