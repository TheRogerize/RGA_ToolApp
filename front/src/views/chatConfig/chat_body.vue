<template>
        <div class="chat">
            <ul>
                <div v-for="(message,key) in messages" :key="key">
                    <Single_message :message="message"></Single_message>
                </div>
            </ul>
        </div>
</template>
<script>
    import Single_message from "./Singlemessage";

    export default {
        components: {Single_message},
        props: ["messages"],
        data() {
            return {};
        }
    };
</script>
<style lang="sass" scoped>

</style>
