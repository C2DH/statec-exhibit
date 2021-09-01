import create from 'zustand';


export const useStore = create((set) => ({
  currentYear: null,
  currentDatum: null,
  currentHotspot: null,
  currentDataset: null,
  currentChapterStructure: null,
  currentYearExplorerOpen: false,
  currentKeys: [],
  currentFocusKeys:[],
  aboutOpen: false,
  backgroundColor: 'var(--primary)',
  changeBackgroundColor: (backgroundColor) => {
    document.body.style.backgroundColor = backgroundColor

    return set(state => ({ backgroundColor, currentYearExplorerOpen:false }))
  },
  changeCurrentDatum: ({ datum, hotspot, year, dataset, keys, focusKeys, currentYearExplorerOpen=null }) => {
    return set(state => ({
      currentYearExplorerOpen: currentYearExplorerOpen !== null ? currentYearExplorerOpen : state.currentYearExplorerOpen,
      currentYear: year,
      currentHotspot: hotspot,
      currentDatum: datum,
      currentDataset: dataset,
      currentKeys: keys,
      currentFocusKeys: focusKeys
    }))
  },
  changeCurrentChapterStructure: (chapterId, sections) => set({
    currentChapterStructure: {
      chapterId,
      sections,
    }
  }),
  changeCurrentYearExplorerOpen: (isOpen) => {
    return set(state => ({
      currentYearExplorerOpen: isOpen
    }))
  },
}));
