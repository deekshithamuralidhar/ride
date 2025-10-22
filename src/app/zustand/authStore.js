import { create } from "zustand";

export const authStore = create((set) => ({
  roleAuthDetails: null,
  setRoleAuthDetails: (roleAuthDetails) => set({ roleAuthDetails }),

  /* Driver registeration states */
  driverRegStep: 0,
  setDriverRegStep: (driverRegStep) => set({ driverRegStep }),

  driverDocuments: 0,
  setDriverDocuments: (driverDocuments) => set({ driverDocuments }),
}));
