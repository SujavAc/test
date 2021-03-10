<?php
include './config.php';
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 


                $result = $conn->query("SELECT * FROM `blog`"); 
?>

<?php if($result->num_rows > 0){ ?> 
     
    <?php while($row = $result->fetch_assoc()){ 
        
        ?>
        <?php
         $names[] = array(
            'ID'=> $row['ID'],
            'PostTitle'=> $row['PostTitle'],
            'Date'=> $row['Date'],
            
            
            'AuthorImage'=>base64_encode($row['AuthorImage']),
            'BlogImage'=>base64_encode($row['BlogImage']),
            'BlogDescription'=>$row['BlogDescription'],
            'Category'=>$row['Category'],
            'AuthorName'=>$row['AuthorName'],
            
            'Title1'=>$row['Title1'],
            'Description1'=>$row['Description1'],
            'Title2'=>$row['Title2'],
            'Description2'=>$row['Description2'],
            'Title3'=>$row['Title3'],
            'Description3'=>$row['Description3'],
            
        
        );
        
        ?>
       
     <?php } ?>
     <?php echo json_encode($names) ; 
     ?>
     
    
<?php }else{ ?> 
    <p class="status error">Blog not found...</p> 
<?php }
?>
