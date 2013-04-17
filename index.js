/**
 * Module dependencies
 */
var require = require("require-component")(require)
  , type = require("type")
  , debug = require("debug")("validate");

/**
 * 
 */
module.exports = function(value) {
  return new Validation(value);
};

function Validation (value) {
  this.value = value;
  this.failures = [];
  this.valid = true;
}

Validation.prototype.between =
Validation.prototype.within =
Validation.prototype.range = function(min, max) {
  return this.assert(above(this.value, min) && below(this.value, max), "range");
};

Validation.prototype.above =
Validation.prototype.min = function(min) {
  return this.assert(above(this.value, min), "min");
};

Validation.prototype.below =
Validation.prototype.max = function(max) {
  return this.assert(below(this.value, max), "max");
};

Validation.prototype.true = function() {
  return this.assert(this.value === true, "true");
};

Validation.prototype.false = function() {
  return this.assert(this.value === false, "false");
};

Validation.prototype.a =
Validation.prototype.an =
Validation.prototype.type = function(expected) {
  return this.assert(type(this.value) === expected, "type");
};

Validation.prototype.regex =
Validation.prototype.match = function(match) {
  return this.assert(this.value && this.value.match && !!this.value.match(match), "match");
};

Validation.prototype.eql =
Validation.prototype.eqls = function(expected) {
  return this.assert(this.value == expected, "eql");
};

Validation.prototype.equal =
Validation.prototype.equals = function(expected) {
  return this.assert(this.value === expected, "equals");
};

Validation.prototype.exist =
Validation.prototype.exists = function() {
  return this.assert(this.value != null, "exists");
};

Validation.prototype.assert = function(valid, type) {
  debug(type, this.value, valid);

  if (!valid) this.failures.push(type);
  this.valid = !this.failures.length;
  return this;
};

function above(value, min) {
  return type(value.length) === "undefined" ? min <= value : min <= value.length;
}

function below(value, max) {
  return type(value.length) === "undefined" ? value <= max : value.length <= max;
}
