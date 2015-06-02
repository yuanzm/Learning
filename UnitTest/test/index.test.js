var lib = require('../lib');
should = require('should')

describe('module', function() {
	describe('limit', function() {
		it('limit should success', function() {
			lib.limit(10).should.be.equal(10);
		})
		it('limit should ok when less than 0', function() {
			lib.limit(-1).should.be.equal(0);
		})
	})

	describe('async', function() {
		it('async', function(done) {
			lib.async(function(result) {
				done();
			})
		})
	});

	describe('asyncTimeout', function() {
		it('async should ok', function(done) {
			lib.asyncTimeout(function(result) {
				done();
			})
		})
	});
});
