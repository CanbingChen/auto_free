import request from "request";
import iconv from "iconv-lite";

import cheerio from "cheerio";
import fetch from "node-fetch";
import HttpsProxyAgent from "https-proxy-agent";

function getProxyList() {
  var apiURL =
    "http://chaocanbing.v4.dailiyun.com/query.txt?key=NP83F5574C&word=&count=100&rand=false&ltime=0&norepeat=false&detail=false";

  return new Promise((resolve, reject) => {
    var options = {
      method: "GET",
      url: apiURL,
      gzip: true,
    };

    request(options, function (error, response, body) {
      try {
        console.log(body, "body");
        if (error) throw error;

        if (/meta.*charset=gb2312/.test(body)) {
          body = iconv.decode(body, "gbk");
        }

        var ret = body.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,4}/g);
        console.log(ret, "ret");
        resolve(ret);
      } catch (e) {
        return reject(e);
      }
    });
  });
}

async function getCookie(proxyurl) {
  return new Promise((resolve, reject) => {
    request(
      "https://qmjs.sports.cn/index.php?s=/h5/index/vdetail/sid/9/id/3673",
      async (error, response, body) => {
        if (error) {
          reject(error);
        }
        const cookie = response.headers["set-cookie"][0].split(";")[0];
        const $ = cheerio.load(body);
        const rand = $(".btn-vote")[0].attribs["onclick"].split("'")[1];
        const proxy = `http://chaocanbing:CHENchen11013@${proxyurl}`;
        const agent = new HttpsProxyAgent(proxy);
        console.log("getCookie", proxy);
        var proxiedRequest = request.defaults({'proxy': proxy});
        let res;

        console.log("fetching");
        try {
          proxiedRequest(
            {
              url: "https://qmjs.sports.cn/index.php?s=/h5/index/vdetail/sid/9/id/3673",
              headers: {
                accept: "application/json, text/javascript, */*; q=0.01",
                "accept-language": "zh-CN,zh;q=0.9",
                "cache-control": "no-cache",
                "content-type":
                  "application/x-www-form-urlencoded; charset=UTF-8",
                pragma: "no-cache",
                "sec-ch-ua":
                  '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest",
                cookie,
              },
              body: `id=3673&sid=9&rand=${rand}`,
              method:'POST'
            },
            (error, response, b) => {
              console.log(error,'==============')
            }
          );
          // res = await fetch(

          //   {
          //     headers: {
          //       accept: "application/json, text/javascript, */*; q=0.01",
          //       "accept-language": "zh-CN,zh;q=0.9",
          //       "cache-control": "no-cache",
          //       "content-type":
          //         "application/x-www-form-urlencoded; charset=UTF-8",
          //       pragma: "no-cache",
          //       "sec-ch-ua":
          //         '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
          //       "sec-ch-ua-mobile": "?0",
          //       "sec-fetch-dest": "empty",
          //       "sec-fetch-mode": "cors",
          //       "sec-fetch-site": "same-origin",
          //       "x-requested-with": "XMLHttpRequest",
          //       cookie,
          //     },
          //     referrer:
          //       "https://qmjs.sports.cn/index.php?s=/h5/index/vdetail/sid/9/id/3673",
          //     referrerPolicy: "strict-origin-when-cross-origin",
          //     body: `id=3673&sid=9&rand=${rand}`,
          //     agent: agent,
          //     encoding:'gb2312',
          //     method: "POST",
          //     mode: "cors",
          //   }
          // );
        } catch (err) {
          console.log(err, "err");
          reject(err);
        }

        console.log("finnal");
        resolve(res);
      }
    );
  });
}
getProxyList().then(async (proxyList) => {
  for (let i = 0; i < proxyList.length; i++) {
    const proxy = proxyList[i];
    const res = await getCookie(proxy);
    console.log(res);
  }
});

// getCookie();
// async function getdata() {
//   const response = await fetch(
//     "https://qmjs.sports.cn/index.php?s=/h5/index/vote.html",
//     {
//       headers: {
//         accept: "application/json, text/javascript, */*; q=0.01",
//         "accept-language": "zh-CN,zh;q=0.9",
//         "cache-control": "no-cache",
//         "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//         pragma: "no-cache",
//         "sec-ch-ua":
//           '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
//         "sec-ch-ua-mobile": "?0",
//         "sec-fetch-dest": "empty",
//         "sec-fetch-mode": "cors",
//         "sec-fetch-site": "same-origin",
//         "x-requested-with": "XMLHttpRequest",
//         cookie: "PHPSESSID=jm6ihtlbqd3hm703pkdvtq4cr5",
//       },
//       referrer:
//         "https://qmjs.sports.cn/index.php?s=/h5/index/vdetail/sid/9/id/3673",
//       referrerPolicy: "strict-origin-when-cross-origin",
//       body: "id=3673&sid=9&rand=a2f289729a21b9aa6f0afccef64d0316",
//       // agent: agent,
//       method: "POST",
//       mode: "cors",
//     }
//   );
//   // console.log(response.body, "response");
//   const data = await response.json();
//   console.log(data, "response");
// }
// getdata()
// console.log(response.body, "response");

// return;

// getProxyList()
// .then(function (proxyList) {
//   const formData = new FormData()
//   formData.append(id,3673)
//这里修改一下，变成你要访问的目标网站
// proxyList.forEach(async function (proxyurl) {
//   console.log(`testing ${proxyurl}`);
//   const proxy = "http://" + proxyurl;
//   const agent = new HttpsProxyAgent(proxy);
//   console.log(proxy, "proxy===============");
//   const response = await fetch(
//     "https://qmjs.sports.cn/index.php?s=/h5/index/vote.html",
//     {
//       headers: {
//         accept: "application/json, text/javascript, */*; q=0.01",
//         "accept-language": "zh-CN,zh;q=0.9",
//         "cache-control": "no-cache",
//         "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//         pragma: "no-cache",
//         "sec-ch-ua":
//           '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
//         "sec-ch-ua-mobile": "?0",
//         "sec-fetch-dest": "empty",
//         "sec-fetch-mode": "cors",
//         "sec-fetch-site": "same-origin",
//         "x-requested-with": "XMLHttpRequest",
//         cookie: "PHPSESSID=nts16sn358t9kdg9jr169e0sr1",
//       },
//       referrer:
//         "https://qmjs.sports.cn/index.php?s=/h5/index/vdetail/sid/9/id/3673",
//       referrerPolicy: "strict-origin-when-cross-origin",
//       body: "id=3673&sid=9&rand=9eb3000cfe8f678d9d777a3da876c650",
//       // agent: agent,
//       method: "POST",
//       mode: "cors",
//     }
//   );
//   // console.log(response.body, "response");
//   const data = await response.json();
//   console.log(data, "response");
//   // request(targetOptions, function (error, response, body) {
//   //   try {
//   //     if (error) throw error;
//   //     body = JSON.parse(body);
//   //     console.log("==========", body);
//   //     //   console.log(body);
//   //   } catch (e) {
//   //     console.error(e);
//   //   }
//   // });
// });
// })
// .catch((e) => {
//   console.log(e, "==========");
// });
