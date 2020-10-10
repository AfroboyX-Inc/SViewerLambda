import Axios from 'axios';
const cheerio = require('react-native-cheerio');

//小説をダウンロードするとき

export function downloadPrep() {}

function getPreface($: any) {
  if ($('#novel_p').hasClass('novel_view')) {
    //let separator = "********************************************";
    return `
    ${$('#novel_p.novel_view').text()}
    ********************************************

    `;
  } else return '';
}

function getPostscript($: any) {
  if ($('#novel_a').hasClass('novel_view')) {
    return `

    ********************************************
    ${$('#novel_a.novel_view').text()}
    `;
  } else return '';
}

function getBody($: any) {
  let honbun = $('#novel_honbun.novel_view');
  let i = 0;

  //let test = honbun('p').has('ruby');
  /*
  while (i <= honbun.length) {
    console.log(honbun[i].text());
    i++;
  }
  */
  return honbun.text();
}

function getNovelTOC($: any) {
  return;
}

async function downloadNovel(url: string) {
  var novelString = '';

  await Axios.get(url).then((res) => {
    let data = res.data;
    const $ = cheerio.load(data);

    novelString = getPreface($) + getBody($) + getPostscript($);

    /*
    //concat preface if exist
    if ($("#novel_p").hasClass("novel_view")) {
      let preface = $("#novel_p.novel_view").text();

      novelString = novelString.concat(preface + separator);
    }
    */

    //novelString = novelString.concat("〜本文ここ〜");

    /*
    //concat postscript if exist
    if ($("#novel_a").hasClass("novel_view")) {
      let postscript = $("#novel_a.novel_view").text();

      novelString = novelString.concat(separator + postscript);
    }
    */

    console.log(novelString);
  });
}

export async function fromNarou(ncode: string, length: number, type: number) {
  let urlString = `https://ncode.syosetu.com/${ncode}/`;

  await Axios.get(urlString).then((res) => {
    let data = res.data;
    const $ = cheerio.load(data);

    //短編かどうか
    if (type == 2) {
      let fileName = '1.txt';
      let novelString = downloadNovel(urlString);
      return;
    } else {
      let i = 1;
      while (i <= length) {
        let urlStringFixed = urlString + i;
        let fileName = `${i}.txt`;

        let novelString = downloadNovel(urlStringFixed);
        i++;

        break; //テスト中
      }
    }
  });
}

//いずれ実装
async function fromAozora() {}
