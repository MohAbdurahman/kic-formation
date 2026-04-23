import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function getData<T>(section: string, defaultData: T): Promise<T> {
  try {
    const docRef = doc(db, 'kic_content', section);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as T;
    }
    return defaultData;
  } catch (error) {
    console.error(`Erreur chargement ${section}:`, error);
    return defaultData;
  }
}

export async function saveKicData(section: string, data: object): Promise<void> {
  const cleaned = JSON.parse(JSON.stringify(data));
  const docRef = doc(db, 'kic_content', section);
  await setDoc(docRef, cleaned);
}
