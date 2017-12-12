<?php
	header('content-type=text/html;charset="utf-8"');
	error_reporting(0);
	$news = array(
		array('title'=>'tp里写controller，创建view模版文件','date'=>'2017-11-16'),
		array('title'=>'tp里写controller，创建view模版文件','date'=>'2017-11-17'),
		array('title'=>'tp里写controller，创建view模版文件','date'=>'2017-11-18'),
		array('title'=>'tp里写controller，创建view模版文件','date'=>'2017-11-19'),
		array('title'=>'tp里写controller，创建view模版文件','date'=>'2017-11-20'),
		array('title'=>'tp里写controller，创建view模版文件','date'=>'2017-11-10'),
		array('title'=>'tp里写controller，创建view模版文件','date'=>'2017-11-22'),
		array('title'=>'tp里写controller，创建view模版文件','date'=>'2017-11-23'),
		array('title'=>'1tp里写controller，创建view模版文件','date'=>'2017-11-23'),
		array('title'=>'2tp里写controller，创建view模版文件','date'=>'2017-11-23'),
		array('title'=>'3tp里写controller，创建view模版文件','date'=>'2017-11-23'),
	);
	echo json_encode($news);
?>