/**
 * Sample action with dispatch (using fetch api, similar to axios)
 *
 * export const fetchPosts = () => dispatch => {
 *   return fetch('https://jsonplaceholder.typicode.com/posts')
 *     .then(res => res.json())
 *     .then(posts =>
 *       dispatch({
 *         type: FETCH_POSTS,
 *         payload: posts
 *       })
 *     );
 * };
 */

export const createMessage = (payload) => {
    console.log(payload)
    return ({
        type: 'SOCKET_CREATE_MESSAGE',
        payload
    })
}
export const fetchMessages = (payload) => ({
    type: 'FETCH_MESSAGES',
    payload
})