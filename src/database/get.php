<?php
include './config.php';
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 




$result = $conn->query("SELECT * FROM `andy`"); 
?>

<?php if($result->num_rows > 0){ ?> 
     
    <?php while($row = $result->fetch_assoc()){ 
        
        ?>
        <?php
         $names[] = array(
            'ID'=> $row['ID'],
            'Picture'=>base64_encode($row['Picture']),
            'Title'=>$row['Title'],
            'Description'=>$row['Description'],
        
        );
        
        ?>
       
     <?php } ?>
     <?php echo json_encode($names) ; 
     ?>
     
    
<?php }else{ ?> 
    <p class="status error">Image(s) not found...</p> 
<?php } ?>

