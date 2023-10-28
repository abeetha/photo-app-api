const connection = require('../db/db-connection');

const addPlace = (req, res) => {
    connection.query('insert into place(title,description,location) values(?,?,?)', [req.body.title, req.body.description, req.body.location], (err, rows) => {
        if (err) throw err
        res.send(rows)
    })
}

const getPlace = (req, res) => {
    connection.query("select place.id,place.title,place.description,place.latitude,place.longitude,images.imagename  from place left join images on place.id=images.id ", (err, rows) => {
        if (err) throw err
        // console.log(rows);
        res.json(rows)
    })
}

const deletePlace = (req, res) => {
    connection.query('delete from list where id=?', [req.params.id], (err, result) => {
      // console.log('====================================');
      // console.log(result.insertId);
      // console.log('====================================');
      // if (err) throw err
      // res.json(rows)
      if (err) {
        console.error(err);
        res.status(500).send('Error deleting note');
      } else {
        res.json(result.insertId);
      }
    })
  }
  const updatePlace = (req, res) => {
  
    connection.query('update list set list=? where id=?', [req.body.list, req.params.id], (err, result) => {
      console.log('====================================');
      console.log(result.updateId + " - " + req.params.id);
      console.log('====================================');
      // if (err) throw err
      // res.json(rows)
      if (err) {
        console.error(err);
        res.status(500).send('Error saving note');
      } else {
        console.log('====================================');
        console.log(result.insertId);
        console.log('====================================');
        res.json(result);
      }
    })
  }
const importArray = (req, res) => {
    try {
        if (req.files.length < 1) {
            return res.status(400).send({ message: "Pleases upload files!" });
        }
        console.log(req.files[0].filename)
        console.log(req.params.id)
        for (let i = 0; i < (req.files.length); i++) {
            connection.query('replace into images(imagename,id) values(?,?)', [req.files[i].filename, req.params.id], (err, result) => {
                if (err) throw err
            })
        }
        // for (let i = 0; i < (req.files.length); i++) {
        //     connection.query('update images set imagename=? where id=?', [req.files[i].filename, req.params.id], (err, result) => {
        //         if (err) throw err
        //     })
        // }
        // for (let i = 0; i < (req.files.length); i++) {
        //     connection.query('insert into images(imagename,id) values(?,?)', [req.files[i].filename, req.params.id], (err, result) => {
        //         if (err) throw err
        //     })
        // }
        return res.status(201).send({
            images: req.files,
            message: 'Images uploaded successfully'
        });
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error! Try again, please!' })
    }
}
module.exports = { addPlace, getPlace, importArray,deletePlace,updatePlace }