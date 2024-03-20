import { Injectable } from '@angular/core';
import CryptoES from 'crypto-es';

@Injectable({
  providedIn: 'root'
})
export class EncrDecrService {
  constructor() {}

  //The set method is use for encrypt the value.
  setEncryptedString(keys: any, value: any) {
    const key = CryptoES.enc.Utf8.parse(keys);
    const iv = CryptoES.enc.Utf8.parse(keys);
    const encrypted = CryptoES.AES.encrypt(
      CryptoES.enc.Utf8.parse(value.toString()), key);

    return encrypted.toString();
  }

  //The get method is use for decrypt the value.
  getDecryptedString(keys: any, value: any) {
    const key = CryptoES.enc.Utf8.parse(keys);
    const iv = CryptoES.enc.Utf8.parse(keys);
    const decrypted = CryptoES.AES.decrypt(value, key);

    return decrypted.toString(CryptoES.enc.Utf8);
  }

  get(key: any, data: any) {
    const bytes = CryptoES.AES.decrypt(data.toString(), key);
    return CryptoES.enc.Utf8.stringify(bytes);
  }

  set(key: any, data: any) {
    const ciphertext = CryptoES.AES.encrypt(JSON.stringify(data), key);
    return ciphertext.toString();
  }
}
