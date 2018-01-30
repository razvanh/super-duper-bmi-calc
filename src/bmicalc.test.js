const BMICalcController = require('./bmicalc');

test('correctly calculates BMI when standard units are used', () => {
    expect(BMICalcController.calculateBMI('standard',{weight:155,ft:5,in:9})).toBe(22.9);
});