import create from 'zustand';

export const useStore = create((set) => ({
  actualYear: null,
  aboutOpen: false,
  backgroundColor: 'var(--primary)',
  changeBackgroundColor: (backgroundColor) => {
    document.body.style.backgroundColor = backgroundColor
    return set(state => ({ backgroundColor }))
  }
}));
