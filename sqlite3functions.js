var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('library');

let createDB = (res) => {
    let db = new sqlite3.Database('library', (err) => {
        if (err) {
          return console.error(err.message);
        }
        res.send('Database created! You can start retrieving and requesting!');
      });
}

let seedDB = (res) => {

    // let sqlCreate = `create table books (
    //     id INTEGER PRIMARY KEY,
    //     title TEXT NOT NULL,
    //     available BOOLEAN NOT NULL,
    //     email TEXT,
    //     timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    // )`;

    // db.run(sqlCreate, function(err) {
    //     if (err) {
    //       console.log('err on making table - ', err.message)
    //     }
    //     console.log('Table made')
    // });

    let books = [
        [1, 'Huckleberry Finn', true, null, Date.now()],
        [2, 'Tom Sawyer', true, null, Date.now()],
        [3, 'Dune', true, null, Date.now()],
        [4, 'HP Lovecraft Best Works', true, null, Date.now()],
        [5, 'IT', true, null, Date.now()],
        [6, 'Harry Potter', true, null, Date.now()],
        [7, 'If I Did It', true, null, Date.now()],
        [8, 'Night', true, null, Date.now()]
    ]

    let sql = `insert into books (
        id,
        title,
        available,
        email,
        timestamp
    ) values (?,?,?,?,?)`

    for (var i = 0; i < books.length; i++) {
        db.run(sql, books[i], function(err) {
            if (err) {
              console.log(err.message);
            }
            console.log(`Rows inserted ${this.changes}`);
        });
    }

    db.close();
}

let requestBook = (req, res) => {
    //check if book exists using title
		
		if (!req.body.email || !req.body.title) {
			res.send('Missing input fields. Email and Title are required');
			return;
		}

    db.serialize(() => {
        db.get(`select * from books where title=(?)`, [req.body.title], (err, row) => {
					if (err) {
							console.error(err.message);
					}
					//check if available or not
					if (row.available !== 1) {
					//if filled, respond saying its not available
							res.send('Sorry, this book is already requeested :(');
					} else {
					//else return that its available
							let params = [req.body.email, 0, req.body.title];
							db.run(`update books set email=?, available=? where title=?`, params, (err, row) => {
								if (err) {
									console.log(err.message)
								}
								console.log(`Row(s) updated: ${this.changes}`);
								res.send({
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

let retrieveBooks = (req, res) => {
		//check if id is present
		db.get(`select * from books where id=(?)`, [req.body.id], (err, row) => {
			if (err) {
				console.log(err.message)
			}

			if (row) {
				//if yes, get that book
				console.log('row - ', row)
				res.send(row);
			} else {
				//else get all existing requests
				db.get(`select * from books where available=0`, (err,row) => {
					if (err) {
						console.log(err.message)
					}

					console.log('row post - ', row)
					res.send(row);
				})

			}
		})
}

let deleteRequest = (req,res) => {

		//get book with id
		if (!req.body.id) {
			res.send('Please provide an ID');
			return;
		}

		db.run(`update books set available=1, email='' where id=?`, [req.body.id], (err, row) => {
			if (err) {
				console.log(err.message)
			}
			res.send({})
		})
}

module.exports = {
    requestBook,
    createDB,
    seedDB,
		requestBook,
		retrieveBooks,
		deleteRequest
}



