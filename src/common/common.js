export function default_css_code(){
    return `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 30px 20px;
        }
        
        .container {
            max-width: 1200px;
            width: 100%;
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
            padding: 30px;
            margin-top: 20px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eaeaea;
        }
        
        .title {
            color: #2c3e50;
            font-size: 2.2rem;
            font-weight: 600;
            margin-bottom: 8px;
        }
        
        .subtitle {
            color: #7f8c8d;
            font-size: 1.1rem;
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.6;
        }
        
        .chart-container {
            width: 100%;
            height: 600px;
            position: relative;
            overflow: visible;
        }
        
        .tooltip {
            position: absolute;
            padding: 12px 16px;
            background: rgba(0, 0, 0, 0.85);
            color: white;
            border-radius: 8px;
            font-size: 14px;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 100;
            min-width: 160px;
        }
        
        .tooltip::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: rgba(0, 0, 0, 0.85) transparent transparent transparent;
        }
        
        .tooltip-title {
            font-weight: 600;
            margin-bottom: 5px;
            color: #ecf0f1;
        }
        
        .tooltip-value {
            font-size: 1.2rem;
            font-weight: 700;
            color: #3498db;
        }
        
        .legend {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 12px;
            margin-top: 25px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 10px;
        }
        
        .legend-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            color: #34495e;
        }
        
        .legend-color {
            width: 18px;
            height: 18px;
            border-radius: 4px;
        }
        
        .footer {
            margin-top: 25px;
            text-align: center;
            color: #7f8c8d;
            font-size: 14px;
            padding-top: 15px;
            border-top: 1px solid #eaeaea;
        }
        
        .controls {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }
        
        .control-btn {
            padding: 10px 20px;
            background: #3498db;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s;
        }
        
        .control-btn:hover {
            background: #2980b9;
            transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
            .container {
                padding: 20px 15px;
            }
            
            .title {
                font-size: 1.8rem;
            }
            
            .chart-container {
                height: 500px;
            }
            
            .legend {
                justify-content: flex-start;
                overflow-x: auto;
            }
        }
    `
}

export function default_html_code(){
    return `
    <div class="header">
        <h1 class="title">母亲教育水平与婴儿数量关系</h1>
        <p class="subtitle">展示不同教育水平母亲所生育婴儿数量的分布情况，数据以千为单位(k)表示</p>
    </div>
    
    <div class="container">
        <div class="controls">
            <button class="control-btn" onclick="toggleLabels()">切换数值标签</button>
            <button class="control-btn" onclick="sortData('asc')">升序排序</button>
            <button class="control-btn" onclick="sortData('desc')">降序排序</button>
            <button class="control-btn" onclick="resetChart()">重置图表</button>
        </div>
        
        <div class="chart-container" id="chart"></div>
        
        <div class="legend" id="legend"></div>
        
        <div class="footer">
            <p>数据来源：模拟教育水平与生育数据 | 使用 D3.js 可视化</p>
        </div>
    </div>
    
    <div class="tooltip" id="tooltip"></div>
    `
}

