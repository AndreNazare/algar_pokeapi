angular.module('teamPokemon')
.controller('EquipeController', function($scope, recursoEquipe, recursoUsuario) {	

	$scope.equipe = {};
	$scope.equipes = [];
	$scope.mensagem = '';
	$scope.usuarios = [];
	$scope.nomeUser = {};
	$scope.usuario = {};

	recursoUsuario.query(function(usuarios) {
		$scope.usuarios = usuarios;
	}, function(erro) {
		console.log(erro);
	});

	recursoEquipe.query(function(equipes) {
		$scope.equipes = equipes;
	}, function(erro) {
		console.log(erro);
	});

	$scope.submeter = function() {		
		if ($scope.frmEquipe.$valid) {			
			for(var i=0; i<$scope.usuarios.length; i++) {
			    if($scope.usuarios[i].nome === $scope.nomeUser) {
			        $scope.usuario = $scope.usuarios[i];
			    }
			}
			for(var i=0; i<$scope.equipes.length; i++) {				
				if($scope.equipes[i].nome === $scope.equipe.nome 
					&& $scope.equipes[i].usuario.codigo === $scope.usuario.codigo) {
					$scope.mensagem = 'A equipe já existe com este nome ' + $scope.equipe.nome;
					return
				} 
			}
			$scope.equipe.usuario = $scope.usuario
			if ($scope.equipe.codigo) {
				recursoEquipe.update({equipeId : $scope.equipe.codigo}, $scope.equipe, function(equipe){
					$scope.mensagem = 'A equipe ' + $scope.equipe.nome + ' alterada com sucesso!';
					$scope.equipe = {};	
				}, function(erro){
					$scope.mensagem = 'Não foi possível alterar a equipe ' + $scope.equipe.nome;
					console.log(erro);
				});
			} else {
				recursoEquipe.save($scope.equipe, function(equipe) {
					$scope.equipes.splice($scope.equipes.length, 0, $scope.equipe);
					$scope.equipe = {};
					$scope.mensagem = 'Equipe cadastrada com sucesso!';		
				}, function(erro) {
					$scope.mensagem = 'Não foi possível cadastrar a equipe';
					console.log(erro);
				});				
			}			
		}		
	};

	$scope.remover = function(equipe) {
		recursoEquipe.delete({equipeId : equipe.codigo}, function() {
			var indiceEquipe = $scope.equipes.indexOf(equipe);
			$scope.equipes.splice(indiceEquipe, 1);
			$scope.mensagem = 'Equipe ' + equipe.nome + ' foi removida com sucesso!';
		}, function(erro) {
			console.log(erro);
			$scope.mensagem = 'Não foi possível remover a equipe ' + equipe.nome;
		});
	};

	$scope.editar = function(equipe) {
		$scope.equipe = equipe;
	};
	
});