<template>
  <li class="list" @click="toggleStatus(todo.id)">
    <input type="checkbox" :checked="todo.is_done" />
    <span class="task">{{ todo.title }}</span> <i class="uil" :class="icon"></i>
  </li>
</template>
<script>
import { useTodoStore } from "../stores/todo";
export default {
  setup() {
    const todoStore = useTodoStore();
    return { todoStore };
  },
  props: ["todo", "icon"],
  methods: {
    toggleStatus(todoId) {
      this.todoStore.toggleStatus(todoId);
    },
  },
};
</script>
