import { initializeApp, getApps } from 'firebase/app';
import config from '../../firebase-config.json';

import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// firebase サービスの api キーをシークレットとして扱う必要はない
// 参照: https://firebase.google.com/support/guides/security-checklist?hl=ja#api-keys-not-secret
if (!getApps()?.length) {
  initializeApp(config);
}

export const auth = getAuth();
export const db = getFirestore();
