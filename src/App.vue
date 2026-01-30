<template>
  <div class="container">
    <AddTodo @added="handleAddTodo" />
    <h3>Pending Tasks:</h3>
    <TodoLists status="pending" />

    <h3>Completed Tasks:</h3>
    <TodoLists status="completed" />
    <div class="pending-tasks">
      <span>You have <span class="pending-num"> {{ nbOfTodo }} </span> tasks
        pending.</span>
      <button class="clear-button">Clear All</button>
    </div>
  </div>
</template>
<script>
import { mapState } from "pinia";
import AddTodo from "./components/AddTodo.vue";
import TodoLists from "./components/TodoList.vue";
import { onMounted, onBeforeUnmount } from 'vue'; // Import hooks
import { useTodoStore } from './stores/todo.store'; // Use the TS store

export default {
  name: "App",
  setup() {
    const store = useTodoStore();
    let stopRealtime = null;

    onMounted(async () => {
      // Fetch initial data
      await store.fetchTodos();
      // Start listening for live changes via WebSocket
      stopRealtime = store.startRealtime();
    });

    onBeforeUnmount(() => {
      // Clean up the WebSocket connection when the app unmounts
      if (stopRealtime) stopRealtime();
    });

    return { store };
  },
  components: {
    AddTodo,
    TodoLists,
  },
  computed: {
    ...mapState(useTodoStore, {
      nbOfTodo: "countTodos",
    }),
  },
  methods: {
    handleAddTodo(title) {
      this.store.addTodo(title); // This calls the Hasura mutation
    },
    // Note: Hasura doesn't have a "clearAll" by default in this lab, 
    // you would need a custom mutation for that.
  },
};
</script>
<style>
@import "https://unicons.iconscout.com/release/v4.0.0/css/line.css";
</style>
