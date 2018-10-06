import crypto from 'crypto';

const ALGORITHM = 'AES-256-CTR'; // CBC because CTR isn't possible with the current version of the Node.JS crypto library
const HMAC_ALGORITHM = 'SHA256';
let KEY = new Buffer(32);
KEY.write('snjflsnjflwjfpakfkdkfwjfpakfkdkf');// [];//crypto.randomBytes(32); // This key should be stored in an environment variable
const HMAC_KEY = new Buffer(32);//crypto.randomBytes(32); // This key should be stored in an environment variable
HMAC_KEY.write('snjflsnjflssssakfkdkqaswpakfkdkf');
const DELIMETER = '=';

const encryptUserIdAndEventId = (userId, eventId) => {
  return encrypt(userId + DELIMETER + eventId);
}

const decryptUserIdAndEventId = (data) => {
  try {
    const decrypedData = decrypt(data);

    if (null == decrypedData)
      return null;

    const parts = decrypedData.split(DELIMETER);

    return {userId: parts[0], eventId: parts[1]};
  } 
  catch (e) {
    return null;
  }
}

const encrypt = (plain_text) => {

   const IV = new Buffer(crypto.randomBytes(16)); // ensure that the IV (initialization vector) is random
   let encryptor = crypto.createCipheriv(ALGORITHM, KEY, IV);
   encryptor.setEncoding('hex');
   encryptor.write(plain_text);
   encryptor.end();

   let cipher_text = encryptor.read();

   let hmac = crypto.createHmac(HMAC_ALGORITHM, HMAC_KEY);
   hmac.update(cipher_text);
   hmac.update(IV.toString('hex')); // ensure that both the IV and the cipher-text is protected by the HMAC

   // The IV isn't a secret so it can be stored along side everything else
   return cipher_text + "$" + IV.toString('hex') + "$" + hmac.digest('hex') 
};

const decrypt = (cipher_text) =>  {
   const cipher_blob = cipher_text.split("$");
   const ct = cipher_blob[0];
   const IV = new Buffer(cipher_blob[1], 'hex');
   const hmac = cipher_blob[2];   

   let chmac = crypto.createHmac(HMAC_ALGORITHM, HMAC_KEY);
   chmac.update(ct);
   chmac.update(IV.toString('hex'));

   if (!constant_time_compare(chmac.digest('hex'), hmac)) {
       console.log("Encrypted Blob has been tampered with...");
       return null;
   }

   let decryptor = crypto.createDecipheriv(ALGORITHM, KEY, IV);
   const decryptedText = decryptor.update(ct, 'hex', 'utf-8');
   return decryptedText + decryptor.final('utf-8');
};

const constant_time_compare = (val1, val2) => {
   let sentinel;

   if (val1.length !== val2.length) 
    return false;

   for (let i = 0; i <= (val1.length - 1); i++)
       sentinel |= val1.charCodeAt(i) ^ val2.charCodeAt(i);

   return sentinel === 0;
};


export default {
  decryptUserIdAndEventId: decryptUserIdAndEventId,
  encryptUserIdAndEventId: encryptUserIdAndEventId,
  encrypt: encrypt,
  decrypt: decrypt
}
