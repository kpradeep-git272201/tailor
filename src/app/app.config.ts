import { environment } from "src/environments/environment";



const API_VERSION = 'private/v1';
const  APIV1= 'api/v1';
const  APIV2= 'api/v2';
export const AppConfig = {
  encryptionKey: 'urwz0BFEnXCSJJGSS3GgAgupk2Wt2eMFe1idLe7xXcg=',
  APP_VERSION: 'v 2.2.0',
 
  lastUpdate: 'November 24, 2025',
  BASE_API: environment.BASE_URL + environment.CONREXT_PATH,
  ENDPOINTS: {
    AUTH:{
      LOGIN: `${APIV1}/auth/send-otp`,
      VERIFY_OTP: `${APIV1}/auth/verify-otp`,
    },
    PRIVATE: {
      ARTICLE: `catalog/${APIV1}/article`,
      FABRIC_CATEGORY: `${APIV1}/articles`,
      ALL_FABRIC_CATEGORIES:`${APIV1}/fabric/fabric-categories`,
      FABRIC_CATEGORY_BY_ID:`${APIV1}/fabric/fabric-category`,
      TAILOR_ARTICLE_RATES: `${APIV2}/tailors/article-rates`,
      TAILORS: `${APIV2}/tailors`,
      WORK_HOURS_LAST10DAYS: `${APIV2}/tailors`,
      STICHINGPRICE: `${APIV2}/tailors/article-stitchingPrice`
    },
    MASTER: {
      FABRIC_COLOR: `master/${APIV1}/fabric-color/fabric`,
      FABRIC_COLOR_BY_FABRIC_ID:`${APIV1}/fabric`
    }
  },
};
