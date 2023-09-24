<template>
    <view class='flipper' style="">
        <view class='front'>
            video/imgs
        </view>
        <view class='front'>
            input，左侧挂，点击打开
        </view>
        <view class='back'>
            tags
        </view>
        <view class='back'>
            prompt
        </view>
        <u-upload
            :fileList="fileList1"
            @afterRead="afterRead"
            @delete="deletePic"
            name="1"
            multiple
            :maxCount="10"
        ></u-upload>
    </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { request } from './../../common/request';

const fileList1 = ref([]);

// 新增图片
const afterRead = async (event) => {
  // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
  let lists = [].concat(event.file);
  let fileListLen = fileList1.value.length;
  lists.map((item) => {
    fileList1.value.push({
      ...item,
      status: 'uploading',
      message: '上传中',
    });
  });
  for (let i = 0; i < lists.length; i++) {
    const result = await uploadFilePromise(lists[i].url);
    let item = fileList1.value[fileListLen];
    fileList1.value.splice(fileListLen, 1, {
      ...item,
      status: 'success',
      message: '',
      url: result,
    });
    fileListLen++;
  }
};
// 删除图片
const deletePic = (event) => {
  fileList1.value.splice(event.index, 1);
};

const uploadFilePromise = (url) => {
  return new Promise((resolve, reject) => {
    let a = uni.uploadFile({
      url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
      filePath: url,
      name: 'file',
      formData: {
        user: 'test',
      },
      success: (res) => {
        setTimeout(() => {
          resolve(res.data.data);
        }, 1000);
      },
    });
  });
};

request('/predict', {
    base64_image: '',
    extra: '',
})
</script>
<style lang="">

</style>