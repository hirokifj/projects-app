import JsSHA from 'jssha';

export const getHash = (str: string): string => {
  const shaObj = new JsSHA('SHA-256', 'TEXT');

  shaObj.update(str);
  return shaObj.getHash('HEX');
};
