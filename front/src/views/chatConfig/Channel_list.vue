<template>
<span style="position:relative;">
            <div class="listRow" v-for="(single_channel,key) in list" :key="key" v-on:click="switchroom(single_channel)"
                v-bind:class="{current_class:(single_channel===active)}">
                <img src="../../assets/images/img1.jpg" />
                <p>{{single_channel}}</p>
            </div>
</span>
</template>
<style lang="scss" scoped>

    .subtitle {
        padding: 6px 10px;
        font-weight: 600;
    }

    .channel_list {
        ul {
            .current_class {
                background: red;
            }
        }
    }
</style>
<script>
    export default {
        name: "Channel_list",
        props: ["list", "active"],
        data() {
            return {
                joined_rooms: []
            };
        },
        methods: {
            switchroom(newroom) {
                if(newroom !== this.active) {
                this.$store.dispatch('chat/clearnthemessages')
                socket.emit('switchrooms', newroom)
                }
            }
        }
    };
</script>

