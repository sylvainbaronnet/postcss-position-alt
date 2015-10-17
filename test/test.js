var postcss = require('postcss');
var expect  = require('chai').expect;

var plugin = require('../');

var test = function (input, output, opts, done) {
    postcss([ plugin(opts) ]).process(input).then(function (result) {
        expect(result.css).to.eql(output);
        expect(result.warnings()).to.be.empty;
        done();
    }).catch(function (error) {
        done(error);
    });
};

describe('postcss-position-alt', function () {

    it('test position absolute', function (done) {
      test('a{ absolute: top 10px left 20px right 30px bottom 40px; }',
           'a{ position: absolute; bottom: 40px; right: 30px; left: 20px; top: 10px; }', { }, done);
    });

    it('test position absolute no value', function (done) {
      test('a{ absolute: top left; }',
           'a{ position: absolute; left: 0; top: 0; }', { }, done);
    });

    it('test position fixed', function (done) {
      test('a{ fixed: bottom 10% right 4em; }',
           'a{ position: fixed; right: 4em; bottom: 10%; }', { }, done);
    });

    it('test auto and inherit value', function (done) {
      test('a{ fixed: bottom auto right inherit left; }',
           'a{ position: fixed; left: 0; right: inherit; bottom: auto; }', { }, done);
    });

    it('test relative', function (done) {
      test('a{ relative: top -1px; }',
           'a{ position: relative; top: -1px; }', { }, done);
    });

});
