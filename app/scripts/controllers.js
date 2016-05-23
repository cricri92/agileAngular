(function() {
    'use strict';
    
    angular.module('blog.controllers', ['blog.services']);
    
    /** Busca todos los posts */
    function PostListController(Post) {
        this.posts = Post.query();
    }
    
    /** Busca un post detallado con sus comentarios y el usuario que lo realizo */
    function PostDetailController($routeParams, Post, Comment, User) {
        this.post = {};
        this.comments = {};
        this.user = {}
        
        var self = this; // Para guardar la referencia
        
        Post.query({ id: $routeParams.postId })
            .$promise.then(
                //Success
                function (data) {
                    self.post = data[0];
                    self.user = User.query({ id: self.user.userId });
                },
                //Error
                function (error) {
                    console.log(error);
                }
            );
        this.comments = Comment.query({ postId: $routeParams.postId });
    }
    
    /** Crea una nueva entrada */
    function PostCreateController(Post) {
        var self = this;
        
        this.create = function() {
             Post.save(self.post);
        };
    }
})();