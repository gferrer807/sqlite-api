const Book = require("../models/books.js");

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

	let books2 = [
		{
			id: 1,
			title: 'IT',
			available: true,
			email: null,
			createdAt: timestamp.toISOString()
		},
		{
			id: 2,
			title: 'IT',
			available: true,
			email: null,
			createdAt: timestamp.toISOString()
		}
	]

    return books.map(async (item) => {
        return await Book.bulkCreate({
			id: item[0],
			title: item[1],
			available: item[2],
			email: item[3],
			createdAt: item[4]
		  })
		  .then((data) => {
			  res(data);
		  })
		  .catch((err) => {
			  console.log(err.parent);
			  rej(err.parent);
		  })
    });
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
        if(!data) {
            res('Sorry thats not a book we have')
        }

        if(data[0].available !== 0) {
			//console.log('data - available', data)
            res('Sorry, this book is already requeested :(');
        } else {
            Book.update({
                email: email,
                available: 1,
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
		available: 0,
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