var admiral = require('commander');
var patterMatch = require('./PatternMatch')
var fileSystem = require('fs')

admiral
	.option('-p, --pattern <pattern>', 'Input Pattern such as . ,')
	.parse(process.argv);

var inputStream = fileSystem.createReadStream('input-sensor.txt')
var patternStream = inputStream.pipe(new PatternMatch(admiral.pattern))

patternStream.on('readable',function()
{
	var line 
	while(null !=(line = privateStreamer.read()))
	{
		console.log(line.toString('ascii'))
	}
})