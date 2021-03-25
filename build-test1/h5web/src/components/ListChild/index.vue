<template>
  <div class="listChildContent" :id="'listChild' + listChild.listID" :ref="'listChild' + listChild.listID">
    <!-- 公用 -->
    <div class="list-tr cyan">
      <div class="list-td" style="width: 50%">
        <template v-if="purchasing == 1">
          <template v-if="listStatus == 0 || listStatus == 2 || listStatus == 7 || listStatus == 8">
            <span>批号:&nbsp;</span>
          </template>
          <template v-else>
            <input :id="'inputValuebatchID'+listChild.listID" class="inputValue" type="checkbox" :name="'batchID,' + listChild.listID" :value="listChild.batchID"/>
          </template>
        </template>
        <template v-if="purchasing == 2">
          <template v-if="listStatus == 4 || listStatus == 7 || listStatus == 8">
            <span>批号:&nbsp;</span>
          </template>
          <template v-else>
            <input :id="'inputValuebatchID'+listChild.listID" class="inputValue" type="checkbox" :name="'batchID,' + listChild.listID" :value="listChild.batchID"/>
          </template>
        </template>
         <router-link style="position: relative;" :to="batchIDHref">{{ listChild.batchID }}<span v-if="listChild.listingType == 1" class="icon_you"></span></router-link>
      </div>
      <div class="list-td his">
        询盘时间 ：<span>{{ listChild.makeTime }}</span>
          <template v-if="listStatus != 0">
            <!-- 历史 -->
            <a :listID="listChild.listID" :purchasing="purchasing" @click="historyHrefFunc($event)">历史</a>
          </template>
      </div>
    </div>
    <!-- 采购商 -->
    <template v-if="purchasing == 1 && permissionMenu == 2">
      <div class="list-tr">
        <div class="list-td line" style="width: 100%;position: relative;">
          采购商 : 
          <span>{{ listChild.buyMemberName }}</span>
        </div>
      </div>
    </template>
    <!-- 市场部对接人 -->
    <template v-if="purchasing == 1 && permissionMenu == 2">
      <div class="list-tr">
        <div class="list-td line" style="width: 100%;position: relative;">
          市场部对接人 : 
          <span>{{ listChild.sellServicerName }}&nbsp;</span><span>({{ listChild.sellServicerMobile }})</span>
        </div>
      </div>
    </template>
    <!-- 供应商 -->
    <template v-if="purchasing == 2 && permissionMenu == 2">
      <div class="list-tr">
        <div class="list-td line" style="width: 100%;position: relative;">
          供应商 : 
          <span>{{ listChild.sellMemberName }}</span>
        </div>
      </div>
    </template>
    <!-- 资源部对接人 -->
    <template v-if="purchasing == 2 && permissionMenu == 2">
      <div class="list-tr">
        <div class="list-td line" style="width: 100%;position: relative;">
          资源部对接人 : 
          <span>{{ listChild.resourceUserName }}&nbsp;</span><span>({{ listChild.resourceUserMobile }})</span>
        </div>
      </div>
    </template>
    <!-- 仓库 -->
    <div class="list-tr" style="position: relative;">
      <div class="list-td line" style="width: 100%;">
        交货仓库 : 
        <template  v-if="purchasing == 2">
          <template v-if="listStatus == 0 || listStatus == 3">
            <template v-if="listStatus == 0">
              <input  autocomplete="off" class="inputValue" style="width: 76%" type="text" :name="'depotName,' + listChild.listID" :depotId="listChild.depotId" placeholder="点击输入仓库名称" v-model="listChild.depotName">
            </template>
            <template v-else>
              <input autocomplete="off" class="inputValue" :disabled="depotNameDisabled" style="width: 76%" type="text" :name="'depotName,' + listChild.listID" :depotId="listChild.depotId" placeholder="点击输入仓库名称" v-model="listChild.depotName">
            </template>
            <div :class="'position_depotName position_depotName_' + listChild.listID" style="display:none">
              <nav :class="'position_depotName_Nav' + listChild.listID">
                <!-- <li v-for="(item, key) in position_depotName['position_depotNameOption'+listChild.listID]" :key="key" :depotId="item.depotId" :listID="listChild.listID" @click="depotNameOptionClick(item.depotId, item.depotName)">
                  {{ item.depotName }}
                </li> -->
              </nav>
            </div>
          </template>
          <template v-else>
            <span>{{ listChild.depotName }}</span>
          </template>
        </template>
        <template v-else>
          <span>{{ listChild.depotName }}</span>
        </template>
      </div>
    </div>

    <div class="list-tr three">
      <!-- 重量 -->
      <div class="list-td" style="width: 33%">
        重量 ：
        <template  v-if="purchasing == 2">
          <template v-if="listStatus == 0 || listStatus == 3">
            <template v-if="listStatus == 0">
              <input @blur="validateInput" autocomplete="off" class="inputValue" type="number" :name="'amount,' + listChild.listID" v-model="listChild.amount">
            </template>
            <template v-else>
              <input @blur="validateInput" autocomplete="off" class="inputValue" :disabled="amountDisabled" type="number" :name="'amount,' + listChild.listID" v-model="listChild.amount">
            </template>
          </template>
          <template v-else>
            <span>{{ listChild.amount }}</span>
          </template>
        </template>
        <template  v-else>
          <span>{{ listChild.amount }}</span>
        </template>
      </div>
      <!-- 包数 -->
      <div class="list-td" style="width: 30%">
        包数 ：
        <template  v-if="purchasing == 2">
          <template v-if="listStatus == 0 || listStatus == 3">
            <template v-if="listStatus == 0">
              <input @blur="validateInput" autocomplete="off" class="inputValue" type="number" :name="'packNum,' + listChild.listID" v-model="listChild.packNum">
            </template>
            <template v-else>
              <input @blur="validateInput" autocomplete="off" class="inputValue" :disabled="packNumDisabled" type="number" :name="'packNum,' + listChild.listID" v-model="listChild.packNum">
            </template>
          </template>
          <template v-else>
            <span>{{ listChild.packNum }}</span>
          </template>
        </template>
        <template  v-else>
          <span>{{ listChild.packNum }}</span>
        </template>
      </div>
      <!-- 基差 -->
      <div class="list-td margin_left" style="width: 37%">
        <template v-if="listChild.indexCode == ''">
          <b style="color: #FE8A51">{{ '固定价 :' }}</b>
        </template>
        <template v-else>
          <template v-if="purchasing == 2">
            <template v-if="listStatus == 0">
              <select autocomplete="off" class="inputValue selectindexCode" type="number" :name="'indexCode,' + listChild.listID" v-model="listChild.indexCode">
                <option v-for="(item, index) in indexCodeOption" :key="index" :value="item" :selected="listChild.indexCode == item">{{ item }}</option>
              </select>
            </template>
            <template v-else>
              <template v-if="listStatus == 3">
                <select :disabled="basisDisabledSelect" autocomplete="off" class="inputValue selectindexCode" type="number" :name="'indexCode,' + listChild.listID" v-model="listChild.indexCode">
                  <option v-for="(item, index) in indexCodeOption" :key="index" :value="item" :selected="listChild.indexCode == item">{{ item }}</option>
                </select>
              </template>
              <template v-else>
                <b style="color: #FE8A51">{{ `${listChild.indexCode} :` }}</b>
              </template>
            </template>
          </template>
          <template v-else>
            <b style="color: #FE8A51">{{ `${listChild.indexCode} :` }}</b>
          </template>
        </template>
          <template v-if="purchasing == 2">
            <template v-if="listChild.indexCode == ''">
              <template v-if="listStatus == 0 || listStatus == 2 || listStatus == 3">
                <template v-if="listStatus == 2">
                  <!-- 测试说的禁止修改 -->
                  <span v-show="!waitingReplyPrice">{{ listChild.supBasisPrice }}</span>
				  <input v-show="waitingReplyPrice" style="margin: 0;" @input="listChild.supBasisPrice=Math.abs(Number(listChild.supBasisPrice));listChild.price=Number(listChild.supBasisPrice)+Number(listChild.fixedPriceDifference);changThiaNum($event);" @blur="validateInput;" autocomplete="off" class="inputValue" type="number" :name="'supBasisPrice,' + listChild.listID" v-model="listChild.supBasisPrice">
				  <input style="margin: 0;" @click="inputValueListChild($event,listChild)" autocomplete="off" class="inputValue" type="hidden" :name="'price,' + listChild.listID" :value="listChild.price">
                  <!-- <input @blur="validateInput" autocomplete="off" class="inputValue" type="number" :name="'price,' + listChild.listID" v-model="listChild.price"> -->
                </template>
                <template v-else>
                  <span>{{ listChild.supBasisPrice }}</span>
                  <!-- <input @blur="validateInput" autocomplete="off" class="inputValue" :disabled="basisDisabled" type="number" :name="'price,' + listChild.listID" v-model="listChild.price"> -->
                </template>
              </template>
              <template v-else>
                <!-- 采购询盘 销售询盘 ---已成交状态中固定价不显示 -->
                <!-- <span>{{ listChild.supBasisPrice }}</span> -->
                <template v-if="listStatus == 7">
                  <span>{{ listChild.supBasisPrice }}</span>
                </template>
                <template v-else>
                  <span>{{ listChild.supBasisPrice }}</span>
                </template>
              </template>
            </template>
            <template v-else>
              <template v-if="listStatus == 0 || listStatus == 3">
                <template v-if="listStatus == 0">
                  <input style="margin: 0;" @blur="validateInput" autocomplete="off" class="inputValue" type="number" :name="'supBasisPrice,' + listChild.listID" v-model="listChild.supBasisPrice">
                </template>
                <template v-else>
                  <input style="margin: 0;" @blur="validateInput" autocomplete="off" class="inputValue" :disabled="basisDisabled" type="number" :name="'supBasisPrice,' + listChild.listID" v-model="listChild.supBasisPrice">
                </template>
              </template>
              <template v-else>
                <span v-show="!waitingReplyPrice">{{ listChild.supBasisPrice }}</span>
                <input v-show="waitingReplyPrice" style="margin: 0;" @blur="validateInput" autocomplete="off" class="inputValue" type="number" :name="'supBasisPrice,' + listChild.listID" v-model="listChild.supBasisPrice">
              </template>
            </template>
          </template>
          <template  v-else>
            <template v-if="listChild.indexCode == ''">
              <!-- 采购询盘 销售询盘 ---已成交状态中固定价不显示 -->
              <!-- <span>{{ listChild.price }}</span> -->
              <template v-if="listStatus == 7">
                <span>{{ listChild.price }}</span>
              </template>
              <template v-else>
                <span>{{ listChild.price }}</span>
              </template>
            </template>
            <template  v-else>
              <span>{{ listChild.basisPrice }}</span>
            </template>
          </template>
      </div>
    </div>
    <!-- 备注 -->
    <div class="list-tr">
      <div class="list-td line" style="width: 100%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
        备注 : 
        <template  v-if="purchasing == 2">
          <template v-if="listStatus == 0 || listStatus == 1 || listStatus == 3">
            <template v-if="listStatus == 3">
              <input autocomplete="off" class="inputValue" type="text" :disabled="notesDisabled" :name="'notes,' + listChild.listID" placeholder="点击输入备注内容" v-model="listChild.notes">
            </template>
            <template v-else>
              <input autocomplete="off" class="inputValue" type="text" :name="'notes,' + listChild.listID" placeholder="点击输入备注内容" v-model="listChild.notes">
            </template>
          </template>
          <template v-else>
            <span>{{ listChild.notes }}</span>
          </template>
        </template>
        <template v-else>
          <span>{{ listChild.notes }}</span>
        </template>
      </div>
    </div>
    <!-- 确认时间 -->
    <div class="list-tr" v-if="purchasing == 2 && listStatus == 1">
      <div class="list-td line" style="width: 100%;">
        确认时间 : 
        <span>{{ listChild.confirmTime }}</span>
      </div>
    </div>
    <!-- 买方出价/挂盘期货价 -->
    <!-- 销售 -->
    <template v-if="purchasing == 2">
      <div class="list-tr three" v-if="listStatus != 0 && listStatus != 1">
        <!-- 买方出价 -->
        <!-- 挂盘期限 -->
        <!-- 成交时间 -->
        <template v-if="listStatus == 7 || listStatus == 8">
          <template v-if="listChild.indexCode == ''">
            <!-- <div class="list-td" style="width: 45%">
              挂盘成交价 :
              <span style="color: #FE8A51">{{ listChild.price }}</span>
            </div> -->
            <!-- 挂盘期限 -->
            <div class="list-td" style="width: 80%">
              成交时间 ：
              <span>{{ listChild.successTime }}</span>
            </div>
          </template>
          <template v-else>
            <!-- <div class="list-td" style="width: 45%">
              买方出价 :
              <span style="color: #FE8A51">{{ listChild.price }}</span>
            </div> 
            2020-09-14合约买方出价改挂盘成交价并取值为价格加基差-->
            <div class="list-td" style="width: 45%">
              挂盘成交价 :
              <span v-if="!listChild.currentPriceType" style="color: #FE8A51">{{ listChild.price + listChild.supBasisPrice }}</span>
              <span v-else>现价成交</span>
            </div>
            <div class="list-td" style="width: 58%">
              挂盘期限:
              <span>{{ listChild.listingValidity + ' 15:00' }}</span>
            </div>
          </template>
        </template>
        <template v-else>
            <template v-if="listChild.indexCode != ''">
              <div class="list-td" style="width: 45%">
                <template v-if="listStatus == 3">
                  买方出价 :
                  <input @blur="validateInput" :disabled="closingCost" autocomplete="off" class="inputValue" type="number" :name="'price,' + listChild.listID" :value="listChild.price">
                </template>
                <template v-else>
                  挂盘期货价 :
                  <span v-if="!listChild.currentPriceType" style="color: #FE8A51">{{ listChild.price }}</span>
                  <span v-else-if="!waitingReplyPrice && listChild.currentPriceType">现价成交</span>
                  <input v-show="waitingReplyPrice && listChild.currentPriceType" @blur="validateInput" autocomplete="off" class="inputValue" type="number" :name="'price,' + listChild.listID" value="">
                </template>
              </div>
              <div class="list-td" style="width: 58%">
                挂盘期限:
                <span>{{ listChild.listingValidity + ' 15:00' }}</span>
              </div>
            </template>
        </template>
      </div>
    </template>
    <!-- 买方出价/挂盘期货价 -->
    <!-- <template v-if="purchasing == 2">
      <div class="list-tr three" v-show="listStatus == 3 && closingCost">
        <div class="list-td" style="width: 90%">
          成交价 :
          <input @blur="validateInput" autocomplete="off" class="inputValue" type="number" :name="'platePrice,' + listChild.listID" :value="listChild.price">
        </div>
      </div>
    </template> -->
    <!-- 采购 -->
    <template v-else-if="purchasing == 1">
      <template v-if="listChild.indexCode == ''">
        <template v-if="listStatus == 7 || listStatus == 8">
          <div class="list-tr three">
            <template v-if="listStatus == 7">
              <!-- <div class="list-td" style="width: 45%">
                挂盘成交价 :
                <span style="color: #FE8A51">{{ listChild.platePrice }}</span>
              </div> -->
            </template>
            <template v-else>
              <div class="list-td" style="width: 45%">
                挂盘期货价 :
                <span style="color: #FE8A51">{{ listChild.price }}</span>
              </div>
            </template>
            <!-- 挂盘期限 -->
            <div class="list-td" style="width: 80%">
              成交时间 ：
              <span>{{ listChild.successTime }}</span>
            </div>
          </div>
        </template>
      </template>
      <template v-else>
        <div class="list-tr three relative" :style="listStatus == 1 || listStatus == 3|| listStatus == 4?'display: block;':''" v-if="listStatus != 0">
          <!-- 挂盘期货价 -->
          <template v-if="listStatus == 7 || listStatus == 8">
            <!-- <div class="list-td" style="width: 45%">
              买方出价 :
              <span style="color: #FE8A51">{{ listChild.price }}</span>
            </div> 
            2020-09-14合约买方出价改挂盘成交价并取值为价格加基差-->
            <div class="list-td" style="width: 45%">
              挂盘成交价 :
              <span v-if="!listChild.currentPriceType" style="color: #FE8A51">{{ listChild.price + listChild.basisPrice }}</span>
              <span v-else>现价成交</span>
            </div>
            <div class="list-td" style="width: 58%">
              挂盘期限:
              <span>{{ listChild.listingValidity }}</span>
            </div>
          </template>
          <template v-else>
            <template v-if="listStatus != 2">
              <!-- 挂盘操作修改状态功能 -->
              <div class="list-td" :style="listStatus == 1 || listStatus == 3|| listStatus == 4?'width: 100%':'width: 45%'" style="width: 45%">
                挂盘期货价 :
                  <template v-if="listStatus == 3">
                    <input :style="listStatus == 1 || listStatus == 3|| listStatus == 4?'width: 24%':'width: 38%'" @blur="validateInput" autocomplete="off" class="inputValue" :disabled="priceDisabled" type="number" :name="'price,' + listChild.listID" v-model="listChild.price">
                  </template>
                  <template v-else>
                    <input :style="listStatus == 1 || listStatus == 3|| listStatus == 4?'width: 24%':'width: 38%'" @blur="validateInput" autocomplete="off" class="inputValue" type="number" :name="'price,' + listChild.listID" v-model="listChild.price">
                  </template>
                  <input @click="presentPricefuc" v-if="listStatus == 1 || listStatus == 3|| listStatus == 4" :disabled="listStatus == 3 && !presentPrice" style="float: none;margin-left: .1rem;vertical-align: middle;margin-top: -0.08rem;" :id="'currentPriceType,' + listChild.listID" type="checkbox" :name="'currentPriceType,' + listChild.listID + ',' + listStatus" />
                  <span v-if="listStatus == 3 && !presentPrice" style="color: #ccc">现价成交</span>
                  <span v-else @click="presentPricefuc">现价成交</span>
              </div>
              <!-- 挂盘期限 -->
              <div class="list-td" :style="listStatus == 1 || listStatus == 3|| listStatus == 4?'width: 100%':'width: 58%'">
                挂盘期限:
                  <template v-if="listStatus == 3">
                    <!-- <template v-if="appVersion.includes('Android')">
                      <input autocomplete="off" type="text" :id="'mydate' + listChild.listID" readonly="readonly" :disabled="listingValidityDisabled" :name="'listingValidity,' + listChild.listID" style="height: 20px;width: 45%" @input="listingValidityChange($event, listChild)" :defaultValue="listChild.listingValidity" :value="listChild.listingValidity">
                    </template>
                    <template v-else>
                      <input autocomplete="off" type="text" :id="'mydate' + listChild.listID" readonly="readonly" :disabled="listingValidityDisabled" :name="'listingValidity,' + listChild.listID" style="height: 20px;width: 45%" @blur="listingValidityChange($event, listChild)" :defaultValue="listChild.listingValidity" :value="listChild.listingValidity">
                    </template> -->
                    <input autocomplete="off" type="text" :style="listStatus == 1 || listStatus == 3|| listStatus == 4?'width: 28%;height: 20px;':'height: 20px;width: 42%'" :id="'mydate' + listChild.listID" readonly="readonly" :disabled="listingValidityDisabled" :name="'listingValidity,' + listChild.listID" :defaultValue="listChild.listingValidity" :value="listChild.listingValidity"> 15:00
                    <!-- <input autocomplete="off" type="text" :disabled="listingValidityDisabled" :name="'listingValidity,' + listChild.listID" style="height: 20px;width: 45%"  :defaultValue="listChild.listingValidity" :value="listChild.listingValidity"> -->
                  </template>
                  <template v-else>
                    <!-- <template v-if="appVersion.includes('Android')">
                      <input autocomplete="off" :id="'mydate' + listChild.listID" readonly="readonly" type="text" :name="'listingValidity,' + listChild.listID" style="height: 20px;width: 45%" @input="listingValidityChange($event, listChild)" :defaultValue="listChild.listingValidity" :value="listChild.listingValidity">
                    </template>
                    <template v-else>
                      <input autocomplete="off" type="text" :id="'mydate' + listChild.listID" readonly="readonly" :name="'listingValidity,' + listChild.listID" style="height: 20px;width: 45%" @blur="listingValidityChange($event, listChild)" :defaultValue="listChild.listingValidity" :value="listChild.listingValidity">
                    </template> -->
                    <input autocomplete="off" :style="listStatus == 1 || listStatus == 3|| listStatus == 4?'width: 28%;height: 20px;':'height: 20px;width: 42%'" :id="'mydate' + listChild.listID" readonly="readonly" type="text" :name="'listingValidity,' + listChild.listID" :defaultValue="listChild.listingValidity" :value="listChild.listingValidity"> 15:00
                    <!-- <input autocomplete="off" type="text" :name="'listingValidity,' + listChild.listID" style="height: 20px;width: 45%"  :defaultValue="listChild.listingValidity" :value="listChild.listingValidity"> -->
                  </template>
              </div>
            </template>
            <template v-else>
              <div class="list-td" style="width: 45%">
                挂盘期货价 :
                <span v-if="!listChild.currentPriceType" style="color: #FE8A51">{{ listChild.price }}</span>
                <span v-else>现价成交</span>
              </div>
              <!-- 挂盘期限 -->
              <div class="list-td" style="width: 58%">
                挂盘期限:
                <span>{{ listChild.listingValidity + ' 15:00' }}</span>
              </div>
            </template>
          </template>
        </div>
      </template>
    </template>
    <!-- 竞价说明 -->
    <div class="list-tr" v-if="listStatus == 4">
      <div class="list-td line" style="width: 100%;">
        竞价说明 : 
        <template v-if="listChild.bidType == 1">
          <span style="color: #B32E32">只可竞价一次，对方出价未告知</span>
        </template>
        <template v-else>
          <span style="color: #B32E32">可多次竞价，本次最低出价 {{ listChild.bidMinPrice }}元</span>
        </template>
      </div>
    </div>

    <!-- 功能 -->
    <!-- 资源状态 -->
    <div class="list-tr" v-if="purchasing == 2 && listStatus == 0">
      <div class="list-td line" style="width: 100%;">
        资源状态 : 
        <input class="inputValue" type="radio" :name="'type,' + listChild.listID" value="SOLD"> 已售
        <input class="inputValue" type="radio" :name="'type,' + listChild.listID" value="UNSOLD" > 未售
      </div>
    </div>
    <!-- 回复询盘 -->
    <div class="list-tr" style="flex-wrap: wrap;" v-if="purchasing == 2 && listStatus == 2">
      <div class="list-td line" style="width: 100%;">
        回复 : 
        <template v-if="listChild.currentPriceType||listChild.indexCode== ''">
          <input class="inputValue" type="radio" :name="'type,' + listChild.listID" @change="hangOperation" value="TRADED" > 已成交
          <input class="inputValue" type="radio" :name="'type,' + listChild.listID" @change="hangOperation" value="SOLD" > 已售
        </template>
        <template v-else>
          <input class="inputValue" type="radio" :name="'type,' + listChild.listID" @change="hangOperation" value="GP_SUCCESS"> 挂盘成功
          <input class="inputValue" type="radio" :name="'type,' + listChild.listID" @change="hangOperation" value="BIDDING" > 需要竞价
          <input class="inputValue" type="radio" :name="'type,' + listChild.listID" @change="hangOperation" value="SOLD" > 已售
          <input class="inputValue" type="radio" :name="'type,' + listChild.listID" @change="hangOperation" value="REVOKED" > 已撤盘          
        </template>

        <p v-if="biddingInstructionsDis"><span style="color: #14BAB4">{{ biddingInstructions }}</span>  <span v-if="biddingInstructionsType != 1">本次最低出价 : <span style="color: #14BAB4">{{ biddingInstructionsPrice }}元</span></span></p>
      </div>
    </div>

    <!-- 确认保存 -->
    <div class="list-tr" style="flex-wrap: wrap;" v-if="purchasing == 2 && listStatus == 3">
      <div class="list-td line" style="width: 100%;">
        回复 : 
        <input class="inputValue" type="radio" :name="'type,' + listChild.listID" @change="hangOperation" value="DATA_CHANGE"> 信息变化
        <input class="inputValue" type="radio" :name="'type,' + listChild.listID" @change="hangOperation" value="BIDDING" > 需竞价
        <input class="inputValue" type="radio" :name="'type,' + listChild.listID" @change="hangOperation" value="TRADED" > 已成交
        <input class="inputValue" type="radio" :name="'type,' + listChild.listID" @change="hangOperation" value="GP_FAIL" > 交易失败
        <p v-if="biddingInstructionsDis"><span style="color: #14BAB4">{{ biddingInstructions }}</span>  <span v-if="biddingInstructionsType != 1">本次最低出价 : <span style="color: #14BAB4">{{ biddingInstructionsPrice }}元</span></span></p>
      </div>
    </div>

    <!-- 保存竞价状态 -->
    <!-- <div class="list-tr" style="flex-wrap: wrap;" v-if="purchasing == 2 && listStatus == 4 && listChild.bidOffered == 1 && listChild.bidType  == 1">
      <div class="list-td line" style="width: 100%;">
        回复 : 
        <input class="inputValue" type="radio" :name="'type,' + listChild.listID" value="BIDDING_SUCCESS"> 竞价成功
        <input class="inputValue" type="radio" :name="'type,' + listChild.listID" value="BIDDING_FAIL" > 竞价失败
      </div>
    </div> -->

    <!-- 采购/挂盘操作 -->
    <div class="list-tr" style="flex-wrap: wrap;" v-if="purchasing == 1 && listStatus == 3">
      <div class="list-td line" style="width: 100%;">
        挂盘操作 : 
        <input class="inputValue" type="radio" :name="'type,' + listChild.listID" @change="hangOperation" value="MODIFY_PRICE"> 修改挂盘价
        <input class="inputValue" type="radio" :name="'type,' + listChild.listID" @change="hangOperation" value="REVOKED" > 撤销挂盘
      </div>
    </div>


    <!-- 竞价弹框 -->
    <div v-show="BIDDING_PopoutDis" class="BIDDING_Popout">
      <div class="BIDDING_Popout-paddng">
        <div class="BIDDING_Popout-paddng-header">
          竞价要求
          <i class="close" :listID="listChild.listID" @click="BIDDINGclose">X</i>
        </div>
        <span class="xian"></span>
        <div class="BIDDING_Popout-paddng-content">
          <p><input type="radio" :class="'radio' + listChild.listID" @change="bidTypeBidMinPrice" :name="'bidType,' + listChild.listID" value="1"> 只可竞价一次，对方出价未告知</p>
          <p><input type="radio" :class="'radio' + listChild.listID" @change="bidTypeBidMinPrice" :name="'bidType,' + listChild.listID" value="2"> 可多次竞价，本次最低出价 <input @blur="validateInput" :disabled="bidMinPriceDisabled" autocomplete="off" type="number" :class="'radio' + listChild.listID" @input="bidTypeBidMinPrice" :name="'bidMinPrice,' + listChild.listID" value="">元</p>
        </div>
        <div class="BIDDING_Popout-paddng-button">
          <button :listID="listChild.listID" @click="BIDDING_PopoutSubmit">确认</button>
        </div>
      </div>
    </div>

    <!-- 历史弹框 -->
    <div v-show="history_PopoutDis" class="BIDDING_Popout history">
      <div class="BIDDING_Popout-paddng">
        <div class="BIDDING_Popout-paddng-header">
          历史记录
          <i class="close" :listID="listChild.listID" @click="historyclose">X</i>
        </div>
        <span class="xian"></span>
        <p style="font-size: .32rem;color: #333;font-weight: 700;line-height: .88rem;margin: 0;padding: 0 0.4rem;text-align: left;">批号: <span :id="'batchID' + listChild.listID"></span></p>
        <div class="BIDDING_Popout-paddng-content history_list" :id="'history_list' + listChild.listID">
          <template v-if="history_list.length">
            <p v-for="(item) in history_list" :key="item.spotSaleID">{{ item.oprNotes }}</p>
          </template>
          <template v-else>
            <p> 暂无数据. </p>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { formatDate } from '@/utils'
