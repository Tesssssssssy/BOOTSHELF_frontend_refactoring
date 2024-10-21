import { defineStore } from "pinia";
import axios from "axios";

const backend = process.env.VUE_APP_API_URL;

export const useCategoryStore = defineStore("category", {
  state: () => ({
    boardCategoryList: [],
    reviewCategoryList: [],
  }),
  actions: {
    async getBoardCategoryList() {
      try {
        let response = await axios.get(backend + "/admin/board/list");

        this.boardCategoryList = response.data.result;
      } catch (e) {
        console.log(e);
      }
    },
    async getReviewCategoryList() {
      try {
        let response = await axios.get(backend + "/admin/review/list");

        this.reviewCategoryList = response.data.result;
      } catch (e) {
        console.log(e);
      }
    },
  },
});
