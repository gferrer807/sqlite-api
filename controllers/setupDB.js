var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('library');

let seedDB = () => {
	let timestamp = new Date();

    let sqlCreate = `create table books (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        available BOOLEAN NOT NULL,
        email TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`;

    db.run(sqlCreate, function(err) {
        if (err) {
          console.log('err on making table - ', err.message)
          return err.message;
        }
				let books = [
					[1, 'Huckleberry Finn', true, null, timestamp.toISOString()],
					[2, 'Tom Sawyer', true, null, timestamp.toISOString()],
					[3, 'Dune', true, null, timestamp.toISOString()],
					[4, 'HP Lovecraft Best Works', true, null, timestamp.toISOString()],
					[5, 'IT', true, null, timestamp.toISOString()],
					[6, 'Harry Potter', true, null, timestamp.toISOString()],
					[7, 'If I Did It', true, null, timestamp.toISOString()],
					[8, 'Night', true, null, timestamp.toISOString()]
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
		});
    return 'Database seeded'
}

let createDB = () => {
    let db = new sqlite3.Database('../library', (err) => {
        if (err) {
          return err.message;
        }
      });
      seedDB();
}

module.exports = {
    createDB,
    seedDB
}



