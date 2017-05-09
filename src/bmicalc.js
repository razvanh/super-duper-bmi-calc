var BMICalclModel = {
	currentForm: null,

}

var BMICalcController = {

	init: function (){

		BMICalclModel.currentForm = 'imperial';
		//Initialize views
		BMICalcView.init();
	},

	getCurrentForm: function(){
		return BMICalclModel.currentForm;
	}

}


var BMICalcView = {
	init: function (){

		let currentForm = BMICalcController.getCurrentForm();

		this.calcContainer = document.getElementById('bmicalc');
		this.calcContainer.className += currentForm;

		this.imperialFormHtml = `
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

		this.resultsHTML = `
			<div id="bmicalc-result">
				<div id="bmicalc-number">
					0
				</div>

				<div id="bmicalc-resources">
					
				</div>
			</div>
		`;

		this.render();

		document.addEventListener('change',function(e){
			if (e.target && e.target.id == 'bmicalc-weight-imperial') {
				console.log(e.target.id);
			}

		 });

	},

	render: function(){
		this.calcContainer.insertAdjacentHTML('afterbegin', this.imperialFormHtml) ;
		this.calcContainer.insertAdjacentHTML('beforeend', this.resultsHTML);
	}
}

BMICalcController.init();