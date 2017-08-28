angular.module('teamPokemon')
.controller('VinculaHabilidadeController', function($scope, $http, recursoEquipe, recursoPokemon, recursoHabilidade, $routeParams) {	

	$scope.equipe = {};
	$scope.mensagem = '';

	$scope.habilidades = [];
	$scope.filtro = ''; 
	$scope.habilidade = {};
	$scope.pokemon = {};

	var ids = $routeParams.equipeId_pokemonId.split('_');
	console.log(ids);

	// recupera a equipe
	recursoEquipe.get({equipeId : ids[0]} , function(equipe) {
		$scope.equipe = equipe;
		console.log(equipe);
	}, function(erro) {
		console.log(erro);
	});

	// recupera pokemon
	recursoPokemon.get({pokemonId : ids[1]}, function(pokemon) {
		$scope.pokemon = pokemon;
		console.log(pokemon);
	}, function(erro) {
		console.log(erro);
	});

	//recupera lista de pokemons pokeapi
	/*recursoHabilidadeApi.query(function(pokemons) {
		console.log(pokemons);
		$scope.pokemons = pokemons.results;
	}, function(erro) {
		console.log(erro);
	});*/
	$http.get('http://pokeapi.co/api/v2/ability/?limit=251')
	.success(function(habilidades) {
		$scope.habilidades = habilidades.results;
	})
	.error(function(erro) {
		console.log(erro);
	});
	
	$scope.vincular = function(habilidade) {
		$scope.habilidade = {};
		if ($scope.equipe.codigo) {
			if ($scope.pokemon.codigo) {
				for(var i=0; i<$scope.pokemon.habilidades.length; i++) {
				    if($scope.pokemon.habilidades[i].nome === habilidade.name) {
				    	$scope.mensagem = 'Já existe o ' + habilidade.name + ' vinculado a esse ' + $scope.pokemon.nome;
						return
				    }
				}			
				$scope.habilidade.nome = habilidade.name;

				recursoHabilidade.save($scope.habilidade, function(habilidade) {
					$scope.habilidade = {};
					$scope.habilidade = habilidade;					
					$scope.pokemon.habilidades.push(habilidade);
					recursoPokemon.update({pokemonId : $scope.pokemon.codigo}, $scope.pokemon, function(pokemon) {
						$scope.pokemon = pokemon;
						$scope.mensagem = 'A habilidade ' + $scope.habilidade.nome + ' foi vinculada ao pokemon ' + $scope.pokemon.nome +'!';
					}, function(erro) {
						$scope.mensagem = 'Não foi possível vincular habilidade ao pokemon ' + $scope.pokemon.nome;
						var indiceHabilidade = $scope.pokemon.habilidades.indexOf(habilidade);
						$scope.pokemon.habilidades.splice(indiceHabilidade, 1);					
					});
				}, function(erro) {
					console.log(erro);
				});								
			}			
		}
	};

	$scope.removerHabilidade = function(habilidade) {
		var indiceHabilidade = $scope.pokemon.habilidades.indexOf(habilidade);
		$scope.pokemon.habilidades.splice(indiceHabilidade, 1);
		recursoPokemon.update({pokemonId : $scope.pokemon.codigo}, $scope.pokemon, function(pokemon) {
			$scope.pokemon = pokemon;
			$scope.mensagem = 'A habilidade ' + habilidade.nome + ' foi removida do ' + $scope.pokemon.nome +'!';
		}, function(erro) {
			$scope.mensagem = 'Não foi possível remover a habilidade ' + habilidade.nome;			
			$scope.pokemon.habilidades.push(habilidade);
		});		
	};
	
});