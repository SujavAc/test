<?php
include './config.php';
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 




$result = $conn->query("SELECT * FROM `studenttestimonials`"); 
?>

<?php if($result->num_rows > 0){ ?> 
     
    <?php while($row = $result->fetch_assoc()){ 
        
        ?>
        <?php
         $names[] = array(
            'ID'=> $row['ID'],
            'FullName'=>$row['FullName'],
            'Email'=>$row['Email'],
            'Image'=>base64_encode($row['Image']),
            'Rating'=>$row['Rating'],
            'Message'=>$row['Message'],
            'Date'=>$row['Date'],
        );
        
        ?>
       
     <?php } ?>
     <?php echo json_encode($names) ; 
     ?>
     
    
<?php }else{ ?> 
    <p class="status error">Error occured...</p> 
<?php } ?>

