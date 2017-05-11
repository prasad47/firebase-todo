'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Timing = new Schema({
    name:String,
    open : String,
    close : String,
    lastOrder:String,
    leadTime : String,
    interval : String,
    isOpen : {type: Boolean,default:true},
    message : String
});

var Day = new Schema({
    sort : Number,
    name : String,
    isOnlineOrderOpen : {type: Boolean,default:true},
    message : String,
    store  :[Timing],
    pickup  :[Timing],
    delivery :[Timing]
});



/**
 * BusinessHour Schema
 */
var BusinessHourSchema = new Schema({
    schemaName:{type: String,default: 'BusinessHour',required: 'Schema Name cannot be blank'},
    restaurantId:String,
    restaurantDisplayName:String,
    displayName: {
        type: String,
        default: '',
        trim: true,
        required: 'Display Name cannot be blank'
    },
    ApplySameTimingsFor:['mon','tue','wed','thu','fri','sat','sun'],
    Timings:[],
    mon:[Day],
    tue:[Day],
    wed:[Day],
    thu:[Day],
    fri:[Day],
    sat:[Day],
    sun:[Day],
    system: {
        createdBy: {type: Schema.ObjectId,ref: 'User'},
        updatedBy: {type: Schema.ObjectId,ref: 'User'},
        dateCreated:{type: Date,default: Date.now},
        dateUpdated:{type: Date, default: Date.now}	,
        isEnabled:{type: Boolean,default:true},
        isDeleted:{type: Boolean,default:false},
        _id:false,
        id:false
    }
});

var BusinessHourChangeSchema = new Schema({
    effectiveDate: Date,
    restaurantId:String,
    restaurantDisplayName:String,
    businessHour:[BusinessHourSchema],
    system: {
        createdBy: {type: Schema.ObjectId,ref: 'User'},
        updatedBy: {type: Schema.ObjectId,ref: 'User'},
        dateCreated:{type: Date,default: Date.now},
        dateUpdated:{type: Date, default: Date.now}	,
        isEnabled:{type: Boolean,default:true},
        isDeleted:{type: Boolean,default:false},
        _id:false,
        id:false
    }
});

mongoose.model('BusinessHour', BusinessHourSchema);
mongoose.model('BusinessHourFutureChange', BusinessHourChangeSchema);
mongoose.model('BusinessHourPreviousChange', BusinessHourChangeSchema);



//sample model
/*
 {"mon":[{"sort":1,"name":"Store Timings","isOnlineOrderOpen":true,"store":[{"open":"09:30","close":"20:30","isOpen":true,"message":"We are Open!"}],"pickup":[{"open":"09:30","close":"20:30","leadTime":"30","interval":"15","isOpen":true,"message":"Accepting takeot orders"}],"delivery":[{"open":"10:30","close":"20:00","leadTime":"45","interval":"15","isOpen":true,"message":"Accepting delivery orders"}]}]}
 */
