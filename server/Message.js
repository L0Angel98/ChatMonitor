const mongoose = require('mongoose');


// Message Model

mongoose.model("Message", {
	name: {
		type: String,
		required: true
	},
	message: {
		type: String,
		required: true
	}

})