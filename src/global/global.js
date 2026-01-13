// src/global/global.js
import { reactive } from 'vue'

export const editorLoading = reactive({
  isLoading: false
})

export const ip_address = reactive({
  ip: '10.35.2.236',
  port:'5001'
})

export const iframeDocs = reactive({
  'D3js': '',
  'echarts': '',
  'vega': ''
})

export const languages = reactive({
  display: ['D3.js', 'ECharts', 'Vega'],
  value: ['D3js', 'echarts', 'vega']
})
