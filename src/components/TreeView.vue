<template>
    <div class="wrapper">
        
        <div class="node">
                <div :style="{'margin-left' : `${depth * 20}px`, 'display': 'flex'}" @dblclick="treeClick()">
                    <span v-if="treeWithLeaf" class="type">{{ expanded ? '&#9660;' : '&#9658;' }}</span>
                    <span v-else>&#9671;</span>
                    <div :class="{ 'selected': selected  }" :style="{'padding-left' : '5px'}" @click="toggleSelection(), addItemToStoredList(treeData)">{{ treeData._name }}</div>
                </div>
                <div v-show="expanded">
                    <TreeView v-for="child in treeWithLeaf"
                            :key="child._nodeId"
                            :treeData="child"
                            :depth="depth + 1"
                            ref="childComponentRef">
                    </TreeView>
                </div>
        </div>
    </div>
        
        
</template>

<script>
// import TreeItem from './TreeItem.vue';

import { mapGetters, mapMutations } from 'vuex';
export default {
    
    name: 'TreeView',
    components: {
        // TreeItem,
    },
    data() {
        return {
            expanded: false,
            selected: false,
            someTree: [],
        }
    },
    props: {
        treeData: {
            type: Object,
            required: true,
        },
        depth: {
            type: Number,
            default: 0
        },
    },
    computed: {
        ...mapGetters(['itemLists']),
        treeWithLeaf () {
            return (this.treeData.cat !== undefined) ? this.treeData.cat : this.treeData.leaf;
        },
    },
    mounted() {
        const lastSelected = JSON.parse(localStorage.getItem('lastSelected'));
        if (lastSelected) {
            this.expandTreeToLastSelected(this.treeWithLeaf, lastSelected._nodeId);
        } else if (this.depth === 0) {
            this.expanded = true;
        }
    },
    methods: {
        ...mapMutations(['addItemToList']),
        treeClick() {
            this.expanded = !this.expanded
        },
        toggleSelection() {
            this.selected = !this.selected
        },
        addItemToStoredList(item) {
            if(!this.itemLists.includes(item._name) && this.selected){
                this.addItemToList(item);
            }
            localStorage.setItem('lastSelected', JSON.stringify(item));
        },
        expandTreeToLastSelected(item, lastSelectedId) {
            if (!item || !item[Symbol.iterator]) {
                return;
            }
            for(const currentItem of item) {
                if (currentItem._nodeId === lastSelectedId) {
                    this.expanded = true;
                } 
                if (currentItem.cat) {
                    this.expandTreeToLastSelected(currentItem.cat, lastSelectedId);
                }
                if (currentItem.leaf) {
                    this.expandTreeToLastSelected(currentItem.leaf, lastSelectedId);
                }
            }
        },
        expandChilds(expand, force) {
            if(this.selected || force) {
                this.expanded = expand
            }
            if (Array.isArray(this.$refs.childComponentRef)) {
                this.$refs.childComponentRef.forEach(ref => {
                    ref.expandChilds(expand, this.selected || force);
                });
            }
        }
    }
}
</script>

<style scoped lang="scss">
.node {
    text-align: left;
    max-width: 800px;
    min-width: 500px;
    font-size: 20px;
}

ul {
    padding-left: 1rem;
}
.selected {
  background-color: greenyellow;
  border-radius: 6px;
  padding-left: 5px;
  padding-right: 5px;
}
.expanded {
  font-weight: bold;
}
</style>