<template>
    <div>
        <div
            class="flex flex-wrap space-x-2 justify-center items-center mt-4 sm:mt-8 text-lg"
        >
            <NuxtLink
            to="/exercises/levels/newbie"
            class="rounded bg-cyan-600 hover:bg-cyan-700 hover:shadow-lg text-gray-100 font-medium px-2 py-0.5 mr-2 mt-2"
            >
            Newbie
            </NuxtLink>
            <NuxtLink
            to="/exercises/levels/beginner"
            class="rounded bg-teal-600 hover:bg-teal-700 hover:shadow-lg text-gray-100 font-medium px-2 py-0.5 mr-2 mt-2"
            >
            Beginner
            </NuxtLink>
            <NuxtLink
            to="/exercises/levels/intermediate"
            class="rounded bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg text-gray-100 font-medium px-2 py-0.5 mr-2 mt-2"
            >
            Intermediate
            </NuxtLink>
            <NuxtLink
            to="/exercises/levels/advanced"
            class="rounded bg-purple-600 hover:bg-purple-700 hover:shadow-lg text-gray-100 font-medium px-2 py-0.5 mr-2 mt-2"
            >
            Advanced
            </NuxtLink>
        </div>
        <div
            class="flex flex-wrap space-x-2 justify-center items-center mt-2 max-w-2xl mx-auto"
        >
            <NuxtLink
            v-for="tag in tags"
            :key="tag"
            :to="`/exercises/tags/${tag}`"
            class="rounded bg-gray-600 hover:bg-cyan-600 hover:shadow-lg text-gray-100 font-medium text-lg px-2 py-0.5 my-1 mr-1"
            >
            {{ tag }}
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
const exercises = await queryContent("exercises").sort({ level: 2 }).find();

const tags = exercises.reduce((acc, exercise) => {
    (exercise.tags ?? []).forEach((tag) => {
        if (!acc.includes(tag)) {
            acc.push(tag);
        }
    });
    return acc;
}, []);
</script>