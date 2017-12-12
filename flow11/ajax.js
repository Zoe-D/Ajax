function ajax(method,link,url,fun){
	var xhr = null;
	
	try {
		xhr = new XMLHttpRequest();
	} catch(e){
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	};
	
	if (method=='get'&&url) {
		link +='?'+url;
	}
	
	xhr.open (method,link,true);
	if (method=='get'){
		xhr.send();
	} else {
		xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
		xhr.send(url);
	}
	
	xhr.onreadystatechange = function(){
		if (xhr.readyState==4){
			if (xhr.status==200){
				fun&&fun(xhr.responseText);
			}else{
				alert('ERR:'+xhr.status);
			}
		}
	}	
}
