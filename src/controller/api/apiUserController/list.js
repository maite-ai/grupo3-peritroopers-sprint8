const { User } = require('../../../database/models');

module.exports = (req, res) => {
    User.findAll({ attributes: ['id', 'name', 'lastName', 'birthDate', 'address', 'email', 'avatar'] })
    .then(users => {
        if(users.length) {
            let response = {
                meta: {
                    status: 200,
                    count: users.length
                },
                data: []
            };
            users.forEach(user => {
                response.data.push({
                    id: user.id,
                    name: user.name,
                    lastName: user.lastName,
                    email: user.email,
                    avatar: `http://localhost:3030/images/avatars/${user.avatar}`,
                    detail: `http://localhost:3030/api/users/${user.id}`
                })
            });
            return res.json(response);
        } else {
            return res.status(404).json({ error: 'no hay nada máquina' });
        }
    })
    .catch(error => {
        return res.status(500).json({error: 'no hay huaifai para entrar a la database'});
    })
}