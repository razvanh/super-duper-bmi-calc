const BMICalcController = require('./bmicalc');

test('calculateBMI returns a number', () => {
    expect(typeof BMICalcController.calculateBMI('standard',{weight:155,ft:5,in:9})).toBe("number");
});
test('correctly calculates BMI when standard units are used', () => {
    expect(BMICalcController.calculateBMI('standard',{weight:155,ft:5,in:9})).toBe(22.9);
});