var app = new Vue({
  el: '#admin',
  data: {
    items: [],
    title: "",
    price: "",
    img_url: "",
    file: null,
    addItem: null,
    findTitle: "",
    findItem: null,
  },
  created() {
    this.getItems();
  },
  methods: {
    /*fileChanged(event) {
      this.file = event.target.files[0]
    },*/
    async upload() {
      try {
        //const formData = new FormData();
        //formData.append('photo', this.file, this.file.name)
        //let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/products', {
          title: this.title,
          price: this.price,
          path: this.img_url,
          ordered: 0,
          purchased: false,
        });
        this.addItem = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/products");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },
    async deleteItem(item) {
      try {
        var url = "/api/products/" + item._id;
        console.log(url);
        let response = axios.delete(url);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteAll() {
      try {
        var url = "/api/products/";
        console.log(url);
        let response = axios.delete(url);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      try {
        let response = await axios.put("/api/products/" + item._id, {
          title: this.findItem.title,
          price: this.findItem.price,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    suggestions() {
      //console.log(this.items[0].title.toLocaleLowerCase());
      return this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
    }
  },
});

