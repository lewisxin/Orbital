//$(document).ready(function(){
	function addAddr(){
		var address = document.getElementById("address").value;
		console.log(address)
		$("#start").append('<option' + ' value="' +address+ '">' +address+'</option>');
		$("#waypoints").append('<option' + ' value="' +address+ '" selected="selected">' +address+'</option>');
		$("#end").append('<option' + ' value="' +address+ '" selected="selected">' +address+'</option>');
	}

	/*$("#getAddr").submit(function(event){
		event.preventDefault();
		var addr = $("#address").val();
		if(addr != ""){
			addAddr(addr);
		}
	});*/
//})


