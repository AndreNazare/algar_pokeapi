angular.module('teamPokemon', ['ngAnimate', 'ngRoute', 'servicos', 'angularUtils.directives.dirPagination'])
.config(function($routeProvider, $locationProvider) {

	$locationProvider.html5Mode(true);
	
	$routeProvider.when('/equipe', {
		templateUrl: 'partials/equipe-crud.html',
		controller: 'EquipeController'
	});	
	
	$routeProvider.when('/vincularpokemon/:equipeId', {
		templateUrl: 'partials/vincular-pokemon.html',
		controller: 'VinculaPokemonController'
	});
	
	$routeProvider.when('/vincularhabilidade/:equipeId_pokemonId', {
		templateUrl: 'partials/vincular-habilidade.html',
		controller: 'VinculaHabilidadeController'
	});

	$routeProvider.when('/login', {
		templateUrl: 'partials/login.html'
	});

	$routeProvider.otherwise({ redirectTo: '/equipe'})

})