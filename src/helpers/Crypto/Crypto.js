import crypto from 'crypto';

export const encrypt = value => {
  try {
    if (value) {
      const random = crypto.randomBytes(20).toString('Hex');
      return `${random.slice(0, 15)}${value}${random.slice(17)}`;
    }
  } catch (err) {
    return null;
  }
};

export const decrypt = value => {
  try {
    if (value) {
      return value[15];
    }
  } catch (err) {
    return null;
  }
};
