angular.module('teamPokemon')
.controller('VinculaPokemonController', function($scope, $http, recursoEquipe, recursoPokemon, $routeParams) {	

	$scope.equipe = {};
	$scope.mensagem = '';

	$scope.pokemons = [];
	$scope.filtro = ''; 
	$scope.pokemon = {};

	// recupera a equipe
	recursoEquipe.get({equipeId : $routeParams.equipeId}, function(equipe) {
		$scope.equipe = equipe;
		console.log(equipe);
	}, function(erro) {		
		console.log(erro);	
	});

	//recupera lista de pokemons pokeapi
	/*recursoPokemonApi.query(function(pokemons) {
		console.log(pokemons);
		$scope.pokemons = pokemons.results;
	}, function(erro) {
		console.log(erro);
	});*/
	
	$http.get('http://pokeapi.co/api/v2/pokemon/?limit=811')
	.success(function(pokemons) {
		console.log(pokemons);
		$scope.pokemons = pokemons.results;
	})
	.error(function(erro) {
		console.log(erro);
	});
	
	$scope.vincular = function(pokemon) {
		$scope.pokemon = {};
		if ($scope.equipe.codigo) {
			for(var i=0; i<$scope.equipe.pokemons.length; i++) {
			    if($scope.equipe.pokemons[i].nome === pokemon.name) {
			    	$scope.mensagem = 'Já existe o ' + pokemon.name + ' vinculado a essa ' + $scope.equipe.nome;
					return
			    }
			}			
			$scope.pokemon.nome = pokemon.name;
			recursoPokemon.save($scope.pokemon, function(pokemon) {
				$scope.pokemon = {};
				$scope.pokemon = pokemon;
				$scope.equipe.pokemons.push(pokemon);
				
				recursoEquipe.update({equipeId : $scope.equipe.codigo}, $scope.equipe, function(equipe){
					$scope.equipe = equipe;
					$scope.mensagem = 'O pokemon ' + $scope.pokemon.nome + ' foi vinculado a equipe ' + $scope.equipe.nome + '!';
				}, function(erro) {
					$scope.mensagem = 'Não foi possível adicionar o pokemon a equipe ' + $scope.equipe.nome;
					var indiceEquipe = $scope.equipe.pokemons.indexOf(pokemon);
					$scope.equipe.pokemons.splice(indiceEquipe, 1);
				});				
			}, function(erro) {
				console.log(erro);
			});								
		}
	}

	$scope.removerPokemon = function(pokemon) {
		var indicePokemon = $scope.equipe.pokemons.indexOf(pokemon);
		console.log(indicePokemon);
		$scope.equipe.pokemons.splice(indicePokemon, 1);
		
		recursoEquipe.update({equipeId : $scope.equipe.codigo}, $scope.equipe, function(equipe) {
			$scope.equipe = equipe;
			$scope.mensagem = 'O pokemon ' + $scope.pokemon.nome + ' foi removido da equipe ' + $scope.equipe.nome + '!';
		}, function(erro) {
			$scope.mensagem = 'Não foi possível remover o pokemon ' + $scope.pokemon.nome;			
			$scope.equipe.pokemons.push(pokemon);
		});
	};
	
});