import { defineStore } from "pinia";
import axios from "axios";

const backend = process.env.VUE_APP_API_URL;

export const useBoardTagStore = defineStore("boardTag", {
  state: () => ({
    hotTagList: [],
  }),
  actions: {
    async getHotTagList() {
      try {
        let response = await axios.get(backend + `/boardtag/list`);

        this.hotTagList = response.data.result;
      } catch (e) {
        console.log(e);
      }
    },
  },
});


