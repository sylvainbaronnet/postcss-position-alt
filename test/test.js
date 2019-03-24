var postcss = require('postcss');
var expect  = require('chai').expect;
var plugin  = require('../');

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

  it('test very simple position absolute', function (done) {
    test('a{ absolute: left; }',
         'a{ position: absolute; left: 0; }', { }, done);
  });
  it('test very simple position absolute 2', function (done) {
    test('a{ absolute: left z; }',
         'a{ position: absolute; z-index: 0; left: 0; }', { }, done);
  });

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




  it('test position shortcut', function (done) {
    test('a{ top: 10px left 20px right 30px bottom 40px; }',
         'a{ top: 10px; bottom: 40px; right: 30px; left: 20px; }', { }, done);
  });

  it('test position shortcut with no first value', function (done) {
    test('a{ top: left 20px right bottom 40px; }',
         'a{ top: 0; bottom: 40px; right: 0; left: 20px; }', { }, done);
  });
  it('test position shortcut with mixed value', function (done) {
    test('a{ top: left 20% right inherit bottom 40px zi 123; }',
         'a{ top: 0; z-index: 123; bottom: 40px; right: inherit; left: 20%; }', { }, done);
  });

  it('simple test position shortcut', function (done) {
    test('a{ top: 123px; }',
         'a{ top: 123px; }', { }, done);
  });

  it('simple test 2 position shortcut', function (done) {
    test('a{ bottom: 123px zi left; }',
         'a{ bottom: 123px; left: 0; z-index: 0; }', { }, done);
  });

  it('simple test very simple position shortcut', function (done) {
    test('a{ bottom: left; }',
         'a{ bottom: 0; left: 0; }', { }, done);
  });
  it('simple test very simple position 2 shortcut', function (done) {
    test('a{ right: left auto; }',
         'a{ right: 0; left: auto; }', { }, done);
  });


  it('test calc simple +', function (done) {
    test('a{ left: calc(100% + 10px); }',
         'a{ left: calc(100% + 10px); }', { }, done);
  });

  it('test calc simple -', function (done) {
    test('a{ left: calc(100% - 10px); }',
         'a{ left: calc(100% - 10px); }', { }, done);
  });

  it('test calc simple /', function (done) {
    test('a{ left: calc(100% / 10px); }',
         'a{ left: calc(100% / 10px); }', { }, done);
  });

  it('test calc simple *', function (done) {
    test('a{ left: calc(100% * 10px); }',
         'a{ left: calc(100% * 10px); }', { }, done);
  });

  it('test calc multiple operator', function (done) {
    test('a{ left: calc(100% * 10px + 12em / 2 - 0.5); }',
         'a{ left: calc(100% * 10px + 12em / 2 - 0.5); }', { }, done);
  });



  it('test multiple calc', function (done) {
    test('a{ left: calc(100% + 10px) right calc(88.8% - 2px); }',
         'a{ left: calc(100% + 10px); right: calc(88.8% - 2px); }', { }, done);
  });

  it('test multiple calc complex', function (done) {
    test('a{ left: calc(100% / 0.1em) right calc(88.8% - 2px) bottom zi 9999; }',
         'a{ left: calc(100% / 0.1em); z-index: 9999; bottom: 0; right: calc(88.8% - 2px); }', { }, done);
  });

  it('test multiple calc complex with negative value', function (done) {
    test('a{ left: -12px right calc(88.8% - 2px) bottom; }',
         'a{ left: -12px; bottom: 0; right: calc(88.8% - 2px); }', { }, done);
  });
  it('test multiple calc complex with negative value 2', function (done) {
    test('a{ absolute: left -12px right calc(88.8% * 2px) bottom; }',
         'a{ position: absolute; bottom: 0; right: calc(88.8% * 2px); left: -12px; }', { }, done);
  });


  it('test simple `full` keyword', function (done) {
    test('a{ absolute: full; }',
         'a{ position: absolute; left: 0; bottom: 0; right: 0; top: 0; }', { }, done);
  });
  it('test `full` keyword with z-index', function (done) {
    test('a{ fixed: full zi 99999; }',
         'a{ position: fixed; z-index: 99999; left: 0; bottom: 0; right: 0; top: 0; }', { }, done);
  });
  it('test `full` keyword and value', function (done) {
    test('a{ fixed: full 10rem; }',
         'a{ position: fixed; left: 10rem; bottom: 10rem; right: 10rem; top: 10rem; }', { }, done);
  });
  it('test `full` keyword and value with z-index', function (done) {
    test('a{ fixed: full 10px zi 99999; }',
         'a{ position: fixed; z-index: 99999; left: 10px; bottom: 10px; right: 10px; top: 10px; }', { }, done);
  });


  it('test `center` keyword', function (done) {
    test('a{ fixed: center; }',
         'a{ position: fixed; left: center; top: center; }', { }, done);
  });

  it('test `center` keyword with z-index', function (done) {
    test('a{ fixed: center zi 99999; }',
         'a{ position: fixed; z-index: 99999; left: center; top: center; }', { }, done);
  });
  it('test `center` keyword with z-index no value', function (done) {
    test('a{ absolute: center zi; }',
         'a{ position: absolute; z-index: 0; left: center; top: center; }', { }, done);
  });


});
