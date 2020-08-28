<template>
            <div class="listRow">
                <img src="../../../assets/images/img1.jpg" />
                <p>{{user}}</p>
            </div>
</template>
<script>
export default {
  name: "single_user",
  props: ["user"]
};
</script>
<style lang="scss" scoped>
li {
  font-size: 14px;
  line-height: 40px;
  span {
    padding-left: 14px;
  }
}
</style>
