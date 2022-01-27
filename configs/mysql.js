var mysql = require('mysql');
// console.log(process.env.DB_ENV)

// 连接数据库配置信息
var pool = mysql.createPool({
  connectionLimit: 10,  // 最大连接数
  host: 'localhost',    // 主机
  user: 'root',   // 用户名
  password: 'root',  // 密码
  database: 'history_ms'  // 数据库名称
});


//  创建连接   sql：sql语句
module.exports.query = (sql, values) => {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!  没有连接上

      // Use the connection   使用连接 发送sql语句到数据库mysql，mysql中的letaodb数据库会执行sql语句，
      // 执行结果 在回调函数中参数二返回
      connection.query(sql, values, function (error, results, fields) {
        // When done with the connection, release it.   没连接上之拿到返回数据的之后，会把当前连接释放掉
        connection.release();

        // Handle error after the release.  抛出异常
        if (error) throw error;

        resolve(results);

        // Don't use the connection here, it has been returned to the pool.
      });
    });
  });
}