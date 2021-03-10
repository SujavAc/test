<?php
include './config.php';
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 




$result = $conn->query("SELECT * FROM `courselist`"); 
?>

<?php if($result->num_rows > 0){ ?> 
     
    <?php while($row = $result->fetch_assoc()){ 
        
        ?>
        <?php
         $names[] = array(
            'ID'=> $row['ID'],
            'Image'=>base64_encode($row['Image']),
            'Title'=>$row['Title'],
            'Description'=>$row['Description'],
            'FeeStructure'=>$row['FeeStructure'],
            'CarrerPathway'=>$row['CarrerPathway'],
        
        );
        
        ?>
       
     <?php } ?>
     <?php echo json_encode($names) ; 
     ?>
     
    
<?php }else{ ?> 
    <p class="status error">Image(s) not found...</p> 
<?php } ?>

