window.onload = function(){
	
	
	var oUserName = document.getElementById("username1");
	var oAlert = document.getElementById("verifyUserNameMsg");
	
	var oRegisterBtn = document.getElementById("btnReg");
	var oRegPassword = document.getElementById("password1");
	var oReg = document.getElementById("reg");
	
	var oLog = document.getElementById("login");
	var oLoginBtn = document.getElementById("btnLogin");
	
	var oUser = document.getElementById("user");
	var oUserInfo = document.getElementById("userinfo");
	
	//判断用户初始化状态
	updateStatus();
	
	/*
	验证用户名
	get
		guestbook/index.php
			m : index
			a : verifyUserName
			username : 要验证的用户名
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
	*/
	oUserName.onblur = function (){
		
		ajax( 'get','guestbook/index.php','m=index&a=verifyUserName&username='+oUserName.value,function( data ){
			var data = JSON.parse( data );
			if( data.code == 0 ){
				oAlert.innerHTML = data.message;
				oAlert.style.color = 'green';
			}else{
				oAlert.innerHTML = data.message;
				oAlert.style.color = 'red';
			}
		});
	}
	
	/*
	用户注册
	get/post
		guestbook/index.php
			m : index
			a : reg
			username : 要注册的用户名
			password : 注册的密码
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
	*/
	oRegisterBtn.onclick = function(){
		//注意用户名转码问题
		ajax( 'get','guestbook/index.php','m=index&a=reg& username='+ encodeURI( oUserName.value ) + '&password=' + oRegPassword.value , function( data ){
			var data = JSON.parse( data );
			alert( data.message );
		});
	}
	
	/*
	用户登陆
	get/post
		guestbook/index.php
			m : index
			a : login
			username : 要登陆的用户名
			password : 登陆的密码
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
	*/
	
	var oUserNameLogin = document.getElementById('username2');
	var oPasswordLogin = document.getElementById('password2');
	oLoginBtn.onclick = function(){
		ajax( 'post','guestbook/index.php','m=index&a=login&username='+encodeURI(oUserNameLogin.value)+'&password='+oPasswordLogin.value,function( data ){
			var d = JSON.parse( data );
			
			alert( d.message );
			if( !d.code ){
				updateStatus();
			}
				
		} )
	}
	
	/*
	用户退出
	get/post
		guestbook/index.php
			m : index
			a : logout
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
	*/
	var oLogoutBtn = document.getElementById("logout");
	oLogoutBtn.onclick = function(){
		ajax('get','guestbook/index.php','m=index&a=logout',function(data){
			var data = JSON.parse(data);
			alert( data.message );
			if (!data.code) {
				//退出成功
				updateStatus();
			}
			
		});
		return false;
	}
	
	//查看用户状态，如果cookie里面的uid有值，说明是登录状态
	function updateStatus(){
		
		var oUid = getCookie('uid');
		var oUserName = getCookie('username');
		
		if( oUid ){
			
			oReg.style.display = 'none';
			oLog.style.display = 'none';
			oUser.style.display = 'block';
			oUserInfo.innerHTML = oUserName;
			
		}else{
			
			oReg.style.display = 'block';
			oLog.style.display = 'block';
			oUser.style.display = 'none';
			oUserInfo.innerHTML = '';
			
		}
	}
	
	//获取cookie值，后端设置与删除cookie，cookie里面包含key值，value值，过期时间
	function getCookie(key) {
		var arr1 = document.cookie.split('; ');
		
		for (var i=0; i<arr1.length; i++) {
			
			var arr2 = arr1[i].split('=');
				
			if (arr2[0]==key) {
				return arr2[1];
			}
			
			
		}
		
	}
	
	/*
	留言
	post
		guestbook/index.php
			m : index
			a : send
			content : 留言内容
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				data : 返回成功的留言的详细信息
					{
						cid : 留言id	
						content : 留言内容 
						uid : 留言人的id
						username : 留言人的名称
						dateline : 留言的时间戳(秒)
						support : 当前这条留言的顶的数量
						oppose : 当前这条留言的踩的数量
					}
				message : 返回的信息 具体返回信息
			}
	*/
	
	var oPostBtn = document.getElementById("btnPost");
	var oContent = document.getElementById("content");
	var oList = document.getElementById("list");
	
	oPostBtn.onclick = function(){
		ajax('get','guestbook/index.php','m=index&a=send&content='+encodeURI(oContent.value),function(data){
			
			var d = JSON.parse(data);
			
			alert(d.message);
			
			if(!d.code){
				createList(d,true)
			}
		})
	}
	
	function createList(d,insert){
		var oDl = document.createElement('dl');
				
		var oDt = document.createElement('dt');
		oDt.innerHTML = "<strong>"+d[i].data.username+"</strong> 说 :"
		
		var oDd1 = document.createElement('dd');
		oDd1.innerHTML = d[i].data.content;
		
		var oDd2 = document.createElement('dd');
		oDd2.className = 't';
		
		var oA1 = document.createElement('a');
		oA1.innerHTML = '顶(<span>'+d[i].data.support+'</span>)';
		var oA2 = document.createElement('a');
		oA2.innerHTML = '踩(<span>'+d[i].data.oppose+'</span>)';
		oDd2.appendChild(oA1);
		oDd2.appendChild(oA2);
		
		oDl.appendChild(oDt);
		oDl.appendChild(oDd1);
		oDl.appendChild(oDd2);
		
		//新的留言在上面，若之前没有元素则直接添加，若有元素，在顶部添加
		if( insert&& oList.children[0]){
			oList.insertBefore(oDl,oList.children[0]);
		}else{
			oList.appendChild(oDl);
		}
	}
	
	
}
