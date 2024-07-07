import {Key} from 'react';

export const toSharedKey = (name: string, sharedKey?: Key) =>
  typeof sharedKey !== 'undefined' ? `${sharedKey}.${name}` : name;

export const getSharedKeys = (sharedKey?: Key) => ({
  background_c: toSharedKey('background_c', sharedKey),
  background_t: toSharedKey('background_t', sharedKey),
  background_b: toSharedKey('background_b', sharedKey),
  background_l: toSharedKey('background_l', sharedKey),
  background_r: toSharedKey('background_r', sharedKey),
  background_tl: toSharedKey('background_tl', sharedKey),
  background_tr: toSharedKey('background_tr', sharedKey),
  background_br: toSharedKey('background_br', sharedKey),
  background_bl: toSharedKey('background_bl', sharedKey),
  logo: toSharedKey('backgroundImage', sharedKey),
  image: toSharedKey('image', sharedKey),
  name: toSharedKey('name', sharedKey),
  id: toSharedKey('id', sharedKey),
  type_1: toSharedKey('type_1', sharedKey),
  type_2: toSharedKey('type_2', sharedKey),
  captured: toSharedKey('captured', sharedKey),
  details: 'details',
});

export const sortSharedKeys = (sharedKeys: any) => [
  sharedKeys.background_c,
  sharedKeys.background_t,
  sharedKeys.background_b,
  sharedKeys.background_l,
  sharedKeys.background_r,
  sharedKeys.background_tl,
  sharedKeys.background_tr,
  sharedKeys.background_br,
  sharedKeys.background_bl,
  sharedKeys.logo,
  sharedKeys.name,
  sharedKeys.id,
  sharedKeys.type_1,
  sharedKeys.type_2,
  sharedKeys.details,
  sharedKeys.image,
  sharedKeys.captured,
];

export type PropsWithSharedKey<T = unknown> = T & {
  sharedKey?: Key;
};
