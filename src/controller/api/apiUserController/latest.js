const { User } = require('../../../database/models');

module.exports = (req, res) => {
    console.log("Entre")
    User.findOne({
        order: [
            ['id', 'DESC']
        ] 
    })

    .then(user => JSON.parse(JSON.stringify(user)))
    .then(user => {
    let response = {
        meta: {
            status: 200,
            msg: 'Último usuario creado',
        },
        data: {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            birthDate: user.birthDate,
            address: user.address,
            email: user.email,
            avatar: `http://localhost:3030/images/avatars/${user.avatar}`
            }
        };

    res.json(response)
    })
    
    .catch( error => {
        res.send({ error: 'Not found' });
    })
}
