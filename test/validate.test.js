/**
 * Module dependencies
 */
var should = require("should")
  , validate = require("..");

describe("validate", function(){

  it("should validate an eql", function(){
    validate("foo")
      .eql("foo")
      .valid.should.equal(true);
  });

  it("should validate an invalid eql", function(){
    validate("foo")
      .eql("bar")
      .valid.should.equal(false);
  });

  it("should validate an eql", function(){
    validate("foo")
      .equal("foo")
      .valid.should.equal(true);
  });

  it("should validate an invalid eql", function(){
    validate("foo")
      .equal("bar")
      .valid.should.equal(false);
  });

  it("should validate a regex", function(){
    validate("foo")
      .match(/foo/)
      .valid.should.equal(true);
  });

  it("should validate an invalid regex", function(){
    validate("foo")
      .match(/bar/)
      .valid.should.equal(false);
  });

  it("should validate a integer range", function(){
    validate(3)
      .range(1, 4)
      .valid.should.equal(true);
  });

  it("should validate a float range", function(){
    validate(3.14)
      .range(1.6, 4.15)
      .valid.should.equal(true);
  });

  it("should validate a minimum number", function(){
    validate(3.14)
      .min(1.6)
      .valid.should.equal(true);
  });

  it("should validate an invalid minimum number", function(){
    validate(3.14)
      .min(7.6)
      .valid.should.equal(false);
  });

  it("should validate a maximum number", function(){
    validate(3.14)
      .max(7.6)
      .valid.should.equal(true);
  });

  it("should validate an invalid maximum number", function(){
    validate(3.14)
      .max(1.6)
      .valid.should.equal(false);
  });

  it("should validate false", function(){
    validate(false)
      .false()
      .valid.should.equal(true);
  });

  it("should validate an invalid false", function(){
    validate(true)
      .false()
      .valid.should.equal(false);
  });

  it("should validate true", function(){
    validate(true)
      .true()
      .valid.should.equal(true);
  });

  it("should validate an invalid true", function(){
    validate(false)
      .true()
      .valid.should.equal(false);
  });

  it("should validate a null", function(){
    validate(null)
      .exist()
      .valid.should.equal(false);
  });

  it("should validate an undefined", function(){
    validate(undefined)
      .exist()
      .valid.should.equal(false);
  });

  it("should validate a false exists", function(){
    validate("")
      .exist()
      .valid.should.equal(true);
  });

  it("should validate a type", function(){
    validate("testing")
      .type("string")
      .valid.should.equal(true);
  });

  it("should chain assertions", function(){
    validate("foo")
      .exist()
      .match("foo")
      .valid.should.equal(true);
  });

  it("should chain failed assertions", function(){
    validate("hello")
      .match("testing")
      .match("hello")
      .valid.should.equal(false);
  });

});
