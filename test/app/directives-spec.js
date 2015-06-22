/*global describe, expect, beforeEach, it, inject*/
describe("test directives", function () {
    describe("fill in the blank directive", function () {
        var element,
            scope;

        beforeEach(module('ads18fApp'));
        beforeEach(module('/app/partials/fill-in-the-blank.html'));

        beforeEach(inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();

            element = '<fill-in-the-blank ></fill-in-the-blank>';

            scope.size = 100;

            element = $compile(element)(scope);
            scope.$digest();
        }));

        it("should contain a label and input", function () {
            expect(element.attr('class').indexOf('fill-in-the-blank')).to.be.at.least(0);
            expect(element.find('label').length).to.equal(1);
            expect(element.find('input').length).to.equal(1);
        });
    });
});