<?php 

echo date('l jS \of F Y h:i:s A');
echo "<br />".date('w');

$today  = mktime(0, 0, 0, date("m")  , date("d"), date("Y"));
$daynum = date('w', $today);
$sundaynum = 7-$daynum;
$monday = mktime(0, 0, 0, date("m")  , date("d")-$daynum+1, date("Y"));
$sunday = mktime(0, 0, 0, date("m")  , date("d")+$sundaynum, date("Y"));

echo "<br>".$today." - ".$daynum;
echo "<br>".date("l: d-m-y", $monday)."<br>".date("l: d-m-y", $sunday);
?>