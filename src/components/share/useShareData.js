
import {  ref , nextTick } from 'vue'


export default function () {
    const shareVisible = ref(false)
function toggleShareVisbible(bl){
     
      shareVisible.value = !!bl

      nextTick(()=>{
 if(bl){
         let cfg = {
                sites: ['qzone', 'qq', 'weibo', 'wechat', 'douban'],
            } 
            window.socialShare('.social-share', cfg);
        }
      })
    }

return {
      shareVisible,
      toggleShareVisbible,
      }
}