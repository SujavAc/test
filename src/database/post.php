<?php
include './config.php';
// Check connection
$status = $statusMsg = '';
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$picture = $_FILES["Picture"]["name"];

// if(getimagesize($picture)==false){
//     $statusMsg='Please select an Image';
// }
// else{
//     $image = base64_encode(file_get_contents(addslashes($picture)));

//     $insert = $conn->query("INSERT INTO `andy` (Picture,Title,Description)
//                   VALUES ('$image', '".$_POST['Title']."', '".$_POST['Description']."')") ;

//     if ($insert) {
//         $statusMsg= "Image uploaded successfully.";
//     }else{
//         $statusMsg= "Image Failed to upload.";
//     }
// }

   if(!empty($_FILES['Picture']['tmp_name'])) { 
      // Get file info 
      
      // Allow certain file formats 
      
      
          $image = $_FILES["Picture"]['tmp_name']; 
          $imgContent = addslashes(file_get_contents($image)); 
       
          // Insert image content into database 
          $insert = $conn->query("INSERT INTO `andy` (Picture,Title,Description)
                VALUES ('$imgContent', '".$_POST['Title']."', '".$_POST['Description']."')") ;
           
          if($insert){ 
              $status = 'success'; 
              $statusMsg = "File uploaded successfully."; 
          }else{ 
              $statusMsg = "File upload failed, please try again."; 
          }  
       
  }else{ 
      $statusMsg = 'Please select an image file to upload.'; 
  } 
 

// Display status message 
echo $statusMsg; 
?>