// import * as React from 'react';
import { objectType } from 'types';

const AVATAR_COLORS = [
  '232, 105, 156',
  '255, 198, 115',
  '128, 128, 255',
  '105, 232, 194',
  '234, 255, 128',
];

const AVATAR_OPACITY = 0.4;

export const cleanObject = <T extends objectType>(object: T) => {
  const newObj = Object.assign({}, object);
  Object.keys(newObj).forEach((key: string) => {
    if (newObj[key] === '' || newObj[key] === undefined || newObj[key] === null)
      delete newObj[key];
  });
  return newObj;
};

export const isEmail = (email: string) => {
  const re: RegExp = /\S+@\S+\.\S+/;
  return re.test(String(email).toLowerCase());
};

export const getInitialLetterName = (s: string) => {
  let strs = s.split(' ');
  let result: string[] = [];
  strs.reverse().forEach(item => {
    result.length < 2 && result.push(item.substr(0, 1).toUpperCase());
  });
  return result.join('');
};

export function getAvatarColor(initials?: string) {
  let colorIndex = 0;
  if (initials) {
    let nameHash = 0;
    for (const s of initials) {
      nameHash += s.codePointAt(0) || 0;
    }
    colorIndex = nameHash % AVATAR_COLORS.length;
  }
  return `rgba(${AVATAR_COLORS[colorIndex]}, ${AVATAR_OPACITY})`;
}
