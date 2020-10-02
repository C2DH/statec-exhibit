import create from 'zustand';

export const useStore = create((set) => ({
  actualYear: null,
  aboutOpen: false,
}));
