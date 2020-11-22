var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../library');

let deleteRequest = (id) => {
	db.run(`update books set available=1, email='',timestamp=? where id=?`, [Date.now(),id], (err, row) => {
		if (err) {
			console.log(err.message)
			return `Error on deletion ${err.message}`;
		}
		console.log(row);
		return {};
	})
}

module.exports = {
    deleteRequest
}