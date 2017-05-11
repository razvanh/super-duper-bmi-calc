var BMICalclModel = {
	currentForm: null,
	BMI: null,

}

var BMICalcController = {

	init: function (){

		BMICalclModel.currentForm = 'metric';
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
			case 'imperial':
				let height = (Number(12*measurements.ft) + Number(measurements.in));
				return (measurements.weight/(height * height)) * 703;
			case 'metric':
				let cm = Number(measurements.cm);
				return (measurements.weight/(cm * cm)) * 10000;	
		}
	}

}


var BMICalcView = {
	init: function (){

		let currentForm = BMICalcController.getCurrentForm();

		this.calcContainer = document.getElementById('bmicalc');
		this.calcContainer.className += currentForm;


		this.renderForm(currentForm);
		this.renderResults();

		document.addEventListener('input',function(e){
			let target = e.target || e.srcElement
			if (target) {
				switch (target.id) {
					case 'bmicalc-weight-imperial':
					case 'bmicalc-height-ft':
					case 'bmicalc-height-in':
						let lbs = document.getElementById('bmicalc-weight-imperial').value;
						let ft = document.getElementById('bmicalc-height-ft').value;
						let inch = document.getElementById('bmicalc-height-in').value;

						if (inch < 0 ) {
							target.value = 0;
							inch = 0;
						}

						if (inch > 11) {
							target.value = 11;
							inch = 11;
						}

						if (lbs && ft && inch) {
							let result = BMICalcController.calculateBMI('imperial',{weight:lbs,ft:ft,in:inch});
							BMICalclModel.BMI = result;
							BMICalcView.renderResults();
						}
						

						break;
					case 'bmicalc-weight-metric':
					case 'bmicalc-height-cm':
						let kg = document.getElementById('bmicalc-weight-metric').value; 
						let cm = document.getElementById('bmicalc-height-cm').value;

						if (kg && cm) {
							let result = BMICalcController.calculateBMI('metric',{weight:kg,cm:cm});
							BMICalclModel.BMI = result;
							BMICalcView.renderResults();
						}
				}
			}

		 });

	},

	renderForm: function(form){
		const imperialFormHtml = `
		<div id="bmicalc-form">
			<form action="#" id="bmicalc-imperial">
				<div class="bmicalc-heading">
					<h2>Body mass index (BMI)</h2>
					<p class="bmicalc-subhead">A measure of body fat in adults</p>	
				</div>
				
				<fieldset>
					<legend>Weight</legend>
					<p>
						<input type="number" required id="bmicalc-weight-imperial">
						<label for="bmicalc-weight-imperial">lb</label>
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
		</div>	
		`;

		let currentForm = form === 'imperial' ? imperialFormHtml : metricFormHtml;

		this.calcContainer.insertAdjacentHTML('afterbegin', currentForm) ;
	},

	renderResults: function () {
		let BMI = BMICalclModel.BMI ? BMICalclModel.BMI.toFixed(1) : '--.-' ;
		let resultsHTML = `
			<div id="bmicalc-result">
				<div id="bmicalc-number">
					${BMI}
				</div>

				<div id="bmicalc-resources">
					
				</div>
			</div>
		`;
		if (document.contains(document.getElementById('bmicalc-result'))) {
			document.getElementById('bmicalc-result').remove();
		} 
		this.calcContainer.insertAdjacentHTML('beforeend', resultsHTML);

	}
}

BMICalcController.init();