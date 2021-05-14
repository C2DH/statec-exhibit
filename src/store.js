import create from 'zustand';

export const useStore = create((set) => ({
  currentYear: null,
  currentDatum: null,
  currentDataset: null,
  currentYearExplorerOpen: false,
  currentKeys: [],
  currentFocusKeys:[],
  aboutOpen: false,
  backgroundColor: 'var(--primary)',
  changeBackgroundColor: (backgroundColor) => {
    document.body.style.backgroundColor = backgroundColor
    return set(state => ({ backgroundColor }))
  },
  changeCurrentDatum: ({ datum, year, dataset, keys, focusKeys }) => {
    return set(state => ({
      currentYearExplorerOpen: true,
      currentYear: year,
      currentDatum: datum,
      currentDataset: dataset,
      currentKeys: keys,
      currentFocusKeys: focusKeys
    }))
  },
  changeCurrentYearExplorerOpen: (isOpen) => {
    return set(state => ({
      currentYearExplorerOpen: isOpen
    }))
  },
}));
