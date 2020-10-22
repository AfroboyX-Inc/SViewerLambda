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

export function formatDate(oppai: any, format: string) {
  var date = new Date();
  if (typeof oppai == 'string') {
    date = new Date(oppai.replace(' ', 'T'));
  } else if (typeof oppai == 'object') {
    date = oppai;
  }

  format = format.replace(/yyyy/g, date.getFullYear().toString());
  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
  format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
  format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
  format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
  format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3));

  return format;
}

export function formatNumber(num: number) {
  let returnNumber = String(num).replace(/(\d)(?=(\d\d\d)+$)/g, '$1,');

  return returnNumber;
}

export function percentage(num: number, per: number) {
  return (num / 100) * per;
}

export function isEmpty(obj: any) {
  return !Object.keys(obj).length;
}

export function sleep(waitSeconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, waitSeconds * 1000);
  });
}
