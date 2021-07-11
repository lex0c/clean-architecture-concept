import crypto from 'crypto';

export default class HashAdapter {
  static build(text: string|undefined): string|null {
    return text ? crypto.createHash('sha1').update(text, 'binary').digest('hex') : null;
  }
}
