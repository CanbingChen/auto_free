
import bullshit from '@lwys-pkg-releaser/node-bullshit-generator'
import dayjs from 'dayjs'
import fs from 'fs-extra'


const TITLE_LIST = ["人生哲理", "存在意义", "个人定位", "自身努力", "时代价值", "保温杯", "钓鱼", "寂寞", "人生转折点"]


const title = TITLE_LIST[Math.floor(Math.random() * TITLE_LIST.length)];

let article = new bullshit().生成(title).split('\n').map(line => line.trim()).join('\n\n');

article +=`${dayjs().format('YYYY-MM-DD')}`

fs.writeFileSync('./README.md', article, 'utf8');

console.log(title, article);