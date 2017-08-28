angular.module('servicos', ['ngResource'])
.factory('recursoEquipe', function($resource) {

	return $resource('http://localhost:8080/equipes/:equipeId', null, {
		update : {
			method: 'PUT'
		}
	});

})

.factory('recursoPokemon', function($resource) {

	return $resource('http://localhost:8080/pokemons/:pokemonId', null, {
		update : {
			method: 'PUT'
		}
	});

})

.factory('recursoHabilidade', function($resource) {

	return $resource('http://localhost:8080/habilidades/:habilidadeId', null, {
		update : {
			method: 'PUT'
		}
	});

})

.factory('recursoUsuario', function($resource) {

	return $resource('http://localhost:8080/usuarios/:usuarioId');

})

.factory('recursoPokemonApi', function($resource) {

	return $resource('http://pokeapi.co/api/v2/pokemon/?limit=811/:apiID');

})

.factory('recursoHabilidadeApi', function($resource) {

	return $resource('http://pokeapi.co/api/v2/ability/?limit=251/:apiID');

});
