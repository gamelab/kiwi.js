<?php

/*
* Gets all of the directories and returns then in an array format (excluding the ones that are to be ignored).
*/
function dirToArray($dir) { 

    $ignore = array('.', '..', 'Examples.csproj', 'Examples.csproj.user', 'bin', 'index.php', 'obj', 'assets', 'DummyScript.js');
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

function printJSLinks($dir, $files) {

    foreach ($files as $key => $value) {

        $value2 = substr($value, 0, -3);
        echo '<input type="submit" name="'.$dir.'" value="'.$value2.'" />';

    }

}



?>