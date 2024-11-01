$(document).ready(function() {

    const synth = window.speechSynthesis;
    var toggleState = false;
    let isPlaying = false;

    var language = data.lang;
    var className = data.class;
    var idName = data.id;
    var content = data.content;
    var text = '';
    var btnText = data.btnText;
    var outlined = data.outlined;
    
    $(".btn-talkie").text(btnText); 
        
        
    $("#readTalkie").on("click", function() {
	    
	    if(isPlaying == false ) {
		    synth.cancel();
	    }

        if (toggleState == false) {	        
            if(className != null) {
				
				$("."+ className + " p, h1, h2, h3, h4, h5").each(function() {
				  if ($(this).attr("id") != "breadcrumbs" && $(this).attr("id") != "talkieTts") {
				    text += $(this).text();
				  }
				});
	
                startSpeak(text);
            }
            
            if(idName != null) {
	            
	            $("#"+ idName + " p, h1, h2, h3, h4, h5").each(function() {
				  if ($(this).attr("id") != "breadcrumbs" && $(this).attr("id") != "talkieTts") {
				    text += $(this).text();
				  }
				});
				
                startSpeak(text);
            }            
            
            if(content != "") {
                startSpeak(content);
            }
        
            toggleState = true;

        } else {
            stopSpeak();
            toggleState = false;
        }
    }); 

    function startSpeak(text) {
        var u = new SpeechSynthesisUtterance(text);

		u.lang = language;
        u.rate = 0.8;
		
		if (!isPlaying) {
        	synth.speak(u);
        	isPlaying = true;
        }
        else {
	      if (synth.paused) {
	        synth.resume();
	      }
        }
        
        
        if(outlined == false) {
	        $(".btn-talkie").css("background-image", "url('" + talkieScript.pluginUrl + "/images/talkie-speak-a.gif')");
        }
        else {
	        $(".btn-talkie").css("background-image", "url('" + talkieScript.pluginUrl + "/images/talkie-speak-ab.gif')");
        }
        
        
        $(".btn-talkie").text("Stop");
    }

    function stopSpeak() {
	  	    
        synth.pause();
        
        if(outlined == false) {
	        $(".btn-talkie").css("background-image", "url('" + talkieScript.pluginUrl + "/images/talkie-speak.gif')");
        }
        else {
	        $(".btn-talkie").css("background-image", "url('" + talkieScript.pluginUrl + "/images/talkie-speak-b.gif')");
        }
        
        
        $(".btn-talkie").text(btnText); 
    }

});
