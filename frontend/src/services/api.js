import axios from 'axios';

export const getUserFollowers = (data) => {
    const user = JSON.parse(data);
    console.log(user);
    return axios({
        method: 'get',
        params: {
            id: user.twitterProvider.id,
            token: user.twitterProvider.token,
            tokenSecret: user.twitterProvider.tokenSecret
        },
        responseType: 'json',
        url: 'http://127.0.0.1:8080/followers',
        config: {
            headers: {
                'Accept': 'application/json'
            }
        }
    }).then(json => json.data);

};