<template>
	<div class="headerToptopBack">
        <div class="topBack" >
            <img src="~@/assets/img/back_icon.png" @click="back" alt="">
            <p> {{ title }} </p>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
                loading: false,
            }
		},
        props:{
            title: [String, Object, Array]
        },
		created() {

		},
		mounted() {
		},
		methods: {
            operation (...data) {
                let ags = data
            },
            back () {
                this.$router.back(1)
                // 后续需要添加
                this.$emit('back', )
            }
		},
	}
</script>

<style>
.headerToptopBack {
    width: 100%;
    padding-top: 0.75rem;
}
.headerToptopBack .topBack{
    height: 0.75rem;
    background: #14bab4;
    text-align: center;
    position: fixed;
    top: 0;
    width: 7.5rem;
    z-index: 99;
}
.headerToptopBack .topBack img{
    position: absolute;
    left: 0.2rem;
    top: 0.17rem;
    width: 0.4rem;
    height: 0.4rem;
}
.headerToptopBack .topBack p{
    color: #fff;
    font-size: 0.32rem;
    line-height: 0.75rem;
}
</style>
