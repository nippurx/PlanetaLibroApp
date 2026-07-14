<?php
/*

API PARA GPT BIBLIOASESOR
https://chatgpt.com/g/g-TYEliDU6A-actionsgpt/c/a175e684-d12b-4414-aaa2-09e2e1894ad4


https://chatgpt.com/c/91525cec-5a18-4043-9c13-23f2b648b569

*/

// gptsearch.php

include("../../mp_dbfuncs.php");
include("../../dbconf.php");
include("../../funciones.php");
include("../../pl_funcs.php");
include("../../libro_funcs.php");


$p_busqueda = mp_request('q');
$dbconn = mp_db_connect($dbconf);
mysqli_set_charset($dbconn, "utf8"); // Asegúrate de que la conexión use UTF-8
header('Content-Type: application/json; charset=utf-8'); 


//echo $p_busqueda;

if ($p_busqueda)
{

    //$p_busqueda = quitar_acentos($p_busqueda);
   
	$abusqueda = explode(" ",$p_busqueda);

    //mpdebug($abusqueda);exit;

	# analizar los terminos buscados
	$s_where = '';
	for ($j=0; $j<count($abusqueda);$j++)
	{

		// ignoro LA EL LOS
		if (strlen($abusqueda[$j]) > 2)
		{
			//$s_where.= " and  concat(a.ebooks_authors_name,l.ebooks_books_title) like '%".$abusqueda[$j]."%' ";
			$s_where.= " and l.ebooks_books_title like '%".$abusqueda[$j]."%' ";
		}

	}
	
	# BUSQUEDA EN TODOS LOS LIBROS
	$sql = "select
	l.ebooks_books_id,
	a.uri as author_uri,
	l.uri,
	l.ebooks_books_title,
	a.ebooks_authors_name
	from ebooks_books as l, ebooks_authors as a
	where l.ebooks_books_author = a.ebooks_authors_id".
	$s_where.
	" order by l.views_last desc limit 1";

	//mpdebug($sql);

	$alibros = mpdb_get_value($sql,$dbconn);
	//mpdebug($alibros);
	$n_encontrados = count($alibros);

	// si encontro
	if ($n_encontrados > 0)
	{
		//mpdebug($alibros);

		// Limpia los índices numéricos del array
        $clean_alibros = array_map(function($libro) {
            return array_filter($libro, function($key) {
                return !is_numeric($key);
            }, ARRAY_FILTER_USE_KEY);
        }, $alibros);

		// crear url completa
		$clean_alibros[0]['link']= 'https://planetalibro.net/libro/'.$clean_alibros[0]['uri'];

		header("HTTP/1.1 200 OK");
		echo json_encode($clean_alibros, JSON_UNESCAPED_UNICODE); // Asegúrate de que JSON se maneje correctamente
    }
   	else
   	{
		$clean_alibros[0]['link'] = 'https://planetalibro.net/buscar.php?search='.urlencode($p_busqueda);
		//header("HTTP/1.1 404 Not Found");
		//echo json_encode(array("error" => "Not Found"), JSON_UNESCAPED_UNICODE);
		header("HTTP/1.1 200 OK");
		echo json_encode($clean_alibros, JSON_UNESCAPED_UNICODE); // Asegúrate de que JSON se maneje correctamente        
	}

}
else {
	header("HTTP/1.1 400 Bad Request");
	echo json_encode(array("error" => "No title provided"), JSON_UNESCAPED_UNICODE);
}

