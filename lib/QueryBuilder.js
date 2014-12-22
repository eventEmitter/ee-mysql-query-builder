!function(){
    'use strict';


    var   Class         = require('ee-class')
        , log           = require('ee-log')
        , type          = require('ee-types')
        , QueryBuilder  = require('ee-query-builder').QueryBuilder
        , Functions     = require('./Functions')


    /**
     * takes a query object and returns a sql string
     */


    module.exports = new Class({
        inherits: QueryBuilder


        /**
         * class constructor
         *
         * @param <Object> contains the esacpe and escapeid function
         */
        , init: function init(options, FunctionsConstructor) {
            init.super.call(this, options, Functions);
        }



        /**
         * render the limit / offset statements
         *
         * @param <Object>  query
         */
        , _renderLimit: function(query) {
            var str = '';

            if (query.limit !== undefined) {
                str += ' LIMIT ' + (query.offset || 0) + ', ' + query.limit;
            }
            else if (query.offset !== undefined) {
                str += ' LIMIT '+query.offset + ', 18446744073709551615';
            }

            return str;
        }



        /**
         * render the ôrder ang group statements
         *
         * @param <Object>  query
         */
        , _renderOrderAndGroup: function(query) {
            var str = '';

            // render group statement
            if(query.group && query.group.length) str += ' GROUP BY ' + (this._renderGroup(query.group ) || 1);

            // render order statement
            if(query.order && query.order.length) str += ' ORDER BY ' + (this._renderOrder(query.order || []) || 1);

            return str;
        }



        /**
         * define which columns return after an insert
         *
         * @param <Array> values to return
         */
        , _returningColumns: function(dictionary) {
            return '';
        }



        /**
         * build an insert query without values to 
         * insert (table defaults)
         */
        , _insertWithoutValues: function() {
            return ' () VALUES ()';
        }


        /**
         * render the filter for the update query
         *
         * @param <Object>  query
         */
         , _renderUpdateOrDeleteFilter: function(query, parameters) {
            var filter;

            if (query.filter && Object.keys(query.filter).length) filter = this._renderFilter(parameters, query.filter || {});
            return filter || '1';
        }


        /**
         * order by specific values
         *
         * @param <Object> the instruction
         * @param <Array> array of rendered instructions
         */
        , _renderOrderByValue: function(instruction, instructions) {
            instructions.push('FIELD('+this._escapeId(instruction.entity)+'.'+this._escapeId(instruction.property)+', '+(instruction.desc ? instruction.byArray.reverse() : instruction.byArray).join(', ')+')');
        }
    });
}();
