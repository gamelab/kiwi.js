<?php
include 'functions.php';

if(isset($_GET['f'])) {
	$filepath = $_GET['f'];
	$renderer = (isset($_GET['r'])) ? $_GET['r'] : 'Kiwi.RENDERER_CANVAS';
	$debug = (isset($_GET['d'])) ? 'Kiwi.DEBUG_ON' : 'Kiwi.DEBUG_OFF';
	$state = substr($filepath, strpos($filepath, '/') + 1, -3);
} else {
	$filepath = false;
	$state = 'Does not exist.';
}

?><!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="initial-scale=1 maximum-scale=1 user-scalable=0" />
    <title>Kiwi Test : <?php echo $state ?></title>
    <link rel="stylesheet" href="assets/css/examples.css" type="text/css" />
    <!-- All of the scripts -->
    <?php if(file_exists($filepath)) { ?>
    <script src="assets/js/log4javascript.js"></script>
	<script src="assets/js/jquery-1.9.1.js"></script>
    <script src="assets/js/gl-matrix-min.js"></script>
    <script> var klog = log4javascript.getDefaultLogger(); </script>
    <script src="assets/js/ECMA262-5.js"></script>
    <script src="Kiwi.js"></script>
    <script src="<?php echo $filepath?>"></script>
    <?php } ?>
</head>
<body>
<div class="container">
	<section class="options">

<?php  if(isset($_GET['f']) && file_exists($filepath)) { ?>
		
		<?php
			echo '<a href="index.php" class="button">Home</a>';
			//get the debug
			$d = ($debug == 'Kiwi.DEBUG_OFF') ? '' : '&amp;d=1';
			
			//render
			if($renderer == 'Kiwi.RENDERER_CANVAS' || $renderer == '0') {
				echo '<a href="browser.php?f='.$filepath.$d.'&amp;r=1" class="button">Use WebGL</a>';
			} else {
				echo '<a href="browser.php?f='.$filepath.$d.'" class="button">Use Canvas</a>';
			}

			//Debugging
			if($debug == 'Kiwi.DEBUG_ON') {
				echo '<a href="browser.php?f='.$filepath.'&amp;r='.$renderer.'" class="button">Stop Debug</a>';
			} else {
				echo '<a href="browser.php?f='.$filepath.'&amp;r='.$renderer.'&amp;d=1" class="button">Start Debug</a>';
			}

		?>
	</section>

    <div id="game"></div>
    
    <script>
        var game;
        window.onload = start;

        function start() {
            game = new Kiwi.Game('game', 'KiwiTests', <?php echo $state?>, {debug: <?php echo $debug ?>, deviceTarget: Kiwi.TARGET_BROWSER, renderer: <?php echo $renderer ?> });
        }
    </script>

<?php } else { ?>
    
		<a href="index.php" class="button">Home</a>
	</section>

    <h1>Could not find <em><?php echo $filepath ?></em> :(</h1>

    <p class="message">The example that you were trying to view could not be found and thus could not be loaded. Please check your filepath in the URL and that the JavaScript file that you linked in does exist. Thank you!</p>

<?php } ?>

</div>
</body>
</html>