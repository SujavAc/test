<?php
include './config.php';
$status = $statusMsg = '';
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$ID = $_POST['ID'];
$result = $conn->query("DELETE FROM `enquiry` WHERE ID = $ID"); 
if($result){
    $status='Deleted Successfully';
}else{
    $status='Error in deleting data';
}
echo $status;
?>