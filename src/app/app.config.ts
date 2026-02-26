import { environment } from "src/environments/environment";



const API_VERSION = 'private/v1';

export const AppConfig = {
  encryptionKey: 'urwz0BFEnXCSJJGSS3GgAgupk2Wt2eMFe1idLe7xXcg=',
  APP_VERSION: 'v 2.2.0',
  lastUpdate: 'November 24, 2025',
  BASE_API: environment.BASE_URL + environment.CONREXT_PATH,
  ENDPOINTS: {
    PRIVATE: {
      ARTICLE: 'catalog/api/v1/article',
      FABRIC_CATEGORY: 'api/v1/articles',
      ALL_FABRIC_CATEGORIES:'api/v1/fabric/fabric-categories',
      FABRIC_CATEGORY_BY_ID:'api/v1/fabric/fabric-category'
    },
    MASTER: {
      FABRIC_COLOR: 'master/api/v1/fabric-color/fabric',
      FABRIC_COLOR_BY_FABRIC_ID:'api/v1/fabric'
    }
  },
};
