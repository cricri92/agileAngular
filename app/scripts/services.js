/** Servicios que permitiran hacer las llamadas AJAX a la API 
 * Estos servicios trabajan con factorias o fabricas, donde cada una esta asociada a una URL de la API REST.
*/

(function () {
    'use strict';
    
    angular.module('blog.services', ['ngResource']);
    
    /** Factoria para los posts */
    function Post ($resource, BaseUrl) {
        return $resource(BaseUrl + '/posts/:postId', { postId: '@_id'});
    }
    
    /** Factoria para los comentarios */
    function Comment ($resource, BaseUrl) {
        return $resource(BaseUrl + '/comments/:commentId', { commentId: '@_id'});
    }
    
    /** Factoria para los usuarios */
    function User ($resource, BaseUrl) {
        return $resource(BaseUrl + '/users/:id', { id: '@_id'});
    }
    
    angular
        .module('blog.services')
        .constant('BaseUrl', 'http://jsonplaceholder.typicode.com')
        .factory('Post', Post)
        .factory('Comment', Comment)
        .factory('User', User);
})();
