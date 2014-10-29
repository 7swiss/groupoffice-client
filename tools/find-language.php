<?php

$langFile = "/var/www/html/groupoffice-client/app/lib/language/nl.js";

$existingLang = file_get_contents($langFile);

chdir(dirname(dirname(__FILE__)));
$cmd = 'find . -type f \( -iname "*.html" \);';
exec($cmd, $scripts, $return_var);

//return var should be 0 otherwise something went wrong
if($return_var!=0)
	exit("Find command did not run successfully.\n");

//$scripts = array(
//	'/var/www/html/groupoffice-client/app/modules/contacts/partials/contact-detail.html'
//);

$lang = [];

foreach($scripts as $script){
	
	$content = file_get_contents($script);
	
	preg_match_all('/\{[\'"]([^"\']+)[\'"][\s]*\|[\s]*t[\s]*\}/', $content, $matches);

	foreach($matches[1] as $str){
		
		if(!strpos($existingLang, json_encode($str))){		
			$lang[$str] = $str;
		}
	}		
}

$cmd = 'find . -type f \( -iname "*.js" \);';
exec($cmd, $scripts, $return_var);

//return var should be 0 otherwise something went wrong
if($return_var!=0)
	exit("Find command did not run successfully.\n");

foreach($scripts as $script){
	
	$content = file_get_contents($script);
	
	preg_match_all('/Translate\.t\([\'"]([^\'"]+)[\'"]\)/', $content, $matches);

	foreach($matches[1] as $str){
		
		if(!strpos($existingLang, json_encode($str))){		
			$lang[$str] = $str;
		}
	}		
}

echo json_encode($lang, JSON_PRETTY_PRINT);