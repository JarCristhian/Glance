<script setup>

const props = defineProps({
  icon: String,
});
//initApp();
</script>

<template>
  <div>
    <svg v-if="icon == 'add'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 32 32">
      <path d="M17 15V8h-2v7H8v2h7v7h2v-7h7v-2z" fill="currentColor"></path>
    </svg>
    <svg v-if="icon == 'sett'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 20 20">
      <g fill="none">
        <path
          d="M1.91 7.383a8.491 8.491 0 0 1 1.78-3.08a.5.5 0 0 1 .54-.135l1.918.686a1 1 0 0 0 1.32-.762l.366-2.006a.5.5 0 0 1 .388-.4a8.532 8.532 0 0 1 3.555 0a.5.5 0 0 1 .387.4l.367 2.006a1 1 0 0 0 1.32.762l1.918-.686a.5.5 0 0 1 .54.136a8.491 8.491 0 0 1 1.78 3.079a.5.5 0 0 1-.152.535l-1.555 1.32a1 1 0 0 0 0 1.524l1.555 1.32a.5.5 0 0 1 .152.535a8.491 8.491 0 0 1-1.78 3.08a.5.5 0 0 1-.54.135l-1.918-.686a1 1 0 0 0-1.32.762l-.367 2.007a.5.5 0 0 1-.387.399a8.53 8.53 0 0 1-3.555 0a.5.5 0 0 1-.388-.4l-.365-2.006a1 1 0 0 0-1.32-.762l-1.919.686a.5.5 0 0 1-.54-.136a8.49 8.49 0 0 1-1.78-3.079a.5.5 0 0 1 .153-.535l1.554-1.32a1 1 0 0 0 0-1.524l-1.554-1.32a.5.5 0 0 1-.153-.535zm1.061-.006l1.294 1.098a2 2 0 0 1 0 3.05L2.97 12.623c.292.782.714 1.51 1.245 2.152l1.596-.57a2 2 0 0 1 2.64 1.525l.305 1.668a7.556 7.556 0 0 0 2.485 0l.305-1.67a1.998 1.998 0 0 1 2.64-1.524l1.597.571a7.492 7.492 0 0 0 1.245-2.152l-1.294-1.098a1.998 1.998 0 0 1 0-3.05l1.294-1.098a7.491 7.491 0 0 0-1.245-2.152l-1.596.57a2 2 0 0 1-2.64-1.524l-.306-1.669a7.555 7.555 0 0 0-2.485 0l-.304 1.669a2 2 0 0 1-2.641 1.525l-1.596-.571a7.491 7.491 0 0 0-1.245 2.152zM7.5 10a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0zm1 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 0 0-3 0z"
          fill="currentColor"></path>
      </g>
    </svg>
    <svg v-if="icon == 'search'" width="23" class="text-gray-500" xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20">
      <g fill="none">
        <path
          d="M8.5 3a5.5 5.5 0 0 1 4.227 9.02l4.127 4.126a.5.5 0 0 1-.638.765l-.07-.057l-4.126-4.127A5.5 5.5 0 1 1 8.5 3zm0 1a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9z"
          fill="currentColor"></path>
      </g>
    </svg>
    <svg v-if="icon == 'copy'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 16 16">
      <g fill="none">
        <path
          d="M4 4.085V10.5a2.5 2.5 0 0 0 2.336 2.495L6.5 13h4.414A1.5 1.5 0 0 1 9.5 14H6a3 3 0 0 1-3-3V5.5a1.5 1.5 0 0 1 1-1.415zM11.5 2A1.5 1.5 0 0 1 13 3.5v7a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 5 10.5v-7A1.5 1.5 0 0 1 6.5 2h5zm0 1h-5a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5z"
          fill="currentColor"></path>
      </g>
    </svg>
    <svg v-if="icon == 'code'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 20 20">
      <g fill="none">
        <path
          d="M12.967 3.68a.5.5 0 0 0-.934-.36l-5 13a.5.5 0 1 0 .934.36l5-13zM5.825 6.12a.5.5 0 0 1 .055.706L3.159 10l2.72 3.175a.5.5 0 0 1-.759.65l-3-3.5a.5.5 0 0 1 0-.65l3-3.5a.5.5 0 0 1 .705-.054zm8.35 8.26a.5.5 0 0 1-.055-.705l2.722-3.175l-2.722-3.174a.5.5 0 1 1 .76-.651l3 3.5a.5.5 0 0 1 0 .65l-3 3.5a.5.5 0 0 1-.705.055z"
          fill="currentColor"></path>
      </g>
    </svg>
    <svg v-if="icon == 'edit'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 20 20">
      <g fill="none">
        <path
          d="M13.245 2.817a2.783 2.783 0 0 1 4.066 3.796l-.13.14l-9.606 9.606a2.001 2.001 0 0 1-.723.462l-.165.053l-4.055 1.106a.5.5 0 0 1-.63-.535l.016-.08l1.106-4.054c.076-.28.212-.54.398-.76l.117-.128l9.606-9.606zm-.86 2.275L4.346 13.13a1 1 0 0 0-.215.321l-.042.123l-.877 3.21l3.212-.875a1 1 0 0 0 .239-.1l.107-.072l.098-.085l8.038-8.04l-2.521-2.52zm4.089-1.568a1.783 1.783 0 0 0-2.402-.11l-.12.11l-.86.86l2.52 2.522l.862-.86a1.783 1.783 0 0 0 .11-2.402l-.11-.12z"
          fill="currentColor"></path>
      </g>
    </svg>
    <svg v-if="icon == 'empty'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 24 24">
      <path
        d="M6 13h12c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1s.45 1 1 1zm-2 4h12c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm3-9c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1z"
        fill="currentColor"></path>
    </svg>
    <svg v-if="icon == 'day'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 32 32">
      <g fill="none">
        <path
          d="M16 2a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm0 21a7 7 0 1 0 0-14a7 7 0 0 0 0 14zm0-2a5 5 0 1 1 0-10a5 5 0 0 1 0 10zm13-4a1 1 0 1 0 0-2h-2a1 1 0 1 0 0 2h2zm-13 9a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1zM5 17a1 1 0 1 0 0-2H3a1 1 0 1 0 0 2h2zm.294-11.706a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1-1.414 1.414l-2-2a1 1 0 0 1 0-1.414zm1.414 21.414a1 1 0 0 1-1.414-1.414l2-2a1 1 0 1 1 1.414 1.414l-2 2zm20-21.414a1 1 0 0 0-1.414 0l-2 2a1 1 0 0 0 1.414 1.414l2-2a1 1 0 0 0 0-1.414zm-1.414 21.414a1 1 0 0 0 1.414-1.414l-2-2a1 1 0 1 0-1.414 1.414l2 2z"
          fill="currentColor"></path>
      </g>
    </svg>
    <svg v-if="icon == 'night'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 32 32">
      <path
        d="M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3z"
        fill="currentColor"></path>
    </svg>
  </div>
</template>