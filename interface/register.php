<?php
 


  // 1. 连接数据库
  include('./library/connlogin.php');

  // 2. 接收数据
  $username = $_REQUEST['username'];
  $password = $_REQUEST['password'];
  

  // 3. 判断收到的用户名 在数据库中是否存在
  $sql1 = "select * from users where username='$username'";

  $results = $mysql->query($sql1);

  if($results->num_rows>0){
    echo '<script>alert("注册失败!用户名已存在");</script>';
    echo '<script>location.href="http://localhost/2113/www.taobao.com/src/register.html";</script>';
    $mysql->close();
    die(); // 用户名已存在 结束代码执行
  }

  // 用户名不存在 将数据写入数据库
  $sql2 = "insert into users (username,password) values ('$username','$password')";

  // 执行插入操作时  返回一个布尔值 表示插入数据是否成功
  $res = $mysql->query($sql2);

  $mysql->close();

  if($res){
    echo '<script>alert("注册成功!");</script>';
    echo '<script>location.href="http://localhost/2113/www.taobao.com/src/index.html";</script>';
  }
?>