jQuery(document).ready(function($){
	
	// COLORPICKER 
	
	const colorField = document.getElementById("color");
	
	colorField.addEventListener("focus", function() {
	  this.type = "color";
	});
	
	colorField.addEventListener("change", function() {
	  let hexValue = this.value;
	  hexValue = hexValue.substr(1);  // Verwijder het hashteken
	});
	
	// VOICES
	
	window.speechSynthesis.onvoiceschanged = function() {
	  let voices = speechSynthesis.getVoices();
	  
	   var select = document.getElementById("voices");
	   
	   for (var i = 0; i < voices.length; i++) {
	      var option = document.createElement("option");
	      option.value = voices[i].lang;
	      option.text = voices[i].lang + ' | ' + voices[i].name;
	      select.appendChild(option);
	      
	      
	   } 
	};
	
	
	
});