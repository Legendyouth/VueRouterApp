<template>
	<div class="m-container">
   <div class="m-wrapper" id="m-wrapper">
   		<router-view></router-view>
   </div>
   <footer>
      <ul>
           <li>
              <router-link to="/index/home" class='indexRouter'>
                <i class="yo-ico">&#xe6bb;</i>
                <b>首页</b>
              </router-link>
              
           </li>
           <li>
              <router-link to="/index/search" class='indexRouter'>
                <i class="yo-ico">&#xe65c;</i>
                <b>发现</b>
              </router-link>
              
           </li>
           <li>
              <i class="yo-ico">&#xe664;</i>
           </li>
           <li>
              <router-link to="/index/my" class='indexRouter'>
                <i class="yo-ico">&#xe735;</i>
                <b>我的</b>
              </router-link>
               
            </li>
           <li>
              <router-link to="/index/exit" class='indexRouter'>
                <i class="yo-ico">&#xe603;</i>
                <b>退出</b>
              </router-link>
               
           </li>
        </ul>
   </footer>
</div>
</template>