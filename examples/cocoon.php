<?php
include 'functions.php';

if(isset($_GET['f'])) {
    $filepath = $_GET['f'];
    $renderer = (isset($_GET['r'])) ? $_GET['r'] : 'Kiwi.RENDERER_CANVAS';
    $debug = (isset($_GET['d']) && $_GET['d'] == 1) ? 'Kiwi.DEBUG_ON' : 'Kiwi.DEBUG_OFF';
} else {
    $filepath = 'none';
}
?>
<html>
<body>

<?php  if(file_exists($filepath)) { ?>

    <script src="assets/webpage/js/ECMA262-5.js"></script>
    <script src="assets/webpage/js/gl-matrix-min.js"></script>
    <script src="kiwi.js"></script>
    <script src="<?php echo $filepath?>"></script>

    <div id="game"></div>

    <?php $state = substr($filepath, strpos($filepath, '/') + 1, -3); ?>

    <script>
        var game;
        window.onload = start;

        function start() {
            game = new Kiwi.Game('game', 'KiwiTests', <?php echo $state?>, {debug: <?php echo $debug ?>, deviceTarget: Kiwi.TARGET_COCOON, renderer: <?php echo $renderer ?> });
        }
    </script>

<?php } else { ?>
    
    <h1>Filepath <?php echo $filepath ?> does not exist.</h1>

<?php } ?>

</body>
</html>