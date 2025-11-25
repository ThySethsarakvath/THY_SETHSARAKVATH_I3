<template>
  <div class="top-menu-bar">
    <div class="menu-item">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
      <span>Account</span>
    </div>

    <div class="menu-item">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 20V10"></path>
        <path d="M12 20V4"></path>
        <path d="M6 20v-6"></path>
      </svg>
      <span>Compare</span>
    </div>

    <div class="menu-item">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
        </path>
      </svg>
      <span>Wishlist</span>
    </div>

    <div class="menu-item cart">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      <span>Cart</span>
      <span class="cart-badge">2</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopMenuBarComponent',
}
</script>

<style scoped>
.top-menu-bar {
  display: flex;
  align-items: center;
  gap: 25px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: color 0.3s ease;
  color: #253d4e;
  font-size: 14px;
  font-weight: 500;
  position: relative;
}

.menu-item:hover {
  color: #3bb77e;
}

.menu-item svg {
  width: 18px;
  height: 18px;
}

.menu-item.cart {
  position: relative;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -10px;
  background: #3bb77e;
  color: #fff;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
}

@media (max-width: 768px) {
  .top-menu-bar {
    gap: 15px;
  }

  .menu-item span {
    display: none;
  }

  .menu-item {
    gap: 0;
  }
}
</style>
