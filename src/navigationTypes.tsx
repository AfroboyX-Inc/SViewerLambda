import {StackScreenProps} from '@react-navigation/stack';

export type BookshelfParamList = {
  bookshelf: undefined;
  chapterList: undefined;
  reader: undefined;
};

export type Props = StackScreenProps<BookshelfParamList, 'chapterList'>;
