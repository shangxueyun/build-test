<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24" class="card-box">
        <el-card>
          <div slot="header">
            <span>Redis 详细信息</span>
          </div>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <table cellspacing="0" style="width: 100%;">
              <thead>
              <tr>
                <th class="is-leaf"><div class="cell">Key</div></th>
                <th class="is-leaf"><div class="cell">Description</div></th>
                <th class="is-leaf"><div class="cell">Value</div></th>
              </tr>
              </thead>
              <tbody>
                <tr v-for="info in redisInfo">
                  <td><div class="cell">{{ info.key }}</div></td>
                  <td><div class="cell">{{ info.description }}</div></td>
                  <td><div class="cell">{{ info.value }}</div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getInfo, getKeysSize, getMemoryInfo } from "@/api/monitor/redis";

  export default {
    name: "Redis",
    data() {
      return {
        // 加载层信息
        loading: [],
        // 服务器信息
        redisInfo: []
      };
    },
    created() {
      this.getList();
      this.openLoading();
    },
    methods: {
      /** 查询服务器信息 */
      getList() {
        getInfo().then(response => {
          this.redisInfo = response.data;
          this.loading.close();
        });
      },
      // 打开加载层
      openLoading() {
        this.loading = this.$loading({
          lock: true,
          text: "拼命读取中",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
      }
    }
  };
</script>
