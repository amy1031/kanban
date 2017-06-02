<template>
    <div class="comments">
      <!--  <router-link :to="'/lists/'+list._id">{{list.name}}</router-link> -->
      <ul>
      <li>
      <div class="pull-right"><button class="delete" @click="removeComment(commentProp)">x</button></div>
      {{this.commentProp.name}}</li>
      </ul>
    </div>
</template>


<script>
export default {
    name: 'comments',
    props: ["commentProp", "commentIndex"],
    data(){
        return {}
    },
    computed: {
        comments() {

        }
    },
    methods:{
        removeComment(comment){
            this.$store.dispatch('removeComment', comment)
        }
    },
    components:{}
}
</script>


<style scoped>
ul li {
    line-height: 8px;
}
.delete {
    padding: 3px;
    border: 1px solid #fff;
    background-color: #ff5050;
    color: #fff;
    font-weight: bold;
}
</style>