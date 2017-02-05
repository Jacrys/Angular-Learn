(function(){

  var app = angular.module("AngularLearn", []);

  var MainController = function ($scope, $http, $sce) {

    var onUserComplete = function(response) {
            $scope.user = response.data;
            $http.get($scope.user.repos_url)
                 .then(onRepos, onError);
    };

    var onRepos = function(response) {
      $scope.repos = response.data;
      for (repo of $scope.repos) {
        repo.language = $sce.trustAsHtml(iconifyLanguage (repo.language));
      };
    };
  

    var onError = function() {
            $scope.error = "Cannot get the data!";
    };



    $scope.search = function (username) {
      clear()

      $http.get("https://api.github.com/users/" + username)
         .then(onUserComplete, onError);
    };

    var clear = function() {
      $scope.error = "";
      $scope.user = null;
    };

    var iconifyLanguage = function(Language) {
      switch(Language) {
        case "CSS":
          Language = '<img src="devicon/icons/css3/css3-original-wordmark.svg" />';
          break;
        case "HTML":
          Language = '<img src="devicon/icons/html5/html5-original-wordmark.svg" />';
          break;
        case "JavaScript":
          Language = '<img src="devicon/icons/javascript/javascript-original.svg" />';
          break;
        case "Java":
          Language = '<img src="devicon/icons/java/java-original-wordmark.svg" />';
          break;
        case "C#":
          Language = '<img src="devicon/icons/csharp/csharp-original.svg" />';
          break;
        case "C++":
          Language = '<img src="devicon/icons/cplusplus/cplusplus-original.svg" />';
          break;
        case "Python":
          Language = '<img src="devicon/icons/python/python-original-wordmark.svg" />';
          break;
        case "PHP":
          Language = '<img src="devicon/icons/php/php-original.svg" />';
          break;
        case "Ruby":
          Language = '<img src="devicon/icons/ruby/ruby-original-wordmark.svg" />';
          break;
        case "Go":
          Language = '<img src="devicon/icons/go/go-original.svg" />';
          break;
        case "CoffeeScript":
          Language = '<img src="devicon/icons/coffeescript/coffeescript-original-wordmark.svg" />';
          break;
        case "TypeScript":
          Language = '<img src="devicon/icons/typescript/typescript-original.svg" />';
          break;
        case "Dart":
          Language = '<img src="devicon/icons/dart/dart-original-wordmark.svg" />';
          break;
        case "ApacheConf":
          Language = '<img src="devicon/icons/apache/apache-original-wordmark.svg" />';
          break;
        default:
          Language = Language;
      }
      return Language;
    };

    $scope.nameSort = function() {
      if ($scope.repoSortOrder === "+name"){
        $scope.repoSortOrder = "-name";
      }
      else {
        if ($scope.repoSortOrder === "-name"){
          $scope.repoSortOrder = "+name"
        }
        else {
          $scope.repoSortOrder = "+name";
        };
      };
    };

    $scope.starSort = function() {
      if ($scope.repoSortOrder === "+stargazers_count"){
        $scope.repoSortOrder = "-stargazers_count";
      }
      else {
        if ($scope.repoSortOrder === "-stargazers_count"){
          $scope.repoSortOrder = "+stargazers_count"
        }
        else {
          $scope.repoSortOrder = "-stargazers_count";
        };
      };
    };

    $scope.languageSort = function() {
      if ($scope.repoSortOrder === "+language"){
        $scope.repoSortOrder = "-language";
      }
      else {
        if ($scope.repoSortOrder === "-language"){
          $scope.repoSortOrder = "+language"
        }
        else {
          $scope.repoSortOrder = "+language";
        };
      };
    };

    $scope.username = "Angular";
    $scope.message = "Github Viewer";
    $scope.repoSortOrder = "+name"
  };

  app.controller("MainController", ["$scope","$http","$sce", MainController]);
 
}());