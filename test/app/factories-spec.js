/*global describe, expect, beforeEach, it, inject*/
describe("test factories", function () {
    describe("factory: doesMedicineCauseReaction", function () {
        var DATA_PATHS,
            MESSAGES,
            doesMedicineCauseReaction,
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

        beforeEach(inject(function (_doesMedicineCauseReaction_, _$httpBackend_, _DATA_PATHS_, _MESSAGES_) {
            $httpBackend         = _$httpBackend_;
            doesMedicineCauseReaction = _doesMedicineCauseReaction_;
            DATA_PATHS           = _DATA_PATHS_;
            MESSAGES             = _MESSAGES_;
            queryHandler = $httpBackend.when('GET', DATA_PATHS.DRUG_SYMPTOM.replace('%drug%', drug).replace('%symptom%', symptom))
                .respond(testResponse);
        }));

        it("should fetch data from API", function () {
            var results;

            doesMedicineCauseReaction.get({
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

            doesMedicineCauseReaction.get({
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

    describe("factory: getChartData", function () {
        var DATA_PATHS,
            MESSAGES,
            getChartData,
            queryHandler,
            $httpBackend,
            params = {
                'type'      : 'my_med',
                'drug'      : 'tylenol',
                'symptom'   : 'dizziness'
            },
            path,
            donutResponse = {
                'title': 'Headaches make up 3% of reported adverse effects for Advil',
                'data': [
                    ['Headaches reported', 985],
                    ['All other adverse effects reported', 24000]
                ]
            };

        beforeEach(module('ads18fApp'));

        beforeEach(inject(function (_getChartData_, _$httpBackend_, _DATA_PATHS_, _MESSAGES_) {
            DATA_PATHS           = _DATA_PATHS_;
            path = DATA_PATHS.CHART
                       .replace('%type%', params.type)
                       .replace('%drug%', params.drug)
                       .replace('%symptom%', params.symptom);
            $httpBackend         = _$httpBackend_;
            getChartData            = _getChartData_;
            MESSAGES             = _MESSAGES_;
            queryHandler = $httpBackend.when('GET', path)
                .respond(donutResponse);
        }));

        it("should get chart data", function () {
            var results;

            getChartData.get(params).then(
                function (queryResults) {
                    results = queryResults;
                }
            );
            $httpBackend.flush();

            expect(results.data.length).to.equal(2);
        });

        it("should return error message on failure", function () {
            var message;

            queryHandler.respond(401, '');

            getChartData.get(params).then(
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
});