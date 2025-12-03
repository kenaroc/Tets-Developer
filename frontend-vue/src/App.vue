<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-8">
    <div class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
      <transition-group name="slide-fade">
        <div 
          v-for="notification in notifications" 
          :key="notification.id"
          :class="notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-800 shadow-green' : 
                 notification.type === 'error' ? 'bg-red-50 border-red-200 text-red-800 shadow-red' :
                 notification.type === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-800 shadow-yellow' :
                 'bg-blue-50 border-blue-200 text-blue-800 shadow-blue'"
          class="p-4 rounded-lg border shadow-lg flex items-start gap-3 mb-2 mx-4"
        >
          <div :class="notification.type === 'success' ? 'bg-green-100' : 
                      notification.type === 'error' ? 'bg-red-100' :
                      notification.type === 'warning' ? 'bg-yellow-100' :
                      'bg-blue-100'" 
               class="p-2 rounded-lg flex-shrink-0">
            <svg class="w-5 h-5" :class="notification.type === 'success' ? 'text-green-600' : 
                                       notification.type === 'error' ? 'text-red-600' :
                                       notification.type === 'warning' ? 'text-yellow-600' :
                                       'text-blue-600'" 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="notification.type === 'success'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              <path v-if="notification.type === 'error'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              <path v-if="notification.type === 'warning'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              <path v-if="notification.type === 'info'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-medium">{{ notification.title }}</p>
            <p class="text-sm mt-1 text-gray-600">{{ notification.message }}</p>
          </div>
          <button @click="removeNotification(notification.id)" class="text-gray-400 hover:text-gray-600 flex-shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </transition-group>
    </div>

    <div class="max-w-7xl mx-auto">
      <div class="mb-10">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="p-3 bg-blue-600 rounded-lg shadow">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
            <h1 class="text-3xl font-bold text-gray-800">
              Asset Management System
            </h1>
          </div>
          <div class="flex items-center gap-2">
            <div class="px-3 py-1 bg-blue-50 rounded-lg">
              <span class="text-sm font-medium text-blue-700">{{ notifications.length }} notifications</span>
            </div>
          </div>
        </div>
        <p class="text-gray-600">
          Manage your consumable and non-consumable assets efficiently
        </p>
      </div>

      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-1 space-y-6">
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold text-gray-800">
                {{ editId ? 'Edit Asset' : 'Add New Asset' }}
              </h2>
              <div class="px-3 py-1 bg-blue-50 rounded-lg">
                <span class="text-sm font-medium text-blue-700">{{ assets.length }} items</span>
              </div>
            </div>
            
            <div class="space-y-4">
              <!-- Asset Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Asset Name
                </label>
                <input 
                  v-model="form.asset_name" 
                  placeholder="e.g., Laptop, Printer Paper, Monitor..."
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  @keyup.enter="save"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Stock Quantity
                </label>
                <div class="relative">
                  <input 
                    v-model="form.stock_quantity" 
                    type="number"
                    placeholder="Enter quantity"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 pr-12"
                    min="0"
                    @keyup.enter="save"
                  />
                  <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                    units
                  </span>
                </div>
                <div v-if="form.stock_quantity > 0" class="mt-3">
                  <div class="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                  </div>
                  <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      :class="getStockLevelClass(form.stock_quantity)"
                      :style="{ width: getStockPercentage(form.stock_quantity) }"
                      class="h-full rounded-full transition-all duration-500"
                    ></div>
                  </div>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <div class="grid grid-cols-2 gap-3">
                  <button
                    @click="form.category = 'Consumable'"
                    :class="form.category === 'Consumable' ? 
                      'bg-blue-600 text-white border-blue-600' : 
                      'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'"
                    class="py-3 px-4 rounded-lg border font-medium transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                    </svg>
                    Consumable
                  </button>
                  <button
                    @click="form.category = 'Non-Consumable'"
                    :class="form.category === 'Non-Consumable' ? 
                      'bg-blue-600 text-white border-blue-600' : 
                      'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'"
                    class="py-3 px-4 rounded-lg border font-medium transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    Non-Consumable
                  </button>
                </div>
              </div>
              
            
              <div class="pt-4">
                <button 
                  @click="save"
                  :disabled="isSaving"
                  :class="editId ? 
                    (isSaving ? 'bg-green-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700') : 
                    (isSaving ? 'bg-blue-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700')"
                  class="w-full py-3 px-6 rounded-lg text-white font-medium shadow hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  <svg v-if="isSaving" class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  <svg v-else-if="editId" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                  {{ isSaving ? 'Processing...' : (editId ? 'Update Asset' : 'Add Asset') }}
                </button>
                
                <button 
                  v-if="editId"
                  @click="reset"
                  class="w-full mt-3 py-2 px-6 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

        
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              Dashboard Overview
            </h3>
            
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-blue-50 p-4 rounded-lg">
                <div class="flex items-center gap-3">
                  <div class="p-2 bg-blue-100 rounded-lg">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-blue-700 font-medium">Total Assets</p>
                    <p class="text-2xl font-bold text-blue-800">{{ assets.length }}</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-green-50 p-4 rounded-lg">
                <div class="flex items-center gap-3">
                  <div class="p-2 bg-green-100 rounded-lg">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-green-700 font-medium">Total Stock</p>
                    <p class="text-2xl font-bold text-green-800">{{ totalStock }}</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-yellow-50 p-4 rounded-lg">
                <div class="flex items-center gap-3">
                  <div class="p-2 bg-yellow-100 rounded-lg">
                    <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-yellow-700 font-medium">Consumable</p>
                    <p class="text-2xl font-bold text-yellow-800">{{ consumableCount }}</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-purple-50 p-4 rounded-lg">
                <div class="flex items-center gap-3">
                  <div class="p-2 bg-purple-100 rounded-lg">
                    <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-purple-700 font-medium">Non-Consumable</p>
                    <p class="text-2xl font-bold text-purple-800">{{ nonConsumableCount }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="mt-6 pt-6 border-t border-gray-200">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">Last updated:</span>
                <span class="font-medium text-gray-800">{{ currentTime }}</span>
              </div>
            </div>
          </div>
        </div>


        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="px-6 py-6 border-b border-gray-200">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 class="text-xl font-bold text-gray-800">Asset Inventory</h2>
                  <p class="text-gray-600 mt-1">Manage all your assets in one place</p>
                </div>
                
                <div class="flex items-center gap-4">
                  <div class="relative">
                    <input 
                      v-model="searchQuery"
                      type="text"
                      placeholder="Search assets..."
                      class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                    />
                    <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </div>
                  
                  <button 
                    @click="load"
                    :disabled="isLoading"
                    class="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    title="Refresh data"
                  >
                    <svg v-if="isLoading" class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Table -->
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Asset Name
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr 
                    v-for="a in filteredAssets" 
                    :key="a.asset_id"
                    class="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        #{{ a.asset_id }}
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        <div :class="a.category === 'Consumable' ? 'bg-yellow-100' : 'bg-purple-100'" class="p-2 rounded-lg">
                          <svg class="w-5 h-5" :class="a.category === 'Consumable' ? 'text-yellow-600' : 'text-purple-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                          </svg>
                        </div>
                        <div class="font-medium text-gray-900">{{ a.asset_name }}</div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="space-y-2">
                        <div class="flex items-center justify-between">
                          <span class="font-bold text-gray-900">{{ a.stock_quantity }}</span>
                          <span class="text-sm font-medium px-2 py-1 rounded" 
                                :class="getStockStatusClass(a.stock_quantity)">
                            {{ getStockStatusText(a.stock_quantity) }}
                          </span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            :class="getStockLevelClass(a.stock_quantity)"
                            :style="{ width: getStockPercentage(a.stock_quantity) }"
                            class="h-2 rounded-full transition-all duration-500"
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span 
                        :class="a.category === 'Consumable' ? 
                          'bg-yellow-100 text-yellow-800' : 
                          'bg-purple-100 text-purple-800'"
                        class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {{ a.category }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center gap-2">
                        <span :class="getStockStatusDotClass(a.stock_quantity)" class="w-2 h-2 rounded-full"></span>
                        <span class="font-medium" :class="getStockStatusTextClass(a.stock_quantity)">
                          {{ getStockStatusText(a.stock_quantity) }}
                        </span>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div class="flex items-center gap-2">
                        <button 
                          @click="edit(a)"
                          class="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        >
                          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                          </svg>
                          Edit
                        </button>
                        <button 
                          @click="showDeleteConfirm(a)"
                          class="inline-flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                        >
                          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  <!-- Empty State -->
                  <tr v-if="filteredAssets.length === 0">
                    <td colspan="6" class="px-6 py-12 text-center">
                      <div class="max-w-md mx-auto">
                        <div class="p-6 bg-gray-50 rounded-lg">
                          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                          </svg>
                          <h3 class="mt-4 text-lg font-bold text-gray-800">No assets found</h3>
                          <p class="mt-2 text-gray-600">
                            {{ searchQuery ? 'No assets match your search.' : 'Get started by adding your first asset!' }}
                          </p>
                          <button 
                            v-if="searchQuery"
                            @click="searchQuery = ''"
                            class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Clear Search
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Table Footer -->
            <div class="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="text-sm text-gray-600">
                  Showing <span class="font-medium text-gray-800">{{ filteredAssets.length }}</span> of 
                  <span class="font-medium text-gray-800">{{ assets.length }}</span> assets
                </div>
                <div class="text-sm text-gray-500">
                  Asset Management System v1.0 • {{ new Date().getFullYear() }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl shadow-lg max-w-md w-full transform transition-all duration-300 scale-100">
        <div class="p-6">
          <div class="flex items-center gap-3 mb-4">
            <div class="p-2 bg-red-100 rounded-lg">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900">Delete Asset</h3>
          </div>
          
          <p class="text-gray-600 mb-6">
            Are you sure you want to delete <span class="font-bold text-gray-900">"{{ assetToDelete?.asset_name }}"</span>?
            This action cannot be undone.
          </p>
          
          <div class="flex justify-end gap-3">
            <button 
              @click="showDeleteModal = false"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              @click="confirmDelete"
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import assetService from "./services/assetService";

export default {
  data() {
    return {
      assets: [],
      form: {
        asset_name: "",
        stock_quantity: 0,
        category: "Consumable",
      },
      editId: null,
      currentTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      searchQuery: "",
      sortField: 'asset_id',
      sortDirection: 'asc',
      showDeleteModal: false,
      assetToDelete: null,
      notifications: [],
      notificationId: 0,
      isSaving: false,
      isLoading: false,
    };
  },

  mounted() {
    this.load();
    setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }, 60000);
  },

  computed: {
    totalStock() {
      return this.assets.reduce((sum, asset) => sum + (parseInt(asset.stock_quantity) || 0), 0);
    },
    
    consumableCount() {
      return this.assets.filter(a => a.category === 'Consumable').length;
    },
    
    nonConsumableCount() {
      return this.assets.filter(a => a.category === 'Non-Consumable').length;
    },
    
    filteredAssets() {
      let filtered = this.assets;
      
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(a => 
          a.asset_name.toLowerCase().includes(query) ||
          a.category.toLowerCase().includes(query) ||
          a.asset_id.toString().includes(query)
        );
      }
      
      filtered.sort((a, b) => {
        let aVal = a[this.sortField];
        let bVal = b[this.sortField];
        
        if (typeof aVal === 'string') {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }
        
        if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
      
      return filtered;
    }
  },

  methods: {
    addNotification(type, title, message) {
      const id = ++this.notificationId;
      const notification = {
        id,
        type,
        title,
        message
      };
      
      this.notifications.unshift(notification);
      
      // Auto remove notification after 5 seconds
      setTimeout(() => {
        this.removeNotification(id);
      }, 5000);
    },

    removeNotification(id) {
      this.notifications = this.notifications.filter(n => n.id !== id);
    },

    load() {
      this.isLoading = true;
      assetService.getAll()
        .then(res => {
          this.assets = res.data;
          this.addNotification('info', 'Data Loaded', 'Asset data has been refreshed successfully.');
        })
        .catch(error => {
          this.addNotification('error', 'Error', 'Failed to load asset data. Please try again.');
          console.error('Error loading assets:', error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    save() {
      if (!this.form.asset_name.trim()) {
        this.addNotification('warning', 'Validation Error', 'Please enter an asset name!');
        return;
      }

      this.isSaving = true;

      if (this.editId) {
        assetService.update(this.editId, this.form)
          .then(() => {
            this.addNotification('success', 'Asset Updated', `"${this.form.asset_name}" has been updated successfully.`);
            this.reset();
            this.load();
          })
          .catch(error => {
            this.addNotification('error', 'Update Failed', `Failed to update "${this.form.asset_name}". Please try again.`);
            console.error('Error updating asset:', error);
          })
          .finally(() => {
            this.isSaving = false;
          });
      } else {
        assetService.create(this.form)
          .then(() => {
            this.addNotification('success', 'Asset Added', `"${this.form.asset_name}" has been added successfully.`);
            this.reset();
            this.load();
          })
          .catch(error => {
            this.addNotification('error', 'Add Failed', `Failed to add "${this.form.asset_name}". Please try again.`);
            console.error('Error adding asset:', error);
          })
          .finally(() => {
            this.isSaving = false;
          });
      }
    },

    edit(a) {
      this.editId = a.asset_id;
      this.form = { ...a };
      this.addNotification('info', 'Edit Mode', `Editing "${a.asset_name}". Make your changes and click Update.`);
    },

    showDeleteConfirm(asset) {
      this.assetToDelete = asset;
      this.showDeleteModal = true;
    },

    confirmDelete() {
      if (this.assetToDelete) {
        const assetName = this.assetToDelete.asset_name;
        assetService.delete(this.assetToDelete.asset_id)
          .then(() => {
            this.addNotification('success', 'Asset Deleted', `"${assetName}" has been deleted successfully.`);
            this.load();
          })
          .catch(error => {
            this.addNotification('error', 'Delete Failed', `Failed to delete "${assetName}". Please try again.`);
            console.error('Error deleting asset:', error);
          })
          .finally(() => {
            this.showDeleteModal = false;
            this.assetToDelete = null;
          });
      }
    },

    reset() {
      this.editId = null;
      this.form = {
        asset_name: "",
        stock_quantity: 0,
        category: "Consumable",
      };
    },
    
    getStockPercentage(stock) {
      const maxStock = 100;
      const percentage = Math.min((stock / maxStock) * 100, 100);
      return `${percentage}%`;
    },
    
    getStockLevelClass(stock) {
      if (stock > 50) return 'bg-green-500';
      if (stock > 20) return 'bg-yellow-500';
      return 'bg-red-500';
    },
    
    getStockStatusClass(stock) {
      if (stock > 50) return 'bg-green-100 text-green-800';
      if (stock > 20) return 'bg-yellow-100 text-yellow-800';
      return 'bg-red-100 text-red-800';
    },
    
    getStockStatusText(stock) {
      if (stock > 50) return 'High';
      if (stock > 20) return 'Medium';
      return 'Low';
    },
    
    getStockStatusTextClass(stock) {
      if (stock > 50) return 'text-green-600';
      if (stock > 20) return 'text-yellow-600';
      return 'text-red-600';
    },
    
    getStockStatusDotClass(stock) {
      if (stock > 50) return 'bg-green-500';
      if (stock > 20) return 'bg-yellow-500';
      return 'bg-red-500';
    },
    
    sortBy(field) {
      if (this.sortField === field) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortField = field;
        this.sortDirection = 'asc';
      }
    },
  },
};
</script>

<style>
/* Animations for notifications */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* Shadow variations for notifications */
.shadow-green {
  box-shadow: 0 4px 6px -1px rgba(34, 197, 94, 0.1), 0 2px 4px -1px rgba(34, 197, 94, 0.06);
}

.shadow-red {
  box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.1), 0 2px 4px -1px rgba(239, 68, 68, 0.06);
}

.shadow-yellow {
  box-shadow: 0 4px 6px -1px rgba(234, 179, 8, 0.1), 0 2px 4px -1px rgba(234, 179, 8, 0.06);
}

.shadow-blue {
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.1), 0 2px 4px -1px rgba(59, 130, 246, 0.06);
}

/* Simple animations */
tr {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* Modal animation */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>