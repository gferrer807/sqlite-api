var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../library');

let retrieveBooks = (id) => {
	//check if id is present
	db.get(`select * from books where id=(?)`, [id], (err, row) => {
		if (err) {
			console.log(err.message)
			return err.message;
		}
		if (row) {
			//if yes, return book
			return row;
		} else {
			//else get all existing requests
			db.all(`select * from books where available=0`, (err,row) => {
				if (err) {
					console.log(err.message)
					return err.message;
				}
				return row;
			})
		}
	})
}

module.exports = {
    retrieveBooks
}