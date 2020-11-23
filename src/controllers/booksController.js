const Book = require("../models/books.js");

let seedDB = () => {
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
	]

    books.map((item) => {
        return Book.create({
			id: item[0],
			title: item[1],
			available: item[2],
			email: item[3],
			createdAt: item[4]
		  })
		  .then((data) => {
			  console.log(data, ' - data')
		  })
		  .catch((err) => {
			  console.log(err.parent);
		  })
    })

    return 'Database seeded'
}

let requestBook = (email, title) => {

    let timestamp = new Date();

    Book.findAll({
		raw: true,
        where: {
          title: title
        }
    })
    .then((data) => {
        if(!data) {
            return('Sorry thats not a book we have')
        }

        if(data[0].available !== 0) {
			//console.log('data - available', data)
            return ('Sorry, this book is already requeested :(');
        } else {
            Book.update({
                email: email,
                available: 0,
				createdAt: timestamp.toISOString(),
				title: title
            }, {where:  { title: title }})
            .then((data) => {
                console.log(`Row(s) updated: ${this.changes}`);
                return ({
                    id: data.id,
                    available: data.available,
                    title: data.title,
                    createdAt: data.timestamp
                })
            })
            .catch((err) => {
                console.error(err.message);
				return err.message
            })
        }
    })
    .catch((err) => {
        console.error(err.message);
		return err.message
    })

}

let retrieveBooks = (id) => {
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

		}

		Book.findAll({
			raw: true,
			where: {
				available: 0
			}
		})
		.then((data) => {
			console.log('get data - ', data[0])
			return data;
		})
		.catch((err) => {
			console.log(err.message)
			return err.message;
		})

	})
	.catch((err) => {
		console.log(err.message)
		return err.message;	
	})
}

let deleteRequest = (id) => {
	let timestamp = new Date();
	Book.update({
		available: 1,
		email: '',
		updatedAt: timestamp.toISOString()
	}, {where:  { id: id }})
	.then((data) => {
		console.log(data);
		return {};
	})
	.catch((err) => {
		console.log(err.message)
		return `Error on deletion ${err.message}`;
	})
}

// recreate();

module.exports = {
    deleteRequest, retrieveBooks, requestBook, seedDB
}