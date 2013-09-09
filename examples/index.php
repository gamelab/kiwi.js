<?php
include 'functions.php';

//redirect here...
if(isset($_POST['t'])) {

	$ignore = array('t', 'r', 'd');
	$target = $_POST['t'];
	$renderer = (isset($_POST['r'])) ? '&r='.$_POST['r'] : '';
	$debug = (isset($_POST['d'])) ? '&d='.$_POST['d'] : '';

	//a little hack...sad panda
	foreach($_POST as $key => $value) {
		if(!in_array($key, $ignore)) {	
			$tempfile = $key . '/'. $_POST[$key].'.js';
			if(file_exists($tempfile)) $filepath = $tempfile;
		}
	}

	if(isset($filepath)) {
		//Get the target...
		header('location: '.$target.'.php?f='.$filepath.$renderer.$debug);
	}
}

?><!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="initial-scale=1 maximum-scale=1 user-scalable=0" />
	<title>Kiwi Example Suite</title>
    <link rel="stylesheet" href="assets/webpage/css/examples.css" type="text/css" />
	<script type="text/javascript" src="assets/webpage/js/jquery-1.9.1.js"></script>
</head>
<body>

<div class="container">
	<div id="header">

		<a href="index.php"><img src="/examples/assets/webpage/kiwi_logo.png" alt="Kiwi.js Logo" /></a>
		<h1>Kiwi.js Example Suite</h1>

	</div>

	<form method="post" action="index.php">

	<!-- Options to choose from -->
	<section class="options">
		<section>
			<div>
				<label for="browser">Browser</label>
				<input type="radio" name="t" id="browser" value="browser" checked />
			</div>
			<div>
				<label for="cocoon">Cocoon</label>
				<input type="radio" name="t" id="cocoon" value="cocoon" />
			</div>
		</section>

		<section>
			<div>
				<label for="webgl">WebGL</label>
				<input type="radio" name="r" id="webgl" value="1" />
			</div>
			<div>
				<label for="canvas">Canvas</label>
				<input type="radio" name="r" id="canvas" value="0" checked />
			</div>
		</section>

		<section>
			<div>
				<label for="on"><span class="mobile-off">Debug</span> On</label>
				<input type="radio" name="d" id="on" value="1" checked />
			</div>
			<div>
				<label for="off"><span class="mobile-off">Debug</span> Off</label>
				<input type="radio" name="d" id="off" value="0" />
			</div>
		</section>
	</section>

	<div class="content list">
	<?php
		$files = dirToArray(dirname(__FILE__)); //change to more uptodate version

		foreach ($files as $key => $value) {
	        
	        if (is_array($value) && count($value) > 0) { //update
	        	echo '<section class="area">';
	            echo '<h2>'.ucfirst($key).'</h2>';
	            echo '<div>';
	            printJSLinks($key, $value);
	        	echo '</div>';
	        	echo '</section>';
	        }

	    }
	?>
	</div>
	</form>
</div>
</body>
</html>