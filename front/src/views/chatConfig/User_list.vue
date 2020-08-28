<template>
   
    <span style="position:relative;">
            <Singleuser v-for="(user,key) in users" :key="key" :user="user"></Singleuser>
    </span>
</template>
<script>
    import Singleuser from "./userlist/Singleuser";

    export default {
        name: "User_list",
        components: {
            Singleuser
        },
        props: ["users"],
        data() {
            return {};
        }
    };
</script>
<style lang="scss" scoped>
    .subtitle {
        padding: 6px 10px;
        font-weight: 600;
    }

    .users {
        margin: 0px;
        padding: 0px;

        li {
            list-style: none;
            line-height: 40px;
            font-size: 14px;
            padding: 10px;

            span {
                margin-left: 10px;
            }
        }
    }
</style>
