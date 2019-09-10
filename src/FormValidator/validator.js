function Validator () {
    this.errors = [];
    this.decoratorsList = [];
}

function ValidatorDecorator () {
    return {
        hasName: {
            validate: function(form) {
                if (form && form.name && /^[a-zA-Z]+$/.test(form.name)) {
                    console.log(`√ name validated`);
                } else { 
                    this.errors.push('Please use alphabets only in your name'); 
                }
            }
        },

        hasEmail: {
            validate: function(form) {
                if (form && form.email && /\S+@\S+\.\S+/.test(form.email)) {
                    console.log(`√ email validated`);
                } else { 
                    this.errors.push('Please give valid email'); 
                }
            }
        },

        hasMessage: {
            validate: function(form) {
                if (form && form.message && form.message.length > 0) {
                    console.log(`√ message validated`);
                } else { 
                    this.errors.push('Please do not leave message blank'); 
                }
            }
        }
    }
}

Validator.prototype.decorate = function(name) { 
    this.decoratorsList.push({ name }); 
};

Validator.prototype.validate = function(form) {
	var i, temp, name;
	this.form = form;

    let vd = new ValidatorDecorator();

	for (i = 0; i < this.decoratorsList.length; i++) {
        temp = this.decoratorsList[i];
		name = temp.name;
        vd[name].validate.call(this, form); 
	};
};


export default Validator;

/*
var validator = new Validator();
validator.decorate('hasName');
validator.decorate('hasEmail');
validator.decorate('hasMessage');

// we insert form here
validator.validate({
    name: 'ricky',
    age: 32,
    zipcode: 91776
}); // we'll just use a blank object in place of real form data
console.log(validator.errors);
*/