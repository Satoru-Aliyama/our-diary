<template>
  <div class="comments">
    <div class="comments">
      <div class="new-diary">
        <h3>―New Diary―</h3>
        <div>
        <label for="name">Name</label>
        <br>
        <input class="textarea" id="name" type="text" v-model="name">
        </div>
        <br>
        <div>
          <label for="comment">Comment</label>
          <br>
          <textarea class="textarea" id="comment" rows="4" v-model="comment"></textarea>
          <br>
          <a href="https://our-diary.netlify.app/"><button @click="createComment">Post</button></a>
        </div>
      </div>
    
      <div class="diary">
      <h2>―Diary―</h2>
      <div v-for="post in posts" :key="post.name" class="each-diary">
        <div><strong>Name :</strong> {{post.fields.name.stringValue}}</div>
        <div><strong>Comment :</strong> {{post.fields.comment.stringValue}}</div>
      </div>
      </div>
      <Footer class="footer"></Footer>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Footer from './Footer.vue';
export default {
  data() {
    return {
      name: '',
      comment: '',
      posts: [],
    }
  },
  components: {
    Footer,
  },
  computed:{
      idToken() {
          return this.$store.getters.idToken;
      }
  },
  created() {
    axios.get(
      '/comments', 
      {
          headers: {
              Authorization: `Bearer ${this.idToken}`
          }
      }
    )
    .then(response => {
      this.posts = response.data.documents;
    });

  },
  
  methods: {
    createComment() {
      axios.post('/comments',
      {
        fields: {
          name: {
            stringValue: this.name
          },
          comment: {
            stringValue: this.comment
          },
          created: {
            timestampValue: new Date(),
          }
        }
      },
      {
          headers: {
              Authorization: `Bearer ${this.idToken}`
          }
      }
      );
      
    this.name = '';
    this.comment ='';
    }
  }
}
</script>

<style scoped>
 h3{
   color: rgb(255, 40, 105);
  font-size: 1.5em;
  margin-top: 20px;
  margin-bottom: 10px;
 }
 h2 {
   margin-top: 20px;
 }
 button {
   margin-top: 10px;
 }
 .new-diary {
   padding-bottom: 15px;
   border-bottom: 2px solid rgb(255, 40, 105);
 }
 .diary {
   max-width: 800px;
   margin: 0 auto;
   padding: 4%;
 }
 .each-diary {
   padding: 10px;
   text-align: left;
   margin-bottom: 30px;
   background-color: rgb(248, 248, 248);
   border-left: 5px solid rgb(255, 40, 105);
   box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.466);
 }
</style>

