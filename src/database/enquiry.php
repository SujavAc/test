<?php
include './config.php';
// Check connection
$status = $statusMsg = '';
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);

} 
    if(!empty($_POST["name"]) || !empty($_POST["email"]) || !empty($_POST["message"]) ) { 
        // Get file info 
         
        $insert = $conn->query("INSERT INTO enquiry (FullName,Email,Message,Date)
                  VALUES ('".$_POST['name']."','".$_POST['email']."','".$_POST['message']."',NOW())") ;
             
            if($insert){ 
                $status = 'success'; 
                $statusMsg = "Enquiry delivered"; 
            }else{ 
                $statusMsg = "Error, please try again."; 
            }  
        }
    else{ 
        $statusMsg = 'Please fill all the details'; 
    } 

   
 

// Display status message 
echo $statusMsg; 
?>