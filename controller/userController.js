const {request, response} = require('express');
const UserController = {
    get: (req = request, res = response) => {
        return res.json({ok: true});
    },
    post: () => console.log('post')
}

module.exports = UserController;