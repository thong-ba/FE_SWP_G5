import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createUserSlice } from "./UserSlice";

const useStore = create(
    devtools(
        persist(
            immer((set) => ({
                ...createUserSlice(set),
                
                reset: () => 
                    set((state) => {
                        if (state.auth !== false || state.userInfo !== null) {
                            state.auth = false;
                            state.userInfo = null;
                            state.isLoading = false;
                            state.response = null;
                            state.error = null;
                            state.userProfile = null;
                            state.orderList = null;
                        }
                    })
            })),
        )
    )
);

export default useStore;