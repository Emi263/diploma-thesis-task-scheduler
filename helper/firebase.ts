import * as firebase from "firebase";
import { storage } from "./firebaseConfig";

export const uploadImage = async (pickerResult: any) => {
  const dt = await fetch(pickerResult);
  const bytes = await dt.blob();
  const ref = storage.ref().child(new Date().toISOString());
  const snapshot = ref.put(bytes);

  const upload = new Promise((resolve, reject) => {
    snapshot.on(
      firebase.default.storage.TaskEvent.STATE_CHANGED,
      () => {},
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          resolve(url);
        });
      }
    );
  });
  const url = await upload;
  return url;
};
