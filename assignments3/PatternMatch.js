var Transform = require('stream').Transform;
var util = require("util").inherits;

var tb = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tempor arcu, quis hendrerit nunc accumsan quis. In ut dolor metus, eget viverra odio. Quisque sed suscipit leo. Curabitur dictum magna ut turpis interdum a mollis nunc condimentum. Praesent leo est, hendreriteget condimentum sit amet, placerat adipiscing neque. Curabitur id metus tellus, sed semper odio. Phasellus id justo ante, vel bibendum eros. Nulla suscipit felis eget erat iaculis et aliquam turpis consequat. Nunc posuere mollis tellus sit amet dapibus. Praesent sagittis quam sit amet mauris venenatis in dignissim purus dapibus.'

function PatternMatch(pattern)
{
  util.call(this, pattern)
  this.option = pattern
}

Transform(PatternMatch, util)

PatternMatch.prototype._transform = function (chunk, encoding, callback)
{
  var tb = chunk.toString('ascii')
  this.push(tb)

  var str = tb.split(this.option)
  this._lastLineData = str.splice(str.length-1, 1)[0]

  this.push('--------------Input-------------');
  this.push('[')

  for(var value in str)
  {
    this.push("'"+str[value]+"'"+',')
  }
  this.push(']')
  callback()

  this.push('--------------Output-------------');
}

PatternMatch.prototype._flush = function (callback)
{
  if(this._lastLineData)
  {
    this.push(this._lastLineData)
    this._lastLineData = null
    callback()
  }
}
module.exports = PatternMatch