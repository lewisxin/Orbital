function addAddr(){
	if($('#get_destins').is(':hidden')){
		$('#get_destins').slideDown(400);
	}else{
		$('get_destins').slideUp(400);
	}
	var address = document.getElementById("address").value;
	$("#start").append('<option' + ' value="' +address+ '">' +address+'</option>');
	$("#waypoints").append('<option' + ' value="' +address+ '" selected="selected">' +address+'</option>');
	$("#end").append('<option' + ' value="' +address+ '" selected="selected">' +address+'</option>');
	$("select").dblclick(function () {
		var selected = $('select[id=waypoints]').val();
		console.log(selected);
		$('select option[value="' + selected + '"]').remove();
	})
	.trigger('change');
}

function printButton() {
    window.print();
}


