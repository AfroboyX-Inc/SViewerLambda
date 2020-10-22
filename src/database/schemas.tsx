export const NovelSchema = {
  name: 'Novel',
  primaryKey: 'ncode',
  properties: {
    ncode: 'string',
    title: 'string',
    chapterCount: 'int',
    downloadDate: 'date',
    readingStatus: 'int',
    sections: 'Section[]',
  },
};

export const SectionSchema = {
  name: 'Section',
  properties: {
    title: 'string',
    chapters: 'Chapter[]',
  },
};

export const ChapterSchema = {
  name: 'Chapter',
  properties: {
    title: 'string',
    text: 'string',
  },
};

export enum readingState {
  new = 0,
  reading = 1,
  finished = 2,
}
