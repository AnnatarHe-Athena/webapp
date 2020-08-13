import { getAESKeyFromUserEmail, decryptData } from '../utils/index';
import { useSelector } from 'react-redux';
import { AppStore } from '../reducers';
export function useImageDestLink(src: string) {
  const email = useSelector<AppStore, string | undefined>(s => s.profile.info.email);

  if (!email) {
    return btoa('https://picsum.photos/200/300');
  }

  const key = getAESKeyFromUserEmail(email);

  return decryptData(key, src);
}
