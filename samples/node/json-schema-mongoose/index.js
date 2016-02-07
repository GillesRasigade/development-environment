'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var createMongooseSchema = require('json-schema-to-mongoose/lib/json-schema')
var util = require('util')

var refs =
{
    yep:
    {
        type: 'string',
        pattern: '^\\d{3}$'
    },
    race:
    {
        type: 'string',
        enum: ['Abyssinian', 'American Curl']
    },
    idSpec: {
        type: 'object',
        properties:
        {
            id:
            {
                $ref: 'yep'
            }
        }
    }
}

var schema =
{
    type: 'object',
    properties:
    {
        id:
        {
            $ref: 'yep'
        },
        race: {
            $ref: 'race'
        },
        address:
        {
            type: 'object',
            properties:
            {
                street: {type: 'string', default: '44', pattern: '^\\d{2}$'},
                houseColor: {type: 'string', default: '[Function=Date.now]', format: 'date-time'}
            }
        }
    }
}

//Convert the schema
var mongooseSchema = createMongooseSchema(refs, schema)

console.log(util.inspect(mongooseSchema, false, null))

var Schema = new mongoose.Schema(mongooseSchema);

var Cat = mongoose.model('Cat', Schema);

var kitty = new Cat({
    race: 'Abyssinian'
});

console.log(kitty);

kitty.save(function(err) {
  if (err) console.error(err);

  console.log('meow');

});
