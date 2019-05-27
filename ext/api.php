<?php header("Access-Control-Allow-Origin: *");
/**
 * Handler for all MythWeb MythXML routines
 *
 * @url         $URL$
 * @date        $Date$
 * @version     $Revision$
 * @author      $Author$
 * @license     GPL
 *
 * @package     MythWeb
 * @subpackage  MythXML
 *
/**/


// Generate new URL
if(isset($_GET['Host'])&&($_GET['Host']!=''))
{
	$host = $_GET['Host'];
}
else
{
	$host = $_SERVER['HTTP_HOST'];
}

if($host == gethostname())
{
	$host = "localhost";
}

//to help resolve hostnames on local net
if($host == "localhost")
{
	//leave as is
}
elseif(strpos($host,'.') === false) 
{
	$host = $host.".local";
}

$port = $_GET['Port'];
$url = $_GET['Url'];

if(isset($_GET['Help'])||isset($_GET['Readme']))
{
	echo "To use this tool, you need to enter paramters in your request.<br />";
	echo " - Port=6544 or Port=6547<br />";
	echo " - Host=hostname (optional)<br />";
	echo " - Url=/Directory/Page    MythTV API directory and page<br />";
	echo " - any additional paramters to pass through to the API call<br />";
	echo "<br />";
	echo "<br />";
	echo "Example:<br/>";
	echo "&nbsp;&nbsp; <a href=\"http://$host/api/api.php?Host=$host&Port=6544&Url=/Dvr/GetUpcomingList&ShowAll=true\">";
	echo "http://$host/api/api.php?Host=$host&Port=6544&Url=/Dvr/GetUpcomingList&ShowAll=true</a>";
	
}
else if(($port!="6544")&&($port!="6547"))
{
	echo "Invalid port number - only ports 6544 and 6547 are allowed";
	//echo $_SERVER['HTTP_HOST'];
}
else
{
	unset($_GET['Host']);
	unset($_GET['Port']);
	unset($_GET['Url']);


	$xmlPage = "http://$host:$port/$url?".http_build_query($_GET);

	$opts = array(
		'http'=>array(
			'method'=>"GET",
			'header'=>"Accept: application/json" 
		)
	);

	$context = stream_context_create($opts);


	$xmlOutput = file_get_contents($xmlPage, false, $context);

        /* Get the content type from the HTTP response */
        $nlines = count( $http_response_header );
        for ( $i = $nlines-1; $i >= 0; $i-- ) {
            $line = $http_response_header[$i];
            if ( substr_compare( $line, 'Content-Type', 0, 12, true ) == 0 ) {
                $content_type = $line;
                break;
            }
        }

        header($content_type);
        echo $xmlOutput;
}

?>
