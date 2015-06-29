/*global describe, expect, beforeEach, it, inject*/
describe("test directives", function () {
    var element,
        scope;

    beforeEach(module('ads18fApp'));

    describe("fill in the blank directive", function () {
        beforeEach(module('/app/partials/fill-in-the-blank.html'));

        beforeEach(inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();

            element = '<fill-in-the-blank></fill-in-the-blank>';

            element = $compile(element)(scope);
            scope.$digest();
        }));

        it("should contain a label and input", function () {
            expect(element.attr('class').indexOf('fill-in-the-blank')).to.be.at.least(0);
            expect(element.find('label').length).to.equal(1);
            expect(element.find('input').length).to.equal(1);
        });
    });

    describe("chart directive", function () {
        beforeEach(inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();

            scope.myMedChartData = [];

            element = '<chart data-chart-data="myMedChartData"></chart>';

            element = $compile(element)(scope);
            scope.$digest();
        }));

        it("should replace <chart> with div.chart-wrapper", function () {
            expect(element.attr('class').indexOf('chart-wrapper')).to.be.at.least(0);
        });
    });
});