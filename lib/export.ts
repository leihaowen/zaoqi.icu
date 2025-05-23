import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export interface ExportOptions {
  format: 'png' | 'pdf'
  filename?: string
  scale?: number
  quality?: number
}

// PNG 导出功能
export async function exportToPNG(elementId: string, options: ExportOptions = { format: 'png' }) {
  try {
    const element = document.getElementById(elementId)
    if (!element) {
      throw new Error(`Element with id "${elementId}" not found`)
    }

    const canvas = await html2canvas(element, {
      scale: options.scale || 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight,
    })

    // 创建下载链接
    const link = document.createElement('a')
    link.download = options.filename || `negotiation-report-${new Date().toISOString().split('T')[0]}.png`
    link.href = canvas.toDataURL('image/png', options.quality || 0.9)
    
    // 触发下载
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    return true
  } catch (error) {
    console.error('PNG export failed:', error)
    throw error
  }
}

// PDF 导出功能
export async function exportToPDF(elementId: string, options: ExportOptions = { format: 'pdf' }) {
  try {
    const element = document.getElementById(elementId)
    if (!element) {
      throw new Error(`Element with id "${elementId}" not found`)
    }

    // 先生成高质量的 canvas
    const canvas = await html2canvas(element, {
      scale: options.scale || 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight,
    })

    const imgData = canvas.toDataURL('image/png', options.quality || 0.9)
    
    // 创建 PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })

    // A4 尺寸 (mm)
    const pdfWidth = 210
    const pdfHeight = 297
    const margin = 10

    // 计算图片在 PDF 中的尺寸
    const imgWidth = pdfWidth - (margin * 2)
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    // 如果图片高度超过一页，需要分页
    if (imgHeight <= pdfHeight - (margin * 2)) {
      // 单页
      pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight)
    } else {
      // 多页处理
      let remainingHeight = imgHeight
      let yPosition = 0
      let pageNumber = 1

      while (remainingHeight > 0) {
        const pageHeight = Math.min(remainingHeight, pdfHeight - (margin * 2))
        
        if (pageNumber > 1) {
          pdf.addPage()
        }

        // 计算源图片的裁剪区域
        const sourceY = (yPosition / imgHeight) * canvas.height
        const sourceHeight = (pageHeight / imgHeight) * canvas.height

        // 创建临时 canvas 用于裁剪
        const tempCanvas = document.createElement('canvas')
        const tempCtx = tempCanvas.getContext('2d')
        tempCanvas.width = canvas.width
        tempCanvas.height = sourceHeight

        if (tempCtx) {
          tempCtx.drawImage(
            canvas,
            0, sourceY, canvas.width, sourceHeight,
            0, 0, canvas.width, sourceHeight
          )

          const pageImgData = tempCanvas.toDataURL('image/png', options.quality || 0.9)
          pdf.addImage(pageImgData, 'PNG', margin, margin, imgWidth, pageHeight)
        }

        remainingHeight -= pageHeight
        yPosition += pageHeight
        pageNumber++
      }
    }

    // 下载 PDF
    const filename = options.filename || `negotiation-report-${new Date().toISOString().split('T')[0]}.pdf`
    pdf.save(filename)

    return true
  } catch (error) {
    console.error('PDF export failed:', error)
    throw error
  }
}

// 通用导出函数
export async function exportReport(elementId: string, options: ExportOptions) {
  if (options.format === 'png') {
    return await exportToPNG(elementId, options)
  } else if (options.format === 'pdf') {
    return await exportToPDF(elementId, options)
  } else {
    throw new Error(`Unsupported export format: ${options.format}`)
  }
}

