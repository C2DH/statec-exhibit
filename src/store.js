import create from 'zustand';

export const useStore = create((set) => ({
  actualYear: null,
  aboutOpen: false,
  backgroundColor: 'rgb(217, 238, 241)',
}));