export default {
  components: {

  },
  data () {
    return {
      biddingInstructions: '', // 可多次竞价/ 可多次出价,最少出价
      biddingInstructionsDis: false,
      biddingInstructionsType: null,
      biddingInstructionsPrice: '',
      listChild: this.value[this.listKey],
      priceDisabled: true, // 挂盘期货价
      listingValidityDisabled: true, // 挂盘期限
      depotNameDisabled: true, // 仓库
      amountDisabled: true, // 重量
      packNumDisabled: true, // 包数
      basisDisabled: true, // 基差
      basisDisabledSelect: true, // 基差下拉
      notesDisabled: true, // 备注
      BIDDING_PopoutDis: false,
      bidMinPriceDisabled: true,
      history_PopoutDis: false,
      history_list: [],
      position_depotName: {
        // position_depotNameOption: [],
        // position_depotNameOption: [],
      },
      appVersion: window.navigator.appVersion, // 兼容
      closingCost: true, // 成交价flag
      presentPrice: false, // 现价成交flag
      waitingReplyPrice: false
    }
  },
  computed: {
  },
  beforeCreate(){

  },
  watch: {
    // fileType(New, worn) {
    //   this.fileType = New
    // }
  },
  props:{
    value: [String, Object, Array],
    batchIDHref: { // 批号点击跳转路由
      type: String,
      default: ''
    },
    historyHref: { // 查看历史回调
      type: String,
      default: ''
    },
    disableTime: { // 全局时间选择状态
      type: Object,
      default: {
        // '2020-07-20': '周末',
        // '2020-07-21': '周末',
      }
    },
    indexCodeOption: [Object, Array], // 全局合约选择状态
    listStatus: { // 全局状态
      type: Number,
      default: 10
    },
    purchasing: { // 类型状态
      type: Number,
      default: 1 // 1 采购 2 销售
    },
    listKey: { // 循环对象key
      type: Number,
      default: 0 
    },
    permissionMenu: [String, Number] // 1 客户 2 棉联用户
  },
  mounted () {
    // // 根据key取对象
    this.position_depotName['position_depotName'+this.$el.id.replace('listChild', '')] = false
    this.position_depotName['position_depotNameOption'+this.$el.id.replace('listChild', '')] = []
    // this.listChild = this.value[this.listKey]
    let inputValue = document.getElementsByClassName('inputValue')
    for (let i = 0; i < inputValue.length;i++) {
      inputValue[i].oninput = (e) => {
        this.inputValueListChild(e, this.listChild)
      }
    }

    let mydate = document.getElementById('mydate'+ this.listChild.listID)
    if (mydate)
    mydate.onfocus=function(e) {
      document.activeElement.blur();
    }
    window.EleVue = this
    let ele = '#mydate' + this.listChild.listID
    laydate.render({
      elem: ele,
      mark: this.disableTime,
      ready: function(date){
        window.EleVue.DomObjectParentClassNmae(document.getElementsByClassName('laydate-day-mark'))
      },
      change: function(){
        window.EleVue.DomObjectParentClassNmae(document.getElementsByClassName('laydate-day-mark'))
      },
      done: function(e,o){
        window.EleVue.inputValueListChild({target: mydate})
      }
    })
  },
  created() {
    // 根据key取对象
    this.listChild = this.value[this.listKey]
    //
    if (this.listChild.confirmTime)
      this.listChild.confirmTime = this.timeMMDDHH(this.listChild.confirmTime)
    //
    if (this.listChild.lastPriceTime)
      this.listChild.lastPriceTime = this.timeMMDDHH(this.listChild.lastPriceTime)
	  // 
	if (this.listChild.successTime)
	  this.listChild.successTime = formatDate(this.listChild.successTime,true)
    //
    if (this.listChild.makeTime)
      this.listChild.makeTime = this.timeMMDDHH(this.listChild.makeTime)
    // 挂盘期限为空取当星期五
    if (this.listChild.listingValidity) {
      this.listChild.listingValidity = formatDate(this.listChild.listingValidity)
    } else {
      let Daytime = new Date().getDay(),daywhr
      if (Daytime > 5) {
        if (Daytime == 6) {
            daywhr = 6
        } else if (Daytime == 7) {
            daywhr = 5
        }
      } else {
          daywhr = 5 - Daytime
      }
      this.listChild.listingValidity = formatDate(new Date().getTime()+(86400000 * daywhr))
    }
  },
  methods: {
      // 挂盘期限改变回调
      listingValidityChange (row, o) {
        let time = this.disableTime[row.target.value]
        if (time) {
          this.$message({
						showClose: true,
						message: '选择的时间为禁用,请从新选择',
						type: 'warning'
          });
          row.target.value = ''
        } else {
          o.listingValidity = formatDate(row.target.value)
          let nameKey = row.target.name.split(',')
          let ObjKey = nameKey[1]
          nameKey = nameKey[0]
          this.value.forEach((v,i)=>{
            if (v.listID == ObjKey) {
              this.listChild = JSON.parse(JSON.stringify(v))
            }
          })
          this.listChild = o
          this.$set(this.listChild)
          let checked = document.getElementById('inputValuebatchID' + ObjKey)
          checked.checked = true
          this.$emit('inputValueListChild', 'listingValidity', row.target.value + ' 15:00:00', ObjKey, checked.checked, checked.value)
        }
      },
	  changThiaNum(ele){
		  setTimeout(function(){
			  ele.target.nextSibling.click()
		  },1)
		 
	  },
      // 所有input值变化回调
      inputValueListChild (e, o) {
		  console.log(e, o)
        // 根据key取对象
        let nameKey = e.target.name.split(',')
        let ObjKey = nameKey[1]
        nameKey = nameKey[0]
        let checked = document.getElementById('inputValuebatchID' + ObjKey)
        let flg
		
        if (nameKey == 'batchID') {
          if (e.target.checked) {
            this.$emit('inputValueListChild', nameKey, e.target.value, ObjKey, e.target.checked, checked.value)
          } else {
            // 清空作用
            this.$emit('inputValueListChild', nameKey, e.target.value, ObjKey, e.target.checked, checked.value)
          }
        } else if(nameKey == 'depotName') {
          checked.checked = true
          this.$emit('inputValueListChild', nameKey, e.target.value, ObjKey, checked.checked, checked.value)
          this.$emit('inputValueListChild', 'depotId', '', ObjKey, checked.checked, checked.value)
          this.depotNameObjectSearch(e, e.target.value, ObjKey)
        }
        else {
          checked.checked = true
          this.$emit('inputValueListChild', nameKey, e.target.value, ObjKey, checked.checked, checked.value)
        }
      },
      // 仓库模糊搜索
      depotNameObjectSearch (row, value, key) {
        let that = this
        this.$HttpRequest({
          url: '/wx/bases/getDepotListAll?name='+ value + '&size=' + 5,
          method: 'post'
        }).then(res => {
          let part = document.getElementsByClassName('position_depotName_' + key)[0]
          part.style.display = "none"
          let Nav = document.getElementsByClassName('position_depotName_Nav' + key)[0]
          if (Nav.firstChild)
          Nav.removeChild(Nav.firstChild);

          let list = res.list
          if (list.length != 0) {
            let Arr = []
            list.forEach((v,i)=>{
              var li = document.createElement('li')
              li.setAttribute("depotID", v.depotID);
              li.setAttribute("listID", key);
              li.setAttribute("class", 'liName');
              li.innerHTML = v.depotName;
              li.style['listStyle'] = 'none'
              li.style['lineHeight'] = '.46rem'
              li.style['borderBottom'] = '1px solid #eee'
              li.style['overflow'] = 'hidden'
              li.style['textOverflow'] = 'ellipsis'
              li.style['whiteSpace'] = 'nowrap'
              li.style['fontSize'] = '.26rem'
              li.onclick = that.depotNameOptionClick
              Arr.push(li)
            })
            for(let i = 0; i < Arr.length;i++) {
              Nav.appendChild(Arr[i])
            }
            part.style.display = "block"
            var m = (24 * list.length) / 50
            part.style.height = m + 'rem'
          } else {
            part.style.display = "none"
          }

        })
      },
      // 搜索子集点击回调
      depotNameOptionClick (row) {
        let depotName = row.target.parentElement.parentElement.parentElement.firstElementChild
        depotName.value = row.target.innerText
        let checked = document.getElementById('inputValuebatchID' + row.target.getAttribute('listID'))
        this.$emit('inputValueListChild', 'depotName', row.target.innerText, row.target.getAttribute('listID'), checked.checked, checked.value)
        this.$emit('inputValueListChild', 'depotID', row.target.getAttribute('depotID'), row.target.getAttribute('listID'), checked.checked, checked.value)
        row.target.parentElement.parentElement.style.display = "none"
      },
      // 查看历史回调
      historyHrefFunc (row) {
        let listIDkey = row.target.getAttribute('listID')
        let purchasing = row.target.getAttribute('purchasing')
        window.thatVue = this
        // 根据权限显示不同接口
        let url
        // 1 客户 2 棉联用户
        if (this.permissionMenu == 2)
        url = `/wx/admin/spotSale/detail?listID=${listIDkey}&type=${purchasing}`
        else
        url = `/wx/spotSale/detail?listID=${listIDkey}&type=${purchasing}`
        this.$HttpRequest({
          url: url,
          headers: {
            'Content-Type' : 'application/json;charset=utf-8',
          },
          method: 'get'
        }).then(res => {
          let data = res.data
          let that = window.thatVue
          that.history_list = []
          if (data) {
            document.getElementById('batchID' + listIDkey).innerHTML = data.batchID
            if (data.list.length != 0) {
              that.history_list = data.list
            }
            that.history_PopoutDis = true
          } else {
            this.$message.error(res.message)
          }
        })
      },
      // radio选择触发
      hangOperation (row) {
		  
        let nameKey = row.target.name.split(',')
        let ObjKey = nameKey[1]
        nameKey = nameKey[0]
		console.log(row)
        // 挂盘中
        if (this.purchasing == 1) {
          if (this.listStatus == 3) {
            if (row.target.value == 'MODIFY_PRICE') {
              this.presentPrice =true
              this.priceDisabled = false
              this.listingValidityDisabled = false
            } else {
              document.getElementById('currentPriceType,' + ObjKey).checked = false
              this.presentPrice = false
              this.priceDisabled = true
              this.listingValidityDisabled = true
            }
          }
        }

        if (this.purchasing == 2) {
          if (this.listStatus == 2 || this.listStatus == 3) {
            if (row.target.value == 'DATA_CHANGE') {
              this.depotNameDisabled = false
              this.amountDisabled = false
              this.basisDisabled = false
              this.packNumDisabled = false
              this.notesDisabled = false
            } else {
              this.depotNameDisabled = true
              this.amountDisabled = true
              this.basisDisabled = true
              this.packNumDisabled = true
              this.notesDisabled = true
            }
          }
        }

        if (this.purchasing == 2) {
          if (this.listStatus == 2 || this.listStatus == 3) {
            if (row.target.value == 'BIDDING') {
              this.biddingInstructions = ''
              this.biddingInstructionsType = null
              this.bidMinPriceDisabled = true
              this.BIDDING_PopoutDis = true
            } else {
              this.BIDDING_PopoutDis = false
              this.biddingInstructionsDis = false
              let checked = document.getElementById('inputValuebatchID' + ObjKey)
              this.$emit('inputValueListChild', 'bidType', '', ObjKey, checked.checked, checked.value)
              this.$emit('inputValueListChild', 'bidMinPrice', '', ObjKey, checked.checked, checked.value)
            }   
          }
        }

        if (this.purchasing == 2 && this.listStatus == 3) {
          if (row.target.value == 'TRADED') {
            this.closingCost = false
            this.basisDisabledSelect = true
            this.basisDisabled = false
          } else {
            this.closingCost = true
            if (row.target.value == 'DATA_CHANGE') {
              this.basisDisabledSelect = false
              this.basisDisabled = false
            } else {
              this.basisDisabledSelect = true
              this.basisDisabled = true
            }
            
          }
        }

        // 现价成交
        if (this.purchasing == 2 && this.listStatus == 2) {
          if (row.target.value == 'TRADED') {
            this.waitingReplyPrice = true
          } else {
            this.waitingReplyPrice = false
          }
        }
      },
      // 隐藏竞价弹框
      BIDDINGclose (row) {
        let listID = row.target.getAttribute('listID')
        let checked = document.getElementById('inputValuebatchID' + listID)
        this.$emit('inputValueListChild', 'bidType', '', listID, checked.checked, checked.value)
        this.$emit('inputValueListChild', 'bidMinPrice', '', listID, checked.checked, checked.value)
        this.radiolistchecked(listID)
        this.BIDDING_PopoutDis = false
        this.biddingInstructionsDis = false
      },
      // 详情隐藏
      historyclose () {
        this.history_PopoutDis = false
      },
      // 竞价值
      bidTypeBidMinPrice (row) {
        // 根据key取对象
        let nameKey = row.target.name.split(',')
        let ObjKey = nameKey[1]
        nameKey = nameKey[0]
        let checked = document.getElementById('inputValuebatchID' + ObjKey)
        this.$emit('inputValueListChild', nameKey, row.target.value, ObjKey, checked.checked, checked.value)

        if (nameKey == 'bidType') {
          if (row.target.value == '1') {
            this.biddingInstructions = '只可竞价一次，对方出价未告知'
            this.biddingInstructionsType = 1
            this.bidMinPriceDisabled = true
          } else {
            this.biddingInstructions = '可多次竞价'
            this.biddingInstructionsType = 2
            this.bidMinPriceDisabled = false
          }
        } else {
          if (this.biddingInstructionsType == 2)
          this.biddingInstructionsPrice = row.target.value
        }
      },
      // 竞价确认
      BIDDING_PopoutSubmit (row) {
        let listID = row.target.getAttribute('listID')
        if (this.biddingInstructionsType)
        if (this.biddingInstructionsType == 2) {
          if (this.biddingInstructionsPrice == '') {
            this.$message({
              showClose: true,
              message: '请输入最低价',
              type: 'warning'
            });
            this.BIDDING_PopoutDis = true
            this.biddingInstructionsDis = false
          } else {
            let flg
            if (!(Number(this.biddingInstructionsPrice) > 0)) {
              flg = true
            } else {
              if (Number(this.biddingInstructionsPrice).toString().includes('.')) {
                flg = true
              } else {
                //  || !(Number(ele.target.value)%5 == 0)
                let v = this.biddingInstructionsPrice.split('')[this.biddingInstructionsPrice.split('').length - 1]
                if (v != 0 && v != 5) {
                  flg = true
                }
              }
              // if (nameKey == 'price' && Number(this.biddingInstructionsPrice).toString().length > 5) {
              //   flg = true
              // }
            }
            if (Number(this.biddingInstructionsPrice).toString().includes('.')) {
              this.biddingInstructionsPrice = Number(this.biddingInstructionsPrice).toFixed()
              flg = true
            }

            if (flg) {
              this.$message.warning('最低出价必须为正整数,并且尾数为0或5的数字')
              this.biddingInstructionsPrice = ''
            } else {
              this.radiolistchecked(listID)
              this.BIDDING_PopoutDis = false
              this.biddingInstructionsDis = true
            }
          }
        } else {
          this.radiolistchecked(listID)
          this.BIDDING_PopoutDis = false
          this.biddingInstructionsDis = true
        }
      },
      validateInput (ele, name, value) {
		  console.log(ele, name, value)
        // 根据key取对象
        let nameKey = ele.target.name.split(',')
        let ObjKey = nameKey[1]
        nameKey = nameKey[0]
        let flg

        //js只能只输入小数和整数的正则
        let reg = /^(([0-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
        //js只能只输入四位小数和整数的正则
        let rega = /^(([0-9][0-9]*)|(([0]\.\d{1,4}|[1-9][0-9]*\.\d{1,4})))$/
        // amount 重量 packNum 包数 price 价格 bidMinPrice 最低 basisPrice 基差
        if (nameKey == 'amount') {
          if (!rega.test(ele.target.value)) {
            flg = true
          }
        } else if (nameKey == 'packNum') {
          if (!(Number(ele.target.value) > 0) || Number(ele.target.value).toString().includes('.')) {
            flg = true
          }
        } else if (nameKey == 'price' || nameKey == 'bidMinPrice') {
          if (!(Number(ele.target.value) > 0)) {
            flg = true
          } else {
            if (Number(ele.target.value).toString().includes('.')) {
              flg = true
            } else {
              //  || !(Number(ele.target.value)%5 == 0)
              let v = ele.target.value.split('')[ele.target.value.split('').length - 1]
              if (v != 0 && v != 5) {
                flg = true
              }
            }
            if (nameKey == 'price' && Number(ele.target.value).toString().length > 5) {
              flg = true
            }
          }
        } else if (nameKey == 'basisPrice') {
          if (Number(ele.target.value).toString().includes('.')) {
            ele.target.value = Number(ele.target.value).toFixed()
            flg = true
          }
        } else if (nameKey == 'supBasisPrice') {
          if (Number(ele.target.value).toString().includes('.')) {
            ele.target.value = Number(ele.target.value).toFixed()
            flg = true
          }
        }
        // amount 重量 packNum 包数 price 价格 bidMinPrice 最低
        if (flg) {
          if (nameKey == 'amount') {
            this.$message.warning('重量必须为正整数或最小四位小数')
          } else if (nameKey == 'packNum') {
            this.$message.warning('包数必须为正整数')
          } 
          // else if (nameKey == 'price') {

          //   this.$message.warning('请输入尾数0或5的5位正整数')
          // }
          
          if (nameKey != 'basisPrice' && nameKey != 'price') {
            ele.target.value = ''
          }
          this.listChild[nameKey] = ele.target.value
          let checked = document.getElementById('inputValuebatchID' + ObjKey)
          this.$emit('inputValueListChild', nameKey, '', ObjKey, checked.checked, checked.value)
        }
      },
      // 清空竞价弹框radio状态
      radiolistchecked (listID) {
        let radiolist = document.getElementsByClassName('radio'+listID)
        for(let i in radiolist) {
          if (radiolist.hasOwnProperty(i)) {
            radiolist[i].checked = false
          }
        }
      },
      // 日期插件禁用样式
      DomObjectParentClassNmae (ele) {
        for(let i in ele) {
          if (ele.hasOwnProperty(i)) {
            let child = ele[i]
            child.parentElement.className = 'laydate-disabled'
          }
        }
      },
      timeMMDDHH (time) {
        var timeMMDDHHs1 = formatDate(time, true)
        var timeMMDDHHs = `${timeMMDDHHs1.split('-')[1]}/${timeMMDDHHs1.split('-')[2].split(' ')[0]} `
        timeMMDDHHs += `${(timeMMDDHHs1.split('-')[2].split(' ')[1]).split(':')[0]}:${(timeMMDDHHs1.split('-')[2].split(' ')[1]).split(':')[1]}`
        return timeMMDDHHs
      },
      presentPricefuc (ele) {
        let sib = ele.target.previousSibling
        let flg,nameKey
        if (sib.type != 'number') {
          if (sib.checked) {
            flg = 0
            sib.checked = false
            sib.previousSibling.disabled = false
          } else {
            flg = 1
            sib.checked = true
            sib.previousSibling.disabled = true
          }
          nameKey = sib.name.split(',')
        } else {
          if (ele.target.checked) {
            flg = 1
            ele.target.previousSibling.disabled = true
          } else {
            flg = 0
            ele.target.previousSibling.disabled = false
          }
          nameKey = ele.target.name.split(',')
        }
        // 根据key取对象
        let ObjKey = nameKey[1]
        nameKey = nameKey[0]
        let checked = document.getElementById('inputValuebatchID' + ObjKey)
        checked.checked = true
        this.$emit('inputValueListChild', nameKey, flg, ObjKey, checked.checked, checked.value)
      }
  }
}
</script>

<style lang="scss" scoped="scoped">
  .listChildContent{
    width: 100%;
    background: #fff;
    .list-tr{
      width: calc(100% - 22px);
      display: flex;
      flex-direction: row;
      justify-content: left;
      padding: 0 10px;
      font-size: 0.3rem;
      .list-td{
        width: 50%;
        text-align: left;
        line-height: .7rem;
        color: #666666;
        border-bottom: 1px solid #eee;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        input[type=checkbox] {
          width: 16px;
          height: 16px;
          outline: 0;
          border: 0;
          margin-top: 10px;
          float: left;
          margin-right: 6px;
        }
        a{
          margin: 0;
          font-size: 0.3rem;
        }
        .icon_you{
          position: absolute;
          top: .08rem;
          right: -.28rem;
          width: .24rem;
          height: .24rem;
          background: url('../../assets/icon/you.png') no-repeat;
          background-size: 100%;
        }
      }
      .line{
        line-height: .8rem;
        width: calc(100% - 20px);
        input{
          border: 0;
          outline: 0;
          color: #333;
          font-size: 0.3rem;
          margin-left: 4px;
        }
        span{
          margin-left: 6px;
          font-size: 0.3rem;
        }
        p{
          width: 100%;
          height: calc(1rem - 24px);
          line-height: calc(1rem - 24px);
          text-align: center;
          margin-top: -6px;
          margin: 0 auto;
          margin-bottom: 6px;
          background: #EBF6F6;
          border: 1px solid #eee;
          font-size: .25rem;
        }
        .position_depotName{
          position: absolute;
          width: 76%;
          height: 2.4rem;
          background: #fff;
          left: 1.4rem;
          padding: 0 .1rem;
          border-top: 1px solid #eee;
          overflow: scroll;
          z-index: 111;
          nav{
            li{
              list-style: none;
              line-height: .46rem;
              border-bottom: 1px solid #eee;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: .26rem;
            }
          }
          .liName{
              list-style: none;
              line-height: .46rem;
              border-bottom: 1px solid #eee;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: .26rem;
          }
        }
      }
    }
    .cyan{
      background: #EAF7F7;
      border: 1px solid #eee;
      border-left: 0;
      border-radius: 0;
      .his{
        width: 66%;
        display: flex;
        a{
          float: right;
          font-size: 0.25rem;
          width: 28px;
          height: 20px;
          line-height: 20px;
          margin-top: 6px;
          margin-left: 6px;
          color: #fff;
          background: #14BAB4;
        }
      }
    }
    .three{
      .list-td{
        input{
          width: 38%;
          border: 1px solid #eee;
          text-indent: 2px;
          border-radius: 2px;
          font-size: 0.3rem;
        }
      }
      .margin_left{
        input{
          margin-left: 10px;
          font-size: 0.3rem;
        }
        span{
          margin-left: 10px;
          font-size: 0.3rem;
        }
        b{
          font-weight: 400;
          font-size: 0.3rem;
        }
      }
    }
    .relative{
      .list-td:nth-child(2){
        position: relative;
      }
      .list-td:nth-child(2) input[type=date]{
        height: 20px;
        position: absolute;
        margin-top: 6px;
        z-index: 1;
        opacity: 0;
      }
    }
    // 竞价弹框
    .BIDDING_Popout{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(51, 51, 51, 0.2);
      z-index: 1;
      &-paddng{
        width: 92%;
        margin: 0 auto;
        margin-top: 50%;
        background: #fff;
        border-radius: 6px;
        &-header{
          width: calc(100% - .8rem);
          height: 1rem;
          line-height: 1rem;
          text-align: left;
          padding: 0 .4rem;
          color: #333333;
          font-size: .34rem;
          font-weight: 700;
          position: relative;
          .close{
            position: absolute;
            top: 8px;
            right: 10px;
            width: .26rem;
            height: .26rem;
            font-weight: 100;
            font-size: .32rem;
            line-height: .26rem;
            text-align: center;
          }
        }
        .xian{
          width: calc(100% - .8rem);
          height: 1px;
          background: #EAEAEA;
          display: block;
          margin: 0 auto;
        }
        &-content{
          width: calc(100% - .8rem);
          margin: 0 auto;
          p{
            width: calc(100% - 0.4rem);
            margin: 0;
            line-height: .72rem;
            text-align: left;
            padding: 0 10px;
            input{
              width: .32rem;
              height: .32rem;
              float: left;
              margin-top: .2rem;
              margin-right: .1rem;
            }
            input[type=number] {
              margin: 0;
              width: 1rem;
              height: .4rem;
              float: none;
              margin-left: .1rem;
              border: 1px solid #E2E4E8;
            }
          }
        }
        &-button{
          width: 100%;
          height: 1.2rem;
          line-height: 1.2rem;
          text-align: center;
          button{
            width: 2.1rem;
            height: .6rem;
            line-height: .6rem;
            outline: 0;
            border: none;
            background: #14BAB4;
            font-size: .32rem;
            color: #fff;
            border-radius: 0.3rem;
          }
        }
      }
    }

    //
    .history{
      z-index: 11111;
      .BIDDING_Popout-paddng{
        width: 90%;
        height: 70%;
        margin-top: 20%;
        padding-bottom: .4rem;
        .history_list{
          height: 79%;
          overflow: scroll;
          background: #F4F4F4;
          color: #777777;
          p{
            line-height: .4rem;
            font-size: .28rem;
            margin-top: .32rem;
          }
        }
        .history_list p:first-child{
          background: #F4F4F4;
          color: #333;
          margin-top: 0;
        }
      }
    }
    .selectindexCode{
      border: none;
      font-size: .22rem;
      padding: 0px 4px;
      height: 22px;
      margin: 6px auto;
      margin-right: 2px;
      float: left;
      opacity: 1;
      background: #DDDDDD;
    }
    select:disabled{
      background: #ddd;
      opacity: 1;
    }
    input:disabled{
       background: #fff;;
    }
  }
</style>