/*global describe, expect, beforeEach, it, inject*/

describe("Ads18fController", function () {
    var controller,
        scope,
        element,
        httpBackend,
        DATA_PATHS,
        foundResponse = {
            "found"          : true,
            "brand_name"     : "oxycodone",
            "generic_name"   : "oxycodone",
            "substance_name" : "oxycodone",
            "message"        : ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare, arcu in molestie ornare, tellus dui consequat urna, in cursus tortor libero at elit. Integer id diam sit amet mauris vulputate ornare. Praesent vel dignissim ligula. Nunc erat orci, volutpat sagittis vehicula ac, venenatis et neque. Curabitur consectetur in nisi vel placerat. Nam a risus lectus. Aliquam condimentum diam et erat dictum condimentum. Nam ornare turpis id pretium rhoncus.</p><p><p>Nam efficitur <span class=\"highlight\">oxycodone</span> quis posuere tristique. Vestibulum turpis ante, accumsan eu purus eget, posuere tempor dolor. Fusce sed fringilla enim. Sed tempus tristique varius. Vivamus cursus sed tortor et mattis. Vivamus varius finibus odio condimentum pulvinar. Phasellus vel arcu tincidunt, bibendum erat eu, sodales neque. Fusce rutrum iaculis dolor quis tincidunt.</p><p>Sed facilisis, enim ac convallis rhoncus, elit diam iaculis velit, eget tristique augue enim quis mauris. Fusce sed vehicula diam. Vestibulum enim metus, sodales eget aliquet eu, dapibus id erat. Ut tempor est sed pretium interdum. Nullam vel finibus orci. Etiam eget volutpat orci. Donec vel mauris vel massa eleifend dictum a in neque."],
            "spl_medguide"   : ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare, arcu in molestie ornare, tellus dui consequat urna, in cursus tortor libero at elit. Integer id diam sit amet mauris vulputate ornare. Praesent vel dignissim ligula. Nunc erat orci, volutpat sagittis vehicula ac, venenatis et neque. Curabitur consectetur in nisi vel placerat. Nam a risus lectus. Aliquam condimentum diam et erat dictum condimentum. Nam ornare turpis id pretium rhoncus.</p><p><p>Nam efficitur <span class=\"highlight\">oxycodone</span> quis posuere tristique. Vestibulum turpis ante, accumsan eu purus eget, posuere tempor dolor. Fusce sed fringilla enim. Sed tempus tristique varius. Vivamus cursus sed tortor et mattis. Vivamus varius finibus odio condimentum pulvinar. Phasellus vel arcu tincidunt, bibendum erat eu, sodales neque. Fusce rutrum iaculis dolor quis tincidunt.</p><p>Sed facilisis, enim ac convallis rhoncus, elit diam iaculis velit, eget tristique augue enim quis mauris. Fusce sed vehicula diam. Vestibulum enim metus, sodales eget aliquet eu, dapibus id erat. Ut tempor est sed pretium interdum. Nullam vel finibus orci. Etiam eget volutpat orci. Donec vel mauris vel massa eleifend dictum a in neque."]
        },
        notFoundResponse = {
            "found"          : false,
            "brand_name"     : "oxycodone",
            "generic_name"   : "oxycodone",
            "substance_name" : "oxycodone",
            "message"        : "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare, arcu in molestie ornare, tellus dui consequat urna, in cursus tortor libero at elit. Integer id diam sit amet mauris vulputate ornare. Praesent vel dignissim ligula. Nunc erat orci, volutpat sagittis vehicula ac, venenatis et neque. Curabitur consectetur in nisi vel placerat. Nam a risus lectus. Aliquam condimentum diam et erat dictum condimentum. Nam ornare turpis id pretium rhoncus.</p><p><p>Nam efficitur <span class=\"highlight\">oxycodone</span> quis posuere tristique. Vestibulum turpis ante, accumsan eu purus eget, posuere tempor dolor. Fusce sed fringilla enim. Sed tempus tristique varius. Vivamus cursus sed tortor et mattis. Vivamus varius finibus odio condimentum pulvinar. Phasellus vel arcu tincidunt, bibendum erat eu, sodales neque. Fusce rutrum iaculis dolor quis tincidunt.</p><p>Sed facilisis, enim ac convallis rhoncus, elit diam iaculis velit, eget tristique augue enim quis mauris. Fusce sed vehicula diam. Vestibulum enim metus, sodales eget aliquet eu, dapibus id erat. Ut tempor est sed pretium interdum. Nullam vel finibus orci. Etiam eget volutpat orci. Donec vel mauris vel massa eleifend dictum a in neque.</p>",
            "spl_medguide"   : ""
        },
        donutResponse = {
            'title': 'Headaches make up 3% of reported adverse effects for Advil',
            'data': [
                ['Headaches reported', 985],
                ['All other adverse effects reported', 24000]
            ]
        },
        drug         = "oxycodone",
        symptom      = "dizziness";

    beforeEach(module('ads18fApp'));

    beforeEach(inject(function ($controller, $rootScope, $compile, $httpBackend, _DATA_PATHS_) {
        scope       = $rootScope.$new();
        controller  = $controller('Ads18fController', {
            $scope: scope
        });
        element     = '<form name="drugCauseSymptom"><input required data-ng-model="drug" /><input required data-ng-model="symptom" /></form>';
        element     = $compile(element)(scope);
        httpBackend = $httpBackend;
        DATA_PATHS  = _DATA_PATHS_;
    }));

    it("should have no search criteria", function () {
        expect(scope.drug).to.be.empty;
        expect(scope.symptom).to.be.empty;
        expect(scope.formIsValid()).to.be.false;
    });

    it("should have no results", function () {
        expect(scope.hasResult).to.be.false;
    });

    it("should display search results - hasSideEffectYesNo = 'Yes' and medicine guide should be visible", function () {
        httpBackend.when('GET', DATA_PATHS.DRUG_SYMPTOM.replace('%drug%', drug).replace('%symptom%', symptom))
            .respond(foundResponse);

        httpBackend.when('GET', '/api/v1/chart/my_med/' + drug + '/' + symptom)
            .respond(donutResponse);

        httpBackend.when('GET', '/api/v1/chart/any_med/' + drug + '/' + symptom)
            .respond(donutResponse);

        scope.drug = drug;
        scope.symptom = symptom;

        scope.$digest();

        scope.submit();

        httpBackend.flush();

        expect(scope.hasSideEffectYesNo).to.equal('Yes');
        expect(scope.hasResult).to.be.true;
        expect(scope.hasSideEffect).to.be.true;
    });

    it("should clear search form and hide previous search when 'Search More Side Effects is clicked'", function () {
        httpBackend.when('GET', DATA_PATHS.DRUG_SYMPTOM.replace('%drug%', drug).replace('%symptom%', symptom))
            .respond(notFoundResponse);

        scope.drug = drug;
        scope.symptom = symptom;

        scope.$digest();

        scope.submit();

        httpBackend.flush();

        expect(scope.hasSideEffectYesNo).to.equal('No');
        expect(scope.hasResult).to.be.true;
        expect(scope.hasSideEffect).to.be.false;

        scope.searchMore();

        scope.$digest();

        expect(scope.drug).to.equal('');
        expect(scope.symptom).to.equal('');
        expect(scope.hasResult).to.be.false;
    });
});