import Axios from 'axios';
import Realm from 'realm';
import {
  NovelSchema,
  SectionSchema,
  ChapterSchema,
  readingState,
} from '../database/schemas';
import {sleep} from './myUtils';
const cheerio = require('react-native-cheerio');

export enum website {
  narou,
  aozora,
}

//小説をダウンロードするとき
function downloadPrep() {}

export async function getText(href: string) {
  let urlString = 'https://ncode.syosetu.com' + href;
  let text = '';

  await Axios.get(urlString).then((res) => {
    let $ = cheerio.load(res.data);
    let preface = $('[class=novel_view]').filter('#novel_p');
    let honbun = $('[class=novel_view]').filter('#novel_honbun');
    let postScript = $('[class=novel_view]').filter('#novel_a');

    //まえがきあれば追加
    if (preface.length > 0) {
      text += `
      ${preface.text()}
      ********************************************
  
      `;
    }

    //本文
    $(honbun)
      .children()
      .each((i: number, elem: any) => {
        if ($(elem).find('ruby').length > 0) {
          //rubyあり
          let ruby = $(elem).children('ruby');
          let rb = $(ruby).children('rb').text();
          let rt = $(ruby).children('rt').text();

          let formattedRuby = `｜${rb}《${rt}》`;
          let textBefore = '';
          let textAfter = '';

          if ($(ruby)[0].previousSibling != null) {
            textBefore = $(ruby)[0].previousSibling.nodeValue;
          }

          if ($(ruby)[0].nextSibling != null) {
            textAfter = $(ruby)[0].nextSibling.nodeValue;
          }

          let formattedLine = textBefore + formattedRuby + textAfter;

          text += formattedLine + '\n';
        } else {
          //rubyなし
          text += $(elem).text() + '\n';
        }
      });

    //あとがきあれば追加
    if (postScript.length > 0) {
      text += `
    
        ********************************************
        ${postScript.text()}
        `;
    }
  });
  return text;
}

export async function downloadNovel(ncode: string, from: website) {
  switch (from) {
    case website.narou: {
      let urlString = `https://ncode.syosetu.com/${ncode}/`;

      let response = await Axios.get(urlString);
      const $ = cheerio.load(response.data); // id = #id, class = .class,

      let novelTitle = $('.novel_title').text();
      let realm = new Realm({
        schema: [NovelSchema, SectionSchema, ChapterSchema],
      });

      let index_box = $('.index_box');
      if (index_box.length > 0) {
        //連載小説

        realm.write(() => {
          realm.create('Novel', {
            ncode: ncode,
            title: novelTitle,
            chapterCount: $('.novel_sublist2').length,
            downloadDate: new Date(),
            readingStatus: readingState.new,
          });
        });

        let sections = $('.chapter_title');
        if (sections.length > 0) {
          //章あり
          for (let i = 0; i < sections.length; i++) {
            let sectionTitle = $(sections[i]).text();
            realm.write(() => {
              let novel = realm.objects('Novel').filtered(`ncode = "${ncode}"`);

              novel[0].sections.push({
                title: sectionTitle,
              });
            });

            sleep(5);

            let chapters = $(sections[i]).nextUntil('.chapter_title');
            for (let j = 0; j < chapters.length; j++) {
              let subtitle = $(chapters[j]).children('.subtitle');
              let title = $(subtitle).children('a').text();
              let href = $(subtitle).children().attr('href');

              let novelString = await getText(href);

              realm.write(() => {
                let novel = realm
                  .objects('Novel')
                  .filtered(`ncode = "${ncode}"`);

                novel[0].sections[i].chapters.push({
                  title: title,
                  text: novelString,
                });
              });
            }
          }
        } else {
          //章なし
          let section = '*none';
          realm.write(() => {
            let novel = realm.objects('Novel').filtered(`ncode = "${ncode}"`);

            novel[0].sections.push({
              title: section,
            });
          });

          let chapters = $(index_box).children('.novel_sublist2');
          for (let i = 0; i < chapters.length; i++) {
            let subtitle = $(chapters[i]).children('.subtitle');
            let title = $(subtitle).children('a').text();
            let href = $(subtitle).children().attr('href');

            if (i % 5 == 0) {
              sleep(5);
            }

            let novelString = await getText(href);

            realm.write(() => {
              let novel = realm.objects('Novel').filtered(`ncode = "${ncode}"`);

              novel[0].sections[0].chapters.push({
                title: title,
                text: novelString,
              });
            });
          }
        }
      } else {
        //短編小説の処理
        let section = '*none';
        let novelString = await getText(`/${ncode}`);

        realm.write(() => {
          let novel = realm.create('Novel', {
            ncode: ncode,
            title: novelTitle,
            chapterCount: 1,
            downloadDate: new Date(),
            readingStatus: readingState.new,
          });

          novel.sections.push({
            title: section,
          });

          novel.sections[0].chapters.push({
            title: novelTitle,
            text: novelString,
          });
        });
      }
      console.log('done');
    }
    case website.aozora: {
      //いずれ実装
    }
  }
}
