/*global describe, expect, beforeEach, it, inject*/

describe("Controllers", function () {
    beforeEach(module('ads18fApp'));

    var foundResponse = {
            "found"          : true,
            "brand_name"     : "oxycodone",
            "generic_name"   : "oxycodone",
            "substance_name" : "oxycodone",
            "message"        : ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare, arcu in molestie ornare, tellus dui consequat urna, in cursus tortor libero at elit. Integer id diam sit amet mauris vulputate ornare. Praesent vel dignissim ligula. Nunc erat orci, volutpat sagittis vehicula ac, venenatis et neque. Curabitur consectetur in nisi vel placerat. Nam a risus lectus. Aliquam condimentum diam et erat dictum condimentum. Nam ornare turpis id pretium rhoncus.</p><p><p>Nam efficitur <span class=\"highlight\">oxycodone</span> quis posuere tristique. Vestibulum turpis ante, accumsan eu purus eget, posuere tempor dolor. Fusce sed fringilla enim. Sed tempus tristique varius. Vivamus cursus sed tortor et mattis. Vivamus varius finibus odio condimentum pulvinar. Phasellus vel arcu tincidunt, bibendum erat eu, sodales neque. Fusce rutrum iaculis dolor quis tincidunt.</p><p>Sed facilisis, enim ac convallis rhoncus, elit diam iaculis velit, eget tristique augue enim quis mauris. Fusce sed vehicula diam. Vestibulum enim metus, sodales eget aliquet eu, dapibus id erat. Ut tempor est sed pretium interdum. Nullam vel finibus orci. Etiam eget volutpat orci. Donec vel mauris vel massa eleifend dictum a in neque."],
            "spl_medguide"   : ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare, arcu in molestie ornare, tellus dui consequat urna, in cursus tortor libero at elit. Integer id diam sit amet mauris vulputate ornare. Praesent vel dignissim ligula. Nunc erat orci, volutpat sagittis vehicula ac, venenatis et neque. Curabitur consectetur in nisi vel placerat. Nam a risus lectus. Aliquam condimentum diam et erat dictum condimentum. Nam ornare turpis id pretium rhoncus.</p><p><p>Nam efficitur <span class=\"highlight\">oxycodone</span> quis posuere tristique. Vestibulum turpis ante, accumsan eu purus eget, posuere tempor dolor. Fusce sed fringilla enim. Sed tempus tristique varius. Vivamus cursus sed tortor et mattis. Vivamus varius finibus odio condimentum pulvinar. Phasellus vel arcu tincidunt, bibendum erat eu, sodales neque. Fusce rutrum iaculis dolor quis tincidunt.</p><p>Sed facilisis, enim ac convallis rhoncus, elit diam iaculis velit, eget tristique augue enim quis mauris. Fusce sed vehicula diam. Vestibulum enim metus, sodales eget aliquet eu, dapibus id erat. Ut tempor est sed pretium interdum. Nullam vel finibus orci. Etiam eget volutpat orci. Donec vel mauris vel massa eleifend dictum a in neque."]
        },
        notFoundResponse = {
            "found"          : false
        },
        donutResponse = {
            'title': 'Headaches make up 3% of reported adverse effects for Advil',
            'data': [
                ['Headaches reported', 985],
                ['All other adverse effects reported', 24000]
            ]
        },
        drug         = "oxycodone",
        invalidDrug  = 'placebo',
        symptom      = "dizziness",
        invalidSymptom  = '+1 to Charisma',
        partialNotFound = 'app/partials/not-found.html';

    describe("Ads18fController", function () {
        var scope,
            rootScope,
            controller,
            element,
            location,
            httpBackend,
            route;

        beforeEach(inject(function ($rootScope, $controller, $compile, $location, $httpBackend, $route) {
            scope       = $rootScope.$new();
            rootScope   = $rootScope;
            controller  = $controller('Ads18fController', {
                $scope: scope
            });
            element     = '<form name="drugCauseSymptom"><input required data-ng-model="drug" name="drug" id="drug" /><input required data-ng-model="symptom" name="symptom" id="symptom" /></form>';
            element     = $compile(element)(scope);
            location    = $location;
            httpBackend = $httpBackend;
            route       = $route;
        }));

        it("should have no search criteria", function () {
            scope.$digest();

            expect(scope.drug).to.be.empty;
            expect(scope.symptom).to.be.empty;
            expect(scope.formIsValid()).to.be.false;
        });

        it("should clear search form and hide previous search when 'Search More Side Effects' is clicked", function () {
            var path = '/drug-symptom/:drug/:symptom'.replace(':drug', drug).replace(':symptom', symptom);

            httpBackend.when("GET", 'app/partials/drug-symptom.html').respond(200, '');

            location.path(path);
            rootScope.$digest();
            scope.$digest();

            rootScope.$broadcast('$routeChangeSuccess', {
                pathParams: {
                    drug : invalidDrug,
                    symptom : invalidSymptom
                }
            });

            expect(scope.drug).to.equal(drug);
            expect(scope.symptom).to.equal(symptom);

            location.path('/drug-symptom/:drug/:symptom'.replace(':drug', drug).replace(':symptom', symptom));
            rootScope.$digest();
            scope.$digest();

            httpBackend.flush();

            rootScope.$broadcast('$routeChangeSuccess');

            expect(scope.drug).to.be.empty;
            expect(scope.symptom).to.be.empty;
        });

        it("should show not found view if drug is not valid term", function () {
            httpBackend.when("GET", partialNotFound).respond(200, '');

            scope.$digest();

            scope.drug = invalidDrug;
            scope.drugCauseSymptom.drug.$setValidity('term', false);

            scope.symptom = symptom;
            scope.drugCauseSymptom.symptom.$setValidity('term', true);

            scope.submit();
            rootScope.$digest();
            scope.$digest();

            expect(route.current.templateUrl).to.equal(partialNotFound);

            httpBackend.flush();
        });

        it("should show not found view if symptom is not valid term", function () {
            httpBackend.when("GET", partialNotFound).respond(200, '');

            scope.$digest();

            scope.drug = drug;
            scope.drugCauseSymptom.drug.$setValidity('term', true);

            scope.symptom = invalidSymptom;
            scope.drugCauseSymptom.symptom.$setValidity('term', false);

            scope.submit();
            rootScope.$digest();
            scope.$digest();

            expect(route.current.templateUrl).to.equal(partialNotFound);

            httpBackend.flush();
        });

        it("should show not found view if both drug and symptom are not valid terms", function () {
            httpBackend.when("GET", partialNotFound).respond(200, '');

            scope.$digest();

            scope.drug = invalidDrug;
            scope.drugCauseSymptom.drug.$setValidity('term', false);

            scope.symptom = invalidSymptom;
            scope.drugCauseSymptom.symptom.$setValidity('term', false);

            scope.submit();
            rootScope.$digest();
            scope.$digest();

            expect(route.current.templateUrl).to.equal(partialNotFound);

            httpBackend.flush();
        });
    });

    describe("DrugSymptom", function () {
        var scope,
            controller,
            routeParams,
            element,
            httpBackend,
            DATA_PATHS,
            MESSAGES;

        beforeEach(inject(function ($rootScope, $controller, $routeParams, $compile, $httpBackend, _DATA_PATHS_, _MESSAGES_) {
            scope       = $rootScope.$new();
            controller  = $controller('DrugSymptom', {
                $scope: scope,
                $routeParams: {
                    'drug'    : drug,
                    'symptom' : symptom
                }
            });
            routeParams = $routeParams;
            element     = '<form name="drugCauseSymptom"><input required data-ng-model="drug" /><input required data-ng-model="symptom" /></form>';
            element     = $compile(element)(scope);
            httpBackend = $httpBackend;
            DATA_PATHS  = _DATA_PATHS_;
            MESSAGES    = _MESSAGES_;
        }));

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

            httpBackend.flush();

            expect(scope.hasSideEffectYesNo).to.equal(MESSAGES.YES);
            expect(scope.hasResult).to.be.true;
            expect(scope.hasSideEffect).to.be.true;
        });

        it("should display search results - hasSideEffectYesNo = 'No'", function () {
            httpBackend.when('GET', DATA_PATHS.DRUG_SYMPTOM.replace('%drug%', drug).replace('%symptom%', symptom))
                .respond(notFoundResponse);

            httpBackend.when('GET', '/api/v1/chart/any_med/' + drug + '/' + symptom)
                .respond(donutResponse);


            httpBackend.flush();

            expect(scope.hasSideEffectYesNo).to.equal(MESSAGES.NO);
            expect(scope.hasResult).to.be.true;
            expect(scope.hasSideEffect).to.be.false;
        });
    });

    describe("NotFound", function () {
        var rootScope,
            scope,
            controller,
            route,
            location,
            httpBackend,
            MESSAGES;

        beforeEach(inject(function ($rootScope, $controller, $route, $location, $httpBackend, _MESSAGES_) {
            scope       = $rootScope.$new();
            rootScope   = $rootScope;
            controller  = $controller('NotFound', {
                $scope: scope
            });
            route       = $route;
            location    = $location;
            httpBackend = $httpBackend;
            MESSAGES    = _MESSAGES_;
        }));

        it("should show proper message if drug is not valid term", function () {
            httpBackend.when("GET", partialNotFound).respond(200, '');

            location.path('/not-found/drug/:drug'.replace(':drug', invalidDrug));
            rootScope.$digest();
            scope.$digest();

            rootScope.$broadcast('$routeChangeSuccess', {
                pathParams: {
                    drug : invalidDrug
                }
            });

            expect(scope.message).to.equal(MESSAGES.INVALID_TERM.replace('%term%', invalidDrug));

            httpBackend.flush();
        });

        it("should show proper message if symptom is not valid term", function () {
            httpBackend.when("GET", partialNotFound).respond(200, '');

            location.path('/not-found/symptom/:symptom'.replace(':symptom', invalidSymptom));
            rootScope.$digest();
            scope.$digest();

            rootScope.$broadcast('$routeChangeSuccess', {
                pathParams: {
                    symptom : invalidSymptom
                }
            });

            expect(scope.message).to.equal(MESSAGES.INVALID_TERM.replace('%term%', invalidSymptom));

            httpBackend.flush();
        });

        it("should show proper message if both drug and symptom are not valid terms", function () {
            httpBackend.when("GET", partialNotFound).respond(200, '');

            location.path('/not-found/both/:drug/:symptom'.replace(':drug', invalidDrug).replace(':symptom', invalidSymptom));
            rootScope.$digest();
            scope.$digest();

            rootScope.$broadcast('$routeChangeSuccess', {
                pathParams: {
                    drug : invalidDrug,
                    symptom : invalidSymptom
                }
            });

            expect(scope.message).to.equal(MESSAGES.INVALID_TERM.replace('%term%', invalidDrug + ' or ' + invalidSymptom));

            httpBackend.flush();
        });
    });
});