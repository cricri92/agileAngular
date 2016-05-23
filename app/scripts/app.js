(function() {
    'use strict';
    
    angular.module('blog', ['ngRoute', 'blog.controllers']);

    function config($locationProvider, $routeProvider) {
        // (Configuracion por defecto de Angular)
        /** Permite que las URLs no lleven el caracter # al inicio de estas */ 
        $locationProvider.html5Mode(true);
        
        /** Directiva que permite establecer las rutas de la app */
        $routeProvider
            /**
             * Carga la vista principal (documento post-list.tpl.html)
             * Usa el controlador PostListController
             * Investigar mas sobre controllerAs
             * (Parece un alias para la ruta)
             */
            .when('/', {
                templateUrl:    'views/post-list.tpl.html',
                controller:     'PostListController',
                controllerAs:   'postlist'
            })
            /**
             * Provee un post detallado (documento post-detail.tpl.html)
             * Usa el controlador PostDetailController
             * Investigar mas sobre controllerAs
             * (Parece un alias para la ruta)
             */
            .when('/post/:postId', {
                templateUrl:    'views/post-detail.tpl.html',
                controller:     'PostDetailController',
                controllerAs:   'postdetail'
            })        
            /**
             * Carga el formulario de creacion de entrada (documento post-create.tpl.html)
             * Usa el controlador PostCreateController
             * Investigar mas sobre controllerAs
             * (Parece un alias para la ruta)
             */
            .when('/new', {
                templateUrl:    'views/post-create.tpl.html',
                controller:     'PostCreateController',
                controllerAs:   'postcreate'
            })
        }
        
        angular
            .module('blog')
            .config(config);
})();