// 生成导出内容的 HTML
export function generateExportContent(data: any) {
  const currentDate = new Date().toLocaleDateString('zh-CN')
  
  // 调试信息 - 在开发环境中显示
  console.log('导出数据检查:', {
    batnaOptions: data.batnaOptions?.length || 0,
    stakeholders: data.stakeholders?.length || 0,
    bestBatna: !!data.bestBatna,
    bottomLineBuffer: data.bottomLineBuffer
  })
  
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px 20px; background: white;">
      <!-- 顶部品牌标识 -->
      <div style="text-align: center; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; color: white;">
        <div style="font-size: 24px; font-weight: bold; margin-bottom: 8px;">🎯 彩礼谈判准备工具</div>
        <div style="font-size: 16px; opacity: 0.9; margin-bottom: 12px;">专业 · 科学 · 高效</div>
        <div style="font-size: 14px; opacity: 0.8;">
          <span style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; margin: 0 8px;">
            🌐 zaoqi.icu
          </span>
          <span style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; margin: 0 8px;">
            📱 抖音: 36095284700
          </span>
        </div>
      </div>

      <div style="text-align: center; margin-bottom: 40px; border-bottom: 3px solid #3b82f6; padding-bottom: 20px;">
        <h1 style="font-size: 28px; color: #1f2937; margin: 0 0 10px 0;">彩礼谈判准备报告</h1>
        <p style="color: #6b7280; margin: 0; font-size: 16px;">生成日期: ${currentDate}</p>
      </div>

      ${data.goals?.primary ? `
      <div style="margin-bottom: 30px;">
        <h2 style="color: #3b82f6; font-size: 20px; margin-bottom: 15px; border-left: 4px solid #3b82f6; padding-left: 12px;">🎯 谈判目标</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
          <p style="margin: 0 0 10px 0; font-weight: 600;">主要目标:</p>
          <p style="margin: 0 0 15px 0; color: #374151;">${data.goals.primary}</p>
          
          ${data.goals.secondary?.length > 0 ? `
          <p style="margin: 0 0 10px 0; font-weight: 600;">次要目标:</p>
          <ul style="margin: 0 0 15px 0; color: #374151; padding-left: 20px;">
            ${data.goals.secondary.map((goal: string) => `<li style="margin-bottom: 5px;">${goal}</li>`).join('')}
          </ul>
          ` : ''}
          
          <p style="margin: 0 0 10px 0; font-weight: 600;">时间框架:</p>
          <p style="margin: 0 0 15px 0; color: #374151;">${data.goals.timeline}</p>
          
          ${data.goals.constraints?.length > 0 ? `
          <p style="margin: 0 0 10px 0; font-weight: 600;">约束条件:</p>
          <ul style="margin: 0; color: #374151; padding-left: 20px;">
            ${data.goals.constraints.map((constraint: string) => `<li style="margin-bottom: 5px;">${constraint}</li>`).join('')}
          </ul>
          ` : ''}
        </div>
      </div>
      ` : ''}

      ${data.issues?.length > 0 ? `
      <div style="margin-bottom: 30px;">
        <h2 style="color: #3b82f6; font-size: 20px; margin-bottom: 15px; border-left: 4px solid #3b82f6; padding-left: 12px;">📋 关键议题</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
          ${data.issues.map((issue: any) => `
            <div style="margin-bottom: 15px; padding: 15px; background: white; border-radius: 6px; border: 1px solid #e5e7eb;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <h3 style="margin: 0; font-size: 16px; color: #1f2937;">${issue.name}</h3>
                <span style="background: #dbeafe; color: #1e40af; padding: 2px 8px; border-radius: 12px; font-size: 12px;">重要性: ${issue.importance}/10</span>
              </div>
              ${issue.description ? `<p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px; font-style: italic;">${issue.description}</p>` : ''}
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; font-size: 14px;">
                <div><strong>理想值:</strong> ${issue.idealValue} ${issue.unit}</div>
                <div><strong>可接受:</strong> ${issue.acceptableValue} ${issue.unit}</div>
                <div><strong>底线:</strong> ${issue.bottomLine} ${issue.unit}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}

      ${data.batnaOptions?.length > 0 ? `
      <div style="margin-bottom: 30px;">
        <h2 style="color: #3b82f6; font-size: 20px; margin-bottom: 15px; border-left: 4px solid #3b82f6; padding-left: 12px;">🧮 BATNA分析</h2>
        
        ${data.bestBatna ? `
        <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border: 1px solid #bbf7d0; margin-bottom: 20px;">
          <h3 style="margin: 0 0 10px 0; color: #166534;">🏆 最佳BATNA: ${data.bestBatna.name}</h3>
          <p style="margin: 0 0 10px 0; color: #166534; font-weight: 600;">净价值: ${data.bestBatna.netValue?.toFixed(1)} 万元</p>
          <p style="margin: 0; color: #166534;">${data.bestBatna.description}</p>
          ${data.bottomLineBuffer ? `<p style="margin: 10px 0 0 0; color: #166534; font-size: 14px;">谈判底线: ${(data.bestBatna.netValue - data.bottomLineBuffer).toFixed(1)} 万元 (缓冲: ${data.bottomLineBuffer} 万元)</p>` : ''}
        </div>
        ` : ''}
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
          <h4 style="margin: 0 0 15px 0; color: #374151;">所有BATNA选项对比:</h4>
          ${data.batnaOptions.map((option: any) => `
            <div style="margin-bottom: 15px; padding: 15px; background: white; border-radius: 6px; border: 1px solid #e5e7eb; ${option.id === data.bestBatna?.id ? 'border-color: #10b981; background: #f0fdf4;' : ''}">
              <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 8px;">
                <h4 style="margin: 0; color: #1f2937;">${option.name} ${option.id === data.bestBatna?.id ? '⭐' : ''}</h4>
                <span style="background: ${option.netValue >= 0 ? '#dcfce7' : '#fef2f2'}; color: ${option.netValue >= 0 ? '#166534' : '#dc2626'}; padding: 2px 8px; border-radius: 12px; font-size: 12px; font-weight: 600;">净值: ${option.netValue?.toFixed(1)} 万</span>
              </div>
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">${option.description}</p>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px; font-size: 12px; color: #6b7280;">
                <div>收益: +${option.gain}</div>
                <div>成本: -${option.directCost}</div>
                <div>风险: -${option.riskPenalty}</div>
                <div>转换: -${option.switchCost}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}

      ${data.stakeholders?.length > 0 ? `
      <div style="margin-bottom: 30px;">
        <h2 style="color: #3b82f6; font-size: 20px; margin-bottom: 15px; border-left: 4px solid #3b82f6; padding-left: 12px;">👥 利益相关者分析</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
          ${data.stakeholders.map((stakeholder: any) => `
            <div style="margin-bottom: 20px; padding: 15px; background: white; border-radius: 6px; border: 1px solid #e5e7eb;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <h4 style="margin: 0; color: #1f2937;">${stakeholder.name}</h4>
                <span style="background: #e0e7ff; color: #3730a3; padding: 2px 8px; border-radius: 12px; font-size: 12px;">${stakeholder.role}</span>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 10px;">
                <div>
                  <span style="font-weight: 600; color: #7c3aed;">影响力:</span>
                  <span style="color: #6b46c1;">${stakeholder.influence}/10</span>
                </div>
                <div>
                  <span style="font-weight: 600; color: #7c3aed;">支持度:</span>
                  <span style="color: #6b46c1;">${stakeholder.support}/10</span>
                </div>
              </div>
              ${stakeholder.painPoints?.length > 0 ? `
              <div style="margin-bottom: 8px;">
                <span style="font-weight: 600; color: #dc2626;">痛点:</span>
                <ul style="margin: 5px 0 0 0; padding-left: 20px; color: #6b7280;">
                  ${stakeholder.painPoints.map((point: string) => `<li style="margin-bottom: 2px;">${point}</li>`).join('')}
                </ul>
              </div>
              ` : ''}
              ${stakeholder.interests?.length > 0 ? `
              <div>
                <span style="font-weight: 600; color: #059669;">利益诉求:</span>
                <ul style="margin: 5px 0 0 0; padding-left: 20px; color: #6b7280;">
                  ${stakeholder.interests.map((interest: string) => `<li style="margin-bottom: 2px;">${interest}</li>`).join('')}
                </ul>
              </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}

      ${data.strategy?.approach ? `
      <div style="margin-bottom: 30px;">
        <h2 style="color: #3b82f6; font-size: 20px; margin-bottom: 15px; border-left: 4px solid #3b82f6; padding-left: 12px;">🎲 谈判策略</h2>
        <div style="background: #faf5ff; padding: 20px; border-radius: 8px; border: 1px solid #e9d5ff;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 15px;">
            <div>
              <p style="margin: 0 0 5px 0; font-weight: 600; color: #7c3aed;">谈判方式:</p>
              <p style="margin: 0; color: #6b46c1;">${
                data.strategy.approach === 'collaborative' ? '合作型' :
                data.strategy.approach === 'competitive' ? '竞争型' : '迁就型'
              }</p>
            </div>
            <div>
              <p style="margin: 0 0 5px 0; font-weight: 600; color: #7c3aed;">让步模式:</p>
              <p style="margin: 0; color: #6b46c1;">${
                data.strategy.concessionPattern === 'linear' ? '线性让步' :
                data.strategy.concessionPattern === 'exponential' ? '递减让步' : '阶梯让步'
              }</p>
            </div>
          </div>
          ${data.strategy.timeStrategy ? `
          <div>
            <p style="margin: 0 0 5px 0; font-weight: 600; color: #7c3aed;">时间策略:</p>
            <p style="margin: 0; color: #6b46c1; font-style: italic;">${data.strategy.timeStrategy}</p>
          </div>
          ` : ''}
        </div>
      </div>
      ` : ''}

      ${data.anchorStrategy?.type ? `
      <div style="margin-bottom: 30px;">
        <h2 style="color: #3b82f6; font-size: 20px; margin-bottom: 15px; border-left: 4px solid #3b82f6; padding-left: 12px;">⚓ 开场锚点策略</h2>
        <div style="background: #fff7ed; padding: 20px; border-radius: 8px; border: 1px solid #fed7aa;">
          <div style="margin-bottom: 15px;">
            <p style="margin: 0 0 5px 0; font-weight: 600; color: #ea580c;">锚点类型:</p>
            <p style="margin: 0; color: #c2410c;">${
              data.anchorStrategy.type === 'aggressive' ? '激进锚点 - 设定较高的初始报价，为后续让步留出空间' :
              data.anchorStrategy.type === 'moderate' ? '温和锚点 - 设定合理的初始报价，平衡期望与现实' :
              '保守锚点 - 设定较为保守的初始报价，降低谈判风险'
            }</p>
          </div>
          
          ${Object.keys(data.anchorStrategy.firstOffer || {}).length > 0 ? `
          <div style="margin-bottom: 15px;">
            <p style="margin: 0 0 10px 0; font-weight: 600; color: #ea580c;">首次报价:</p>
            <div style="background: white; padding: 15px; border-radius: 6px; border: 1px solid #fed7aa;">
              ${Object.entries(data.anchorStrategy.firstOffer).map(([issueId, value]: [string, any]) => {
                const issue = data.issues?.find((i: any) => i.id === issueId)
                return issue ? `
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; padding: 8px; background: #fef3c7; border-radius: 4px;">
                    <span style="font-weight: 500;">${issue.name}:</span>
                    <span style="font-weight: 600; color: #d97706;">${value} ${issue.unit}</span>
                  </div>
                ` : ''
              }).join('')}
            </div>
          </div>
          ` : ''}
          
          ${data.anchorStrategy.justification?.length > 0 ? `
          <div>
            <p style="margin: 0 0 10px 0; font-weight: 600; color: #ea580c;">支撑理由:</p>
            <ul style="margin: 0; padding-left: 20px; color: #c2410c;">
              ${data.anchorStrategy.justification.map((reason: string) => `<li style="margin-bottom: 8px;">${reason}</li>`).join('')}
            </ul>
          </div>
          ` : ''}
        </div>
      </div>
      ` : ''}

      <!-- 底部品牌信息 -->
      <div style="margin-top: 50px; padding: 30px 20px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 12px; text-align: center; color: white;">
        <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 20px; align-items: center; max-width: 600px; margin: 0 auto;">
          
          <!-- 左侧：工具信息 -->
          <div style="text-align: left;">
            <div style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">🎯 彩礼谈判准备工具</div>
            <div style="font-size: 14px; opacity: 0.9; margin-bottom: 4px;">🌐 官网：zaoqi.icu</div>
            <div style="font-size: 14px; opacity: 0.9; margin-bottom: 4px;">📱 抖音：36095284700</div>
            <div style="font-size: 12px; opacity: 0.8;">科学谈判 · 数据驱动 · 专业分析</div>
          </div>
          
          <!-- 中间：抖音二维码 -->
          <div style="text-align: center;">
            <div style="width: 80px; height: 80px; background: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px;">
              <div style="font-size: 12px; color: #666; text-align: center; line-height: 1.2;">
                抖音<br/>二维码<br/>
                <span style="font-size: 10px;">36095284700</span>
              </div>
            </div>
            <div style="font-size: 11px; opacity: 0.8;">扫码关注</div>
          </div>
          
          <!-- 右侧：联系信息 -->
          <div style="text-align: right;">
            <div style="font-size: 14px; font-weight: bold; margin-bottom: 8px;">💡 更多工具</div>
            <div style="font-size: 12px; opacity: 0.9; margin-bottom: 4px;">• 谈判策略分析</div>
            <div style="font-size: 12px; opacity: 0.9; margin-bottom: 4px;">• 数据可视化</div>
            <div style="font-size: 12px; opacity: 0.9; margin-bottom: 4px;">• 专业报告生成</div>
            <div style="font-size: 11px; opacity: 0.8; margin-top: 8px;">访问 zaoqi.icu 了解更多</div>
          </div>
          
        </div>
        
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.3); font-size: 12px; opacity: 0.8;">
          本报告由彩礼谈判准备工具生成 | 数据仅保存在本地浏览器，确保隐私安全 | © zaoqi.icu
        </div>
      </div>
    </div>
  `
}