var data = {};
function save_waypoints()
{
	var w=[],wp;
	var rleg = ren.directions.routes[0].legs[0];
	data.start = {'lat': rleg.start_location.lat(), 'lng':rleg.start_location.lng()}
	data.end = {'lat': rleg.end_location.lat(), 'lng':rleg.end_location.lng()}
	var wp = rleg.via_waypoints	
	for(var i=0;i<wp.length;i++)w[i] = [wp[i].lat(),wp[i].lng()]	
	data.waypoints = w;
	
	var str = JSON.stringify(data)

	var jax = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	jax.open('POST','process.php');
	jax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	jax.send('command=save&mapdata='+str)
	jax.onreadystatechange = function(){ if(jax.readyState==4) {
		if(jax.responseText.indexOf('bien')+1)alert('Updated');
		else alert(jax.responseText)
	}}
}


function load_waypoints()
{
	var jax = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	jax.open('POST','process.php');
	jax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	jax.send('command=fetch')
	jax.onreadystatechange = function(){ if(jax.readyState==4) {
	
		if(jax.status == 404)
		{
			alert('Unable to process this request.\nPlease try again later.');
			return;
		}
	
		try { setroute( eval('(' + jax.responseText + ')') ); }
		catch(e){ alert(e); }
	}}
}
