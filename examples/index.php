<?php
function dirToArray($dir) { 

    $ignore = array('.', '..', 'Tests.csproj', 'Tests.csproj.user', 'bin', 'index.php', 'k2.css', 'obj', 'assets');
    $result = array(); 
    $root = scandir($dir); 
    $dirs = array_diff($root, $ignore);

    foreach ($dirs as $key => $value) 
    { 
        if (!in_array($value,array(".",".."))) 
        { 
            if (is_dir($dir . DIRECTORY_SEPARATOR . $value)) 
            { 
                $result[$value] = dirToArray($dir . DIRECTORY_SEPARATOR . $value); 
            } 
            else 
            {
                if (substr($value, -3) == '.js')
                {
                    $result[] = $value; 
                }
            } 
        } 
    } 

    return $result; 
} 

$state = false;
$kiwiType = 'TYPE_DOM';
$canvas = false;
$canvasLink = '';

if (isset($_GET['f']))
{
    $js = $_GET['d'] . '/' . $_GET['f'];
    $state = substr($_GET['f'], 0, -3);
    $domLink = $_SERVER["SCRIPT_NAME"] . '?f=' . $_GET['f'] . '&d=' . $_GET['d'];
    $canvasLink = $_SERVER["SCRIPT_NAME"] . '?f=' . $_GET['f'] . '&d=' . $_GET['d'] . '&c=true';

    if (isset($_GET['c']))
    {
        $canvas = true;
        $kiwiType = 'TYPE_CANVAS';
    }
}

?>
<!DOCTYPE html>

<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="initial-scale=1 maximum-scale=1 user-scalable=0" />
    <title>Kiwi Test Runner : <?php echo $state?></title>
    <link rel="stylesheet" href="examples.css" type="text/css" />
    <script type="text/javascript" src="log4javascript.js"></script>
	<script type="text/javascript" src="jquery-1.9.1.js"></script>
    <script type="text/javascript">
        var klog = log4javascript.getDefaultLogger();
    </script>
    <script src="ECMA262-5.js"></script>
    <script src="kiwi.js"></script>
<?php
    if ($state)
    {
?>
    <script src="<?php echo $js?>"></script>
<?php
    }
?>
</head>
<body>

<a href="index.php">home</a> || <a href="<?php echo $canvasLink?>">run as canvas</a>

    <div id="game"></div>

<?php

    if ($state)
    {
?>
<script>
var game;

//  So our IE7 tests pass, normally DOMContentReady would be better!
window.onload = start;

function start() {
    //  div to hook to, default layer type, game title, State to run
    game = new Kiwi.Game('game', Kiwi.<?php echo $kiwiType?>, 'KiwiTests', <?php echo $state?>);
}
</script>

<div id="buttons" style="position: absolute; top: 620px">
    <a href="index.php" class="button">Home</a>
<?php
    if ($canvas)
    {
?>
    <a href="<?php echo $domLink?>" class="button">Run as DOM</a>
<?php
    } else {
?>
    <a href="<?php echo $canvasLink?>" class="button">Run as Canvas</a>
<?php
    }
?>
</div>

<?php
    }
?>

<?php

function printJSLinks($dir, $files) {

    foreach ($files as $key => $value) {

        $value2 = substr($value, 0, -3);
        echo "<a href=\"index.php?f=$value&d=$dir\" class=\"button\">$value2</a>";

    }

}

if ($state == false)
{
?>

    <div id="header">
        <a href="index.php"><img src="/kiwitest/assets/suite/logo.png" /></a>
        <h1 id="title">Test Suite</h1>
    </div>

    <div id="links">
<?php
    $files = dirToArray(dirname(__FILE__));

    foreach ($files as $key => $value) {
        
        //  If $key is an array, output it as an h2 or something
        if (is_array($value) && count($value) > 0)
        {
            echo "<h2>$key</h2>";
            printJSLinks($key, $value);
        }

    }
?>
</div>
<?php
}
?>

</body>
</html>