<?php
     include('./library/connlogin.php');

     // 2. 接收数据
     $username = $_REQUEST['username'];
     $password = $_REQUEST['password'];
   
     // 3. 查询数据
     $sql = "select * from users where username='$username' and password='$password'";
   
     $results = $mysql->query($sql);
   
     $mysql->close(); // 关闭数据库连接
   
     // var_dump($results);
   
     if($results->num_rows>0){
       echo '<script>alert("登录成功");</script>';
       echo '<script>location.href="http://localhost/2113/www.taobao.com/src/index.html";</script>';
     }else{
       echo '<script>alert("用户名或密码错误，请重新输入");</script>';
       echo '<script>location.href="http://localhost/2113/www.taobao.com/src/login.html";</script>';
     }
?>