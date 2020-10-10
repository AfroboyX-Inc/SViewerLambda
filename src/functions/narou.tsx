import Axios from 'axios';

import {endDecoded, genreDecoded, xmlDecoded, formatDate} from './myUtils';

export enum RankingOrder {
  daily = 'dailypoint',
  weekly = 'weeklypoint',
  monthly = 'monthlypoint',
  quarterly = 'quarterlypoint',
  yearly = 'yearlypoint',
  total = 'hyoka',
}

export enum SearchOrder {
  newestUpdate = 'new', //最新更新順
  weeklyUniqueAccess = 'weekly', //週間ユニークアクセスの多い順
  bookmarkCount = 'favnovelcnt', //ブックマーク登録の多い順
  reviewCount = 'reviewcnt', //レビューの多い順
  totalPoints = 'hyoka', //総合ポイントの高い順
  dailyPoints = 'dailypoint', //日間ポイントの高い順
  weeklyPoints = 'weeklypoint', //週間ポイントの高い順
  monthlyPoints = 'monthlypoint', //月間ポイントの高い順
  quarterlyPoints = 'quarterpoint', //四半期ポイントの高い順
  yearlyPoints = 'yearlypoint', //年間ポイントの高い順
  evaluatorCount = 'hyokacnt', //評価者数の多い順
  wordCount = 'lengthdesc', //文字数の多い順
  newestUpload = 'ncodedesc', //新着投稿順
  oldestUpdate = 'old', //更新が古い順
}

const Narou = {
  oppai: async function () {
    console.log('this is oppai');
  },
  unko: function () {
    console.log('this is unko');
  },
};

export default Narou;

const narouAPI =
  'https://api.syosetu.com/novelapi/api/?out=json&of=n-t-s-g-gl-e-ga-l-w-k-gp-nt&lim=100&';

//ncodeのみで小説の情報引っ張るとき
/*
export async function getNovelInfo(ncode: string) {
  const api = narouAPI + `ncode=${ncode}`;

  var novel = {} as Novel;

  await Axios.get(api)
    .then((response) => {
      let data = response.data;
      data.shift();

      novel = {
        ncode: data["ncode"],
        title: xmlDecoded(data["title"]),
        summary: xmlDecoded(data["story"]),
        wordCount: data["length"],
        genre: genreDecoded(data["genre"]),
        chapterCount: data["general_all_no"],
        endStatus: endDecoded(data["end"]),
        lastUpdate: formatDate(data["general_lastup"]),
        author: xmlDecoded(data["writer"]),
        totalPoints: data["global_point"],
        keywords: xmlDecoded(data["keyword"]),
      };
    })
    .catch(function (error) {
      console.log(error);
    });

  return novel;
}
*/

//ランキング引っ張るとき
export async function getRanking(type: RankingOrder, position: number) {
  const api = narouAPI + `order=${type}&st=${position}`;

  let novel = {} as Novel;
  let novelList = [] as Novel[];

  await Axios.get(api)
    .then((response) => {
      let data = response.data;
      data.shift();

      for (let index in data) {
        novel = {
          ncode: data[index]['ncode'],
          title: xmlDecoded(data[index]['title']),
          summary: xmlDecoded(data[index]['story']),
          wordCount: data[index]['length'],
          genre: genreDecoded(data[index]['genre']),
          chapterCount: data[index]['general_all_no'],
          endStatus: endDecoded(data[index]['end']),
          lastUpdate: formatDate(data[index]['general_lastup']),
          author: xmlDecoded(data[index]['writer']),
          totalPoints: data[index]['global_point'],
          keywords: xmlDecoded(data[index]['keyword']),
          novelType: data[index]['novel_type'],
        };

        novelList.push(novel);
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return novelList;
}

//検索するとき
export async function searchNarou(
  order: SearchOrder,
  position: number,
  keyword: string,
) {
  const api = narouAPI + `order=${order}&st=${position}&word=${keyword}`;
  const url = encodeURI(api);

  let novel = {} as Novel;
  let novelList = [] as Novel[];

  await Axios.get(url)
    .then((response) => {
      let data = response.data;
      data.shift();

      for (let index in data) {
        novel = {
          ncode: data[index]['ncode'],
          title: xmlDecoded(data[index]['title']),
          summary: xmlDecoded(data[index]['story']),
          wordCount: data[index]['length'],
          genre: genreDecoded(data[index]['genre']),
          chapterCount: data[index]['general_all_no'],
          endStatus: endDecoded(data[index]['end']),
          lastUpdate: formatDate(data[index]['general_lastup']),
          author: xmlDecoded(data[index]['writer']),
          totalPoints: data[index]['global_point'],
          keywords: xmlDecoded(data[index]['keyword']),
          novelType: data[index]['novel_type'],
        };

        novelList.push(novel);
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return novelList;
}
