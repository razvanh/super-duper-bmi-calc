'use strict';

var BMICalclModel = {
	currentForm: null

};

var BMICalcController = {

	init: function init() {

		BMICalclModel.currentForm = 'imperial';
		//Initialize views
		BMICalcView.init();
	},

	getCurrentForm: function getCurrentForm() {
		return BMICalclModel.currentForm;
	}

};

var BMICalcView = {
	init: function init() {

		var currentForm = BMICalcController.getCurrentForm();

		this.calcContainer = document.getElementById('bmicalc');
		this.calcContainer.className += currentForm;

		this.imperialFormHtml = '\n\t\t<div id="bmicalc-form">\n\t\t\t<form action="#" id="bmicalc-imperial">\n\t\t\t\t<div class="bmicalc-heading">\n\t\t\t\t\t<h2>Body mass index (BMI)</h2>\n\t\t\t\t\t<p class="bmicalc-subhead">A measure of body fat in adults</p>\t\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t<fieldset>\n\t\t\t\t\t<legend>Weight</legend>\n\t\t\t\t\t<p>\n\t\t\t\t\t\t<input type="number" required id="bmicalc-weight-imperial">\n\t\t\t\t\t\t<label for="bmicalc-weight-imperial">lb</label>\n\t\t\t\t\t</p>\n\t\t\t\t</fieldset>\n\t\t\t\t\n\t\t\t\t<fieldset>\n\t\t\t\t\t<legend>Height</legend>\n\n\t\t\t\t\t<p>\n\t\t\t\t\t\t<input type="number" required id="bmicalc-height-ft">\n\t\t\t\t\t\t<label for="bmicalc-height-ft">ft</label>\n\t\t\t\t\t</p>\n\n\t\t\t\t\t<p>\n\t\t\t\t\t\t<input type="number" required id="bmicalc-height-in">\n\t\t\t\t\t\t<label for="bmicalc-height-in">in</label>\n\t\t\t\t\t</p>\n\t\t\t\t</fieldset>\n\n\t\t\t</form>\n\t\t</div>\t\n\t\t';

		this.resultsHTML = '\n\t\t\t<div id="bmicalc-result">\n\t\t\t\t<div id="bmicalc-number">\n\t\t\t\t\t0\n\t\t\t\t</div>\n\n\t\t\t\t<div id="bmicalc-resources">\n\t\t\t\t\t\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t';

		this.render();

		document.addEventListener('change', function (e) {
			if (e.target && e.target.id == 'bmicalc-weight-imperial') {
				console.log(e.target.id);
			}
		});
	},

	render: function render() {
		this.calcContainer.insertAdjacentHTML('afterbegin', this.imperialFormHtml);
		this.calcContainer.insertAdjacentHTML('beforeend', this.resultsHTML);
	}
};

BMICalcController.init();