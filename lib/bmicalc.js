'use strict';

// .remove() polyfill from:https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
(function (arr) {
	arr.forEach(function (item) {
		if (item.hasOwnProperty('remove')) {
			return;
		}
		Object.defineProperty(item, 'remove', {
			configurable: true,
			enumerable: true,
			writable: true,
			value: function remove() {
				this.parentNode.removeChild(this);
			}
		});
	});
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

var BMICalclModel = {
	currentForm: 'standard',
	BMI: null,
	message: {
		underweight: 'Underweight',
		normal: 'Normal Weight',
		overweight: 'Overweight',
		obese: 'Obese'
	}
};

var BMICalcController = {

	init: function init() {

		BMICalclModel.currentForm = 'standard';
		//Initialize views
		BMICalcView.init();
	},

	getCurrentForm: function getCurrentForm() {
		return BMICalclModel.currentForm;
	},

	setCurrentForm: function setCurrentForm(form) {
		BMICalclModel.currentForm = form;
	},

	calculateBMI: function calculateBMI(mode, measurements) {
		switch (mode) {
			case 'standard':
				var height = Number(12 * measurements.ft) + Number(measurements.in);
				return (measurements.weight / (height * height) * 703).toFixed(1) / 1; //toFixed returns a string
			case 'metric':
				var cm = Number(measurements.cm);
				return (measurements.weight / (cm * cm) * 10000).toFixed(1) / 1;
		}
	},

	getBMI: function getBMI() {
		return BMICalclModel.BMI;
	},

	setBMI: function setBMI(bmi) {
		BMICalclModel.BMI = bmi;
	},

	getMessage: function getMessage(bmi) {
		switch (true) {
			case isNaN(bmi):
				return '';
			case bmi >= 30:
				return BMICalclModel.message['obese'];
			case bmi >= 25:
				return BMICalclModel.message['overweight'];
			case bmi >= 18.5:
				return BMICalclModel.message['normal'];
			default:
				return BMICalclModel.message['underweight'];
		};
	}

};

var BMICalcView = {
	init: function init() {

		var currentForm = BMICalcController.getCurrentForm();

		if (document.body.contains(document.getElementById('bmicalc'))) {

			this.calcContainer = document.getElementById('bmicalc');
			this.calcContainer.className += currentForm;

			this.renderForm(currentForm);
			this.renderResults();
		}

		document.addEventListener('input', function (e) {
			var target = e.target || e.srcElement;
			switch (target.id) {
				case 'bmicalc-weight-standard':
				case 'bmicalc-height-ft':
				case 'bmicalc-height-in':
					var lbs = document.getElementById('bmicalc-weight-standard').value >= 0 ? document.getElementById('bmicalc-weight-standard').value : 0;
					var ft = document.getElementById('bmicalc-height-ft').value >= 0 ? document.getElementById('bmicalc-height-ft').value : 0;
					var inch = document.getElementById('bmicalc-height-in').value >= 0 ? document.getElementById('bmicalc-height-in').value : 0;

					target.value = target.value > 0 ? parseInt(target.value, 10) : 0;

					if (inch > 11) {
						target.value = 11;
						inch = 11;
					}

					if (lbs && ft && inch) {
						var result = BMICalcController.calculateBMI('standard', { weight: lbs, ft: ft, in: inch });
						BMICalcController.setBMI(result);
						BMICalcView.renderResults();
					}

					break;
				case 'bmicalc-weight-metric':
				case 'bmicalc-height-cm':

					var kg = document.getElementById('bmicalc-weight-metric').value >= 0 ? document.getElementById('bmicalc-weight-metric').value : 0;
					var cm = document.getElementById('bmicalc-height-cm').value >= 0 ? document.getElementById('bmicalc-height-cm').value : 0;

					target.value = target.value > 0 ? parseInt(target.value, 10) : 0;

					if (kg && cm) {
						var _result = BMICalcController.calculateBMI('metric', { weight: kg, cm: cm });
						BMICalcController.setBMI(_result);
						BMICalcView.renderResults();
					}
			}
		});

		document.addEventListener('click', function (e) {
			var target = e.target || e.srcElement;

			if (target.className === 'bmicalc-units-switcher') {
				e.preventDefault();
				var _currentForm = BMICalclModel.currentForm;
				BMICalclModel.currentForm = _currentForm === 'standard' ? 'metric' : 'standard';
				BMICalcView.renderForm(BMICalclModel.currentForm);
			}
		});
	},

	renderForm: function renderForm(form) {
		var standardFormHtml = '\n\t\t<div id="bmicalc-form">\n\t\t\t<form action="#" id="bmicalc-standard">\n\t\t\t\t<div class="bmicalc-heading">\n\t\t\t\t\t<h2>Body mass index (BMI)</h2>\n\t\t\t\t\t<p class="bmicalc-subhead">A measure of body fat in adults</p>\t\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t<fieldset>\n\t\t\t\t\t<legend>Weight</legend>\n\t\t\t\t\t<p>\n\t\t\t\t\t\t<input type="number" required id="bmicalc-weight-standard">\n\t\t\t\t\t\t<label for="bmicalc-weight-standard">lb</label>\n\t\t\t\t\t</p>\n\t\t\t\t</fieldset>\n\t\t\t\t\n\t\t\t\t<fieldset>\n\t\t\t\t\t<legend>Height</legend>\n\n\t\t\t\t\t<p>\n\t\t\t\t\t\t<input type="number" required id="bmicalc-height-ft">\n\t\t\t\t\t\t<label for="bmicalc-height-ft">ft</label>\n\t\t\t\t\t</p>\n\n\t\t\t\t\t<p>\n\t\t\t\t\t\t<input type="number" required id="bmicalc-height-in">\n\t\t\t\t\t\t<label for="bmicalc-height-in">in</label>\n\t\t\t\t\t</p>\n\t\t\t\t</fieldset>\n\n\t\t\t</form>\n\t\t\t<p><a href="#" class="bmicalc-units-switcher">Switch to metric units</a></p>\n\t\t</div>\t\n\t\t';

		var metricFormHtml = '\n\t\t<div id="bmicalc-form">\n\t\t\t<form action="#" id="bmicalc-metric">\n\t\t\t\t<div class="bmicalc-heading">\n\t\t\t\t\t<h2>Body mass index (BMI)</h2>\n\t\t\t\t\t<p class="bmicalc-subhead">A measure of body fat in adults</p>\t\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t<fieldset>\n\t\t\t\t\t<legend>Weight</legend>\n\t\t\t\t\t<p>\n\t\t\t\t\t\t<input type="number" required id="bmicalc-weight-metric">\n\t\t\t\t\t\t<label for="bmicalc-weight-metric">kg</label>\n\t\t\t\t\t</p>\n\t\t\t\t</fieldset>\n\t\t\t\t\n\t\t\t\t<fieldset>\n\t\t\t\t\t<legend>Height</legend>\n\n\t\t\t\t\t<p>\n\t\t\t\t\t\t<input type="number" required id="bmicalc-height-cm">\n\t\t\t\t\t\t<label for="bmicalc-height-cm">centimeters</label>\n\t\t\t\t\t</p>\n\t\t\t\t</fieldset>\n\n\t\t\t</form>\n\t\t\t<p><a href="#" class="bmicalc-units-switcher">Switch to standard units</a></p>\n\t\t</div>\t\n\t\t';

		var currentForm = form === 'standard' ? standardFormHtml : metricFormHtml;

		if (document.body.contains(document.getElementById('bmicalc-form'))) {
			document.getElementById('bmicalc-form').remove();
		}

		this.calcContainer.insertAdjacentHTML('afterbegin', currentForm);
	},

	renderResults: function renderResults() {
		var BMI = BMICalcController.getBMI() ? BMICalcController.getBMI() : '--.-';
		var message = BMICalcController.getMessage(BMI);

		var resultsHTML = '\n\t\t\t<div id="bmicalc-result">\n\t\t\t\t<div id="bmicalc-number">\n\t\t\t\t\t' + BMI + '\n\t\t\t\t</div>\n\n\t\t\t\t<div id="bmicalc-resources">\n\t\t\t\t\t' + message + '\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t';
		if (document.body.contains(document.getElementById('bmicalc-result'))) {
			document.getElementById('bmicalc-result').remove();
		}
		this.calcContainer.insertAdjacentHTML('beforeend', resultsHTML);
	}
};

BMICalcController.init();
