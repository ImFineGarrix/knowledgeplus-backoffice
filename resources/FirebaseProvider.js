import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useRuntimeConfig } from 'nuxt/app'

class FirebaseProvider {
  async uploadFile(path, file) {
    try {
      const { $storage } = useNuxtApp();
      const config = useRuntimeConfig()
      const storageRef = ref($storage, path)
      const snapshot = await uploadBytes(storageRef, file)
      const linkFile = await getDownloadURL(snapshot.ref)
      return linkFile.replace(config.public.firebaseBaseUrl, '')
    } catch (err) {
      return 'error'
    }
  }
}

export default FirebaseProvider
