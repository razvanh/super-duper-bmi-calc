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
	},
};

var BMICalcController = {

	init: function (){

		BMICalclModel.currentForm = 'standard';
		//Initialize views
		BMICalcView.init();
	},

	getCurrentForm: function(){
		return BMICalclModel.currentForm;
	},

	setCurrentForm: function (form) {
		BMICalclModel.currentForm = form;
	},

	calculateBMI: function(mode, measurements){
		switch (mode) {
			case 'standard':
				let height = (Number(12*measurements.ft) + Number(measurements.in));
				return (measurements.weight/(height * height)) * 703;
			case 'metric':
				let cm = Number(measurements.cm);
				return (measurements.weight/(cm * cm)) * 10000;	
		}
	},

	getBMI: function () {
		return BMICalclModel.BMI ;
	},

	setBMI: function (bmi) {
		BMICalclModel.BMI = bmi;
	},

	getMessage : function (bmi) {
		switch (true) {
			case isNaN(bmi):
				return '';
			case (bmi >= 30):
				return BMICalclModel.message['obese'];
			case (bmi >= 25):
				return BMICalclModel.message['overweight'];
			case (bmi >= 18.5):
				return BMICalclModel.message['normal'];		
			default:
				return BMICalclModel.message['underweight'];
		};

	},

}


var BMICalcView = {
	init: function (){

		let currentForm = BMICalcController.getCurrentForm();

		this.calcContainer = document.getElementById('bmicalc');
		this.calcContainer.className += currentForm;


		this.renderForm(currentForm);
		this.renderResults();

		document.addEventListener('input',function(e){
			let target = e.target || e.srcElement;
				switch (target.id) {
					case 'bmicalc-weight-standard':
					case 'bmicalc-height-ft':
					case 'bmicalc-height-in':
						let lbs = document.getElementById('bmicalc-weight-standard').value >= 0 ? document.getElementById('bmicalc-weight-standard').value : 0;
						let ft = document.getElementById('bmicalc-height-ft').value >= 0 ? document.getElementById('bmicalc-height-ft').value : 0 ;
						let inch = document.getElementById('bmicalc-height-in').value >= 0 ? document.getElementById('bmicalc-height-in').value : 0;

						target.value = target.value > 0 ? parseInt(target.value, 10) : 0;

						if (inch > 11) {
							target.value = 11;
							inch = 11;
						}

						if (lbs && ft && inch) {
							let result = BMICalcController.calculateBMI('standard',{weight:lbs,ft:ft,in:inch});
							BMICalcController.setBMI(result);
							BMICalcView.renderResults();
						}
						

						break;
					case 'bmicalc-weight-metric':
					case 'bmicalc-height-cm':

						let kg = document.getElementById('bmicalc-weight-metric').value >= 0 ? document.getElementById('bmicalc-weight-metric').value : 0; 
						let cm = document.getElementById('bmicalc-height-cm').value >= 0 ? document.getElementById('bmicalc-height-cm').value : 0;

						target.value = target.value > 0 ? parseInt(target.value, 10) : 0;

						if (kg && cm) {
							let result = BMICalcController.calculateBMI('metric',{weight:kg,cm:cm});
							BMICalcController.setBMI(result);
							BMICalcView.renderResults();
						}
				}

		 });

		document.addEventListener('click', function (e){
			let target = e.target || e.srcElement;

			if (target.className === 'bmicalc-units-switcher') {
				e.preventDefault();
				let currentForm = BMICalclModel.currentForm;
				BMICalclModel.currentForm = (currentForm === 'standard' ? 'metric' : 'standard');
				BMICalcView.renderForm(BMICalclModel.currentForm);
			}
		});

	},

	renderForm: function(form){
		const standardFormHtml = `
		<div id="bmicalc-form">
			<form action="#" id="bmicalc-standard">
				<div class="bmicalc-heading">
					<h2>Body mass index (BMI)</h2>
					<p class="bmicalc-subhead">A measure of body fat in adults</p>	
				</div>
				
				<fieldset>
					<legend>Weight</legend>
					<p>
						<input type="number" required id="bmicalc-weight-standard">
						<label for="bmicalc-weight-standard">lb</label>
					</p>
				</fieldset>
				
				<fieldset>
					<legend>Height</legend>

					<p>
						<input type="number" required id="bmicalc-height-ft">
						<label for="bmicalc-height-ft">ft</label>
					</p>

					<p>
						<input type="number" required id="bmicalc-height-in">
						<label for="bmicalc-height-in">in</label>
					</p>
				</fieldset>

			</form>
			<p><a href="#" class="bmicalc-units-switcher">Switch to metric units</a></p>
		</div>	
		`;

		const metricFormHtml = `
		<div id="bmicalc-form">
			<form action="#" id="bmicalc-metric">
				<div class="bmicalc-heading">
					<h2>Body mass index (BMI)</h2>
					<p class="bmicalc-subhead">A measure of body fat in adults</p>	
				</div>
				
				<fieldset>
					<legend>Weight</legend>
					<p>
						<input type="number" required id="bmicalc-weight-metric">
						<label for="bmicalc-weight-metric">kg</label>
					</p>
				</fieldset>
				
				<fieldset>
					<legend>Height</legend>

					<p>
						<input type="number" required id="bmicalc-height-cm">
						<label for="bmicalc-height-cm">centimeters</label>
					</p>
				</fieldset>

			</form>
			<p><a href="#" class="bmicalc-units-switcher">Switch to standard units</a></p>
		</div>	
		`;

		let currentForm = form === 'standard' ? standardFormHtml : metricFormHtml;

		if (document.body.contains(document.getElementById('bmicalc-form'))) {
			document.getElementById('bmicalc-form').remove();
		}

		this.calcContainer.insertAdjacentHTML('afterbegin', currentForm) ;
	},

	renderResults: function () {
		let BMI = BMICalcController.getBMI() ? (BMICalcController.getBMI()).toFixed(1) : '--.-' ;
		let message = BMICalcController.getMessage(BMI);

		let resultsHTML = `
			<div id="bmicalc-result">
				<div id="bmicalc-number">
					${BMI}
				</div>

				<div id="bmicalc-resources">
					${message}
				</div>
			</div>
		`;
		if (document.body.contains(document.getElementById('bmicalc-result'))) {
			document.getElementById('bmicalc-result').remove();
		} 
		this.calcContainer.insertAdjacentHTML('beforeend', resultsHTML);

	}
};

BMICalcController.init();