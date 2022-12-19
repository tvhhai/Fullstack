import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "@/axios";

export const usePhoneStore = defineStore("phone", {
  state: () => ({
    isLoading: true,
    phoneId: null,
    listPhone: [],
    actionState: {},
    getPhoneDetail: {},
    error: "",
  }),

  getters: {
    getCount: (state) => state,
  },

  actions: {
    async getListPhone() {
      try {
        const data = await axios.get(
          "https://5fa04305e21bab0016dfd001.mockapi.io/api/v1/listphone"
        );
        this.listPhone = data.data;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
