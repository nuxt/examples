<template>
  <div>
    <div
      class="max-w-sm rounded overflow-hidden shadow-lg mb-4 dark:bg-neutral-900"
    >
      <!-- Photo by Samuel Ferrara on https://unsplash.com/photos/aerial-photo-of-foggy-mountains-1527pjeb6jg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash -->
      <img
        class="w-full"
        src="/mountains.jpg"
        alt="Sunset in the mountains"
      >
      <div class="px-6 py-4 pb-2">
        <div class="font-bold text-xl mb-2 dark:text-white">
          The Coldest Sunset
        </div>
        <p class="text-neutral-700 dark:text-neutral-300 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>
      </div>
      <div class="px-6 py-4">
        <span class="badge mr-2">#photography</span>
        <span class="badge mr-2">#travel</span>
        <span class="badge">#winter</span>
      </div>
    </div>
    <NuxtLink to="about">
      <TButton>About</TButton>
    </NuxtLink>
  </div>
</template>
