<template>
                    <li v-if="message.user!==null">
                        <h3>{{message.user}}</h3>
                        {{message.msg}}
                    </li>
</template>
<script>
    export default {
        name: "Single_message",
        props: ["message"],
        data() {
            return {};
        }
    };
</script>
<style lang="scss" scoped>
    .single_message {
        padding: 10px 5px;

        .flex {
            display: flex;
            align-items: top;

            .avatar {
                height: 30px;
                width: 30px;
                background: red;
                border-radius: 10%;
                text-align: center;
                line-height: 30px;
                font-weight: 600;
                color: #fff;
                margin-right: 10px;
                text-transform: uppercase;
            }

            .message {
                .time {
                    font-size: 10px;
                    color: rgb(163, 163, 163);
                    font-weight: 600;
                    margin-left: 5px;
                }

                h2 {
                    margin: 0px;
                    font-size: 16px;
                }

                p {
                    padding: 0px;
                    margin: 0px;
                }
            }
        }
    }
</style>
