import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '~/assets/js/firebase'

class FirebaseProvider {
  async uploadFile(path, file) {
    try {
      const storageRef = ref(storage, path)
      const snapshot = await uploadBytes(storageRef, file)
      const linkFile = await getDownloadURL(snapshot.ref)
      return linkFile
    } catch (err) {
      console.error(err)
    }
  }
}

export default FirebaseProvider
