export function genreDecoded(genre: number) {
  switch (genre) {
    case 101:
      return '異世界〔恋愛〕';
    case 102:
      return '現実世界〔恋愛〕';
    case 201:
      return 'ハイファンタジー〔ファンタジー〕';
    case 202:
      return 'ローファンタジー〔ファンタジー〕';
    case 301:
      return '純文学〔文芸〕';
    case 302:
      return 'ヒューマンドラマ〔文芸〕';
    case 303:
      return '歴史〔文芸〕';
    case 304:
      return '推理〔文芸〕';
    case 305:
      return 'ホラー〔文芸〕';
    case 306:
      return 'アクション〔文芸〕';
    case 307:
      return 'コメディー〔文芸〕';
    case 401:
      return 'VRゲーム〔SF〕';
    case 402:
      return '宇宙〔SF〕';
    case 403:
      return '空想科学〔SF〕';
    case 404:
      return 'パニック〔SF〕';
    case 9901:
      return '童話〔その他〕';
    case 9902:
      return '詩〔その他〕';
    case 9903:
      return 'エッセイ〔その他〕';
    case 9904:
      return 'リプレイ〔その他〕';
    case 9999:
      return 'その他〔その他〕';
    case 9801:
      return 'ノンジャンル〔ノンジャンル〕';
    default:
      return '';
  }
}

export function endDecoded(end: number) {
  switch (end) {
    case 0:
      return '完結済み';
    case 1:
      return '連載中';
    default:
      return '';
  }
}

export function xmlDecoded(text: string) {
  var returnString = text;

  let entities: {[entity: string]: string} = {
    '&quot;': '"',
    '&amp;': '&',
    '&apos;': "'",
    '&lt;': '<',
    '&gt;': '>',
    '&deg;': '°',
  };

  for (let key in entities) {
    let value = entities[key];

    returnString = returnString.replaceAll(key, value);
  }

  return returnString;
}

//"yyyy-MM-dd HH:mm:ss" -> 'yyyy年MM月dd日 HH時mm分'
export function formatDate(str: string) {
  let splitDate = str.split(' ');

  let date = splitDate[0];
  let time = splitDate[1];

  let yyyy = date.split('-')[0];
  let MM = date.split('-')[1];
  let dd = date.split('-')[2];

  let HH = time.split(':')[0];
  let mm = time.split(':')[1];

  let formattedDate = `${yyyy}年${MM}月${dd}日 ${HH}時${mm}分`;

  return formattedDate;
}

export function formatNumber(num: number) {
  let returnNumber = String(num).replace(/(\d)(?=(\d\d\d)+$)/g, '$1,');

  return returnNumber;
}

export function percentage(num: number, per: number) {
  return (num / 100) * per;
}
