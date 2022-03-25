import mysql from "mysql";

function wrapPromise(connection, sql) {
  return new Promise((res, rej) => {
    connection.query(sql, function (error, results, fields) {
      if (error) {
        rej(error);
      }
      res(results);
    });
  });
}

export const addRow = async (params, context, callback) => {
  console.log("createConnection");
  const connection = mysql.createConnection({
    host: "cd-cdb-g41a26wc.sql.tencentcdb.com", // The ip address of cloud database instance, 云数据库实例ip地址
    user: "root", // The name of cloud database, for example, root, 云数据库用户名，如root
    password: "CHENchen11013", // Password of cloud database, 云数据库密码
    database: "article", // Name of the cloud database, 数据库名称
    port: "62014",
  });

  connection.connect();
  console.log("============");
  // get value from apigw
  const { title, url, number } = params;
  const updateSql = `INSERT INTO article_list (title, issue_num,url) VALUES ('${title}', ${number},'${url}')`;
  let queryResult = await wrapPromise(connection, updateSql);
  connection.end();
  return queryResult;
};
