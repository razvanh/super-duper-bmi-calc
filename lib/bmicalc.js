'use strict';

var BMICalclModel = {
	currentForm: null,
	BMI: null

};

var BMICalcController = {

	init: function init() {

		BMICalclModel.currentForm = 'imperial';
		//Initialize views
		BMICalcView.init();
	},

	getCurrentForm: function getCurrentForm() {
		return BMICalclModel.currentForm;
	},

	calculateBMI: function calculateBMI(mode, measurements) {
		switch (mode) {
			case 'imperial':
				var height = Number(12 * measurements.ft) + Number(measurements.in);
				return measurements.weight / (height * height) * 703;
		}
	}

};

var BMICalcView = {
	init: function init() {

		var currentForm = BMICalcController.getCurrentForm();

		this.calcContainer = document.getElementById('bmicalc');
		this.calcContainer.className += currentForm;

		this.renderForm();
		this.renderResults();

		document.addEventListener('input', function (e) {
			var target = e.target || e.srcElement;
			if (target) {
				switch (target.id) {
					case 'bmicalc-weight-imperial':
					case 'bmicalc-height-ft':
					case 'bmicalc-height-in':
						var weight = document.getElementById('bmicalc-weight-imperial').value;
						var ft = document.getElementById('bmicalc-height-ft').value;
						var inch = document.getElementById('bmicalc-height-in').value;

						if (inch < 0) {
							target.value = 0;
							inch = 0;
						}

						if (inch > 11) {
							target.value = 11;
							inch = 11;
						}

						if (weight && ft && inch) {
							var result = BMICalcController.calculateBMI('imperial', { weight: weight, ft: ft, in: inch });
							BMICalclModel.BMI = result;
							BMICalcView.renderResults();
						}

						break;
				}
			}
		});
	},

	renderForm: function renderForm() {
		var imperialFormHtml = '\n\t\t<div id="bmicalc-form">\n\t\t\t<form action="#" id="bmicalc-imperial">\n\t\t\t\t<div class="bmicalc-heading">\n\t\t\t\t\t<h2>Body mass index (BMI)</h2>\n\t\t\t\t\t<p class="bmicalc-subhead">A measure of body fat in adults</p>\t\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t<fieldset>\n\t\t\t\t\t<legend>Weight</legend>\n\t\t\t\t\t<p>\n\t\t\t\t\t\t<input type="number" required id="bmicalc-weight-imperial">\n\t\t\t\t\t\t<label for="bmicalc-weight-imperial">lb</label>\n\t\t\t\t\t</p>\n\t\t\t\t</fieldset>\n\t\t\t\t\n\t\t\t\t<fieldset>\n\t\t\t\t\t<legend>Height</legend>\n\n\t\t\t\t\t<p>\n\t\t\t\t\t\t<input type="number" required id="bmicalc-height-ft">\n\t\t\t\t\t\t<label for="bmicalc-height-ft">ft</label>\n\t\t\t\t\t</p>\n\n\t\t\t\t\t<p>\n\t\t\t\t\t\t<input type="number" required id="bmicalc-height-in">\n\t\t\t\t\t\t<label for="bmicalc-height-in">in</label>\n\t\t\t\t\t</p>\n\t\t\t\t</fieldset>\n\n\t\t\t</form>\n\t\t</div>\t\n\t\t';

		this.calcContainer.insertAdjacentHTML('afterbegin', imperialFormHtml);
	},

	renderResults: function renderResults() {
		var BMI = BMICalclModel.BMI ? BMICalclModel.BMI.toFixed(1) : '--.-';
		var resultsHTML = '\n\t\t\t<div id="bmicalc-result">\n\t\t\t\t<div id="bmicalc-number">\n\t\t\t\t\t' + BMI + '\n\t\t\t\t</div>\n\n\t\t\t\t<div id="bmicalc-resources">\n\t\t\t\t\t\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t';
		if (document.contains(document.getElementById('bmicalc-result'))) {
			document.getElementById('bmicalc-result').remove();
		}
		this.calcContainer.insertAdjacentHTML('beforeend', resultsHTML);
	}
};

BMICalcController.init();