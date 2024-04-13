import {create} from "zustand";

const useStore = create((set) => {
    return {
        hamburgerOpen: false,
        toggleHamburger: () => 
            set((state) => ({hamburgerOpen: !state.hamburgerOpen}))
    }
})

export default useStore