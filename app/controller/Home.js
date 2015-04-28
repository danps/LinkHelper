angular.module('App', []).controller('HomeController', function($scope)
{
  save = function() {
    localStorage.setItem("DanpsAtalho", JSON.stringify($scope.Atalhos));  
  }
  $scope.Atalhos = {};
  $scope.Grupos = [];


  $scope.backup = function() {  
    var json = '{"LinksHelper":' + JSON.stringify($scope.Atalhos)+'}'; 
    $scope.Bkp = json;
    var blob = new Blob([json], {type: "application/json"});
    var url  = URL.createObjectURL(blob);
    var a = document.getElementById('ID_Download');
    a.download  = "config.json";
    a.href    = url;
    a.type="button";
    a.className ="btn btn-sm btn-success"; 
    a.innerHTML =("<span class='glyphicon glyphicon-download-alt'aria-hidden='true'></span>"); 
  };
  $scope.edit = function() {  
  	$scope.checked = !$scope.checked;
  }; 
  $scope.restore = function(valor){
  	alert("OI" + valor);
  	var a = JSON.parse($scope.Bkp);
    if(a && a.LinksHelper && a.LinksHelper != null)
    {
        $scope.Atalhos = a.LinksHelper;
        save();
    } 
    alert("JSON successfully uploaded!");
  } 


    $scope.criar = function(grupo) 
  {
    if(!$scope.Atalhos[grupo]){
      $scope.Atalhos[grupo] = [];
    }
    save();
    location.reload(); 
  };
    $scope.apagar = function(grupo) 
  {
    delete $scope.Atalhos[grupo]; 
    save();
    location.reload(); 
  };

  $scope.salva = function(nome, descricao, href, grupo) 
  {
    $scope.Atalhos[grupo].push({'href': href, 'descricao': descricao, 'nome':nome});
    save();
  };
   $scope.change = function() {
        $scope.counter++;
      };

  $scope.remove = function(obj, nome) {
    var objetos = $scope.Atalhos[nome];
    for (var i = 0; i < objetos.length; i++) {
      if(objetos[i].nome == obj.nome)
      {
        objetos.splice(i, 1); 
        break;
      }
    };
    $scope.Atalhos[nome] = objetos;
    save();
  } 


  if(typeof(Storage) === "undefined") 
  {
     alert("Sorry, your browser does not support web storage...");
  }
  else if(localStorage.getItem("DanpsAtalho")){
    $scope.Atalhos = JSON.parse(localStorage.getItem("DanpsAtalho"));
  }
  if($scope.Atalhos)
  {
    var i = 0; 
    var colors = ["primary", "success", "info", "warning", "danger", "default"];
    $scope.Grupos = [];
    for (var prop in $scope.Atalhos) 
    {
      i++; 
      $scope.Grupos.push({nome: "" + prop, color: colors[i%colors.length]});
    }
    if(i==0)
    {
      $scope.Grupos.push({nome: "Helpers", color: colors[i%colors.length]});
      $scope.Atalhos = {};
      $scope.Atalhos.Helpers = [{"href": "http://www.danps.com.br", "nome": "Produzido por", "descricao": "Danilo Pereira da Silva"}];
    }
  }
});