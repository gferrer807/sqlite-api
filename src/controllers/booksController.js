const Book = require("../models/books.js");
const sequelize = require("../../db.js")
const queryInterface = sequelize.getQueryInterface();


let seedDB = async () => new Promise((res, rej) => {
	
    let timestamp = new Date();

    let books = [
        [1, 'Huckleberry Finn', true, null, timestamp.toISOString()],
        [2, 'Tom Sawyer', true, null, timestamp.toISOString()],
        [3, 'Dune', true, null, timestamp.toISOString()],
        [4, 'HP Lovecraft Best Works', true, null, timestamp.toISOString()],
        [5, 'IT', true, null, timestamp.toISOString()],
        [6, 'Harry Potter', true, null, timestamp.toISOString()],
        [7, 'If I Did It', true, null, timestamp.toISOString()],
        [8, 'Night', true, null, timestamp.toISOString()]
	];

	let books_list = books.map((item) => {
		return {
			id: item[0],
			title: item[1],
			available: item[2],
			email: item[3],
			createdAt: item[4]
		}
	});

	return Book.bulkCreate(books_list)
	.then((data) => {
		res(data);
	})
	.catch((err) => {
		rej(err.parent);
	})
});

let requestBook = (email, title) => new Promise((res, rej) => {

    let timestamp = new Date();

    Book.findAll({
		raw: true,
        where: {
          title: title
        }
    })
    .then((data) => {
		console.log(data.length, data, ' - data!!!!!!!')
        if(data.length === 0) {
            res('Sorry thats not a book we have')
        }

        if(data[0].available !== 1) {
			//console.log('data - available', data)
            res('Sorry, this book is already requested :(');
        } else {
            Book.update({
                email: email,
                available: 0,
				createdAt: timestamp.toISOString(),
				title: title
			}, 
				{where:  { title: title }
			})
            .then((data) => {
				Book.findAll({
					raw: true,
					where: {
					  title: title
					}
				})
				.then((data) => {
					res({
						id: data[0].id,
						available: data[0].available,
						title: data[0].title,
						createdAt: data[0].updatedAt
					});
				})
				.catch((err) => {
					rej(err.parent);
				})
            })
            .catch((err) => {
				console.log(err.parent);
				rej(err.parent);
            })
        }
    })
    .catch((err) => {
		console.log(err.parent);
		rej(err.parent);
    })

});

let retrieveBooks = (id) => new Promise((res, rej) => {
	//check if id is present
	if (!id) {
		id = null;
	}

	Book.findAll({
		raw: true,
		where: {
			id: id
		}
	})
	.then((data) => {
		if (data) {
			res(data);
		}

		Book.findAll({
			raw: true,
			where: {
				available: 0
			}
		})
		.then((data) => {
			res(data);
		})
		.catch((err) => {
			console.log(err.message)
			rej(err.message);
		})

	})
	.catch((err) => {
		console.log(err.parent);
		rej(err.parent);
	})
});

let deleteRequest = (id) => new Promise((res, rej) => {
	let timestamp = new Date();
	Book.update({
		available: 1,
		email: '',
		updatedAt: timestamp.toISOString()
	}, {where:  { id: id }})
	.then((data) => {
		res({});
	})
	.catch((err) => {
		console.log(err.parent);
		rej(`Error on deletion ${err.parent}`);
	})
});

// recreate();

module.exports = {
    deleteRequest, retrieveBooks, requestBook, seedDB
}