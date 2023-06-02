<template>
    <div class="wrapper">
        <div class="list">
            <div class="list__wrapper">
                <div class="list__content">
                    <div class="list__content-title">
                        List of selected items
                    </div>
                    <div class="list__content-item" v-for="(item, index) in itemLists" :key="item._nodeId">
                        <div class="list__content-item--text">
                            {{ item }}
                        </div>
                        <div class="list__content-item--button" @click='removeItem(index)'>
                            <div>Remove</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    mounted() {
        this.$store.dispatch('loadItemList'); // Load the itemList from local storage
    },
    computed: {
        itemLists() {
            return this.$store.state.storedItems;
        }
    },
    methods: {
        removeItem(index) {
            this.$store.dispatch('removeItem', index); // Dispatch the removeItem action
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    width: 100%;
    margin-left: 15px;
    margin-right: 15px;
}
.list {
    &__content {
        &-title {
            font-size: 25px;
        }

        &-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: 1px solid black;
            padding: 10px;
            margin-top: 20px;
            border-radius: 6px;

            &--button {
                background-color: red;
                padding: 10px;
                border-radius: 6px;
                color: white;
                cursor: pointer;
                margin-left: 15px;
            }
            &--text {
                font-size: 25px;
            }
        }
    }
}
// .list__content-title {
//     font-size: 20px;
// }

</style>