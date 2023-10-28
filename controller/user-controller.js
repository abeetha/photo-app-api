const connection = require('../db/db-connection');

const getUser = (req, res) => {
    connection.query('select * from userlogin where username=?', [req.body.username], (err, rows) => {
        if (err) throw err
        if (rows[0].password == req.body.password) {
            res.json("Login Success");
        } else {
            res.json("Login");
        }
        //  res.send(rows)
    })
}

const addUsers = (req, res) => {
    connection.query('insert into place values(?,?,?,?,?)', [req.body.id, req.body.title, req.body.description, req.body.imagename, req.body.location], (err, rows) => {
        if (err) throw err
        res.send(rows)
    })

}
module.exports = { getUser, addUsers }