<template>
  <view class="content">
    12
    <view class="text-area">
      <canvas canvas-id="column" id="column" class="charts" @click="tap" />
      34
      <canvas canvas-id="circle" id="circle" class="charts_circle" @click="tap" />
    </view>
    <view>123</view>
    <u-icon name="level"></u-icon>
    <u-icon name="photo"></u-icon>
    <u-number-box v-model="value"></u-number-box>

    <u-button text="月落"></u-button>
  </view>
</template>

<script setup lang="ts">

import uCharts from '@qiun/ucharts';
import { onMounted, ref } from 'vue'

type TTargetPlus = Pick<MouseEvent, 'target'> & { id: string } | null;

interface IData {
  categories: string[];
  series: {
    name: string;
    data: number[];
  }[];
}

const uChartsInstance: Record<string, IEchartInstance> = {};
const cWidth = 750;
const cHeight = 500;
const value = ref(10);

const getServerData = () => {
  //模拟从服务器获取数据时的延时
  setTimeout(() => {
    //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
    const res: IData = {
      categories: ["2016", "2017", "2018", "2019", "2020", "2021"],
      series: [
        {
          name: "目标值",
          data: [35, 36, 31, 33, 13, 34]
        },
        {
          name: "完成量",
          data: [18, 27, 21, 24, 6, 28]
        }
      ]
    };
    drawCharts('column', res);
  }, 500);
}

const drawCharts = (id: string, data: IData) => {
  const ctx = uni.createCanvasContext(id);
  uChartsInstance[id] = new uCharts({
    type: "column",
    context: ctx,
    width: cWidth,
    height: cHeight,
    categories: data.categories,
    series: data.series,
    animation: true,
    background: "#FFFFFF",
    padding: [15, 15, 0, 5],
    xAxis: {
      disableGrid: true
    },
    yAxis: {
      data: [{ min: 0 }]
    },
    extra: {
      column: {
        type: "group"
      }
    }
  });
}
const drawChartsCircle = (id: string, data: IData) => {
  const ctx = uni.createCanvasContext(id);
  uChartsInstance[id] = new uCharts({
    type: "arcbar",
    context: ctx,
    width: 400,
    height: 300,
    series: data.series,
    animation: true,
    background: "#FFFFFF",
    color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
    padding: undefined,
    title: {
      name: "80%",
      fontSize: 35,
      color: "#2fc25b"
    },
    subtitle: {
      name: "正确率",
      fontSize: 25,
      color: "#666666"
    },
    extra: {
      arcbar: {
        type: "circle",
        width: 12,
        backgroundColor: "#E9E9E9",
        startAngle: 1.5,
        endAngle: 0.25,
        gap: 2
      }
    }
  });
}
const tap = (e: MouseEvent) => {
  const target = e.target as TTargetPlus;
  if (target?.id) {
    uChartsInstance[target.id].touchLegend(e);
    uChartsInstance[target.id].showToolTip(e);
  }
}

function getServerDataCircle() {
  //模拟从服务器获取数据时的延时
  setTimeout(() => {
    //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
    const res: any = {
      series: [
        {
          name: "正确率",
          color: "#2fc25b",
          data: 0.8
        }
      ]
    };
    drawChartsCircle('circle', res);
  }, 500);
}

onMounted(() => {
  getServerData();
  getServerDataCircle();
})
</script>

<style scoped>
.charts {
  width: 750rpx;
  height: 500rpx;
}

.charts_circle {
  width: 400px;
  height: 300px;
}
</style>