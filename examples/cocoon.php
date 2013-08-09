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


<html>

<body>
    
    
	
    
    
    
	
	
    <script type="text/javascript">
        var klog = {info:function(){},debug:function(){},warn:function(){}};
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
    game = new Kiwi.Game('game', 'KiwiTests', <?php echo $state?>);
}
</script>


<?php
    }
?>

<?php

function printJSLinks($dir, $files) {

    foreach ($files as $key => $value) {

        $value2 = substr($value, 0, -3);
        echo "<a href=\"cocoon.php?f=$value&d=$dir\" class=\"button\">$value2</a>";

    }

}

if ($state == false)
{
?>

    <div id="header">
        <a href="index.php"><img src="/examples/webpage_assets/kiwi_logo.png" /></a>
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