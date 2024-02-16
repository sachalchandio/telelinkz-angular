export const generateRandomAlphanumericToken = (length: number): string => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }

  return token;
};

export interface DevProfile {
  id: string;
  name: string;
  role: string;
  img: string;
}

// Shuffle function to randomize the array
export const shuffleArray = (array: DevProfile[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  // return array.slice(0, 6);
  return array;
};

export interface DrawerDevProfile {
  id: string;
  name: string;
  stack: string;
  languages: string[];
  exp: string;
  img: string;
  bio: string;
}

// Shuffle function to randomize the array
export const shuffleArrayDrawer = (array: DrawerDevProfile[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  // return array.slice(0, 6);
  return array;
};
