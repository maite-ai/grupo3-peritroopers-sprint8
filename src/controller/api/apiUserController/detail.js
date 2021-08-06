const { User } = require('../../../database/models');

module.exports = (req, res) => {
    let id = Number(req.params.id);
    User.findByPk(id, { attributes: ['name', 'lastName', 'birthDate', 'address', 'email', 'avatar'] })
    .then(result => {
        if(result) {
            let response = {
                meta: {
                    status: 200,
                },
                data: {
                    id: result.id,
                    name: result.name,
                    lastName: result.lastName,
                    birthDate: result.birthDate,
                    address: result.address,
                    email: result.email,
                    //Chequear Avatar!!
                    avatar: req.headers.host + '/images/avatars/' + result.avatar
                }
            }
            return res.json(response);
        } else {
            res.status(404).json({
                meta: {
                    status: 404,
                    msg: 'Registrate master'
                },
                data: []
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            meta: {
                status: 500,
                msg: 'Server error'
            },
            data: []
        })
    })
}