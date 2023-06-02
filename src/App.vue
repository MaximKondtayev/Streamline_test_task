<template>
  <div id="app">
    <div class="main-wrapper">
      <div class="tree">
        <div class="buttons">
              <div class="buttons--item" @click="expandColapseClick(true)">Expand</div>
              <div class="buttons--item"  @click="expandColapseClick(false)">Collapse</div>
          </div>
        <TreeView :treeData="treeData" ref="childComponentRef"></TreeView>
      </div>
      <TreeList></TreeList>
    </div>
    
  </div>
</template>

<script>

import TreeView from './components/TreeView.vue';
import TreeList from './components/TreeList.vue';
import treeData from './data.json'

export default {
  name: 'App',
  components: {
    TreeView,
    TreeList
  },
  data() {
    return {
      treeData: treeData.tree.cat,
    };
  },
  methods: {
    expandColapseClick(expand) {
      this.$refs.childComponentRef.expandChilds(expand);
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.main-wrapper {
  display: flex;
  align-items: start;
}
.tree {
  border: 1px solid black;
  min-height: 500px;
  padding: 15px;
  border-radius: 16px;
}
.buttons {
  margin-bottom: 15px;
  &--item {
    padding: 10px;
    cursor: pointer;
    border-radius: 6px;
    margin-left: 10px;
    background-color: #2c3e50;
    color: white;
  }
  display: flex;
  
}
</style>
