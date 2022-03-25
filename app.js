// const express = require("express");
// const path = require("path");
// const fs = require("fs");
// var bodyParser = require("body-parser");


import express from "express"
import path from "path"
import fs from "fs"

import { addRow } from "./db.js";
import bodyParser from "body-parser"
const jsonParser = bodyParser.json();
const app = express();

app.get(`/`, (req, res) => {
  res.status(200).send("默认页面");
});


app.get(`/connect`, async (req, res) => {
  await connect();
  res.status(200).send("我收到消息了");
});

app.post(`/close_issue`, jsonParser, async (req, res) => {
  const { action, issue } = req.body;
  const { url, title, html_url, number, body } = issue;
  if (action === "opened") {
    //新建的issue，将映射关心存入sql中
    const result = await addRow({ url, title, number });
    console.log("更新数据库result", result);
    res.status(200).send("更新数据成功");
    return 
  }
});

app.get("/404", (req, res) => {
  res.status(404).send("Not found");
});

app.get("/500", (req, res) => {
  res.status(500).send("Server Error");
});

// Error handler
app.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).send("Internal Serverless Error");
});

// Web 类型云函数，只能监听 9000 端口
app.listen(9000, () => {
  console.log(`Server start on http://localhost:9000`);
});
