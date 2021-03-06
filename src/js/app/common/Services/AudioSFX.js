angular.module("scoreboard.common").provider("AudioSFX",function(AudioSFXEvents){
   var AudioSFXProvider;
   return AudioSFXProvider = {
      _interfaceName : "HTML5Audio",
      interface:null,
      /**
       * Call this add config time to change the audio interface used
       * @param interfaceName
       */
      setInterface:function(interfaceName){
        AudioSFXProvider._interfaceName = interfaceName
      },
      $get:function($rootScope,$injector,EnvironmentDetection){
         var AudioSFX,
            player = null,
            playing = null,
            prefixPath = "",
            lastPlayedScore = null,
            SFX ={
               START_OF_PERIOD : "start-of-period/Hockey-NHL-Home-Goal-Air-Horn.mp3",
               START_OF_GAME : "start-of-game/NHL-Molson-Hockey-Night-in-Canada.mp3",
               END_OF_PERIOD : "end-of-period/end-period.mp3",
               SCORE : "score/goal.mp3",
               END_OF_GAME : "end-of-game/end.mp3"
            };


         $injector.invoke([AudioSFXProvider._interfaceName,function(audioInterface){
            AudioSFXProvider.interface = audioInterface;
         }]);

         window.EnvironmentDetection = EnvironmentDetection;

         if (EnvironmentDetection.isMobileApp()){
            prefixPath = "/android_asset/www/";
         }
         //player.style.display("none");


         function play (file,sport){
            playing = file;
            AudioSFXProvider.interface.play(prefixPath + "audio/" + sport + "/" + file);
            console.log(prefixPath + "audio/" + sport + "/" + file);
            $rootScope.$broadcast(AudioSFX.EVENTS.START);
         }

         return AudioSFX = {
            EVENTS : AudioSFXEvents,
            delayForScoreReplay : 90,
            stop : function(){
               AudioSFXProvider.interface.pause();
               $rootScope.$broadcast(AudioSFXEvents.END);
            },
            listenForSFX: function(){
            },
            playRandom : function(){

            },
            startOfGame : function (game){
                play(SFX.START_OF_GAME,game.sport);
            },
             startOfPeriod : function (game){
                 play(SFX.START_OF_PERIOD,game.sport);
             },
            endOfPeriod:function(game){
               play(SFX.END_OF_PERIOD,game.sport);
            },
            endOfGame:function(game){
               play(SFX.END_OF_GAME,game.sport);
            },
            score:function(game){

               if (lastPlayedScore == null ||  playing !== SFX.SCORE || (playing === SFX.SCORE && new Date().getTime() > lastPlayedScore.getTime() + AudioSFX.delayForScoreReplay *1000 ) ){
                  lastPlayedScore = new Date();
                  play(SFX.SCORE,game.sport);
               }
            }
         }
      }
   };

});