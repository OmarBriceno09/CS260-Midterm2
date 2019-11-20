var app = new Vue({
  el: '#app',
  data: {
    items: [],
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/products");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async purcheseItem(item) {
      try {
        let response = await axios.put("/api/products/" + item._id, {
          purchased: true,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async SubmitPurchase() {
      try {
        let response = axios.put("/api/products/");
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getItems();
  },
  computed: {
    purchasedItems(){
        console.log(this.items[0]);
        
        return this.items.filter(item => {
          return (item.purchased);
        });
      return this.items;
    }
  },
});