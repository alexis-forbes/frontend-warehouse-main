import { ArticleI } from "./article";

export interface ProductI {
  id: string;
  name: string;
  articles: ArticleI[];
}
