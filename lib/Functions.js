!function(){

    var   Class         = require('ee-class')
        , log           = require('ee-log')
        , type          = require('ee-types')
        , QueryBuilder  = require('related-query-builder');


    // the query builder implemetns the postgres syntax
    // we don't need to extend
    module.exports = new Class({
        inherits: QueryBuilder.Functions


        
        /**
         * SQL like statement
         *
         * @param <Object>  instruction
         */
        , like: function(command) {
            return ' LIKE '+this._escape(command.value);
        }
 


        /**
         * SQL not like statement
         *
         * @param <Object>  instruction
         */
        , notLike: function(command) {
            return ' NOT LIKE '+this._escape(command.value);
        }
    });
}();
