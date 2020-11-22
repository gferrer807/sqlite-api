var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../library');

let requestBook = (email, title) => {
    db.serialize(() => {
		let timestamp = new Date();
        db.get(`select * from books where title=(?)`, [title], (err, row) => {
			if (err) {

					console.error(err.message);
					return err.message
			}
			//check if available or not
			if (!row) {
				return('Sorry thats not a book we have')
			}

			if (row.available !== 1) {
			//if filled, respond saying its not available
					return ('Sorry, this book is already requeested :(');
			} else {
			//else return that its available
					let params = [email, 0, timestamp.toISOString(), title];
					db.run(`update books set email=?, available=?,timestamp=? where title=?`, params, (err) => {
						if (err) {
							console.log(err.message)
							return err.message;
						}
						console.log(`Row(s) updated: ${this.changes}`);
						return ({
							id: row.id,
							available: row.available,
							title: row.title,
							timestamp: row.timestamp
						})
					})
			}
        });
	})

}

module.exports = {
    requestBook
}