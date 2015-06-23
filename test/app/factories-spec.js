/*global describe, expect, beforeEach, it, inject*/
describe("test factories", function () {
    describe("factory: doesDrugCauseSymptom", function () {
        var DATA_PATHS,
            MESSAGES,
            doesDrugCauseSymptom,
            $httpBackend,
            queryHandler,
            drug         = "oxycodone",
            symptom      = "dizziness",
            testResponse = {
                "found"          : "true",
                "brand_name"     : "oxycodone",
                "generic_name"   : "oxycodone",
                "substance_name" : "oxycodone",
                "spl_medguide"   : "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare, arcu in molestie ornare, tellus dui consequat urna, in cursus tortor libero at elit. Integer id diam sit amet mauris vulputate ornare. Praesent vel dignissim ligula. Nunc erat orci, volutpat sagittis vehicula ac, venenatis et neque. Curabitur consectetur in nisi vel placerat. Nam a risus lectus. Aliquam condimentum diam et erat dictum condimentum. Nam ornare turpis id pretium rhoncus.</p><p><p>Nam efficitur <span class=\"highlight\">oxycodone</span> quis posuere tristique. Vestibulum turpis ante, accumsan eu purus eget, posuere tempor dolor. Fusce sed fringilla enim. Sed tempus tristique varius. Vivamus cursus sed tortor et mattis. Vivamus varius finibus odio condimentum pulvinar. Phasellus vel arcu tincidunt, bibendum erat eu, sodales neque. Fusce rutrum iaculis dolor quis tincidunt.</p><p>Sed facilisis, enim ac convallis rhoncus, elit diam iaculis velit, eget tristique augue enim quis mauris. Fusce sed vehicula diam. Vestibulum enim metus, sodales eget aliquet eu, dapibus id erat. Ut tempor est sed pretium interdum. Nullam vel finibus orci. Etiam eget volutpat orci. Donec vel mauris vel massa eleifend dictum a in neque.</p>"
            };

        beforeEach(module('ads18fApp'));

        beforeEach(inject(function (_doesDrugCauseSymptom_, _$httpBackend_, _DATA_PATHS_, _MESSAGES_) {
            $httpBackend         = _$httpBackend_;
            doesDrugCauseSymptom = _doesDrugCauseSymptom_;
            DATA_PATHS           = _DATA_PATHS_;
            MESSAGES             = _MESSAGES_;
            queryHandler = $httpBackend.when('GET', DATA_PATHS.DRUG_SYMPTOM.replace('%drug%', drug).replace('%symptom%', symptom))
                .respond(testResponse);
        }));

        it("should fetch data from API", function () {
            var results;

            doesDrugCauseSymptom.get({
                'drug'    : drug,
                'symptom' : symptom
            }).then(
                function (queryResults) {
                    results = queryResults;
                }
            );
            $httpBackend.flush();

            expect(results.found).to.equal(testResponse.found);
            expect(results.brand_name).to.equal(testResponse.brand_name);
            expect(results.generic_name).to.equal(testResponse.generic_name);
            expect(results.substance_name).to.equal(testResponse.substance_name);
        });

        it("should return error message on failure", function () {
            var message;

            queryHandler.respond(401, '');

            doesDrugCauseSymptom.get({
                'drug'    : drug,
                'symptom' : symptom
            }).then(
                function (queryResults) {
                    console.log("this shouldn't work", queryResults);
                },
                function (errorMessage) {
                    message = errorMessage;
                }
            );
            $httpBackend.flush();

            expect(message).to.equal(MESSAGES.SERVER_ERRROR);
        });
    });

    describe("factory: typeAhead", function () {
        var DATA_PATHS,
            typeAhead,
            $httpBackend,
            drugResponse = [
                {"key"    : "Oxycodone"},
                {"key"    : "Oxycontin"},
                {"key"    : "Oxyfast"},
                {"key"    : "Oxymetazoline"},
                {"key"    : "Oxymorphone"}
            ],
            symptomResponse = [
                {"key"    : "Diaper Rash"},
                {"key"    : "Diarrhea"},
                {"key"    : "Difficulty swallowing"},
                {"key"    : "Diplopia"},
                {"key"    : "Dizziness"}
            ];

        beforeEach(module('ads18fApp'));

        beforeEach(inject(function (_typeAhead_, _$httpBackend_, _DATA_PATHS_) {
            $httpBackend         = _$httpBackend_;
            typeAhead            = _typeAhead_;
            DATA_PATHS           = _DATA_PATHS_;
        }));

        it("should get drug results when typing in drug field", function () {
            var results,
                query = "oxy",
                field = "DRUG",
                queryHandler = $httpBackend.when('GET', DATA_PATHS.TYPEAHEAD_DRUG + query)
                    .respond(drugResponse);

            typeAhead.get({
                'field' : field,
                'query' : query
            }).then(
                function (queryResults) {
                    results = queryResults;
                }
            );
            $httpBackend.flush();

            expect(results.length).to.equal(5);
        });

        it("should get symptom results when typing in symptom field", function () {
            var results,
                query = "Di",
                field = "SYMPTOM",
                queryHandler = $httpBackend.when('GET', DATA_PATHS.TYPEAHEAD_SYMPTOM + query)
                    .respond(symptomResponse);

            typeAhead.get({
                'field' : field,
                'query' : query
            }).then(
                function (queryResults) {
                    results = queryResults;
                }
            );
            $httpBackend.flush();

            expect(results.length).to.equal(5);
        });
    });
});