export function default_js_code(){
    return `
    // 数据定义
        const data = [
            { education: '8th Grade', babies: 8000, color: '#4e79a7' },
            { education: '9-12th Grade', babies: 12000, color: '#f28e2c' },
            { education: 'High School Grad.', babies: 18000, color: '#e15759' },
            { education: 'Some College', babies: 27000, color: '#76b7b2' },
            { education: 'Associate', babies: 36000, color: '#59a14f' },
            { education: 'Bachelor', babies: 45000, color: '#edc949' },
            { education: 'Master', babies: 36000, color: '#af7aa1' },
            { education: 'Doctorate', babies: 27000, color: '#ff9da7' },
            { education: 'Unknown', babies: 9000, color: '#9c755f' }
        ];
        
        // 图表配置
        const config = {
            margin: { top: 60, right: 40, bottom: 120, left: 80 },
            width: 0,
            height: 0,
            showLabels: true,
            originalData: [...data]
        };
        
        // 初始化图表
        function initChart() {
            const container = document.getElementById('chart');
            config.width = container.clientWidth;
            config.height = container.clientHeight;
            
            d3.select('#chart').selectAll('*').remove();
            
            const svg = d3.select('#chart')
                .append('svg')
                .attr('width', config.width)
                .attr('height', config.height)
                .append('g')
                .attr('transform', \`translate(\${config.margin.left}, \${config.margin.top})\`);
            
            const chartWidth = config.width - config.margin.left - config.margin.right;
            const chartHeight = config.height - config.margin.top - config.margin.bottom;
            
            // 创建比例尺
            const x = d3.scaleBand()
                .domain(data.map(d => d.education))
                .range([0, chartWidth])
                .padding(0.25);
            
            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.babies) * 1.1])
                .range([chartHeight, 0])
                .nice();
            
            // 添加网格线
            svg.append('g')
                .attr('class', 'grid')
                .call(d3.axisLeft(y)
                    .ticks(8)
                    .tickSize(-chartWidth)
                    .tickFormat('')
                )
                .style('stroke', '#e0e0e0')
                .style('stroke-dasharray', '3,3')
                .style('opacity', 0.6);
            
            // 添加柱子
            const bars = svg.selectAll('.bar')
                .data(data)
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('x', d => x(d.education))
                .attr('y', d => y(d.babies))
                .attr('width', x.bandwidth())
                .attr('height', d => chartHeight - y(d.babies))
                .attr('fill', d => d.color)
                .attr('rx', 5)
                .attr('ry', 5)
                .attr('opacity', 0.9)
                .on('mouseover', function(event, d) {
                    // 高亮当前柱子
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr('opacity', 1)
                        .attr('stroke', '#2c3e50')
                        .attr('stroke-width', 2);
                    
                    // 显示工具提示
                    const tooltip = document.getElementById('tooltip');
                    const [xPos, yPos] = d3.pointer(event, document.body);
                    
                    tooltip.innerHTML = \`
                        <div class="tooltip-title">\${d.education}</div>
                        <div class="tooltip-value">\${formatNumber(d.babies)} 婴儿</div>
                        <div>\${(d.babies / 1000).toFixed(1)}k</div>
                    \`;
                    
                    tooltip.style.left = (xPos + 10) + 'px';
                    tooltip.style.top = (yPos - 60) + 'px';
                    tooltip.style.opacity = 1;
                })
                .on('mouseout', function(event, d) {
                    // 恢复柱子样式
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr('opacity', 0.9)
                        .attr('stroke', null);
                    
                    // 隐藏工具提示
                    const tooltip = document.getElementById('tooltip');
                    tooltip.style.opacity = 0;
                })
                .on('click', function(event, d) {
                    alert(\`教育水平: \${d.education}\n婴儿数量: \${formatNumber(d.babies)} (\${(d.babies/1000).toFixed(1)}k)\`);
                });
            
            // 添加动画效果
            bars.attr('height', 0)
                .attr('y', chartHeight)
                .transition()
                .duration(800)
                .delay((d, i) => i * 100)
                .ease(d3.easeElasticOut.period(0.5))
                .attr('y', d => y(d.babies))
                .attr('height', d => chartHeight - y(d.babies));
            
            // 添加数值标签
            const labels = svg.selectAll('.label')
                .data(data)
                .enter()
                .append('text')
                .attr('class', 'label')
                .attr('x', d => x(d.education) + x.bandwidth() / 2)
                .attr('y', d => y(d.babies) - 12)
                .attr('text-anchor', 'middle')
                .attr('fill', '#2c3e50')
                .attr('font-weight', '600')
                .attr('font-size', '13px')
                .attr('opacity', config.showLabels ? 1 : 0)
                .text(d => formatNumber(d.babies, true));
            
            // 添加X轴
            svg.append('g')
                .attr('class', 'x-axis')
                .attr('transform', \`translate(0, \${chartHeight})\`)
                .call(d3.axisBottom(x))
                .selectAll('text')
                .attr('transform', 'rotate(-45)')
                .attr('text-anchor', 'end')
                .attr('dx', '-0.8em')
                .attr('dy', '0.5em')
                .style('font-size', '13px')
                .style('font-weight', '500');
            
            // 添加X轴标题
            svg.append('text')
                .attr('class', 'axis-title')
                .attr('x', chartWidth / 2)
                .attr('y', chartHeight + config.margin.bottom - 40)
                .attr('text-anchor', 'middle')
                .attr('fill', '#34495e')
                .style('font-size', '16px')
                .style('font-weight', '600')
                .text('母亲教育水平');
            
            // 添加Y轴
            svg.append('g')
                .attr('class', 'y-axis')
                .call(d3.axisLeft(y)
                    .ticks(8)
                    .tickFormat(d => formatNumber(d, true))
                )
                .style('font-size', '13px');
            
            // 添加Y轴标题
            svg.append('text')
                .attr('class', 'axis-title')
                .attr('transform', 'rotate(-90)')
                .attr('x', -chartHeight / 2)
                .attr('y', -config.margin.left + 25)
                .attr('text-anchor', 'middle')
                .attr('fill', '#34495e')
                .style('font-size', '16px')
                .style('font-weight', '600')
                .text('婴儿数量 (千)');
            
            // 创建图例
            createLegend();
        }
        
        // 创建图例
        function createLegend() {
            const legendContainer = document.getElementById('legend');
            legendContainer.innerHTML = '';
            
            data.forEach(item => {
                const legendItem = document.createElement('div');
                legendItem.className = 'legend-item';
                
                const colorBox = document.createElement('div');
                colorBox.className = 'legend-color';
                colorBox.style.backgroundColor = item.color;
                
                const text = document.createElement('span');
                text.textContent = \`\${item.education}: \${formatNumber(item.babies, true)}\`;
                
                legendItem.appendChild(colorBox);
                legendItem.appendChild(text);
                legendContainer.appendChild(legendItem);
            });
        }
        
        // 格式化数字显示
        function formatNumber(num, short = false) {
            if (short) {
                return num >= 1000 ? \`\${(num / 1000).toFixed(1)}k\` : num;
            }
            return num.toLocaleString();
        }
        
        // 切换标签显示
        function toggleLabels() {
            config.showLabels = !config.showLabels;
            d3.selectAll('.label')
                .transition()
                .duration(300)
                .attr('opacity', config.showLabels ? 1 : 0);
        }
        
        // 排序数据
        function sortData(order) {
            if (order === 'asc') {
                data.sort((a, b) => a.babies - b.babies);
            } else if (order === 'desc') {
                data.sort((a, b) => b.babies - a.babies);
            }
            initChart();
        }
        
        // 重置图表
        function resetChart() {
            data.length = 0;
            config.originalData.forEach(item => data.push({...item}));
            initChart();
        }
        
        // 窗口大小变化时重新绘制
        window.addEventListener('resize', function() {
            initChart();
        });
        
        // 页面加载完成后初始化图表
        document.addEventListener('DOMContentLoaded', function() {
            initChart();
        });
    `
}

export function create_chart_html(html, css, data, script_render, import_script){
    const Data = (typeof(data) === "string") ? data : JSON.stringify(data);
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Chart Visualization</title>
        <style>
            ${css}
        </style>
        ${import_script}
    </head>
    <body>
        ${html}
        <script>
            const dataset = ${Data}
            ${script_render}
        </script>
    </body>
    </html>`
}
