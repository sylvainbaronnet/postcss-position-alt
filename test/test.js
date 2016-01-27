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

    it('test with different values', function (done) {
      test('a{ absolute: top -1.5rem left right auto bottom; }',
           'a{ position: absolute; bottom: 0; right: auto; left: 0; top: -1.5rem; }', { }, done);
    });

    it('test simple 1', function (done) {
      test('a{ absolute: left 1px; }',
           'a{ position: absolute; left: 1px; }', { }, done);
    });

    it('test simple 2', function (done) {
      test('a{ fixed: top; }',
           'a{ position: fixed; top: 0; }', { }, done);
    });

    it('test simple 3', function (done) {
      test('a{ relative: top auto; }',
           'a{ position: relative; top: auto; }', { }, done);
    });

    it('test simple 4', function (done) {
      test('a{ fixed: top inherit; }',
           'a{ position: fixed; top: inherit; }', { }, done);
    });

    it('test simple 5', function (done) {
      test('a{ fixed: left top inherit; }',
           'a{ position: fixed; top: inherit; left: 0; }', { }, done);
    });

    it('test simple 6', function (done) {
      test('a{ fixed: left top right bottom; }',
           'a{ position: fixed; bottom: 0; right: 0; top: 0; left: 0; }', { }, done);
    });

    it('test z-index simple', function (done) {
      test('a{ fixed: left top z-index 12; }',
           'a{ position: fixed; z-index: 12; top: 0; left: 0; }', { }, done);
    });
    it('test z-index complex', function (done) {
      test('a{ fixed: left top z-index 12 right auto; }',
           'a{ position: fixed; right: auto; z-index: 12; top: 0; left: 0; }', { }, done);
    });
    it('test css var', function (done) {
      test('a{ fixed: left top var(--some-var); }',
           'a{ position: fixed; top: var(--some-var); left: 0; }', { }, done);
    });
    it('test revert and initial value', function (done) {
      test('a{ fixed: left revert top initial; }',
           'a{ position: fixed; top: initial; left: revert; }', { }, done);
    });
    it('test properties aliases', function (done) {
      test('a{ fixed: l 1% t b auto r 12px z 12; }',
           'a{ position: fixed; z-index: 12; right: 12px; bottom: auto; top: 0; left: 1%; }', { }, done);
    });
    it('test properties aliases mixed with normal properties', function (done) {
      test('a{ fixed: l 1% top b auto r 12px z-index 12; }',
           'a{ position: fixed; z-index: 12; right: 12px; bottom: auto; top: 0; left: 1%; }', { }, done);
    });


});
